var express = require("express");

var router = express.Router();

router.get("/", (req,res) => {
    res.send("hello, world");
        // Render home page
    })
    .get("/owner", (req,res) => {
        res.send("hello, dashboard world");
        // Query db for owner data
        // Query db for all owner's pets
        // Render owner page
    })

    .get("/pet-records", (req,res) => {
        res.send("hello, pet-records world");
        // Query db for pet data
        // Render pet page
});

module.exports = router;
