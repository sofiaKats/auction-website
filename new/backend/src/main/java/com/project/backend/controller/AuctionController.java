package com.project.backend.controller;

import com.project.backend.Repo.ItemRepository;
import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auction")
public class AuctionController {
    @Autowired
    private ItemRepository itemRepository;

    public AuctionController(ItemRepository itemRepository) { this.itemRepository = itemRepository; }

    // returns active auctions that a specific user has created
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

    @GetMapping("/find/{id}")
    public ResponseEntity<Item> getAuctionById(@PathVariable("id") Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not exist with id :" + id));
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @PostMapping("/add/{user_id}")
    public ResponseEntity<Item> addItem(@RequestBody Item item, @PathVariable("user_id") Long user_id) {
        Item newItem = new Item(item.getName(),
                                item.getCurrently(),item.getBuy_Price(),
                                item.getFirst_Bid(), item.getNumber_of_Bids(),
                                item.getLocation(), item.getCountry(),
                                item.getDescription(), user_id);
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
