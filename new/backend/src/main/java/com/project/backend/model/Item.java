package com.project.backend.model;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Data @Setter @Getter @Entity @NoArgsConstructor
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String Name;
    // Category
    @ElementCollection
    @CollectionTable(name = "category")
    private List<String> Category;
    Float Currently;
    Float Buy_Price;
    Float First_Bid;
    Integer Number_of_Bids;
    //Bids
    //Location
    String Country;
    String Started;
    String Ends;
    // Seller
    String Description;

        public Item( String name, Float currently, Float buy_Price, Float first_Bid, Integer number_of_Bids, String country, String started, String ends, String description) {
        Name = name;
        Currently = currently;
        Buy_Price = buy_Price;
        First_Bid = first_Bid;
        Number_of_Bids = number_of_Bids;
        Country = country;
        Started = started;
        Ends = ends;
        Description = description;
    }
}
