const group = ['clubs', 'diamonds', 'spades', 'hearts']
const card = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'ace', 'jack', 'king', 'queen']
const cardsArr = group.map((gp)=>card.map((value)=>{return{
    group:gp,
    face:value,
    id:`${value} of ${gp}`,
}}))
const cards = [].concat(...cardsArr)
console.log(cards)