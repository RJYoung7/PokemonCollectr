const {Schema} = require('mongoose');
const mongoose = require('mongoose');
const Set = require('./set');

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
    counts: {
        hasStandard: {
            type: Boolean,
            default: false,
            required: true
        },
        standardCount: {
            type: Number,
            default: 0,
            required: true,
            min: 0
        },
        hasReverse: {
            type: Boolean,
            default: false,
            required: true
        },
        reverseCount: {
            type: Number,
            default: 0,
            required: true,
            min: 0
        },
        hasHolo: {
            type: Boolean,
            default: false,
            required: true        },
        holoCount: {
            type: Number,
            default: 0,
            required: true,
            min: 0        }
    },
    types: [{
        type: String,
        required: true
    }],
    images: {
        small: {
            type: String,
            required: false
        },
        large: {
            type: String,
            required: false
        }
    },
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