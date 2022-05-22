import { update as updateDragon, draw as drawDragon, DRAGON_SPEED, getDragonHead, dragonIntersection } from './dragon.js'
import { update as updateKnight, draw as drawKnight } from './knight.js'
import { outsideGrid } from './grid.js'


alert("You are the dragon. Protect the castle from all invaders. Press the Arrow Keys to begin.");

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
  if (gameOver) {
    if (confirm('GAME OVER. Press OK to start a New Game.')) {
      window.location = '/'
    }
    return
  }


  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / DRAGON_SPEED) return


  lastRenderTime = currentTime

  update()
  draw()
}

window.requestAnimationFrame(main)

function update() {
  updateDragon()
  updateKnight()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawDragon(gameBoard)
  drawKnight(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getDragonHead()) || dragonIntersection()
}
