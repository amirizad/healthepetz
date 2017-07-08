var express = require("express");

var router = express.Router();

router.route("/owner")
    .post((req, res) => {
        res.send("hello, world");
        // Create owner
        // Redirect to /owner
    })
    .put((req, res) => {
    // Update owner
    // Redirect to /owner
    })
    .delete((req, res) => {
    // Delete owner
            // Delete all owner's pets
    // Redirect to "/"
    });

router.route("/pet/:owner-id?/:pet-id?")
    .get((req, res) => {
        // Must be logged in to access
        // Return data matching owner ID and pet ID.
        // Return all pet data for owner if no pet ID specified
    })
    .post((req, res) => {
        // Create owner
        // Create pet
            // Owner id must be included
    })

router.route("/vaccination/:pet-id?")
    .get((req, res) => {
        // Return data for vaccination schedule
    })
    .post((req, res) => {
        // Create pet vaccination record and schedule
    })
    .put((req, res) => {
        // Update pet vaccination record and schedule 
    })
    .delete((req, res) => {
        // Delete pet vaccination record and schedule
    })

router.route("/med-bill/:owner-id/:pet-id?")
    .get((req, res) => {
        // Retreive med bill
    })
    .post((req, res) => {
        // Create med bill
    })
    .put((req, res) => {
        // Update med bill
    })
    .delete((req, res) => {
        // delete med bill
})

module.exports = router;

