const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const axios = require('axios');
const engine = require('ejs-mate');
const pokemon = import('./modules/pokemontcgio.mjs')

const Card = require('./models/card');
const Set = require('./models/set');
const data = require('./public/assets/pokemonlist.json');
const sets = require('./sets.json');
const cards = require('./swsh11.json');
const { json } = require('express');

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

app.use(express.static(path.join(__dirname, 'public')))

app.set('partials', path.join(__dirname, '/partials'));
app.set('cards', path.join(__dirname, '/cards'));

app.get('/', async (req, res) => {
    // const set = data.series[0].expansions[0];
    // const cards = set.cards;
    // const config = { Headers: { Authorization: 'a046ddc1-16d3-4bb1-a8b4-7a1be75dd132'}};
    // const {data} = await axios.get('https://api.pokemontcg.io/v2/sets', config);
    // const setArray = data.data;
    // console.log(setArray);
    // const { name } = set;
    const setData = sets.data;
    res.render('cards/index', { setData});

    // res.render('cards/index', {set, cards});
    // console.log(name);
})

app.get('/pokemongo', (req, res) => {
    const set = data.series[0].expansions[0];
    const cards = set.cards;
    // const { name } = set;
    res.render('home', {set, cards });
    // console.log(name);
})

app.get('/set/:id', async (req, res) => {
    // Get the card data
    const {id} = req.params;
    const theSet = await Set.findOne({id: id})
    const cards = await Card.find({set: theSet});
    res.render('cards/set', { cards, theSet });
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
})