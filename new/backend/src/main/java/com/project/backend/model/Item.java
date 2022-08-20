package com.project.backend.model;

import lombok.*;

import javax.persistence.*;

@Data @Setter @Getter @Entity @NoArgsConstructor
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    String ItemID;
    String Name;
    // Category
    String Currently;
    String Buy_Price;
    String First_Bid;
    String Number_of_Bids;
    //Bids
    //Location
    String Country;
    String Started;
    String Ends;
    // Seller
    String Description;

    public Item(String itemID, String name, String currently, String buy_Price, String first_Bid, String number_of_Bids, String country, String started, String ends, String description) {
        ItemID = itemID;
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
