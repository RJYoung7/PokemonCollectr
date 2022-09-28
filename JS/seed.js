const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const axios = require('axios');
const engine = require('ejs-mate');
const fs = require('fs')
const pokemon = require('pokemontcgsdk');

const Card = require('../models/card');
const Set = require('../models/set');


const createFolders = (name) => {

    // Set Folders
    try {
        if (!fs.existsSync(path.join(__dirname, `../images/${name}`))) {
          fs.mkdirSync(path.join(__dirname, `../images/${name}`));
        }
    } catch (err) {
        console.error(err);
    }

    // Set image folder
    try {
        if (!fs.existsSync(path.join(__dirname, `../images/${name}/setImgs`))) {
          fs.mkdirSync(path.join(__dirname, `../images/${name}/setImgs`));
        }
    } catch (err) {
        console.error(err);
    }

    // Card image folder
    try {
        if (!fs.existsSync(path.join(__dirname, `../images/${name}/cardImgs`))) {
          fs.mkdirSync(path.join(__dirname, `../images/${name}/cardImgs`));
        }
    } catch (err) {
        console.error(err);
    }
}

// Function to download images to local storage
const getImage = async(imageUrl, path, imgDesc, imgType) => {            
    await axios({
        method: 'get',
        url: `${imageUrl}`,
        responseType: 'stream'
        })
        .then(function (response) {
            response.data.pipe(fs.createWriteStream(`${path}/${imgDesc}.${imgType}`))
        });
}

// Function to get all card data from a given set id
const getCards = async(setId) => {
    return await pokemon.card.all({q: `set.id:${setId}`}).then((result) => {
        return result;
    });
}

// Function to seed db with set data
const makeSets = async() => {
    console.log('making sets')

    const setData = sets.data;
    for(let set of setData) {
        const sym = `/${set.id}/setImgs/symbol.png`;
        const logo = `/${set.id}/setImgs/logo.png`;
        const newSet = new Set({
            id: set.id,
            name: set.name,
            series: set.series,
            printedTotal: set.printedTotal,
            total: set.total,
            releaseDate: set.releaseDate,
            images: {
                symbol: sym,
                logo: logo
            }
        })
        await newSet.save();
    }
}

// Function to seed db with card data
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

const getAllSets = async() => {
    return await pokemon.set.all().then((sets) => {
        return sets;
    })
}

const getSet = async(setId) => {
    return await pokemon.set.where({id: setId}).then((set) => {
        return set;
    })
}

const createSetFolders = async() => {
    const sets = await getAllSets();

    for(let set of sets) {
        createFolders(set.id);
    } 
}

// Downloads all set images from pokemon api
const downloadAllSetImages = async() => {
    const sets = await getAllSets();

    for(let set of sets) {
        const logoUrl = set.images.logo;
        const symbolUrl = set.images.symbol;
        getImage(logoUrl, `images/${set.id}/setImgs/`, 'logo', 'png');
        getImage(symbolUrl, `images/${set.id}/setImgs/`, 'symbol', 'png');
    } 
}

// Downloads all card images of set from pokemon api
const downloadCardImagesOfSet = async(setId) => {
    const cards = await pokemon.card.all({q: `set.id:${setId}`});
    for(let card of cards) {
        // Create Folder
        try {
            if (!fs.existsSync(path.join(__dirname, `../images/${setId}/cardImgs/${card.name}`))) {
              fs.mkdirSync(path.join(__dirname, `../images/${setId}/cardImgs/${card.name}`));
            }
        } catch (err) {
            console.error(err);
        }
        const smallUrl = card.images.small;
        const largeUrl = card.images.large;
        await getImage(smallUrl, `images/${setId}/cardImgs/${card.name}/`, 'small', 'png');
        await getImage(largeUrl, `images/${setId}/cardImgs/${card.name}/`, 'large', 'png');
        uploadSingleCard(card);
    } 
}

// Uploads single card data to mongodb
const uploadSingleCard = async(card) => {
    const theSet = await Set.findOne({id: `${card.set.id}`});
    const smallImg = `/${card.set.id}/cardImgs/${card.name}/small.png`;
    const largeImg = `/${card.set.id}/cardImgs/${card.name}/large.png`;
    const newCard = new Card({
        id: card.id,
        name: card.name,
        number: card.number,
        rarity: card.rarity,
        types: card.types,
        image: {
            small: smallImg,
            large: largeImg
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

    await newCard.save();
}

// Uploads all card data from a given set to mongodb
const uploadSetCards = async(setId) => {
    const theSet = await Set.findOne({id: `${setId}`});
    const cards = await pokemon.card.all({q: `set.id:${setId}`});
    for(let card of cards) {
        const smallImg = `/${card.set.id}/cardImgs/${card.name}/small.png`;
        const largeImg = `/${card.set.id}/cardImgs/${card.name}/large.png`;
        const newCard = new Card({
            id: card.id,
            name: card.name,
            number: card.number,
            rarity: card.rarity,
            types: card.types,
            images: {
                small: smallImg,
                large: largeImg
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

        await newCard.save();
    }
    console.log('Done Uploading');

}

module.exports = { downloadCardImagesOfSet, uploadSetCards }

// Download set logos and symbols
// downloadSetImages();

// Create folders for images
// createSetFolders();

// makeSets();
// makeCards();
// populateSetid();