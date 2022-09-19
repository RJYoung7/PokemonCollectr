const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const setSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: false
    },
    printedTotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: String,
        required: false
    },
    images: {
        symbol: {
            type: String
        },
        logo: {
            type: String
        }
    }
})

const Set = mongoose.model('Set', setSchema);

module.exports = Set;