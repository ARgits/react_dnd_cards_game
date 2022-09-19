import {cardsPath} from "../Constants";
import {useContext} from "react";
import {CardsContext} from "../GameStart";

export function Card(props) {
    const snapshot = props.snapshot
    const provided = props.provided
    const {cards} = useContext(CardsContext)
    const card = cards.find((card) => card.id === props.id)
    const src = props.last ? card.src : `${cardsPath}/Card_back.svg`
    const className = `card-${props.index} ${props.last ? "last" : ""}`

    function getStyle(style, snapshot) {
        if (!snapshot.isDropAnimating) return style
        return {
            ...style,
            transitionDuration: '0.001s'
        }

    }

    return (
        <li style={getStyle(provided.draggableProps.style, snapshot)} className={className}
            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <img src={src} alt={card.id}
                 width={card.width} height={card.height}/>
        </li>
    )
}