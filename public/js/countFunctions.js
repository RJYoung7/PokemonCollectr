
let downBtns = document.querySelectorAll('.downBtns');

// Event listener to decrement the count of the specified card type
downBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Target the span where the count resides
        const spanBtn = e.target.nextElementSibling.querySelector('span');
        // Parse the count
        let count = parseInt(spanBtn.innerText);
        // Decrement the count if it is greater than 0
        if(count > 0) {
            count--;
            // Set the span to the updated count value
            spanBtn.innerText = `${count}`;
            // Get the data to send to the server
            let countUpdate = {
                pokemonId: e.target.parentNode.parentNode.parentNode.id,
                countType: e.target.parentNode.id,
                count: count
            }
    
            // Make a post request to update the database with the new count data
            axios.post('swsh11', countUpdate).then(function(response) {
                console.log("Response:",  response)
            })
            .catch(function(error) {
                console.log(error)
            })
        }
        
        console.log('down clicked');
    })
})

let upBtns = document.querySelectorAll('.upBtns');

// Event listener to increment the count of the specified card type
upBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Target the span where the count resides
        const spanBtn = e.target.previousElementSibling.querySelector('span');
        // Parse the count
        let count = parseInt(spanBtn.innerText);
        // Increment the count
        count++;
        // Set the span to the updated count value
        spanBtn.innerText = `${count}`;

        // Get the data to send to the server
        let countUpdate = {
            pokemonId: e.target.parentNode.parentNode.parentNode.id,
            countType: e.target.parentNode.id,
            count: count
        }

        // Make a post request to update the database with the new count data
        axios.post('swsh11', countUpdate).then(function(response) {
            console.log("Response:",  response)
        })
        .catch(function(error) {
            console.log(error)
        })
    })
})