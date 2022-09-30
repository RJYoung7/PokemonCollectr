
let downBtns = document.querySelectorAll('.downBtns');
// console.log(btns);
downBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const spanBtn = e.target.nextElementSibling.querySelector('span');
        let spanCountStr = spanBtn.innerText;
        let count = parseInt(spanCountStr);
        if(count > 0)
            count--;
        spanBtn.innerText = `${count}`;
        console.log('down clicked');
    })
})

let upBtns = document.querySelectorAll('.upBtns');
// console.log(btns);
upBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const spanBtn = e.target.previousElementSibling.querySelector('span');
        let spanCountStr = spanBtn.innerText;
        let count = parseInt(spanCountStr);
        count++;
        spanBtn.innerText = `${count}`;
        let pokemonId = e.target.parentNode.parentNode.parentNode.id;
        console.log(e.target.parentNode.parentNode.parentNode)
        console.log(pokemonId)
        let countUpdate = {
            pokemonId: e.target.parentNode.parentNode.parentNode.id,
            countType: e.target.parentNode.id,
            count: count
        }

        // axios.post('/set/swsh11', countUpdate).then(function(response) {
        //     console.log("Response:",  response)
        // })
        // .catch(function(error) {
        //     console.log(error)
        // })
        const params = new URLSearchParams();
        params.append('pokemonId', e.target.parentNode.parentNode.parentNode.id);
        params.append('countType', e.target.parentNode.id);
        params.append('count', count);
        axios.post('/set/swsh11', params);

        // axios({
        //     method: 'post',
        //     url: '/set/swsh11',
        //     data: {
        //         id: 'swsh11',
        //         count: '1'
        //     }
        // });

        console.log(countUpdate);
        console.log('up clicked');
    })
})


// btn.addEventListener('click', () => {
//     console.log('clicked');
// })