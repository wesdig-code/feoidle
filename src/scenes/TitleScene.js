import Phaser from 'phaser'

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

    // Start button (secondary)
    const btnW = 300
    const btnH = 56
    const btnY = h*0.7

    // Centered "Nouvelle partie" button (primary)
    const primaryBtn = this.add.rectangle(w/2, h/2, 360, 72, 0x9c7e51, 1)
      .setStrokeStyle(3, 0x345479)
      .setInteractive({ useHandCursor: true })

    const primaryText = this.add.text(w/2, h/2, 'Nouvelle partie', {
      fontFamily: 'Georgia, serif',
      fontSize: '26px',
      color: '#0b0b0b'
    }).setOrigin(0.5)

    // Slight hover effect
    primaryBtn.on('pointerover', () => this.tweens.add({ targets: primaryBtn, scale: 1.03, duration: 120 }))
    primaryBtn.on('pointerout', () => this.tweens.add({ targets: primaryBtn, scale: 1.0, duration: 120 }))

    const startGame = () => {
      // (future) reset save state here if needed
      this.cameras.main.fadeOut(300, 20, 10, 30)
      this.time.delayedCall(320, () => this.scene.start('MainScene'))
    }
    primaryBtn.on('pointerdown', startGame)
    primaryText.setInteractive({ useHandCursor: true }).on('pointerdown', startGame)

    // Secondary start button (kept for quick access)
    const secondaryBtn = this.add.rectangle(w/2, btnY, btnW, btnH, 0x9c7e51, 1)
      .setStrokeStyle(2, 0x345479)
      .setInteractive({ useHandCursor: true })

    this.add.text(w/2, btnY, 'Start Game', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      color: '#0f0f0f'
    }).setOrigin(0.5)

    secondaryBtn.on('pointerover', () => this.tweens.add({ targets: secondaryBtn, scale: 1.03, duration: 120 }))
    secondaryBtn.on('pointerout', () => this.tweens.add({ targets: secondaryBtn, scale: 1.0, duration: 120 }))
    secondaryBtn.on('pointerdown', startGame)

    // Keyboard start (Enter/Space)
    this.input.keyboard.once('keydown-ENTER', startGame)
    this.input.keyboard.once('keydown-SPACE', startGame)

    // ambient embers removed: Phaser particle API changed causing runtime error
    // (If desired later, re-add particles using a compatible texture or updated API.)
    // Press hint
    this.add.text(w/2, h*0.86, 'Press ENTER or click Start', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#cfc6b0'
    }).setOrigin(0.5)
  }
}
