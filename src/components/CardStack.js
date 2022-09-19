import '../App.scss'
import {Card} from "./Card";
import {useContext} from "react";
import {CardsContext} from "../GameStart";
import {Draggable, Droppable} from "react-beautiful-dnd";

export default function CardStack(props) {
    const stack = props.stack
    const {cards} = useContext(CardsContext)
    const cardsFiltered = stack ? cards.filter((card) => card.stack === stack) : []
    const className = cardsFiltered.length > 0 ? "shown stack" : "shown stack empty"
    const lastIndex = cardsFiltered.length - 1
    return (<Droppable droppableId={props.stack}>{
        (provided,snapshot) => {
            console.log(snapshot);
            return (
                <ul {...provided.droppableProps} ref={provided.innerRef} className={className}>
                    {
                        cardsFiltered.map((card, index) =>
                            <Draggable isDragDisabled={index !== cardsFiltered.length - 1} key={card.id}
                                       draggableId={card.id} index={index}>
                                {(provided,snapshot) => (
                                    <Card provided={provided} snapshot={snapshot} key={card.id} last={index === lastIndex} index={index}
                                          id={card.id}/>
                                )}
                            </Draggable>)
                    }
                    {provided.placeholder}
                </ul>
            )
        }}
    </Droppable>)
}