const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    title: String,
    description: String,
    id: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);
