import './App.scss';
import React, {useContext, useState} from "react";
import CardStack from "./components/CardStack";
import {CONST_NUMBER_OF_STACKS, group,} from "./Constants";
import {CardsContext, gameStart} from "./GameStart";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from "react-dnd-touch-backend";
import {usePreview} from "react-dnd-preview";

const MyPreview = () => {
    const {display,  item, style} = usePreview()
    const {cards} = useContext(CardsContext)
    if (!display) {
        return null
    }
    const draggedCards = cards.filter((c) => c.stack === item.stack && c.priority <= item.priority && c.shown)
    return (
        <ul className="item-list__item preview" style={style}>
            {draggedCards.map((c, index) => (
                <li key={index} className={`card-${index}`}>
                    <img src={c.src} alt={c.id} width={c.width} height={c.height}/>
                </li>
            ))}
        </ul>
    )
}

export default function App() {
    const [cards, setCards] = useState(gameStart())
    const [history, setHistory] = useState([])
    const value = {cards, setCards, history, setHistory}
    const backend = navigator.maxTouchPoints === 0 ? HTML5Backend : TouchBackend

    /*function undoLastDrag(e) {
        if (e.keyCode === 90 && e.ctrlKey && history.length > 0) {
            setCards(history.at(-1))
            history.splice(-1)
            setHistory(history)
        }
    }

    document.onkeydown = undoLastDrag*/
    return (
        <>
            <DndProvider backend={backend}>
                <CardsContext.Provider value={value}>
                    <div className="App">
                        <div className="top">
                            <div className="store">
                                <CardStack stack={"hiddenStore"}/>
                                <CardStack stack={'shownStore'}/>
                            </div>
                            <div className="group-stack">
                                {group.map((gp, index) => (
                                    <CardStack key={index} stack={`final-` + (index + 1)}/>
                                ))}
                            </div>
                        </div>
                        <hr/>
                        <div className="bottom">
                            {Array(CONST_NUMBER_OF_STACKS).fill(null).map((value, index) => (
                                <CardStack key={index} stack={`${index + 1}-stack`}/>
                            ))}
                        </div>
                    </div>
                    <MyPreview/>
                </CardsContext.Provider>
            </DndProvider>
            <footer>Version: {process.env.REACT_APP_VERSION}</footer>
        </>
    )
}


