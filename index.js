let deckId;
let computerPoint = 0;
let myPoint = 0;
const deckBtn = document.getElementById('new-deck');
const drawBtn = document.getElementById('draw-cards');
const remainingCards = document.getElementById('remaining-cards');
const cards = document.getElementById('cards');
const computerScore = document.getElementById('computer-score');
const myScore = document.getElementById('my-score');
const warEl = document.getElementById('war');

deckBtn.addEventListener('click', () => {
    fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle')
         .then(res => res.json())
         .then(data => {
            remainingCards.innerHTML = `Remaining Cards: ${data.remaining}`
            console.log(data);
            deckId = data.deck_id;
        })
})
drawBtn.addEventListener('click', () => {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            
            remainingCards.innerHTML = `Remaining Cards: ${data.remaining}`
            cards.children[0].innerHTML = `<img src="${data.cards[0].image}">`
            cards.children[1].innerHTML = `<img src="${data.cards[1].image}">`
            warEl.textContent = winner(data.cards[0], data.cards[1]);
             if(data.remaining === 0) {
                drawBtn.disabled = true;
                if(computerPoint > myPoint){
                    warEl.textContent = "The computer won the game!";
                } else if(computerPoint < myPoint){
                    warEl.textContent = "You won the game!";
                } else {
                    warEl.textContent = "It's a tie!"
                }
            }
            
        })
})

function winner(card1, card2){
    const valueOptions = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];
    const card1Index = valueOptions.indexOf(card1.value);
    const card2Index = valueOptions.indexOf(card2.value);
    if(card1Index > card2Index){
        computerPoint++;
        computerScore.innerHTML = `Computer Score: ${computerPoint}`;
        return `Computer Wins!`;
    } else if(card1Index < card2Index){
        myPoint++;
        myScore.innerHTML = `Your Score: ${myPoint}`;
        return `You Win!`;
    } else {
        return `War!`;
    }
}