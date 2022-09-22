/**
 * Смена стопки карты при перетаскивании
 * @param cards {[]} - массив карт
 * @param changedCard {Object} - изменяемая карта
 * @param newStack {string} - идентификатор новой стопки
 * @returns {Object[]|undefined} - новый массив карт
 */
export function dropCard(cards, changedCard, newStack) {
    if (newStack.includes("Store") || !changedCard.shown) return
    const final = newStack.includes('final')
    const bottomCardFace = final ? "ace" : "king"
    const newCards = Array.from(cards)
    const cardIndex = newCards.findIndex((c) => c.id === changedCard.id)
    //если карта не найдена
    if (cardIndex === -1) return
    //старая стопка карт (откуда перетаскиваем)
    const oldCardStack = newCards.filter(c => c.stack === changedCard.stack)
    //новая стопка карт (куда перетаскиваем)
    const newCardStack = newCards.filter(c => c.stack === newStack)
    //нижняя карта в новой стопке
    const lastCard = newCardStack[newCardStack.length - 1]
    /*не совершаем перетаскивание в следующих случаях:
     1. стопка пустая И перетаскивания карта НЕ король;
     2. цвет перетаскиваемой карты совпадает с цветом нижней карты в новой стопке (если стопки "финальные" - проверка на совпадение масти);
     3. перетаскиваемая карта по значению НЕ меньше на 1 по сравнению с нижней картой в новой стопке;
    */
    const emptyStack = !lastCard && changedCard.face !== bottomCardFace
    const cardPriority = final ? changedCard.priority - lastCard?.priority !== 1 && changedCard.group !== lastCard?.group : lastCard?.priority - changedCard.priority !== 1
    const cardColor = final ? changedCard.group !== lastCard?.group : changedCard.color === lastCard?.color
    if (lastCard && (cardColor || cardPriority) || emptyStack) return

    const oldCardStackIndex = oldCardStack.findIndex(c => c.id === changedCard.id)
    const cardArr = oldCardStack.slice(oldCardStackIndex)
    for (const item of cardArr) {
        const itemIndex = newCards.findIndex(c => c.id === item.id)
        newCards.splice(itemIndex, 1)
        item.stack = newStack
    }
    return newCards.concat(cardArr)
}

/**
 * Клик на верхние левые стопки
 * @param cards {Object[]} - массив карт
 * @param stack {string} - какая стопка кликается
 * @returns {Object[]} - новый массив карт
 */
export function clickOnStore(cards, stack) {
    if (stack === "hiddenStore") {
        const newCards = Array.from(cards)
        const card = newCards.filter(c => c.stack === stack).at(-1)
        if (card) {
            card.stack = "shownStore"
            const cardIndex = newCards.findIndex(c => c.id === card.id)
            newCards.splice(cardIndex, 1)
            return [...newCards, card]
        } else {
            const shownStore = newCards.filter(c => c.stack === 'shownStore').reverse()
            for (const item of shownStore) {
                const cardIndex = newCards.findIndex(c => c.id === item.id)
                item.shown = false
                item.stack = 'hiddenStore'

                newCards.splice(cardIndex, 1)
            }
            return newCards.concat(shownStore)
        }
    }
}

export function doubleClick(cards, card, last) {
    //addOtherCards(cards)
    //не работает на скрытые карты и карты в "финальных" стопках
    if (!card.shown || card.stack.includes("final") || !last) return
    const newCards = Array.from(cards)
    //находим финальную стопку с нужной мастью
    const finalGroup = newCards.filter((c) => c.stack.includes('final') && c.group === card.group)
    const cardIndex = newCards.findIndex((c) => c.id === card.id)
    //если под эту масть не выбрана ещё стопка
    if (finalGroup.length === 0) {
        if (card.face !== "ace") return
        const index = [1, 2, 3, 4].reduce((previousValue, nextValue) => {
            if (newCards.filter((c) => c.stack === `final-${previousValue}`).length === 0)
                return previousValue
            else return nextValue
        })
        card.stack = `final-${index}`
    } else {
        //если карта не подходит по "значению"
        if (card.priority - finalGroup.at(-1).priority !== 1) return
        card.stack = finalGroup[0].stack
    }
    newCards.splice(cardIndex, 1)
    return [...newCards, card]
}
//TODO:добавить автоматическкую сортировку
function addOtherCards(cards) {
    const newCards = Array.from(cards)
    const [first, second, third, fourth] = [1, 2, 3, 4].map(num => newCards.filter(c => c.stack === `final-${num}`))
    const shownNotFinalCards = newCards.filter(c => c.shown && !c.stack.includes('final'))
}