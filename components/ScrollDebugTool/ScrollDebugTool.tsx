'use client'

import React, { useState, useEffect } from 'react'
import { useScrollDebug, calculateTransform, AnimationConfig } from '@/components/ScrollDebugContext/ScrollDebugContext'
import styles from './ScrollDebugTool.module.css'

export function ScrollDebugTool() {
  const {
    configs,
    updateConfig,
    isDebugMode,
    selectedElementId,
    setSelectedElementId,
    currentScrollY,
    highlightElement,
    unhighlightElement,
    highlightedElementId
  } = useScrollDebug()

  const [isMinimized, setIsMinimized] = useState(false)
  const [showLivePreview, setShowLivePreview] = useState(true)

  const selectedConfig = selectedElementId ? 
    configs.find(c => c.id === selectedElementId) : 
    configs[0]

  const handleElementSelect = (elementId: string) => {
    setSelectedElementId(elementId)
    highlightElement(elementId)
  }

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

  const scrollToElement = (elementId: string) => {
    const element = document.querySelector(`[data-debug-id="${elementId}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      highlightElement(elementId)
    }
  }

  if (!isDebugMode) return null

  const selected = selectedConfig || configs[0]
  const currentTransform = calculateTransform(selected, currentScrollY)

  return (
    <div className={`${styles.debugTool} ${isMinimized ? styles.minimized : ''}`}>
      <div className={styles.header}>
        <h3>Live Scroll Debug</h3>
        <div className={styles.scrollInfo}>
          Scroll: {currentScrollY.toFixed(0)}px
        </div>
        <div className={styles.headerControls}>
          <button 
            className={styles.toggleBtn}
            onClick={() => setShowLivePreview(!showLivePreview)}
            title="Toggle Live Preview"
          >
            {showLivePreview ? '👁️' : '👁️‍🗨️'}
          </button>
          <button 
            className={styles.minimizeBtn}
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? '▲' : '▼'}
          </button>
          <button 
            className={styles.closeBtn}
            onClick={() => unhighlightElement()}
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
              value={selectedElementId || ''} 
              onChange={(e) => handleElementSelect(e.target.value)}
            >
              <option value="">Select element...</option>
              {configs.map(config => (
                <option key={config.id} value={config.id}>
                  {config.name}
                </option>
              ))}
            </select>
            {selectedElementId && (
              <button 
                className={styles.locateBtn}
                onClick={() => scrollToElement(selectedElementId)}
                title="Scroll to element"
              >
                📍
              </button>
            )}
          </div>

          {showLivePreview && selected && (
            <div className={styles.livePreview}>
              <strong>Live Values (Scroll: {currentScrollY}px)</strong>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ 
                    width: `${Math.max(0, Math.min(100, currentTransform.progress * 100))}%` 
                  }}
                />
                <span className={styles.progressText}>
                  {(currentTransform.progress * 100).toFixed(1)}%
                </span>
              </div>
              <div className={styles.liveValues}>
                <span>X: {currentTransform.translateX.toFixed(1)}px</span>
                <span>Y: {currentTransform.translateY.toFixed(1)}px</span>
                <span>R: {currentTransform.rotate.toFixed(1)}°</span>
              </div>
            </div>
          )}

          {selected && (
            <div className={styles.controls}>
              <div className={styles.controlGroup}>
                <label>translateX:</label>
                <div className={styles.rangeInputs}>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    value={selected.translateX[0]}
                    onChange={(e) => updateConfig(selected.id, 'translateX', [+e.target.value, selected.translateX[1]])}
                    className={styles.slider}
                  />
                  <input
                    type="number"
                    value={selected.translateX[0]}
                    onChange={(e) => updateConfig(selected.id, 'translateX', [+e.target.value, selected.translateX[1]])}
                    placeholder="Start"
                    className={styles.numberInput}
                  />
                  <span>to</span>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    value={selected.translateX[1]}
                    onChange={(e) => updateConfig(selected.id, 'translateX', [selected.translateX[0], +e.target.value])}
                    className={styles.slider}
                  />
                  <input
                    type="number"
                    value={selected.translateX[1]}
                    onChange={(e) => updateConfig(selected.id, 'translateX', [selected.translateX[0], +e.target.value])}
                    placeholder="End"
                    className={styles.numberInput}
                  />
                </div>
              </div>

              <div className={styles.controlGroup}>
                <label>translateY:</label>
                <div className={styles.rangeInputs}>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    value={selected.translateY[0]}
                    onChange={(e) => updateConfig(selected.id, 'translateY', [+e.target.value, selected.translateY[1]])}
                    className={styles.slider}
                  />
                  <input
                    type="number"
                    value={selected.translateY[0]}
                    onChange={(e) => updateConfig(selected.id, 'translateY', [+e.target.value, selected.translateY[1]])}
                    placeholder="Start"
                    className={styles.numberInput}
                  />
                  <span>to</span>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    value={selected.translateY[1]}
                    onChange={(e) => updateConfig(selected.id, 'translateY', [selected.translateY[0], +e.target.value])}
                    className={styles.slider}
                  />
                  <input
                    type="number"
                    value={selected.translateY[1]}
                    onChange={(e) => updateConfig(selected.id, 'translateY', [selected.translateY[0], +e.target.value])}
                    placeholder="End"
                    className={styles.numberInput}
                  />
                </div>
              </div>

              <div className={styles.controlGroup}>
                <label>rotate:</label>
                <div className={styles.rangeInputs}>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={selected.rotate[0]}
                    onChange={(e) => updateConfig(selected.id, 'rotate', [+e.target.value, selected.rotate[1]])}
                    className={styles.slider}
                  />
                  <input
                    type="number"
                    value={selected.rotate[0]}
                    onChange={(e) => updateConfig(selected.id, 'rotate', [+e.target.value, selected.rotate[1]])}
                    placeholder="Start"
                    className={styles.numberInput}
                  />
                  <span>to</span>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={selected.rotate[1]}
                    onChange={(e) => updateConfig(selected.id, 'rotate', [selected.rotate[0], +e.target.value])}
                    className={styles.slider}
                  />
                  <input
                    type="number"
                    value={selected.rotate[1]}
                    onChange={(e) => updateConfig(selected.id, 'rotate', [selected.rotate[0], +e.target.value])}
                    placeholder="End"
                    className={styles.numberInput}
                  />
                </div>
              </div>

              <div className={styles.controlGroup}>
                <label>startScroll:</label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={selected.startScroll}
                  onChange={(e) => updateConfig(selected.id, 'startScroll', +e.target.value)}
                  className={styles.slider}
                />
                <input
                  type="number"
                  value={selected.startScroll}
                  onChange={(e) => updateConfig(selected.id, 'startScroll', +e.target.value)}
                  className={styles.numberInput}
                />
              </div>

              <div className={styles.controlGroup}>
                <label>endScroll:</label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={selected.endScroll}
                  onChange={(e) => updateConfig(selected.id, 'endScroll', +e.target.value)}
                  className={styles.slider}
                />
                <input
                  type="number"
                  value={selected.endScroll}
                  onChange={(e) => updateConfig(selected.id, 'endScroll', +e.target.value)}
                  className={styles.numberInput}
                />
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <button onClick={copyToClipboard} className={styles.copyBtn}>
              📋 Copy All Configs
            </button>
          </div>
        </div>
      )}
    </div>
  )
}