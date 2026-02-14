import Phaser from 'phaser'
import MainScene from './scenes/MainScene.js'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#222',
  parent: 'game',
  scene: [MainScene]
}

window.addEventListener('load', () => {
  new Phaser.Game(config)
})
