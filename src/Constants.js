export const group = ['clubs', 'diamonds', 'spades', 'hearts']
export const card = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'ace', 'jack', 'king', 'queen']
//путь к .svg файлам с картами
export const cardsPath = `${process.env.PUBLIC_URL}/cards`
//общее число карт
export const CONST_TOTAL_NUMBER_OF_CARDS = 78
//соотношение высоты карты к ширину (посчитано через св-ва .svg файла)
export const CONST_CARD_HEIGHT_TO_WIDTH_RATIO = 1.45
//высота карты
export const CONST_CARD_HEIGHT = 200
//ширина карты
export const CONST_CARD_WIDTH = CONST_CARD_HEIGHT / CONST_CARD_HEIGHT_TO_WIDTH_RATIO;
//кол-во стопок внизу
export const CONST_NUMBER_OF_STACKS = 7