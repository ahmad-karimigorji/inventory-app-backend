const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title: String,
    quantity: String,
    categoryId: String,
    id: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
