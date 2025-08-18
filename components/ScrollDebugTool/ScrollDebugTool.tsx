'use client'

import React, { useState, useEffect } from 'react'
import { useScrollDebug, calculateTransform, AnimationConfig, SectionScrollSnapConfig, GlobalScrollSnapConfig } from '@/components/ScrollDebugContext/ScrollDebugContext'
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
    highlightedElementId,
    globalScrollSnapConfig,
    sectionScrollSnapConfigs,
    updateGlobalScrollSnap,
    updateSectionScrollSnap
  } = useScrollDebug()

  const [isMinimized, setIsMinimized] = useState(false)
  const [showLivePreview, setShowLivePreview] = useState(true)
  const [showScrollSnap, setShowScrollSnap] = useState(false)
  const [showBulkEdit, setShowBulkEdit] = useState(false)
  const [selectedConfigs, setSelectedConfigs] = useState<Set<string>>(new Set())
  const [bulkStartScroll, setBulkStartScroll] = useState('')
  const [bulkEndScroll, setBulkEndScroll] = useState('')
  const [sectionPositions, setSectionPositions] = useState<Record<string, {top: number, height: number, snapPosition: number}>>({})

  // Calculate section positions and snap points
  useEffect(() => {
    if (!isDebugMode) return

    const calculateSectionPositions = () => {
      const positions: Record<string, {top: number, height: number, snapPosition: number}> = {}
      
      sectionScrollSnapConfigs.forEach(sectionConfig => {
        const element = document.querySelector(`[data-section="${sectionConfig.id}"]`)
        if (element) {
          const rect = element.getBoundingClientRect()
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const elementTop = rect.top + scrollTop
          const elementHeight = rect.height
          
          let snapPosition = elementTop
          
          // Calculate snap position based on align mode
          switch (sectionConfig.alignMode) {
            case 'start':
              snapPosition = elementTop
              break
            case 'center':
              snapPosition = elementTop + (elementHeight / 2) - (window.innerHeight / 2)
              break
            case 'end':
              snapPosition = elementTop + elementHeight - window.innerHeight
              break
          }
          
          positions[sectionConfig.id] = {
            top: Math.round(elementTop),
            height: Math.round(elementHeight),
            snapPosition: Math.round(snapPosition)
          }
        }
      })
      
      setSectionPositions(positions)
    }

    calculateSectionPositions()
    window.addEventListener('resize', calculateSectionPositions)
    
    return () => window.removeEventListener('resize', calculateSectionPositions)
  }, [isDebugMode, sectionScrollSnapConfigs])

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

  const scrollToSnapPosition = (sectionId: string) => {
    const positionData = sectionPositions[sectionId]
    if (positionData) {
      window.scrollTo({ 
        top: positionData.snapPosition, 
        behavior: 'smooth' 
      })
    }
  }

  // Bulk editing functions
  const toggleConfigSelection = (configId: string) => {
    const newSelected = new Set(selectedConfigs)
    if (newSelected.has(configId)) {
      newSelected.delete(configId)
    } else {
      newSelected.add(configId)
    }
    setSelectedConfigs(newSelected)
  }

  const selectConfigsByPattern = (pattern: string) => {
    const matchingConfigs = configs.filter(config => 
      config.id.includes(pattern) || config.name.toLowerCase().includes(pattern.toLowerCase())
    )
    const newSelected = new Set(matchingConfigs.map(config => config.id))
    setSelectedConfigs(newSelected)
  }

  const clearSelection = () => {
    setSelectedConfigs(new Set())
  }

  const applyBulkChanges = (field: 'startScroll' | 'endScroll', operation: 'set' | 'add' | 'subtract', value: number) => {
    selectedConfigs.forEach(configId => {
      const config = configs.find(c => c.id === configId)
      if (config) {
        let newValue: number
        switch (operation) {
          case 'set':
            newValue = value
            break
          case 'add':
            newValue = config[field] + value
            break
          case 'subtract':
            newValue = config[field] - value
            break
        }
        updateConfig(configId, field, Math.max(0, newValue))
      }
    })
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
            className={styles.toggleBtn}
            onClick={() => setShowScrollSnap(!showScrollSnap)}
            title="Toggle Scroll Snap Controls"
          >
            {showScrollSnap ? '⚙️' : '📐'}
          </button>
          <button 
            className={styles.toggleBtn}
            onClick={() => setShowBulkEdit(!showBulkEdit)}
            title="Toggle Bulk Edit Controls"
          >
            {showBulkEdit ? '📝' : '📋'}
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
          {/* Scroll Snap Controls */}
          {showScrollSnap && (
            <div className={styles.scrollSnapSection}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#333' }}>Scroll Snap Settings</h4>
              
              {/* Global Settings */}
              <div style={{ marginBottom: '16px', padding: '12px', background: '#f8f8f8', borderRadius: '6px' }}>
                <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#333' }}>Global Settings</h5>
                
                <div className={styles.controlGroup}>
                  <label>Enable Scroll Snap:</label>
                  <input
                    type="checkbox"
                    checked={globalScrollSnapConfig.enabled}
                    onChange={(e) => updateGlobalScrollSnap('enabled', e.target.checked)}
                    style={{ marginLeft: '8px' }}
                  />
                </div>

                <div className={styles.controlGroup}>
                  <label>Snap Type:</label>
                  <select 
                    value={globalScrollSnapConfig.type} 
                    onChange={(e) => updateGlobalScrollSnap('type', e.target.value)}
                    className={styles.select}
                    disabled={!globalScrollSnapConfig.enabled}
                  >
                    <option value="none">None</option>
                    <option value="y proximity">Y Proximity</option>
                    <option value="y mandatory">Y Mandatory</option>
                    <option value="x proximity">X Proximity</option>
                    <option value="x mandatory">X Mandatory</option>
                  </select>
                </div>

                <div className={styles.controlGroup}>
                  <label>Scroll Behavior:</label>
                  <select 
                    value={globalScrollSnapConfig.behavior} 
                    onChange={(e) => updateGlobalScrollSnap('behavior', e.target.value)}
                    className={styles.select}
                    disabled={!globalScrollSnapConfig.enabled}
                  >
                    <option value="smooth">Smooth</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>

              {/* Section-specific Settings */}
              <div style={{ marginBottom: '16px' }}>
                <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#333' }}>Section Settings</h5>
                
                {sectionScrollSnapConfigs.map((sectionConfig) => {
                  const positionData = sectionPositions[sectionConfig.id]
                  return (
                    <div key={sectionConfig.id} style={{ marginBottom: '12px', padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '500', minWidth: '80px' }}>{sectionConfig.name}:</span>
                        <input
                          type="checkbox"
                          checked={sectionConfig.enabled}
                          onChange={(e) => updateSectionScrollSnap(sectionConfig.id, 'enabled', e.target.checked)}
                          style={{ marginLeft: '8px' }}
                        />
                      </div>
                      
                      {positionData && (
                        <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px', fontFamily: 'monospace' }}>
                          Section: {positionData.top}px → {positionData.top + positionData.height}px (h: {positionData.height}px)
                          {sectionConfig.enabled && (
                            <>
                              <br/>Snaps to: <strong>{positionData.snapPosition}px</strong> ({sectionConfig.alignMode})
                              <button 
                                onClick={() => scrollToSnapPosition(sectionConfig.id)}
                                style={{ 
                                  marginLeft: '6px', 
                                  padding: '2px 4px', 
                                  fontSize: '9px', 
                                  border: '1px solid #ccc', 
                                  borderRadius: '3px', 
                                  background: '#fff', 
                                  cursor: 'pointer' 
                                }}
                                title="Scroll to snap position"
                              >
                                →
                              </button>
                            </>
                          )}
                        </div>
                      )}
                      
                      {sectionConfig.enabled && (
                        <div style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
                          <select 
                            value={sectionConfig.alignMode} 
                            onChange={(e) => updateSectionScrollSnap(sectionConfig.id, 'alignMode', e.target.value)}
                            className={styles.select}
                            style={{ fontSize: '10px', minWidth: '60px' }}
                          >
                            <option value="start">Start</option>
                            <option value="center">Center</option>
                            <option value="end">End</option>
                          </select>
                          
                          <select 
                            value={sectionConfig.stopMode} 
                            onChange={(e) => updateSectionScrollSnap(sectionConfig.id, 'stopMode', e.target.value)}
                            className={styles.select}
                            style={{ fontSize: '10px', minWidth: '60px' }}
                          >
                            <option value="normal">Normal</option>
                            <option value="always">Always</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              
              <div style={{ margin: '8px 0', padding: '8px', background: '#f5f5f5', borderRadius: '4px', fontSize: '11px' }}>
                <strong>Current CSS:</strong><br/>
                html: scroll-snap-type: {globalScrollSnapConfig.enabled ? globalScrollSnapConfig.type : 'none'}<br/>
                sections: {sectionScrollSnapConfigs.filter(s => s.enabled).length} enabled with individual settings
              </div>
            </div>
          )}

          {/* Bulk Edit Controls */}
          {showBulkEdit && (
            <div className={styles.scrollSnapSection}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#333' }}>Bulk Edit Animation Configs</h4>
              
              {/* Quick Selection Buttons */}
              <div style={{ marginBottom: '12px' }}>
                <h5 style={{ margin: '0 0 6px 0', fontSize: '12px', fontWeight: '600', color: '#333' }}>Quick Select:</h5>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  <button 
                    onClick={() => selectConfigsByPattern('process')}
                    style={{ padding: '4px 8px', fontSize: '10px', border: '1px solid #ccc', borderRadius: '4px', background: '#f8f8f8', cursor: 'pointer' }}
                  >
                    Process Cards
                  </button>
                  <button 
                    onClick={() => selectConfigsByPattern('services')}
                    style={{ padding: '4px 8px', fontSize: '10px', border: '1px solid #ccc', borderRadius: '4px', background: '#f8f8f8', cursor: 'pointer' }}
                  >
                    Services Cards
                  </button>
                  <button 
                    onClick={() => selectConfigsByPattern('why-different')}
                    style={{ padding: '4px 8px', fontSize: '10px', border: '1px solid #ccc', borderRadius: '4px', background: '#f8f8f8', cursor: 'pointer' }}
                  >
                    Why Different
                  </button>
                  <button 
                    onClick={() => selectConfigsByPattern('cta-button')}
                    style={{ padding: '4px 8px', fontSize: '10px', border: '1px solid #ccc', borderRadius: '4px', background: '#f8f8f8', cursor: 'pointer' }}
                  >
                    CTA Buttons
                  </button>
                  <button 
                    onClick={clearSelection}
                    style={{ padding: '4px 8px', fontSize: '10px', border: '1px solid #ccc', borderRadius: '4px', background: '#fee', cursor: 'pointer' }}
                  >
                    Clear ({selectedConfigs.size})
                  </button>
                </div>
              </div>

              {/* Individual Selection */}
              <div style={{ marginBottom: '12px', maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '4px', padding: '8px', background: '#f9f9f9' }}>
                <h5 style={{ margin: '0 0 6px 0', fontSize: '12px', fontWeight: '600', color: '#333' }}>Select Individual Cards:</h5>
                {configs.map(config => (
                  <label key={config.id} style={{ display: 'block', fontSize: '11px', marginBottom: '4px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedConfigs.has(config.id)}
                      onChange={() => toggleConfigSelection(config.id)}
                      style={{ marginRight: '6px' }}
                    />
                    {config.name} (start: {config.startScroll}, end: {config.endScroll})
                  </label>
                ))}
              </div>

              {/* Bulk Actions */}
              {selectedConfigs.size > 0 && (
                <div style={{ padding: '12px', background: '#f0f8ff', borderRadius: '6px', border: '1px solid #cce7ff' }}>
                  <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#333' }}>
                    Bulk Actions ({selectedConfigs.size} selected)
                  </h5>
                  
                  {/* Start Scroll Controls */}
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Start Scroll:</label>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <input
                        type="number"
                        value={bulkStartScroll}
                        onChange={(e) => setBulkStartScroll(e.target.value)}
                        placeholder="Value"
                        style={{ width: '60px', padding: '2px 4px', fontSize: '10px', border: '1px solid #ccc', borderRadius: '3px' }}
                      />
                      <button 
                        onClick={() => bulkStartScroll && applyBulkChanges('startScroll', 'set', +bulkStartScroll)}
                        style={{ padding: '2px 6px', fontSize: '10px', border: '1px solid #007acc', borderRadius: '3px', background: '#e6f3ff', cursor: 'pointer' }}
                      >
                        Set
                      </button>
                      <button 
                        onClick={() => bulkStartScroll && applyBulkChanges('startScroll', 'add', +bulkStartScroll)}
                        style={{ padding: '2px 6px', fontSize: '10px', border: '1px solid #28a745', borderRadius: '3px', background: '#e6f7e6', cursor: 'pointer' }}
                      >
                        +
                      </button>
                      <button 
                        onClick={() => bulkStartScroll && applyBulkChanges('startScroll', 'subtract', +bulkStartScroll)}
                        style={{ padding: '2px 6px', fontSize: '10px', border: '1px solid #dc3545', borderRadius: '3px', background: '#ffeaea', cursor: 'pointer' }}
                      >
                        -
                      </button>
                    </div>
                  </div>

                  {/* End Scroll Controls */}
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '500', display: 'block', marginBottom: '4px' }}>End Scroll:</label>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <input
                        type="number"
                        value={bulkEndScroll}
                        onChange={(e) => setBulkEndScroll(e.target.value)}
                        placeholder="Value"
                        style={{ width: '60px', padding: '2px 4px', fontSize: '10px', border: '1px solid #ccc', borderRadius: '3px' }}
                      />
                      <button 
                        onClick={() => bulkEndScroll && applyBulkChanges('endScroll', 'set', +bulkEndScroll)}
                        style={{ padding: '2px 6px', fontSize: '10px', border: '1px solid #007acc', borderRadius: '3px', background: '#e6f3ff', cursor: 'pointer' }}
                      >
                        Set
                      </button>
                      <button 
                        onClick={() => bulkEndScroll && applyBulkChanges('endScroll', 'add', +bulkEndScroll)}
                        style={{ padding: '2px 6px', fontSize: '10px', border: '1px solid #28a745', borderRadius: '3px', background: '#e6f7e6', cursor: 'pointer' }}
                      >
                        +
                      </button>
                      <button 
                        onClick={() => bulkEndScroll && applyBulkChanges('endScroll', 'subtract', +bulkEndScroll)}
                        style={{ padding: '2px 6px', fontSize: '10px', border: '1px solid #dc3545', borderRadius: '3px', background: '#ffeaea', cursor: 'pointer' }}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

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