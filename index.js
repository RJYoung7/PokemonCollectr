const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const engine = require('ejs-mate');

const Card = require('./models/card');
const data = require('./public/assets/pokemonlist.json');


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

// app.use(express.static(path.join(__dirname, 'public')))

app.set('partials', path.join(__dirname, '/partials'));
app.set('cards', path.join(__dirname, '/cards'));

app.get('/', (req, res) => {
    const set = data.series[0].expansions[0];
    const cards = set.cards;
    // const { name } = set;
    res.render('cards/index', {set, cards });
    // console.log(name);
})

app.get('/pokemongo', (req, res) => {
    const set = data.series[0].expansions[0];
    const cards = set.cards;
    // const { name } = set;
    res.render('home', {set, cards });
    // console.log(name);
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
})