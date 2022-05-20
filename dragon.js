import { getInputDirection } from "./movement.js"

export const DRAGON_SPEED = 7
const dragonBody = [{ x: 11, y: 11 }]
let newSegments = 0

export function update() {
  addSegments()

  const inputDirection = getInputDirection()
  for (let i = dragonBody.length - 2; i >= 0; i--) {
    dragonBody[i + 1] = { ...dragonBody[i] }
  }

  dragonBody[0].x += inputDirection.x
  dragonBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
  dragonBody.forEach(segment => {
    const dragonElement = document.createElement('div')
    dragonElement.style.gridRowStart = segment.y
    dragonElement.style.gridColumnStart = segment.x
    dragonElement.classList.add('dragon')
    gameBoard.appendChild(dragonElement)
  })
}

export function expandDragon(amount) {
  newSegments += amount
}

export function onDragon(position, { ignoreHead = false } = {}) {
  return dragonBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false
    return equalPositions(segment, position)
  })
}

export function getDragonHead() {
  return dragonBody[0]
}

export function dragonIntersection() {
  return onDragon(dragonBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    dragonBody.push({ ...dragonBody[dragonBody.length - 1] })
  }

  newSegments = 0
}