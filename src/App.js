import './App.scss';
import React, {useState} from "react";
import CardStack from "./components/CardStack";
import {CONST_CARD_HEIGHT, CONST_CARD_WIDTH, CONST_NUMBER_OF_STACKS, group, cardsPath} from "./Constants";
import {CardsContext, gameStart} from "./GameStart";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from "react-dnd-touch-backend";

export default function App(props) {
    const [cards, setCards] = useState(gameStart())
    const [history, setHistory] = useState([])
    const value = {cards, setCards, history, setHistory}
    const backend = navigator.maxTouchPoints === 0 ? HTML5Backend : TouchBackend

    function undoLastDrag(e) {
        if (e.keyCode === 90 && e.ctrlKey && history.length > 0) {
            console.log(history)
            console.log(history.at(-1))
            setCards(history.at(-1))
            history.splice(-1)
            setHistory(history)
        }
    }

    document.onkeydown = undoLastDrag
    console.log(navigator.maxTouchPoints)
    return (
        <DndProvider backend={backend}>
            <CardsContext.Provider value={value}>
                <div className="App">
                    <div className="top">
                        <div className="store">
                            <CardStack stack={"hiddenStore"}/>
                            <CardStack stack={'shownStore'}/>
                        </div>
                        <div className="group-stack">
                            {group.map(gp => (
                                <CardStack key={gp} stack={gp}/>
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
            </CardsContext.Provider>
        </DndProvider>
    )
}

