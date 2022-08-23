package com.project.backend.model;

import lombok.*;
import lombok.extern.jackson.Jacksonized;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Data @Setter @Getter @Entity @NoArgsConstructor
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
//    @ManyToOne //now item entity has user_id in sql
//    private User user;
    Long userId;
    String Name;
    @ElementCollection
    @CollectionTable(name = "category")
    private List<String> Category = new ArrayList<String>();
//    private Set<String> Category;
    private String categories; //one big string of many categories
    Double Currently;
    Double Buy_Price;
    Double First_Bid;
    Integer Number_of_Bids;
    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany
    List<Bid> Bids = new ArrayList<Bid>();
    String Location;
    String Longitude;
    String Latitude;
    String Country;
    Timestamp Started;
    Timestamp Ends;
    String Description;

    public Item(Long Id, String name, Double buy_Price, String location, String country, String description, Long user_id,String categories, String latitude, String longitude) {
        this.id = Id;
        Name = name;
        this.Currently = 0.01;
        this.First_Bid = 0.01;
        Buy_Price = buy_Price;
        Location = location;
        Country = country;
        Description = description;
        this.userId = user_id;
        this.Number_of_Bids = 0;
        this.categories = categories;
        List<String> categs = Arrays.asList(this.categories.replaceAll("[\\[\\](){}]","").split("\\s*,\\s*"));
        this.Category = categs;
        this.Latitude = latitude;
        this.Longitude = longitude;
    }
}
