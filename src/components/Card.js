import {cardsPath, DraggableTypes} from "../Constants";
import {useContext, useEffect} from "react";
import {CardsContext} from "../GameStart";
import {useDrag} from "react-dnd";
import {doubleClick} from "../utilityFunctions";
import {getEmptyImage} from "react-dnd-html5-backend";


export function Card(props) {

    const {cards, setCards} = useContext(CardsContext)
    const card = cards.find((card) => card.id === props.id)
    if (props.last && card.stack !== "hiddenStore") card.shown = true
    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: DraggableTypes.CARD,
        item: card,
        isDragging: (monitor) => {
            if (monitor.getItem().stack !== card.stack || monitor.getItem().priority < card.priority || !card.shown) return
            /*const stack = monitor.getItem().stack
            const stackArr = cards.filter(c => c.stack === card.stack)
            const cardIndex = stackArr.findIndex(c => c.id === card.id)
            console.log(stackArr.filter((c, index) => index >= cardIndex))
            return stackArr.filter((c, index) => index >= cardIndex)*/
            return cards.filter(c => c.stack === monitor.getItem().stack && c.shown && c.priority <= monitor.getItem().priority)
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        }),
    }), [])
    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true})
    }, [])
    const src = card.shown ? card.src : `${cardsPath}/Card_back.svg`
    const className = `card-${props.index}${props.last ? " last " : ""}${isDragging ? " drag " : ""}${card.shown ? " shown " : ""}${card.stack.includes('final') || card.stack.includes("Store") ? " final " : ""}`
    return (
        <>
            <li onClick={(e) => {
                e.preventDefault()
                if (e.detail === 2) {
                    const newCards = doubleClick(cards, card, props.last)
                    if (newCards)
                        setCards(newCards)
                }
            }}
                className={className} ref={drag} draggable={false}>
                <img src={src} alt={card.id} width={card.width} height={card.height}/>
            </li>

        </>
    )
}