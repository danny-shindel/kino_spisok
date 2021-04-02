
const comments = [...document.querySelectorAll('.movie-home > #reviews')];
const buttonEl = document.querySelector('.movie-holder-home')
buttonEl.addEventListener('click',open);

function open(evt){
    const isButton = evt.target.id === 'comments';
    if (isButton) {
        comments[evt.target.parentElement.id].classList.toggle("dropdown"); 
    } 
}
