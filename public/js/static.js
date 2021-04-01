
const comments = [...document.querySelectorAll('.movie-home > #reviews')];
const buttons = [...document.querySelectorAll('.movie-home > .links > #comments')]
////use buttons to toggle style to show button clicked when comments dropped down
const buttonEl = document.querySelector('.movie-holder-home')
buttonEl.addEventListener('click',open);

function open(evt){
    const isButton = evt.target.id === 'comments';
    if (isButton) {
        comments[evt.target.parentElement.id].classList.toggle("dropdown"); 
    } 
}
