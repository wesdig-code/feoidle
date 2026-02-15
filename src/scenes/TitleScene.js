import Phaser from 'phaser'
import OrnateButton from '../ui/OrnateButton.js'

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene')
  }

  create() {
    const w = this.scale.width
    const h = this.scale.height

    // Solid background color
    this.cameras.main.setBackgroundColor(0x131313)

    // Title
    const title = this.add.text(w/2, h*0.28, 'Feoidle', {
      fontFamily: 'Georgia, serif',
      fontSize: '72px',
      color: '#f4ecd8',
      stroke: '#0b0b0b',
      strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5)

    // Subtitle / tagline
    this.add.text(w/2, h*0.38, 'An incremental medieval fantasy', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#e6d9c2'
    }).setOrigin(0.5)

    const startGame = () => {
      // (future) reset save state here if needed
      this.cameras.main.fadeOut(300, 20, 10, 30)
      this.time.delayedCall(320, () => this.scene.start('MainScene'))
    }

    const primaryBtn = new OrnateButton(this, 'Nouvelle partie', w/2, h/2, 380, 78)
    primaryBtn.on('pointerdown', startGame)

    // Keyboard start (Enter/Space)
    this.input.keyboard.once('keydown-ENTER', startGame)
    this.input.keyboard.once('keydown-SPACE', startGame)

    // ambient embers removed: Phaser particle API changed causing runtime error
    // (If desired later, re-add particles using a compatible texture or updated API.)
    // Press hint
    this.add.text(w/2, h*0.86, 'Press ENTER or click Nouvelle partie', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#cfc6b0'
    }).setOrigin(0.5)
  }
}
