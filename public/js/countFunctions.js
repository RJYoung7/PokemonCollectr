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
        console.log('up clicked');
    })
})


// btn.addEventListener('click', () => {
//     console.log('clicked');
// })