const express = require('express');
const engine = require('ejs-mate');
const multer = require('multer');
const axios = require('axios');
const methodOverride = require('method-override');
const pokemon = require('pokemontcgsdk');
const mongoose = require('mongoose');
const globals = require('./globals');

const Card = require('./models/card');
const Set = require('./models/set');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + '/uploads/'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.originalname + '--' + uniqueSuffix);
    }
})
  
const upload = multer({ storage: storage })

pokemon.configure({apiKey: globals.API_KEY});

const app = express();
const path = require('path');
const { downloadCardImagesOfSet, uploadSetCards } = require('./JS/seed');

main()
    .then(() => {
        console.log("MONGO CONNECTION OPEN");
    }).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/pokemonCollectr');
}



app.engine('ejs', engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('multer'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'images')))

app.set('partials', path.join(__dirname, '/partials'));
app.set('cards', path.join(__dirname, '/cards'));

// uploadSetCards('swsh11')

app.get('/', async (req, res) => {

    const sets = await Set.find({}).sort({releaseDate: 'desc'});
    res.render('cards/index', { sets });
})

app.get('/set/:id', async (req, res) => {
    // Get the card data
    const {id} = req.params;
    const theSet = await Set.findOne({id: id})
    const cards = await Card.find({set: theSet});

    res.render('cards/set', { cards, theSet });
})

app.post('/set/:id', async (req, res) => {
    const {pokemonId} = req.body;
    const {countType} = req.body;
    const {count} = req.body;
    const card = await Card.findOne({id: `${pokemonId}`});
    if(countType === 'standardCount') {
        card.counts.standardCount = count;
    } else if (countType === 'reverseCount') {
        card.counts.reverseCount = count;
    } else {
        card.counts.holoCount = count;
    }
    let totalCounts = card.counts.standardCount + card.counts.reverseCount + card.counts.hasHolo;
    if(totalCounts > 0) {
        card.owned = true;
    }

    await card.save();

    console.log('request received');
    
    /** Need to send a response without updating page  **/
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
})