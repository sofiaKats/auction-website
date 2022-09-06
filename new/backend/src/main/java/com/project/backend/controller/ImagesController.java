package com.project.backend.controller;


import com.project.backend.Repo.ItemRepository;
import com.project.backend.exception.ResponseMessage;
import com.project.backend.model.Image;
import com.project.backend.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/images")
public class ImagesController {
    private final Path root = Paths.get("uploads");
    private Path ItemDir;

    @Autowired
    ItemRepository itemRepository;

    public ImagesController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @PostMapping("/upload/{item_id}")
//    @RequestMapping(value = "/upload/{item_id}", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable("item_id") Long item_id) {

        // if directory 'uploads' doesn't exist, create it
        if (!Files.exists(root)) {
            try {
                Files.createDirectory(root);
            } catch (IOException e) {
                throw new RuntimeException("Could not initialize root folder for upload!");
            }
        }
        // for each item that has pictures, i create a new directory inside the "uploads" directory
        // with item_id as name, e.g.  uploads/1     -> folder with images of item with id=1
        //                             uploads/12    -> folder with images of item with id=12
        //                               ...
        String uploadDir = root.toString() + "/" + item_id;
        ItemDir = Paths.get(uploadDir);
        // if directory 'uploads/item_id' doesn't exist, create it
        if (!Files.exists(ItemDir)) {
            try {
                Files.createDirectory(ItemDir);
            } catch (IOException e) {
                throw new RuntimeException("Could not initialize item_id folder for upload!");
            }
        }

        String message = "";
        try {
            // saving file to the existing directory
            try {
                Item current_listing = itemRepository.getById(item_id);
                current_listing.setHasImages(true); //from now on item has pictures
                itemRepository.save(current_listing);

                Files.copy(file.getInputStream(), this.ItemDir.resolve(file.getOriginalFilename()));
            } catch (Exception e) {
                throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
            }
            ////////////////////////////////////////
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @GetMapping("/AllFiles/{item_id}")
    public ResponseEntity<List<Image>> getListFiles(@PathVariable("item_id") Long item_id) {
        Stream<Path> AllFiles;

        try {
            String uploadDir = root.toString() + "/" + item_id;
            ItemDir = Paths.get(uploadDir);
            AllFiles =  Files.walk(this.ItemDir, 1).filter(path -> !path.equals(this.ItemDir)).map(this.ItemDir::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }

        List<Image> fileInfos = AllFiles.map(this.ItemDir::relativize).map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(ImagesController.class, "getFile",  item_id, path.getFileName().toString()).build().toString();

            return new Image(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/files/{item_id}/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable Long item_id, @PathVariable String filename) {
        // load image
        Resource image;
        try {
            String uploadDir = root.toString() + "/" + item_id;
            ItemDir = Paths.get(uploadDir);
            Path file = ItemDir.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                image = resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getFilename() + "\"").body(image);
    }

}
