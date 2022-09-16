import '../App.css'
import {CONST_CARD_HEIGHT, CONST_CARD_WIDTH} from "../App";
import {Card} from "./Card";

export default function CardStack(props) {
    const cards = props.cards
    console.log(cards)
    const emptyStackStyle = {
        width: CONST_CARD_WIDTH + "px",
        height: CONST_CARD_HEIGHT + "px"

    }
    const lastIndex = cards.length - 1
    return (<div
        onDragEnd={(e) => console.log('onDragEnd', e)}
        className="shown stack" style={emptyStackStyle}>
        {
            cards.map((card, index) => <Card key={card.id} card={card} last={index === lastIndex} index={index}/>)
        }
    </div>)
}