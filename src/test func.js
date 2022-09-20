const group = ['clubs', 'diamonds', 'spades', 'hearts']
const card = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'ace', 'jack', 'king', 'queen']
//путь к .svg файлам с картами
const cardsPath = `${process.env.PUBLIC_URL}/cards`

const cardsArr = group.map((gp) => card.map((value) => {
    return {
        group: gp,
        face: value,
        id: `${value} of ${gp}`,
        src: cardsPath + `/${value}_of_${gp}.svg`,
        shown: false,
        stack: ""
    }
}))
const cards = [].concat(...cardsArr)
//напишем функцию перемешивания всех карт
function shuffle() {
    let m = cards.length, t, i
    while (m) {
        i = Math.floor(Math.random() * m--)
        t = cards[m]
        cards[m] = cards[i]
        cards[i] = t
    }

    return cards
}
shuffle().slice(0,27).every(card=>{

})
function createRepetitiveNumber(number){
    return [].concat(...Array(7).fill(null).map((value,index)=>Array(index+1).fill(index+1)))
}
console.table(createRepetitiveNumber(7))