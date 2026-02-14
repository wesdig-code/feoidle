import Phaser from 'phaser'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene')
  }

  create() {
    const g = this.add.graphics()
    g.fillStyle(0x6b4423, 1)
    g.fillRect(300, 220, 200, 200)

    this.add.text(320, 280, 'Feoidle', { fontFamily: 'Arial', fontSize: '36px', color: '#ffffff' })

    this.add.text(10, 10, 'Feoidle — Phaser starter\nPress space to gain XP (placeholder)', { fontFamily: 'Arial', fontSize: '14px', color: '#ffffff' })

    this.input.keyboard.on('keydown-SPACE', () => {
      this.cameras.main.flash(200, 100, 100, 100)
    })
  }
}
