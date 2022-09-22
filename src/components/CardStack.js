import '../App.scss'
import {Card} from "./Card";
import {useContext} from "react";
import {CardsContext} from "../GameStart";
import {useDrop} from "react-dnd";
import {DraggableTypes} from "../Constants";
import {dropCard, clickOnStore} from "../utilityFunctions";


export default function CardStack(props) {
    const stack = props.stack
    const {cards, setCards, history, setHistory} = useContext(CardsContext)
    const cardsFiltered = stack ? cards.filter((card) => card.stack === stack) : []
    const [, drop] = useDrop(() => ({
        accept: DraggableTypes.CARD, drop: (card) => {
            const newCards = dropCard(cards, card, stack)
            if (newCards) {
                setHistory([...history, cards])
                setCards(newCards)
            }
        }, collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }), cards)
    const className = `shown stack ${cardsFiltered.length === 0 ? "empty" : ""} ${stack.includes("final") || stack.includes('Store') ? "final" : ""}`
    const lastIndex = cardsFiltered.length - 1
    return (
        <ul onClick={() => {
            const newCards = clickOnStore(cards, stack)
            if (newCards)
                setCards(newCards)

        }}
            className={className} ref={drop}>
            {cardsFiltered.map((card, index) => <Card key={card.id} last={index === lastIndex} index={index}
                                                      id={card.id}/>)}
        </ul>)
}