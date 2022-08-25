const express = require('express');
const app = express();
const path = require('path');
const data = require('./public/assets/pokemonlist.json');

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('partials', path.join(__dirname, '/partials'));

app.get('/', (req, res) => {
    const set = data.series[0].expansions[0];
    const cards = set.cards;
    // const { name } = set;
    res.render('home', {set, cards });
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