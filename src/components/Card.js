import {cardsPath} from "../App";

export function Card(props) {
    const card = props.card
    const src = props.last ? card.src : `${cardsPath}/Card_back.svg`
    const cardStyle = {
        position: 'absolute',
        top: `${props.index * 20}px`,
    }
    const className = `card ${props.last ? "last" : ""}`
    return (
        <img draggable={true}
             onDragStart={(e) => {
                 e.preventDefault();
                 console.log('dragStart', e)
             }}
             className={className} src={src} alt={card.id}
             width={card.width} height={card.height} style={cardStyle}/>
    )
}