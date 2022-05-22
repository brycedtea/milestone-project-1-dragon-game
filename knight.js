import { onDragon, expandDragon } from './dragon.js'
import { randomGridPosition } from './grid.js'

let knight = getRandomKnightPosition()
const EXPANSION_RATE = 2

export function update() {
  if (onDragon(knight)) {
    expandDragon(EXPANSION_RATE)
    knight = getRandomKnightPosition();
  }
}

export function draw(gameBoard) {
  const knightElement = document.createElement('div')
  knightElement.style.gridRowStart = knight.y
  knightElement.style.gridColumnStart = knight.x
  knightElement.classList.add('knight')
  gameBoard.appendChild(knightElement)
}

function getRandomKnightPosition() {
  let newKnightPosition
  while (newKnightPosition == null || onDragon(newKnightPosition)) {
    newKnightPosition = randomGridPosition()
  }
  return newKnightPosition
}