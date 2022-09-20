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
    const [{isOver}, drop] = useDrop(() => ({
        accept: DraggableTypes.CARD,
        drop: (card) => {
            if (stack === 'shownStore' || !card.shown) return
            const bottomCardFace = group.includes(stack) ? "ace" : "king"
            if (group.includes(stack) && card.group !== stack) return
            const newCards = Array.from(cards)
            const cardIndex = newCards.findIndex((c) => c.id === card.id)
            //если карта не найдена
            if (cardIndex === -1) return
            //старая стопка карт (откуда перетаскиваем)
            const oldCardStack = newCards.filter(c => c.stack === card.stack)
            //новая стопка карт (куда перетаскиваем)
            const newCardStack = newCards.filter(c => c.stack === stack)
            //нижняя карта в новой стопке
            const lastCard = newCardStack[newCardStack.length - 1]
            /*не совершаем перетаскивание в следующих случаях:
             1. стопка пустая И перетаскивания карта НЕ король;
             2. цвет перетаскиваемой карты совпадает с цветом нижней карты в новой стопке;
             3. перетаскиваемая карта по значению НЕ меньше на 1 по сравнению с нижней картой в новой стопке;
            */
            const emptyStack = !lastCard && card.face !== bottomCardFace
            const cardPriority = group.includes(stack) ? card.priority - lastCard?.priority !== 1 : lastCard?.priority - card.priority !== 1
            const cardColor = card.color === lastCard?.color
            console.log(emptyStack, cardPriority, cardColor, bottomCardFace)
            if (lastCard && (cardColor || cardPriority) || emptyStack) return
            const oldCardStackIndex = oldCardStack.findIndex(c => c.id === card.id)
            const cardArr = oldCardStack.slice(oldCardStackIndex)
            for (const item of cardArr) {
                const itemIndex = newCards.findIndex(c => c.id === item.id)
                newCards.splice(itemIndex, 1)
                item.stack = stack
            }
            setCards(newCards.concat(cardArr))
            setHistory([...history, cards])
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }), cards)
    const className = cardsFiltered.length > 0 ? "shown stack" : "shown stack empty"
    const lastIndex = cardsFiltered.length - 1
    return (
        <ul className={className} ref={drop}>
            {cardsFiltered.map((card, index) =>
                <Card key={card.id} last={index === lastIndex} index={index}
                      id={card.id}/>)
            }
        </ul>
    )
}