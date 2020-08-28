"use strict";
const express = require("express");
const routes = express.Router();

const items = [
    {id: 1, product: "Braun Coffee Maker", price: 129, quantity: 1},
    {id: 2, product: "Mikasa Flatware Set", price: 250, quantity: 1},
    {id: 3, product: "Lucky Brand Dinnerware Set", price: 145, quantity: 1},
    {id: 4, product: "Oversized Bath Towels", price: 20, quantity: 6},
];

let nextId = 5;

// GET /items - reponse with a JSON array of items
routes.get("/items", (req, res) => {
     const maxPrice = parseInt(req.query.maxPrice);
        if (maxPrice) {
            const filteredItems =
            items.filter(item => item.price <= maxPrice);
            res.json(filteredItems);
        } else {
            res.json(items);
        }
});

// GET items by id
routes.get("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);
    if (item) {
        res.json(item);
    } else {
        res.status(404);
        res.send("ID Not Found")
    }
 });

 // POST (add) a new cart item to the array. 
 routes.post("/items", (req, res) => {
    const item = req.body;
    item.id = nextId++;
    items.push(item);

    res.status(201);
    res.json(item);
 });

// DELETE a cart item
routes.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item =>
        item.id === id);
        if (index !== -1) {
            items.splice(index, 1);
        }
        res.status(204);
        // you always have to have res.send or res.json to get a response from the server.
        res.send();
    });


// export routes for use in server.js
module.exports = routes;