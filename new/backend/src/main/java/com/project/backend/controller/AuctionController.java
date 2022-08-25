package com.project.backend.controller;

import com.project.backend.Repo.ItemRepository;
import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public AuctionController(ItemRepository itemRepository) { this.itemRepository = itemRepository; }

    // returns active auctions that a specific user has created
//    @Query("select u from item u where u.user_id = :user_id")
    @GetMapping("/all/{user_id}")
    public ResponseEntity<List<Item>> getAllItemsWithUserId(@PathVariable("user_id") Long user_id) {
        List<Item> items = new ArrayList<Item>();
        List<Item> all_items = itemRepository.findAll();
        //making sure item with user_id=<given user_id> exists before appending
        //it to the list, else just return an empty list
        for (int i = 0; i < all_items.size(); i++) {
            if(all_items.get(i).getUserId() == user_id) {
                items.add(all_items.get(i));
            }
        }
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/active/all")
    public  ResponseEntity<List<Item>> getAllActiveItems() {
        List<Item> active_items = new ArrayList<Item>();
        List<Item> all_items = itemRepository.findAll();
        // find all listings that have been started by the user
        // and return them in a list
        for (int i = 0; i < all_items.size(); i++) {
            if(all_items.get(i).getIsActive() == true) {
                active_items.add(all_items.get(i));
            }
        }
        return new ResponseEntity<>(active_items, HttpStatus.OK);
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
        calendar.add(Calendar.HOUR, 168); // every auction listing last for 7 days
        Timestamp ends = new Timestamp(calendar.getTimeInMillis());
        item.setEnds(ends);

        itemRepository.save(item);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Item> getAuctionById(@PathVariable("id") Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not exist with id :" + id));
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @PostMapping("/add/{user_id}")
    public ResponseEntity<Item> addItem(@Valid @RequestBody Item item, @PathVariable("user_id") Long user_id) {
        item.setId(new Random().nextLong());
        Item newItem = new Item(item.getId(), item.getName(), item.getBuy_Price(),
                                item.getLocation(), item.getCountry(),
                                item.getDescription(), user_id, item.getCategories(), item.getLatitude(), item.getLongitude());
        itemRepository.save(newItem);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Item> updateAuction(@RequestBody Item item) {
        itemRepository.save(item);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAuction(@PathVariable("id") Long id) {
        itemRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
