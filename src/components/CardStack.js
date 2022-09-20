import '../App.scss'
import {Card} from "./Card";
import {useContext} from "react";
import {CardsContext} from "../GameStart";
import {useDrop} from "react-dnd";
import {DraggableTypes, group} from "../Constants";


export default function CardStack(props) {
    const stack = props.stack
    const {cards, setCards, history, setHistory} = useContext(CardsContext)
    const cardsFiltered = stack ? cards.filter((card) => card.stack === stack) : []
    const [, drop] = useDrop(() => ({
        accept: DraggableTypes.CARD, drop: (card) => {
            //запретить перетаскивание в левую верхнюю стопку и если карта ещё не была открыта
            if (stack.includes("Store") || !card.shown) return
            const final = group.includes(stack)
            const bottomCardFace = final ? "ace" : "king"
            const realStack = final ? card.group : stack
            const newCards = Array.from(cards)
            const cardIndex = newCards.findIndex((c) => c.id === card.id)
            //если карта не найдена
            if (cardIndex === -1) return
            //старая стопка карт (откуда перетаскиваем)
            const oldCardStack = newCards.filter(c => c.stack === card.stack)
            //новая стопка карт (куда перетаскиваем)
            const newCardStack = newCards.filter(c => c.stack === realStack)
            //нижняя карта в новой стопке
            const lastCard = newCardStack[newCardStack.length - 1]
            /*не совершаем перетаскивание в следующих случаях:
             1. стопка пустая И перетаскивания карта НЕ король;
             2. цвет перетаскиваемой карты совпадает с цветом нижней карты в новой стопке (если стопки "финальные" - проверка на совпадение масти);
             3. перетаскиваемая карта по значению НЕ меньше на 1 по сравнению с нижней картой в новой стопке;
            */
            const emptyStack = !lastCard && card.face !== bottomCardFace
            const cardPriority = final ? card.priority - lastCard?.priority !== 1 : lastCard?.priority - card.priority !== 1
            const cardColor = final ? card.group !== lastCard?.group : card.color === lastCard?.color
            console.log(emptyStack, cardPriority, cardColor, bottomCardFace)
            if (lastCard && (cardColor || cardPriority) || emptyStack) return
            const oldCardStackIndex = oldCardStack.findIndex(c => c.id === card.id)
            const cardArr = oldCardStack.slice(oldCardStackIndex)
            for (const item of cardArr) {
                const itemIndex = newCards.findIndex(c => c.id === item.id)
                newCards.splice(itemIndex, 1)
                item.stack = stack
            }
            setHistory([...history, cards])
            setCards(newCards.concat(cardArr))
        }, collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }), cards)
    const className = `shown stack ${cardsFiltered.length === 0 ? "empty" : ""} ${group.includes(stack) || stack.includes('Store') ? "final" : ""}`
    const lastIndex = cardsFiltered.length - 1
    return (
        <ul onClick={() => {
            if (stack === "hiddenStore") {
                const newCards = Array.from(cards)
                const card = newCards.filter(c => c.stack === stack).at(-1)
                if (card) {
                    card.stack = "shownStore"
                    const cardIndex = newCards.findIndex(c => c.id === card.id)
                    newCards.splice(cardIndex, 1)
                    setHistory([...history, cards])
                    setCards([...newCards, card])
                } else {
                    const shownStore = newCards.filter(c => c.stack === 'shownStore').reverse()
                    for (const item of shownStore) {
                        const cardIndex = newCards.findIndex(c => c.id === item.id)
                        item.shown = false
                        item.stack = 'hiddenStore'

                        newCards.splice(cardIndex, 1)
                    }
                    setHistory([...history, cards])
                    setCards(newCards.concat(shownStore))
                }
            }
        }}
            className={className} ref={drop}>
            {cardsFiltered.map((card, index) => <Card key={card.id} last={index === lastIndex} index={index}
                                                      id={card.id}/>)}
        </ul>)
}