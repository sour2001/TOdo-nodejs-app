const mongoose = require('mongoose');

const todoschema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});


const Todo = mongoose.model('Todo', todoschema);

module.exports = Todo;