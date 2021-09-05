const express = require("express");
const router = express.Router();
const itemsController = require('../controllers/itemsController');

module.exports = function() {
    router.get('/items', itemsController.getItems);
    router.get('/items/:id', itemsController.getItem);

    return router;
}