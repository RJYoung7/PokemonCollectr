const fs = require('fs');

// let newTr = document.createElement('tr');
// let newImg = document.createElement('img');

fs.readFile('../Assets/pokemonGoImages.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        throw err;
    }
    let jpgs = [];
    data = data.split('"');
    for (let i = 0; i < data.length; i++) {
        if (data[i].length > 15)
            jpgs.push(data[i]);
    }
    console.log(jpgs);
})
console.log('AFTER')