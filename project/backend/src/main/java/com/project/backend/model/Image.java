package com.project.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Table;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Image {
    String name;
    String url;
//    Long itemId;
}
