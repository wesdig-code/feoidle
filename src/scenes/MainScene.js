import Phaser from 'phaser'
import OrnateButton from '../ui/OrnateButton.js'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene')
  }

  create() {
    /** @typedef {{ level: number, strength: number, dexterity: number, intelligence: number, vitality: number, armor: number }} PlayerStats */
    /** @type {PlayerStats} */
    const playerStats = {
      level: 1,
      strength: 1,
      dexterity: 1,
      intelligence: 1,
      vitality: 1,
      armor: 1
    }

    const w = this.scale.width
    const h = this.scale.height

    this.cameras.main.setBackgroundColor(0x131313)

    const inventoryContainer = this.add.container(0, 0)
    const invG = this.add.graphics()
    inventoryContainer.add(invG)
    const gold = 0xd6b074
    const panel = 0x2a1b16
    const panelLight = 0x3a261f

    const addInv = (obj) => {
      inventoryContainer.add(obj)
      return obj
    }

    const drawPanel = (x, y, width, height) => {
      invG.fillStyle(panel, 1)
      invG.fillRect(x, y, width, height)
      invG.lineStyle(3, gold, 1)
      invG.strokeRect(x + 1, y + 1, width - 2, height - 2)
      invG.lineStyle(1, 0x0c0c0c, 1)
      invG.strokeRect(x + 6, y + 6, width - 12, height - 12)
    }

    const drawSlot = (x, y, size) => {
      invG.fillStyle(panelLight, 1)
      invG.fillRect(x, y, size, size)
      invG.lineStyle(2, gold, 1)
      invG.strokeRect(x + 1, y + 1, size - 2, size - 2)
    }

    // Inventory column (25% width, left side)
    const margin = 20
    const colW = Math.max(240, Math.floor(w * 0.25) - margin)
    const colX = margin
    const topBarH = 70

    // Top bar (left column)
    drawPanel(colX, margin, colW, topBarH)
    addInv(this.add.text(colX + colW / 2, margin + topBarH / 2, 'INVENTORY', {
      fontFamily: 'Georgia, serif',
      fontSize: '22px',
      color: '#f4e1b5',
      stroke: '#2b120a',
      strokeThickness: 4
    }).setOrigin(0.5))

    // Left stats panel
    const leftX = colX
    const leftY = margin + topBarH + 10
    const leftW = colW
    const leftH = 300
    drawPanel(leftX, leftY, leftW, leftH)

    const statText = [
      `Level: ${playerStats.level}`,
      `Strength: ${playerStats.strength}`,
      `Dexterity: ${playerStats.dexterity}`,
      `Intelligence: ${playerStats.intelligence}`,
      `Vitality: ${playerStats.vitality}`,
      `Armor: ${playerStats.armor}`
    ]

    addInv(this.add.text(leftX + 14, leftY + 14, statText.join('\n'), {
      fontFamily: 'Arial, sans-serif',
      fontSize: '13px',
      color: '#e6d9c2',
      lineSpacing: 8
    }))

    // Bottom inventory grid
    const gridX = colX
    const gridY = leftY + leftH + 10
    const gridW = colW
    const gridH = h - gridY - margin
    drawPanel(gridX, gridY, gridW, gridH)

    const cols = Math.max(1, Math.floor((gridW - 24) / 48))
    const rows = Math.max(1, Math.floor((gridH - 24) / 48))
    const startX = gridX + 12
    const startY = gridY + 12

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        drawSlot(startX + c * 48, startY + r * 48, 44)
      }
    }

    // Inventory toggle button (bottom center)
    let inventoryVisible = true
    const toggleBtn = new OrnateButton(this, 'Inventaire', w / 2, h - 40, 220, 52, {
      fontSize: '20px'
    })
    toggleBtn.on('pointerdown', () => {
      inventoryVisible = !inventoryVisible
      inventoryContainer.setVisible(inventoryVisible)
    })

  }
}
