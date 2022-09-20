const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const axios = require('axios');
const engine = require('ejs-mate');

const Card = require('./models/card');
const Set = require('./models/set');
const data = require('./public/assets/pokemonlist.json');
const sets = require('./sets.json');
const cards = require('./swsh11.json');
const { json } = require('express');

const makeSets = async() => {
    const setData = sets.data;
    for(let set of setData) {
        const newSet = new Set({
            id: set.id,
            name: set.name,
            series: set.series,
            printedTotal: set.printedTotal,
            total: set.total,
            releaseDate: set.releaseDate
            // images: {
            //     symbol: set.images.symbol,
            //     logo: set.images.logo
            // }
        })
        newSet.save();
    }
}
makeSets();

const makeCards = async() => {
    const cardData = cards;
    const theSet = await Set.find({id: 'swsh11'});
    console.log(theSet);
    for(let card of cardData) {
        const newCard = new Card({
            id: card.id,
            name: card.name,
            number: card.number,
            rarity: card.rarity,
            types: card.types,
            image: {
                small: card.images.small,
                large: card.images.large
            },
            owned: false,
            set: theSet._id
        });
        // newCard.populate(theSet);
        if(newCard.rarity === 'Common' || newCard.rarity === 'Uncommon' || newCard.rarity === 'Rare') {
            newCard.counts.hasStandard = true;
            newCard.counts.hasReverse = true;
        } else {
            newCard.counts.hasHolo = true;
        }

        newCard.save();
    }
}
makeCards();

const populateSetid = async () => {
    const theSet = await Set.find({id: 'swsh11'});
    const theCards = await Card.find();
    // let theCard = await Card.findOne();
    // console.log(theCard);
    // await Card.updateOne({name: 'Oddish'}, {set: theSet[0]});
    // theCard = await Card.findOne();
    // console.log(theCard);

    // for(let card of theCards) {
    //     card.set = theSet[0];
    //     // console.log(card.set);

    //     await card.save();
    //     console.log(card);
    // }
    // console.log(theSet);
    // console.log(theCards);
    console.log(theCards);
    
}

populateSetid();