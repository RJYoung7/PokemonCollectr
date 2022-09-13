const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    expansion: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cardNumber: {
        type: Number,
        required: true,
        min: 001
    },
    totalCardsInSet: {
        type: Number,
        required: true
    },
    totalCardsIncludingSecrets: {
        type: Number,
        required: true
    },
    
    rarity: {
        type: String,
        required: true
    },
    counts: [{
        hasStandard: {
            type: Boolean,
            required: true
        },
        standardCount: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        hasReverse: {
            type: Boolean,
            required: true
        },
        reverseCount: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        hasHolo: {
            type: Boolean,
            required: true
        },
        holoCount: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        }
    }],
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    owned: {
        type: Boolean,
        required: true
    }
})

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;