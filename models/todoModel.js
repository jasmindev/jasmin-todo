const mongoose = require('mongoose');
const todoItemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true,'Title yazmalısınız'],
            minLength: [5, 'En az 5 karakter olmalı'],
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
)

const TodoItem = mongoose.model('TodoItem', todoItemSchema);

module.exports = TodoItem;