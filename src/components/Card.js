import {cardsPath, DraggableTypes} from "../Constants";
import {useContext} from "react";
import {CardsContext} from "../GameStart";
import {DragPreviewImage, useDrag} from "react-dnd";
import {doubleClick} from "../utilityFunctions";

export function Card(props) {

    const {cards, setCards} = useContext(CardsContext)
    const card = cards.find((card) => card.id === props.id)
    if (props.last && card.stack !== "hiddenStore") card.shown = true
    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: DraggableTypes.CARD,
        item: card,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    const src = card.shown ? card.src : `${cardsPath}/Card_back.svg`
    const className = `card-${props.index}${props.last ? " last " : ""}${isDragging ? " drag " : ""}${card.shown ? " shown " : ""}${card.stack.includes('final') || card.stack.includes("Store") ? " final " : ""}`
    return (
        <>
            <DragPreviewImage connect={preview} src={src}/>
            <li onClick={(e) => {
                e.preventDefault()
                if (e.detail === 2) {
                    const newCards = doubleClick(cards, card, props.last)
                    if (newCards)
                        setCards(newCards)
                }
            }}
                className={className} ref={drag}>
                <img src={src} alt={card.id} width={card.width} height={card.height}/>
            </li>
        </>
    )
}