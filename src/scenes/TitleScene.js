import Phaser from 'phaser'

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene')
  }

  createOrnateButton(label, x, y, width, height) {
    const key = `btn-ornate-${width}x${height}`

    if (!this.textures.exists(key)) {
      const tex = this.textures.createCanvas(key, width, height)
      const ctx = tex.getContext()

      const roundRect = (cx, cy, w, h, r) => {
        ctx.beginPath()
        ctx.moveTo(cx + r, cy)
        ctx.lineTo(cx + w - r, cy)
        ctx.quadraticCurveTo(cx + w, cy, cx + w, cy + r)
        ctx.lineTo(cx + w, cy + h - r)
        ctx.quadraticCurveTo(cx + w, cy + h, cx + w - r, cy + h)
        ctx.lineTo(cx + r, cy + h)
        ctx.quadraticCurveTo(cx, cy + h, cx, cy + h - r)
        ctx.lineTo(cx, cy + r)
        ctx.quadraticCurveTo(cx, cy, cx + r, cy)
        ctx.closePath()
      }

      const grad = ctx.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0, '#6f3a22')
      grad.addColorStop(0.5, '#5a2b1b')
      grad.addColorStop(1, '#2a0f0a')

      ctx.fillStyle = grad
      roundRect(2, 2, width - 4, height - 4, 10)
      ctx.fill()

      ctx.lineWidth = 3
      ctx.strokeStyle = '#d6b074'
      roundRect(2, 2, width - 4, height - 4, 10)
      ctx.stroke()

      ctx.lineWidth = 2
      ctx.strokeStyle = '#3c1c12'
      roundRect(6, 6, width - 12, height - 12, 8)
      ctx.stroke()

      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(255, 225, 180, 0.35)'
      roundRect(8, 8, width - 16, height - 18, 7)
      ctx.stroke()

      ctx.fillStyle = '#d6b074'
      const rivet = (rx, ry) => {
        ctx.beginPath()
        ctx.arc(rx, ry, 2.5, 0, Math.PI * 2)
        ctx.fill()
      }
      rivet(16, 16)
      rivet(width - 16, 16)
      rivet(16, height - 16)
      rivet(width - 16, height - 16)

      // subtle inner shadow band
      ctx.globalAlpha = 0.2
      ctx.fillStyle = '#000000'
      roundRect(10, height - 18, width - 20, 8, 4)
      ctx.fill()
      ctx.globalAlpha = 1

      tex.refresh()
    }

    const btn = this.add.container(x, y)
    const img = this.add.image(0, 0, key)
    const text = this.add.text(0, 0, label, {
      fontFamily: 'Georgia, serif',
      fontSize: '24px',
      color: '#f4e1b5',
      stroke: '#2b120a',
      strokeThickness: 4
    }).setOrigin(0.5)

    btn.add([img, text])
    btn.setSize(width, height)
    btn.setInteractive(new Phaser.Geom.Rectangle(-width/2, -height/2, width, height), Phaser.Geom.Rectangle.Contains)

    btn.on('pointerover', () => {
      img.setTint(0xf2c98d)
      this.tweens.add({ targets: btn, scale: 1.03, duration: 120 })
    })
    btn.on('pointerout', () => {
      img.clearTint()
      this.tweens.add({ targets: btn, scale: 1.0, duration: 120 })
    })

    return btn
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

    const primaryBtn = this.createOrnateButton('Nouvelle partie', w/2, h/2, 380, 78)
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
