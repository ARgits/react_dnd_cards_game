import {cardsPath, DraggableTypes} from "../Constants";
import {useContext} from "react";
import {CardsContext} from "../GameStart";
import {DragPreviewImage, useDrag} from "react-dnd";

export function Card(props) {

    const {cards} = useContext(CardsContext)
    const card = cards.find((card) => card.id === props.id)
    if (props.last) card.shown = true
    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: DraggableTypes.CARD,
        item: card,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    const src = card.shown ? card.src : `${cardsPath}/Card_back.svg`
    const className = `card-${props.index} ${props.last ? "last" : ""} ${isDragging ? "drag" : ""} ${card.shown ? "shown" : ""}`
    return (
        <>
            <DragPreviewImage connect={preview} src={src}/>
            <li className={className} ref={drag}>
                <img src={src} alt={card.id} width={card.width} height={card.height}/>
            </li>
        </>
    )
}