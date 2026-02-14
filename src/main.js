import Phaser from 'phaser'
import TitleScene from './scenes/TitleScene.js'
import MainScene from './scenes/MainScene.js'

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#222',
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight
  },
  scene: [TitleScene, MainScene]
}

new Phaser.Game(config)
