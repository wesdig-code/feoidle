import Phaser from 'phaser'

export default class OrnateButton extends Phaser.GameObjects.Container {
  constructor(scene, label, x, y, width, height, options = {}) {
    super(scene, x, y)

    this.label = label
    this.width = width
    this.height = height

    const textureKey = this.constructor.ensureTexture(scene, width, height)
    const image = scene.add.image(0, 0, textureKey)
    const text = scene.add.text(0, 0, label, {
      fontFamily: options.fontFamily || 'Georgia, serif',
      fontSize: options.fontSize || '24px',
      color: options.textColor || '#f4e1b5',
      stroke: options.textStroke || '#2b120a',
      strokeThickness: options.textStrokeThickness ?? 4
    }).setOrigin(0.5)

    this.add([image, text])
    this.setSize(width, height)
    this.setInteractive(new Phaser.Geom.Rectangle(-width / 2, -height / 2, width, height), Phaser.Geom.Rectangle.Contains)

    this.on('pointerover', () => {
      image.setTint(0xf2c98d)
      scene.tweens.add({ targets: this, scale: 1.03, duration: 120 })
    })
    this.on('pointerout', () => {
      image.clearTint()
      scene.tweens.add({ targets: this, scale: 1.0, duration: 120 })
    })

    scene.add.existing(this)
  }

  static ensureTexture(scene, width, height) {
    const key = `btn-ornate-${width}x${height}`
    if (scene.textures.exists(key)) {
      return key
    }

    const tex = scene.textures.createCanvas(key, width, height)
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
    return key
  }
}
