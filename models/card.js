const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const cardSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true,
        min: 001
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
    types: [{
        type: String,
        required: true
    }],
    image: [{
        small: {
            type: String,
            required: false
        },
        large: {
            type: String,
            required: false
        }
    }],
    owned: {
        type: Boolean,
        required: true
    },
    set: {
        type: Schema.Types.ObjectId,
        ref: 'Set'
    }
})

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;