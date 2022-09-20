import React from "react";
import {CONST_CARD_HEIGHT, CONST_CARD_WIDTH, CONST_NUMBER_OF_STACKS,group,card,cardsPath} from "./Constants";
/**Начало игры
* Включает в себя создание колоды, перемешивание колоды, а затем распределение карт по стопкам
* @return{Object[]} */
export function gameStart() {
    //создаём колоду карт, проходя по всем значениям
    const cards = [].concat(...group.map((gp) => card.map((value,index) => {
        const color = gp === 'diamonds' || gp === 'hearts' ? "red" : "black"
        return {
            priority:index,
            group: gp,
            color,
            face: value,
            id: `${value} of ${gp}`,
            src: cardsPath + `/${value}_of_${gp}.svg`,
            shown: false,
            stack: "",
            width: CONST_CARD_WIDTH,
            height: CONST_CARD_HEIGHT,
        }
    })))

    //ряд с индексами стопок для карт, стопок семь, и будет 1 карта в 1-й стопке, 2 во 2-й и т.д.
    const cardsDistribution = [].concat(...Array(CONST_NUMBER_OF_STACKS).fill(null).map((value, index) => Array(index + 1).fill(index + 1)))
    //совершаем перемешку и затем сразу совершаем распределение 28 карт по нижним стопкам
    shuffle(cards).slice(0, 28).every(card => card.stack = `${cardsDistribution.shift()}-stack`)
    //остальные карты отправляем на "склад"
    cards.slice(28).every((card => card.stack = 'hiddenStore'))
    return cards
}
/*Перемешивание карт*/
export function shuffle(array) {
    let m = array.length, t, i
    while (m) {
        i = Math.floor(Math.random() * m--)
        t = array[m]
        array[m] = array[i]
        array[i] = t
    }
    return array
}
export const CardsContext = React.createContext({
    cards:gameStart(),
    setCards:()=>{},
    history:[],
    setHistory:()=>{}
})