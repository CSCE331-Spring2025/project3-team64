// package com.team64.BubbleFlowBackend.controller;

// import com.team64.BubbleFlowBackend.model.Allergen;
// import com.team64.BubbleFlowBackend.service.AllergenService;
// import org.springframework.beans.factory.annotation.Autowired;
// //import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// // import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/allergens")
// public class AllergenController {
//     @Autowired
//     private AllergenService allergenService;

//     @GetMapping
//     public List<Allergen> getAllAllergens() {
//         return allergenService.getAllAllergens();
//     }

//     // @PostMapping
//     // public Allergen createAllergen(@RequestBody Allergen allergen) {
//     //     return allergenService.createAllergen(allergen);
//     // }

//     // @PutMapping("/{id}")
//     // public Allergen updateAllergen(@PathVariable Long id, @RequestBody Allergen allergen) {
//     //     return allergenService.updateAllergen(id, allergen);
//     // }

//     // @DeleteMapping("/{id}")
//     // public void deleteAllergen(@PathVariable Long id) {
//     //     allergenService.deleteAllergen(id);
//     // }
// }