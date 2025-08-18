'use client'

import React, { useState, useEffect } from 'react'
import styles from './ScrollDebugTool.module.css'

interface AnimationConfig {
  id: string
  name: string
  translateX: [number, number]
  translateY: [number, number]
  rotate: [number, number]
  startScroll: number
  endScroll: number
}

const DEFAULT_CONFIGS: AnimationConfig[] = [
  {
    id: 'digital-products',
    name: 'Digital Products',
    translateX: [0, -80],
    translateY: [0, -30],
    rotate: [0, -10],
    startScroll: 200,
    endScroll: 800
  },
  {
    id: 'built-right',
    name: 'Built Right',
    translateX: [0, -60],
    translateY: [0, -20],
    rotate: [0, -5],
    startScroll: 200,
    endScroll: 800
  },
  {
    id: 'delivered-fast',
    name: 'Delivered Fast',
    translateX: [0, -50],
    translateY: [0, -10],
    rotate: [0, -3],
    startScroll: 200,
    endScroll: 800
  },
  {
    id: 'no-hidden-fees',
    name: 'No Hidden Fees',
    translateX: [0, 60],
    translateY: [0, -30],
    rotate: [0, 8],
    startScroll: 200,
    endScroll: 800
  },
  {
    id: 'no-drag-outs',
    name: 'No Drag-outs',
    translateX: [0, 80],
    translateY: [0, -20],
    rotate: [0, 10],
    startScroll: 200,
    endScroll: 800
  },
  {
    id: 'no-lock-in',
    name: 'No Lock-in',
    translateX: [0, 70],
    translateY: [0, -10],
    rotate: [0, 5],
    startScroll: 200,
    endScroll: 800
  }
]

export function ScrollDebugTool() {
  const [isVisible, setIsVisible] = useState(false)
  const [configs, setConfigs] = useState<AnimationConfig[]>(DEFAULT_CONFIGS)
  const [selectedConfig, setSelectedConfig] = useState<string>('digital-products')
  const [isMinimized, setIsMinimized] = useState(false)

  // Show only in development or when debug flag is set
  useEffect(() => {
    const showDebug = process.env.NODE_ENV === 'development' || 
                     localStorage.getItem('scroll-debug') === 'true' ||
                     window.location.search.includes('debug=scroll')
    setIsVisible(showDebug)
  }, [])

  const updateConfig = (field: keyof AnimationConfig, value: any) => {
    setConfigs(prev => prev.map(config => 
      config.id === selectedConfig 
        ? { ...config, [field]: value }
        : config
    ))
  }

  const getSelectedConfig = () => configs.find(c => c.id === selectedConfig) || configs[0]

  const copyToClipboard = () => {
    const configText = configs.map(config => `
// ${config.name}
translateX={[${config.translateX[0]}, ${config.translateX[1]}]}
translateY={[${config.translateY[0]}, ${config.translateY[1]}]}
rotate={[${config.rotate[0]}, ${config.rotate[1]}]}
startScroll={${config.startScroll}}
endScroll={${config.endScroll}}
`).join('\n')

    navigator.clipboard.writeText(configText)
    alert('Animation configs copied to clipboard!')
  }

  const resetToDefaults = () => {
    setConfigs(DEFAULT_CONFIGS)
  }

  if (!isVisible) return null

  const selected = getSelectedConfig()

  return (
    <div className={`${styles.debugTool} ${isMinimized ? styles.minimized : ''}`}>
      <div className={styles.header}>
        <h3>Scroll Animation Debug</h3>
        <div className={styles.headerControls}>
          <button 
            className={styles.minimizeBtn}
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? '▲' : '▼'}
          </button>
          <button 
            className={styles.closeBtn}
            onClick={() => setIsVisible(false)}
          >
            ×
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className={styles.content}>
          <div className={styles.elementSelector}>
            <label>Element:</label>
            <select 
              value={selectedConfig} 
              onChange={(e) => setSelectedConfig(e.target.value)}
            >
              {configs.map(config => (
                <option key={config.id} value={config.id}>
                  {config.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <label>translateX:</label>
              <div className={styles.rangeInputs}>
                <input
                  type="number"
                  value={selected.translateX[0]}
                  onChange={(e) => updateConfig('translateX', [+e.target.value, selected.translateX[1]])}
                  placeholder="Start"
                />
                <input
                  type="number"
                  value={selected.translateX[1]}
                  onChange={(e) => updateConfig('translateX', [selected.translateX[0], +e.target.value])}
                  placeholder="End"
                />
              </div>
            </div>

            <div className={styles.controlGroup}>
              <label>translateY:</label>
              <div className={styles.rangeInputs}>
                <input
                  type="number"
                  value={selected.translateY[0]}
                  onChange={(e) => updateConfig('translateY', [+e.target.value, selected.translateY[1]])}
                  placeholder="Start"
                />
                <input
                  type="number"
                  value={selected.translateY[1]}
                  onChange={(e) => updateConfig('translateY', [selected.translateY[0], +e.target.value])}
                  placeholder="End"
                />
              </div>
            </div>

            <div className={styles.controlGroup}>
              <label>rotate:</label>
              <div className={styles.rangeInputs}>
                <input
                  type="number"
                  value={selected.rotate[0]}
                  onChange={(e) => updateConfig('rotate', [+e.target.value, selected.rotate[1]])}
                  placeholder="Start"
                />
                <input
                  type="number"
                  value={selected.rotate[1]}
                  onChange={(e) => updateConfig('rotate', [selected.rotate[0], +e.target.value])}
                  placeholder="End"
                />
              </div>
            </div>

            <div className={styles.controlGroup}>
              <label>startScroll:</label>
              <input
                type="number"
                value={selected.startScroll}
                onChange={(e) => updateConfig('startScroll', +e.target.value)}
              />
            </div>

            <div className={styles.controlGroup}>
              <label>endScroll:</label>
              <input
                type="number"
                value={selected.endScroll}
                onChange={(e) => updateConfig('endScroll', +e.target.value)}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button onClick={copyToClipboard} className={styles.copyBtn}>
              📋 Copy All Configs
            </button>
            <button onClick={resetToDefaults} className={styles.resetBtn}>
              🔄 Reset to Defaults
            </button>
          </div>

          <div className={styles.preview}>
            <strong>Current Values:</strong>
            <pre className={styles.previewCode}>
{`translateX={[${selected.translateX[0]}, ${selected.translateX[1]}]}
translateY={[${selected.translateY[0]}, ${selected.translateY[1]}]}
rotate={[${selected.rotate[0]}, ${selected.rotate[1]}]}
startScroll={${selected.startScroll}}
endScroll={${selected.endScroll}}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}