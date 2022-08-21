package com.project.backend.controller;

import com.project.backend.Repo.ItemRepository;
import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auction")
public class AuctionController {
    @Autowired
    private ItemRepository itemRepository;

    public AuctionController(ItemRepository itemRepository) { this.itemRepository = itemRepository; }

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

    @PostMapping("/add")
    public ResponseEntity<Item> addItem(@RequestBody Item item) {
        Item newItem = new Item(item.getName(),
                                item.getCurrently(),item.getBuy_Price(),
                                item.getFirst_Bid(), item.getNumber_of_Bids(),
                                item.getLocation(), item.getCountry(),
                                item.getStarted(), item.getEnds(),
                                item.getDescription());
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
