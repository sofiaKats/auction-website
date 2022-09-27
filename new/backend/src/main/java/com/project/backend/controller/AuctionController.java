package com.project.backend.controller;

import com.project.backend.Repo.BidRepository;
import com.project.backend.Repo.ItemRepository;
import com.project.backend.Repo.UserRepository;
import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.model.Bid;
import com.project.backend.model.Item;
import com.project.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auction")
public class AuctionController {
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private BidRepository bidRepository;
    @Autowired
    private UserRepository userRepository;

    public AuctionController(ItemRepository itemRepository, BidRepository bidRepository, UserRepository userRepository) {
        this.itemRepository = itemRepository;
        this.bidRepository = bidRepository;
        this.userRepository = userRepository;
    }

    // PRINT DATA FUNCTIONS (GET)

    // !!! FOR AUCTIONS !!!
    // returns active auctions that a specific user has created
    @GetMapping("/all/{user_id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Item>> getAllItemsWithUserId(@PathVariable("user_id") Long user_id) {
        List<Item> items = itemRepository.findByUserId(user_id);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // !!! FOR BIDS !!!
    @GetMapping("/bids/all/{item_id}")
    public ResponseEntity<List<Bid>> getAllBids(@PathVariable("item_id") Long item_id) {
        List<Bid> bids = bidRepository.findByItemId(item_id);
        return new ResponseEntity<>(bids, HttpStatus.OK);
    }

    // START AUCTION FUNCTIONS

    @GetMapping("/active/all")
    public  ResponseEntity<List<Item>> getAllActiveItems() {
//        List<Item> active_items = new ArrayList<Item>();
//        List<Item> all_items = itemRepository.findAll();
//        // find all listings that have been started by the user
//        // and return them in a list
//        for (int i = 0; i < all_items.size(); i++) {
//            if(all_items.get(i).getIsActive() == true) {
//                active_items.add(all_items.get(i));
//            }
//        }
        List<Item> active_items = itemRepository.findAllActiveItems();
        return new ResponseEntity<>(active_items, HttpStatus.OK);
    }

    @GetMapping("/winner/{item_id}")
    public ResponseEntity<?> getWinnerOfAuction(@PathVariable("item_id") Long item_id) {
        // get all bids of particular item
        List<Bid> allBids = bidRepository.findByItemId(item_id);
        // making sure item has bids
        if(allBids!=null) {
            Bid maxBid = new Bid();
            // find max bidding
            Double max = -1.0;
            for (int i=0; i<allBids.size(); i++) {
                if(max < allBids.get(i).getAmount()) {
                    max = allBids.get(i).getAmount();
                    maxBid = allBids.get(i);
                }
            }
            User winnerUser = userRepository.getByUsername(maxBid.getUsername());
            return new ResponseEntity<>(winnerUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/search/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = new ArrayList<String>();
        List<Item> active_items = itemRepository.findAllActiveItems();
        // for all the active item listings
        for (int i = 0; i < active_items.size(); i++) {
            // and for each category that belongs to this item (from categories list)
            for (int j = 0; j < active_items.get(i).getCategory().size(); j++) {
                //add every single category on the list
                categories.add(active_items.get(i).getCategory().get(j));
            }
        }
//        System.out.println("Categories!! " +  categories );
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/active/page/all")
    public ResponseEntity<Map<String, Object>> getAllActiveItemsPaged( @RequestParam(required = false) String description, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size )
    {
        try {
            List<Item> items = new ArrayList<Item>();
            Pageable paging = PageRequest.of(page, size);

            Page<Item> pageItems;
            if (description == null)
                pageItems = itemRepository.findAll(paging);
            else
                pageItems = itemRepository.findByDescription(description, paging);

            items = pageItems.getContent();
            List<Item> active_items = new ArrayList<Item>();
            // find all listings that have been started by the user
            // and return them in a list
            for (int i = 0; i < items.size(); i++) {
                if(items.get(i).getIsActive() == true) {
                    active_items.add(items.get(i));
                }
            }

            Map<String, Object> response = new HashMap<>();
            response.put("items", active_items);
            response.put("currentPage", pageItems.getNumber());
            response.put("totalItems", pageItems.getTotalElements());
            response.put("totalPages", pageItems.getTotalPages());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/start/{id}")
    public ResponseEntity<Item> startAuction(@PathVariable("id") Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not exist with id :" + id));
        item.setIsActive(true); // auction listing is now up and running

        // so we update started and ends value as well
        Timestamp starts = new Timestamp(System.currentTimeMillis());
        item.setStarted(starts);
        // need to use calendar in order to add time to a timestamp value
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, 5); // every auction listing last for 5 minutes
        Timestamp ends = new Timestamp(calendar.getTimeInMillis());
        item.setEnds(ends);

        itemRepository.save(item);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    // SEARCH FUNCTIONS

    @GetMapping("/find/{id}")
    public ResponseEntity<Item> getAuctionById(@PathVariable("id") Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not exist with id :" + id));
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    // CREATE FUNCTIONS (POST)

    @PostMapping("/add/{user_id}")
    public ResponseEntity<Item> addItem(@Valid @RequestBody Item item, @PathVariable("user_id") Long user_id) {
        item.setId(new Random().nextLong());
        Item newItem = new Item(item.getId(), item.getName(), item.getBuy_Price(),
                                item.getLocation(), item.getCountry(),
                                item.getDescription(), user_id, item.getCategories(), item.getLatitude(), item.getLongitude());
        itemRepository.save(newItem);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @PostMapping("/bids/add/{item_id}/{user_id}")
    public ResponseEntity<Bid> addBid(@Valid @RequestBody Bid bid, @PathVariable("user_id") Long user_id, @PathVariable("item_id") Long item_id) {
        // from now on item has bids!
        Item item = itemRepository.getById(item_id);
        item.setHasBids(true);

        bid.setId(new Random().nextLong());
        Timestamp time = new Timestamp(System.currentTimeMillis());
        Bid newBid = new Bid(bid.getId(), item_id, user_id, time, bid.getAmount(), bid.getUsername());
        bidRepository.save(newBid);
        //updating current highest bid in auction
        if(item.getCurrently() < bid.getAmount()) item.setCurrently(bid.getAmount());
        item.setNumber_of_Bids(item.getNumber_of_Bids() + 1); // one more bid is added to the auction lisitng
        itemRepository.save(item);
        return new ResponseEntity<>(bid, HttpStatus.OK);
    }

    // UPDATE FUNCTIONS (PUT)

    @PutMapping("/update/{id}")
    public ResponseEntity<Item> updateAuction(@RequestBody Item item, @PathVariable("id") Long id) {
        Item oldItem = itemRepository.getById(id);
        oldItem.setName(item.getName());
        oldItem.setCategories(item.getCategories());
//        List<String> categs = Arrays.asList(oldItem.getCategories().replaceAll("[\\[\\](){}]","").split("\\s*,\\s*"));
//        oldItem.setCategory(categs);
        oldItem.setBuy_Price(item.getBuy_Price());
        oldItem.setLocation(item.getLocation());
        oldItem.setCountry(item.getCountry());
        oldItem.setDescription(item.getDescription());
        oldItem.setLatitude(item.getLatitude());
        oldItem.setLongitude(item.getLongitude());

        itemRepository.save(oldItem);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @PutMapping("/buy/{item_id}")
    public ResponseEntity<Item> buyAuctionListing(@PathVariable("item_id") Long item_id) {
        Item item = itemRepository.getById(item_id);
        // user has pressed buy button, listing is done
//        item.setIsActive(false);
        item.setBoughtFlag(true);
        itemRepository.save(item);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @PutMapping("/die/{id}")
    public ResponseEntity<Item> timeForAuctionToDie(@PathVariable("id") Long id) {
        Item item = itemRepository.getById(id);
        Date ends_stamp = new Date(item.getEnds().getTime());
        Date now = new Date();
        if(now.after(ends_stamp)) {
            item.setIsActive(false);
            itemRepository.save(item);
        }

        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    // DELETE FUNCTIONS (DELETE)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAuction(@PathVariable("id") Long id) {
        itemRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
