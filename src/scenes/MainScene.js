import Phaser from 'phaser'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene')
  }

  create() {
    const w = this.scale.width
    const h = this.scale.height

    this.cameras.main.setBackgroundColor(0x131313)

    const g = this.add.graphics()
    const gold = 0xd6b074
    const dark = 0x1b1b1b
    const panel = 0x2a1b16
    const panelLight = 0x3a261f
    const parchment = 0xc3a982

    const drawPanel = (x, y, width, height) => {
      g.fillStyle(panel, 1)
      g.fillRect(x, y, width, height)
      g.lineStyle(3, gold, 1)
      g.strokeRect(x + 1, y + 1, width - 2, height - 2)
      g.lineStyle(1, 0x0c0c0c, 1)
      g.strokeRect(x + 6, y + 6, width - 12, height - 12)
    }

    const drawSlot = (x, y, size) => {
      g.fillStyle(panelLight, 1)
      g.fillRect(x, y, size, size)
      g.lineStyle(2, gold, 1)
      g.strokeRect(x + 1, y + 1, size - 2, size - 2)
    }

    // Top bar
    drawPanel(20, 20, w - 40, 90)
    this.add.text(w / 2, 65, 'INVENTORY', {
      fontFamily: 'Georgia, serif',
      fontSize: '28px',
      color: '#f4e1b5',
      stroke: '#2b120a',
      strokeThickness: 4
    }).setOrigin(0.5)

    // Left stats panel
    const leftX = 20
    const leftY = 120
    const leftW = 220
    const leftH = 430
    drawPanel(leftX, leftY, leftW, leftH)

    const statText = [
      'Level: 70 (2647)',
      'Strength: 77',
      'Dexterity: 1039',
      'Intelligence: 21,620',
      'Vitality: 6177',
      '',
      'Damage: 4,897,302',
      'Toughness: 24,393,004',
      'Recovery: 1,187,535'
    ]

    this.add.text(leftX + 16, leftY + 18, statText.join('\n'), {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#e6d9c2',
      lineSpacing: 8
    })

    // Center parchment (character silhouette)
    const paperX = leftX + leftW + 20
    const paperY = leftY
    const paperW = 320
    const paperH = 430
    g.fillStyle(parchment, 1)
    g.fillRect(paperX, paperY, paperW, paperH)
    g.lineStyle(2, 0x6d4c2f, 1)
    g.strokeRect(paperX + 2, paperY + 2, paperW - 4, paperH - 4)

    // Simple character placeholder
    g.fillStyle(0x6d4c2f, 1)
    g.fillRect(paperX + paperW / 2 - 22, paperY + 80, 44, 140)
    g.fillRect(paperX + paperW / 2 - 60, paperY + 120, 120, 30)
    g.fillRect(paperX + paperW / 2 - 30, paperY + 220, 60, 140)

    // Equipment slots (right column)
    const rightX = paperX + paperW + 20
    const rightY = leftY
    const rightW = 220
    const rightH = 430
    drawPanel(rightX, rightY, rightW, rightH)

    const slotSize = 56
    const slotGap = 10
    let slotY = rightY + 20
    for (let i = 0; i < 6; i++) {
      drawSlot(rightX + 20, slotY, slotSize)
      drawSlot(rightX + 20 + slotSize + slotGap, slotY, slotSize)
      slotY += slotSize + slotGap
    }

    // Bottom inventory grid
    const gridX = 20
    const gridY = leftY + leftH + 20
    const gridW = w - 40
    const gridH = h - gridY - 20
    drawPanel(gridX, gridY, gridW, gridH)

    const cols = Math.floor((gridW - 40) / 54)
    const rows = Math.floor((gridH - 40) / 54)
    const startX = gridX + 20
    const startY = gridY + 20

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        drawSlot(startX + c * 54, startY + r * 54, 48)
      }
    }

    // Footer hint
    this.add.text(w - 24, h - 16, 'Gold: 134,211,268,538', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#e6d9c2'
    }).setOrigin(1, 1)
  }
}
