'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface AnimationConfig {
  id: string
  name: string
  translateX: [number, number]
  translateY: [number, number]
  rotate: [number, number]
  startScroll: number
  endScroll: number
}

export interface SectionScrollSnapConfig {
  id: string
  name: string
  enabled: boolean
  alignMode: 'start' | 'center' | 'end'
  stopMode: 'normal' | 'always'
}

export interface GlobalScrollSnapConfig {
  enabled: boolean
  type: 'none' | 'y mandatory' | 'y proximity' | 'x mandatory' | 'x proximity'
  behavior: 'smooth' | 'auto'
}

export interface ScrollDebugContextType {
  configs: AnimationConfig[]
  updateConfig: (id: string, field: keyof AnimationConfig, value: any) => void
  getConfig: (id: string) => AnimationConfig | null
  isDebugMode: boolean
  selectedElementId: string | null
  setSelectedElementId: (id: string | null) => void
  currentScrollY: number
  highlightElement: (id: string) => void
  unhighlightElement: () => void
  highlightedElementId: string | null
  globalScrollSnapConfig: GlobalScrollSnapConfig
  sectionScrollSnapConfigs: SectionScrollSnapConfig[]
  updateGlobalScrollSnap: (field: keyof GlobalScrollSnapConfig, value: any) => void
  updateSectionScrollSnap: (sectionId: string, field: keyof SectionScrollSnapConfig, value: any) => void
}

const DEFAULT_CONFIGS: AnimationConfig[] = [
  // Hero Cards - Dual Animation System (Entry + Exit)
  {
    id: 'digital-products-entry',
    name: 'Digital Products Entry',
    translateX: [0, -1200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 98,
    endScroll: 180
  },
  {
    id: 'digital-products-exit',
    name: 'Digital Products Exit',
    translateX: [0, -185],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 98,
    endScroll: 180
  },
  {
    id: 'built-right-entry',
    name: 'Built Right Entry',
    translateX: [0, -1000],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 110,
    endScroll: 250
  },
  {
    id: 'built-right-exit',
    name: 'Built Right Exit',
    translateX: [0, -175],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 110,
    endScroll: 250
  },
  {
    id: 'delivered-fast-entry',
    name: 'Delivered Fast Entry',
    translateX: [0, -165],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 130,
    endScroll: 401
  },
  {
    id: 'delivered-fast-exit',
    name: 'Delivered Fast Exit',
    translateX: [0, -1600],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 130,
    endScroll: 401
  },
  {
    id: 'no-hidden-fees-entry',
    name: 'No Hidden Fees Entry',
    translateX: [0, 800],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 180
  },
  {
    id: 'no-hidden-fees-exit',
    name: 'No Hidden Fees Exit',
    translateX: [0, 185],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 110,
    endScroll: 195
  },
  {
    id: 'no-drag-outs-entry',
    name: 'No Drag-outs Entry',
    translateX: [0, 900],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 90,
    endScroll: 290
  },
  {
    id: 'no-drag-outs-exit',
    name: 'No Drag-outs Exit',
    translateX: [0, 175],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 90,
    endScroll: 250
  },
  {
    id: 'no-lock-in-entry',
    name: 'No Lock-in Entry',
    translateX: [0, 800],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 401
  },
  {
    id: 'no-lock-in-exit',
    name: 'No Lock-in Exit',
    translateX: [0, 200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 401
  },
  {
    id: 'description-card-entry',
    name: 'Description Card Entry',
    translateX: [0, 1600],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 130,
    endScroll: 458
  },
  {
    id: 'description-card-exit',
    name: 'Description Card Exit',
    translateX: [0, 130],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 130,
    endScroll: 458
  },
  {
    id: 'cta-button-1-entry',
    name: 'CTA Button 1 Entry',
    translateX: [0, -509],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 150,
    endScroll: 601
  },
  {
    id: 'cta-button-1-exit',
    name: 'CTA Button 1 Exit',
    translateX: [0, -509],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 150,
    endScroll: 601
  },
  {
    id: 'cta-button-2-entry',
    name: 'CTA Button 2 Entry',
    translateX: [0, 559],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 165,
    endScroll: 595
  },
  {
    id: 'cta-button-2-exit',
    name: 'CTA Button 2 Exit',
    translateX: [0, 559],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 165,
    endScroll: 595
  },
  // Services Section - Dual Animation System (Entry + Exit)
  {
    id: 'services-title',
    name: 'Services Section Title',
    translateX: [-200, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 800
  },
  // Services Card 1 - Dual Animations
  {
    id: 'services-card-0-entry',
    name: 'Services Card 1 Entry (from above)',
    translateX: [437, -51],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 400,
    endScroll: 950
  },
  {
    id: 'services-card-0-exit',
    name: 'Services Card 1 Exit (to below)',
    translateX: [0, -730],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 950,
    endScroll: 1150
  },
  // Services Card 2 - Dual Animations
  {
    id: 'services-card-1-entry',
    name: 'Services Card 2 Entry (from above)',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 1250,
    endScroll: 1450
  },
  {
    id: 'services-card-1-exit',
    name: 'Services Card 2 Exit (to below)',
    translateX: [0, -158],
    translateY: [0, -230],
    rotate: [0, 0],
    startScroll: 950,
    endScroll: 1255
  },
  // Services Card 3 - Dual Animations
  {
    id: 'services-card-2-entry',
    name: 'Services Card 3 Entry (from above)',
    translateX: [-437, 51],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 400,
    endScroll: 950
  },
  {
    id: 'services-card-2-exit',
    name: 'Services Card 3 Exit (to below)',
    translateX: [0, 700],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 950,
    endScroll: 1150
  },
  // Process Section - Dual Animation System (Entry + Exit)
  {
    id: 'process-title-entry',
    name: 'Process Title Entry',
    translateX: [0, 0],
    translateY: [-200, 200],
    rotate: [0, 0],
    startScroll: 1555,
    endScroll: 2049
  },
  {
    id: 'process-title-exit',
    name: 'Process Title Exit',
    translateX: [0, 0],
    translateY: [0, -30],
    rotate: [0, 0],
    startScroll: 2400,
    endScroll: 2600
  },
  {
    id: 'process-step-0-entry',
    name: 'Process Step 1 Entry (Discovery)',
    translateX: [1000, 38],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 0,
    endScroll: 1660
  },
  {
    id: 'process-step-0-exit',
    name: 'Process Step 1 Exit (Discovery)',
    translateX: [0, 1000],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 1800,
    endScroll: 1900
  },
  {
    id: 'process-step-1-entry',
    name: 'Process Step 2 Entry (Prototype)',
    translateX: [15, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 1700,
    endScroll: 1900
  },
  {
    id: 'process-step-1-exit',
    name: 'Process Step 2 Exit (Prototype)',
    translateX: [0, 1000],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 1900,
    endScroll: 2000
  },
  {
    id: 'process-step-2-entry',
    name: 'Process Step 3 Entry (Build)',
    translateX: [-15, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 1750,
    endScroll: 1950
  },
  {
    id: 'process-step-2-exit',
    name: 'Process Step 3 Exit (Build)',
    translateX: [0, 1000],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 2000,
    endScroll: 2100
  },
  {
    id: 'process-step-3-entry',
    name: 'Process Step 4 Entry (Deploy)',
    translateX: [15, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 1800,
    endScroll: 2000
  },
  {
    id: 'process-step-3-exit',
    name: 'Process Step 4 Exit (Deploy)',
    translateX: [0, 1000],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 2100,
    endScroll: 2200
  },
  // Why Different Section - Dual Animation System (Entry + Exit)
  {
    id: 'why-different-title-entry',
    name: 'Why Different Title Entry',
    translateX: [0, 0],
    translateY: [-20, 10],
    rotate: [0, 0],
    startScroll: 2800,
    endScroll: 3000
  },
  {
    id: 'why-different-title-exit',
    name: 'Why Different Title Exit',
    translateX: [0, 1000],
    translateY: [0, -40],
    rotate: [0, 0],
    startScroll: 3600,
    endScroll: 3800
  },
  {
    id: 'why-different-0-entry',
    name: 'Why Different 1 Entry (No Lock-In)',
    translateX: [0, 0],
    translateY: [20, -10],
    rotate: [0, 0],
    startScroll: 2850,
    endScroll: 3050
  },
  {
    id: 'why-different-0-exit',
    name: 'Why Different 1 Exit (No Lock-In)',
    translateX: [0, -1200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 2950,
    endScroll: 3027
  },
  {
    id: 'why-different-1-entry',
    name: 'Why Different 2 Entry (Fixed Price)',
    translateX: [0, 0],
    translateY: [25, -12],
    rotate: [0, 0],
    startScroll: 2900,
    endScroll: 3100
  },
  {
    id: 'why-different-1-exit',
    name: 'Why Different 2 Exit (Fixed Price)',
    translateX: [0, 1200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 2950,
    endScroll: 3027
  },
  {
    id: 'why-different-2-entry',
    name: 'Why Different 3 Entry (Built for Growth)',
    translateX: [0, 0],
    translateY: [30, -14],
    rotate: [0, 0],
    startScroll: 2950,
    endScroll: 3150
  },
  {
    id: 'why-different-2-exit',
    name: 'Why Different 3 Exit (Built for Growth)',
    translateX: [0, -1200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3070,
    endScroll: 3145
  },
  {
    id: 'why-different-3-entry',
    name: 'Why Different 4 Entry (Radical Honesty)',
    translateX: [0, 0],
    translateY: [35, -16],
    rotate: [0, 0],
    startScroll: 3000,
    endScroll: 3200
  },
  {
    id: 'why-different-3-exit',
    name: 'Why Different 4 Exit (Radical Honesty)',
    translateX: [0, 1200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3070,
    endScroll: 3145
  },
  // About Section - Dual Animation System (Entry + Exit)
  {
    id: 'about-title-entry',
    name: 'About Title Entry',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3750,
    endScroll: 3850
  },
  {
    id: 'about-title-exit',
    name: 'About Title Exit',
    translateX: [0, 0],
    translateY: [0, -100],
    rotate: [0, 0],
    startScroll: 4200,
    endScroll: 4300
  },
  {
    id: 'about-content-entry',
    name: 'About Content Entry',
    translateX: [-1400, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3400,
    endScroll: 3870
  },
  {
    id: 'about-content-exit',
    name: 'About Content Exit',
    translateX: [0, -1200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4000,
    endScroll: 4080
  },
  {
    id: 'about-features-entry',
    name: 'About Features Entry',
    translateX: [1400, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3400,
    endScroll: 3890
  },
  {
    id: 'about-features-exit',
    name: 'About Features Exit',
    translateX: [0, 1200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4000,
    endScroll: 4080
  },
  // Contact Section - Dual Animation System (Entry + Exit)
  {
    id: 'contact-title-entry',
    name: 'Contact Title Entry',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4800,
    endScroll: 5000
  },
  {
    id: 'contact-title-exit',
    name: 'Contact Title Exit',
    translateX: [0, 0],
    translateY: [0, -50],
    rotate: [0, 0],
    startScroll: 5400,
    endScroll: 5600
  },
  {
    id: 'contact-cta-1-entry',
    name: 'Contact Email Entry',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4850,
    endScroll: 5050
  },
  {
    id: 'contact-cta-1-exit',
    name: 'Contact Email Exit',
    translateX: [0, -1000],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4800,
    endScroll: 5080
  },
  {
    id: 'contact-cta-2-entry',
    name: 'Contact Phone Entry',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4900,
    endScroll: 5100
  },
  {
    id: 'contact-cta-2-exit',
    name: 'Contact Phone Exit',
    translateX: [0, 400],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 5400,
    endScroll: 5600
  },
  {
    id: 'contact-final-cta-entry',
    name: 'Contact Final CTA Entry',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4950,
    endScroll: 5150
  },
  {
    id: 'contact-final-cta-exit',
    name: 'Contact Final CTA Exit',
    translateX: [0, 0],
    translateY: [0, 100],
    rotate: [0, 0],
    startScroll: 5400,
    endScroll: 5600
  },
  // Services Hero Section - Navigation Collision Avoidance System
  {
    id: 'services-hero-title-entry',
    name: 'Services Hero Title Entry',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 0,
    endScroll: 1
  },
  {
    id: 'services-hero-title-exit',
    name: 'Services Hero Title Exit',
    translateX: [0, 0],
    translateY: [0, -800],
    rotate: [0, 0],
    startScroll: 509,
    endScroll: 589
  },
  {
    id: 'services-hero-description-entry',
    name: 'Services Hero Description Entry',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 0,
    endScroll: 1
  },
  {
    id: 'services-hero-description-exit',
    name: 'Services Hero Description Exit',
    translateX: [0, 2000],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 509,
    endScroll: 589
  },
  {
    id: 'services-hero-cta1-entry',
    name: 'Services Hero CTA 1 Entry',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 0,
    endScroll: 1
  },
  {
    id: 'services-hero-cta1-exit',
    name: 'Services Hero CTA 1 Exit',
    translateX: [0, -2000],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 509,
    endScroll: 589
  },
  {
    id: 'services-hero-cta2-entry',
    name: 'Services Hero CTA 2 Entry',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 0,
    endScroll: 1
  },
  {
    id: 'services-hero-cta2-exit',
    name: 'Services Hero CTA 2 Exit',
    translateX: [0, 2000],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 509,
    endScroll: 589
  },
  // Mobile Applications Section - Navigation Collision Avoidance System
  {
    id: 'mobile-apps-title-entry',
    name: 'Mobile Apps Title Entry',
    translateX: [0, 0],
    translateY: [-100, 0],
    rotate: [0, 0],
    startScroll: 1500,
    endScroll: 1700
  },
  {
    id: 'mobile-apps-title-exit',
    name: 'Mobile Apps Title Exit',
    translateX: [0, 0],
    translateY: [0, -200],
    rotate: [0, 0],
    startScroll: 2018,
    endScroll: 2098
  },
  {
    id: 'mobile-apps-card-0-entry',
    name: 'Mobile Apps Card 1 Entry (iOS)',
    translateX: [-1600, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 1600,
    endScroll: 1900
  },
  {
    id: 'mobile-apps-card-0-exit',
    name: 'Mobile Apps Card 1 Exit (iOS)',
    translateX: [0, -1600],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 2136,
    endScroll: 2216
  },
  {
    id: 'mobile-apps-card-1-entry',
    name: 'Mobile Apps Card 2 Entry (Cross-Platform)',
    translateX: [1600, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 1700,
    endScroll: 2000
  },
  {
    id: 'mobile-apps-card-1-exit',
    name: 'Mobile Apps Card 2 Exit (Cross-Platform)',
    translateX: [0, 1600],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 2136,
    endScroll: 2216
  },
  // Technology Stack Section - Complete 12-Technology Grid
  // USER EXPERIENCE: Section fully stable by 3900px  
  // HIERARCHY: Title settles first, then all cards settle in staggered waves
  {
    id: 'tech-stack-title-entry',
    name: 'Tech Stack Title Entry',
    translateX: [0, 0],
    translateY: [-100, 0],
    rotate: [0, 0],
    startScroll: 3500,
    endScroll: 3800
  },
  {
    id: 'tech-stack-title-exit',
    name: 'Tech Stack Title Exit',
    translateX: [0, 0],
    translateY: [0, -200],
    rotate: [0, 0],
    startScroll: 4100,
    endScroll: 4200
  },
  // Row 1: React, TypeScript, Next.js, Node.js - ALL FROM LEFT
  {
    id: 'tech-card-0-entry',
    name: 'Tech Card 1 Entry (React)',
    translateX: [-2400, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3700,
    endScroll: 3900
  },
  {
    id: 'tech-card-0-exit',
    name: 'Tech Card 1 Exit (React)',
    translateX: [0, 2400],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4150,
    endScroll: 4250
  },
  {
    id: 'tech-card-1-entry',
    name: 'Tech Card 2 Entry (TypeScript)',
    translateX: [-2200, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3725,
    endScroll: 3900
  },
  {
    id: 'tech-card-1-exit',
    name: 'Tech Card 2 Exit (TypeScript)',
    translateX: [0, 2200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4160,
    endScroll: 4250
  },
  {
    id: 'tech-card-2-entry',
    name: 'Tech Card 3 Entry (Next.js)',
    translateX: [-2000, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3750,
    endScroll: 3900
  },
  {
    id: 'tech-card-2-exit',
    name: 'Tech Card 3 Exit (Next.js)',
    translateX: [0, 2000],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4170,
    endScroll: 4250
  },
  {
    id: 'tech-card-3-entry',
    name: 'Tech Card 4 Entry (Node.js)',
    translateX: [-1800, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3775,
    endScroll: 3900
  },
  {
    id: 'tech-card-3-exit',
    name: 'Tech Card 4 Exit (Node.js)',
    translateX: [0, 1800],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4180,
    endScroll: 4250
  },
  // Row 2: JavaScript, Tailwind, HTML5, CSS3 - ALL FROM RIGHT
  {
    id: 'tech-card-4-entry',
    name: 'Tech Card 5 Entry (JavaScript)',
    translateX: [2400, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3800,
    endScroll: 4000
  },
  {
    id: 'tech-card-4-exit',
    name: 'Tech Card 5 Exit (JavaScript)',
    translateX: [0, -2400],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4400,
    endScroll: 4500
  },
  {
    id: 'tech-card-5-entry',
    name: 'Tech Card 6 Entry (Tailwind)',
    translateX: [2200, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3825,
    endScroll: 4000
  },
  {
    id: 'tech-card-5-exit',
    name: 'Tech Card 6 Exit (Tailwind)',
    translateX: [0, -2200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4410,
    endScroll: 4500
  },
  {
    id: 'tech-card-6-entry',
    name: 'Tech Card 7 Entry (HTML5)',
    translateX: [2000, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3850,
    endScroll: 4000
  },
  {
    id: 'tech-card-6-exit',
    name: 'Tech Card 7 Exit (HTML5)',
    translateX: [0, -2000],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4420,
    endScroll: 4500
  },
  {
    id: 'tech-card-7-entry',
    name: 'Tech Card 8 Entry (CSS3)',
    translateX: [1800, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3875,
    endScroll: 4000
  },
  {
    id: 'tech-card-7-exit',
    name: 'Tech Card 8 Exit (CSS3)',
    translateX: [0, -1800],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4430,
    endScroll: 4500
  },
  // Row 3: MongoDB, PostgreSQL, GraphQL, Express - ALL FROM LEFT
  {
    id: 'tech-card-8-entry',
    name: 'Tech Card 9 Entry (MongoDB)',
    translateX: [-2400, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3900,
    endScroll: 4100
  },
  {
    id: 'tech-card-8-exit',
    name: 'Tech Card 9 Exit (MongoDB)',
    translateX: [0, 2400],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4650,
    endScroll: 4750
  },
  {
    id: 'tech-card-9-entry',
    name: 'Tech Card 10 Entry (PostgreSQL)',
    translateX: [-2200, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3925,
    endScroll: 4100
  },
  {
    id: 'tech-card-9-exit',
    name: 'Tech Card 10 Exit (PostgreSQL)',
    translateX: [0, 2200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4660,
    endScroll: 4750
  },
  {
    id: 'tech-card-10-entry',
    name: 'Tech Card 11 Entry (GraphQL)',
    translateX: [-2000, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3950,
    endScroll: 4100
  },
  {
    id: 'tech-card-10-exit',
    name: 'Tech Card 11 Exit (GraphQL)',
    translateX: [0, 2000],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4670,
    endScroll: 4750
  },
  {
    id: 'tech-card-11-entry',
    name: 'Tech Card 12 Entry (Express)',
    translateX: [-1800, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 3975,
    endScroll: 4100
  },
  {
    id: 'tech-card-11-exit',
    name: 'Tech Card 12 Exit (Express)',
    translateX: [0, 1800],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4680,
    endScroll: 4750
  },

  // Client Testimonials Section - Convergence Choreography Animation System
  // Title animations
  {
    id: 'testimonials-title-entry',
    name: 'Testimonials Title Entry',
    translateX: [0, 0],
    translateY: [-30, 0],
    rotate: [0, 0],
    startScroll: 4650,
    endScroll: 4800
  },
  {
    id: 'testimonials-title-exit',
    name: 'Testimonials Title Exit',
    translateX: [0, 0],
    translateY: [0, -800],
    rotate: [0, 0],
    startScroll: 5100,
    endScroll: 5150
  },

  // Testimonial 0 (Top-Left): Converge from top-left → Diverge to bottom-right
  {
    id: 'testimonial-0-entry',
    name: 'Testimonial 1 Entry (Sarah Mitchell)',
    translateX: [-2000, 0],
    translateY: [-800, 0],
    rotate: [0, 0],
    startScroll: 4700,
    endScroll: 4900
  },
  {
    id: 'testimonial-0-exit',
    name: 'Testimonial 1 Exit (Sarah Mitchell)',
    translateX: [0, 2000],
    translateY: [0, 800],
    rotate: [0, 0],
    startScroll: 5050,
    endScroll: 5100
  },

  // Testimonial 1 (Top-Center): Converge from top-right diagonal → Diverge to bottom-right
  {
    id: 'testimonial-1-entry',
    name: 'Testimonial 2 Entry (David Chen)',
    translateX: [2000, 0],
    translateY: [-1200, 0],
    rotate: [0, 0],
    startScroll: 4710,
    endScroll: 4910
  },
  {
    id: 'testimonial-1-exit',
    name: 'Testimonial 2 Exit (David Chen)',
    translateX: [0, 2000],
    translateY: [0, 1200],
    rotate: [0, 0],
    startScroll: 5050,
    endScroll: 5100
  },

  // Testimonial 2 (Top-Right): Converge from top-right → Diverge to bottom-left
  {
    id: 'testimonial-2-entry',
    name: 'Testimonial 3 Entry (Lisa Rodriguez)',
    translateX: [2000, 0],
    translateY: [-800, 0],
    rotate: [0, 0],
    startScroll: 4720,
    endScroll: 4920
  },
  {
    id: 'testimonial-2-exit',
    name: 'Testimonial 3 Exit (Lisa Rodriguez)',
    translateX: [0, -2000],
    translateY: [0, 800],
    rotate: [0, 0],
    startScroll: 5050,
    endScroll: 5100
  },

  // Testimonial 3 (Bottom-Left): Converge from bottom-left → Diverge to top-right
  {
    id: 'testimonial-3-entry',
    name: 'Testimonial 4 Entry (Mark Thompson)',
    translateX: [-2000, 0],
    translateY: [800, 0],
    rotate: [0, 0],
    startScroll: 4730,
    endScroll: 4930
  },
  {
    id: 'testimonial-3-exit',
    name: 'Testimonial 4 Exit (Mark Thompson)',
    translateX: [0, 2000],
    translateY: [0, -800],
    rotate: [0, 0],
    startScroll: 5100,
    endScroll: 5150
  },

  // Testimonial 4 (Bottom-Center): Converge from bottom-left diagonal → Diverge to top-left
  {
    id: 'testimonial-4-entry',
    name: 'Testimonial 5 Entry (Amanda Foster)',
    translateX: [-2000, 0],
    translateY: [1200, 0],
    rotate: [0, 0],
    startScroll: 4740,
    endScroll: 4940
  },
  {
    id: 'testimonial-4-exit',
    name: 'Testimonial 5 Exit (Amanda Foster)',
    translateX: [0, -2000],
    translateY: [0, -1200],
    rotate: [0, 0],
    startScroll: 5100,
    endScroll: 5150
  },

  // Testimonial 5 (Bottom-Right): Converge from bottom-right → Diverge to top-left
  {
    id: 'testimonial-5-entry',
    name: 'Testimonial 6 Entry (James Wilson)',
    translateX: [2000, 0],
    translateY: [800, 0],
    rotate: [0, 0],
    startScroll: 4750,
    endScroll: 4950
  },
  {
    id: 'testimonial-5-exit',
    name: 'Testimonial 6 Exit (James Wilson)',
    translateX: [0, -2000],
    translateY: [0, -800],
    rotate: [0, 0],
    startScroll: 5100,
    endScroll: 5150
  },

  // About Page - Hero Section Animations
  {
    id: 'about-why-choose-entry',
    name: 'About Why Choose Entry',
    translateX: [0, -1200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 98,
    endScroll: 180
  },
  {
    id: 'about-why-choose-exit',
    name: 'About Why Choose Exit',
    translateX: [0, -185],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 98,
    endScroll: 180
  },
  {
    id: 'about-personal-network-entry',
    name: 'About Personal Network Entry',
    translateX: [0, 800],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 180
  },
  {
    id: 'about-personal-network-exit',
    name: 'About Personal Network Exit',
    translateX: [0, 185],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 110,
    endScroll: 195
  },
  {
    id: 'about-phoebus-digital-entry',
    name: 'About Phoebus Digital Entry',
    translateX: [0, -1000],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 110,
    endScroll: 250
  },
  {
    id: 'about-phoebus-digital-exit',
    name: 'About Phoebus Digital Exit',
    translateX: [0, -175],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 110,
    endScroll: 250
  },
  {
    id: 'about-exceptional-speed-entry',
    name: 'About Exceptional Speed Entry',
    translateX: [0, 900],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 90,
    endScroll: 290
  },
  {
    id: 'about-exceptional-speed-exit',
    name: 'About Exceptional Speed Exit',
    translateX: [0, 175],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 90,
    endScroll: 250
  },
  {
    id: 'about-description-card-entry',
    name: 'About Description Card Entry',
    translateX: [0, 1600],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 130,
    endScroll: 458
  },
  {
    id: 'about-description-card-exit',
    name: 'About Description Card Exit',
    translateX: [0, 130],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 130,
    endScroll: 458
  },
  {
    id: 'about-cta-button-1-entry',
    name: 'About CTA Button 1 Entry',
    translateX: [0, -509],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 150,
    endScroll: 601
  },
  {
    id: 'about-cta-button-1-exit',
    name: 'About CTA Button 1 Exit',
    translateX: [0, -509],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 150,
    endScroll: 601
  },
  {
    id: 'about-cta-button-2-entry',
    name: 'About CTA Button 2 Entry',
    translateX: [0, 559],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 165,
    endScroll: 595
  },
  {
    id: 'about-cta-button-2-exit',
    name: 'About CTA Button 2 Exit',
    translateX: [0, 559],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 165,
    endScroll: 595
  },

  // About Page - Mission Section
  {
    id: 'about-mission-content-entry',
    name: 'About Mission Content Entry',
    translateX: [-200, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 600,
    endScroll: 1000
  },
  {
    id: 'about-mission-content-exit',
    name: 'About Mission Content Exit',
    translateX: [0, -200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 1000,
    endScroll: 1400
  },
  {
    id: 'about-mission-features-entry',
    name: 'About Mission Features Entry',
    translateX: [200, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 600,
    endScroll: 1000
  },
  {
    id: 'about-mission-features-exit',
    name: 'About Mission Features Exit',
    translateX: [0, 200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 1000,
    endScroll: 1400
  },

  // About Page - Values Section
  {
    id: 'about-values-title',
    name: 'About Values Section Title',
    translateX: [-200, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 1500,
    endScroll: 2200
  },
  {
    id: 'about-values-card-0-entry',
    name: 'About Values Card 1 Entry',
    translateX: [-300, 0],
    translateY: [100, 0],
    rotate: [0, 0],
    startScroll: 1600,
    endScroll: 2000
  },
  {
    id: 'about-values-card-0-exit',
    name: 'About Values Card 1 Exit',
    translateX: [0, -300],
    translateY: [0, -100],
    rotate: [0, 0],
    startScroll: 2000,
    endScroll: 2400
  },
  {
    id: 'about-values-card-1-entry',
    name: 'About Values Card 2 Entry',
    translateX: [300, 0],
    translateY: [100, 0],
    rotate: [0, 0],
    startScroll: 1650,
    endScroll: 2050
  },
  {
    id: 'about-values-card-1-exit',
    name: 'About Values Card 2 Exit',
    translateX: [0, 300],
    translateY: [0, -100],
    rotate: [0, 0],
    startScroll: 2000,
    endScroll: 2400
  },
  {
    id: 'about-values-card-2-entry',
    name: 'About Values Card 3 Entry',
    translateX: [-300, 0],
    translateY: [100, 0],
    rotate: [0, 0],
    startScroll: 1700,
    endScroll: 2100
  },
  {
    id: 'about-values-card-2-exit',
    name: 'About Values Card 3 Exit',
    translateX: [0, -300],
    translateY: [0, -100],
    rotate: [0, 0],
    startScroll: 2000,
    endScroll: 2400
  },
  {
    id: 'about-values-card-3-entry',
    name: 'About Values Card 4 Entry',
    translateX: [300, 0],
    translateY: [100, 0],
    rotate: [0, 0],
    startScroll: 1750,
    endScroll: 2150
  },
  {
    id: 'about-values-card-3-exit',
    name: 'About Values Card 4 Exit',
    translateX: [0, 300],
    translateY: [0, -100],
    rotate: [0, 0],
    startScroll: 2000,
    endScroll: 2400
  },

  // About Page - Stats Section
  {
    id: 'about-stats-title-entry',
    name: 'About Stats Title Entry',
    translateX: [0, 0],
    translateY: [-100, 0],
    rotate: [0, 0],
    startScroll: 2500,
    endScroll: 2800
  },
  {
    id: 'about-stats-title-exit',
    name: 'About Stats Title Exit',
    translateX: [0, 0],
    translateY: [0, -100],
    rotate: [0, 0],
    startScroll: 2800,
    endScroll: 3100
  },
  {
    id: 'about-stats-0-entry',
    name: 'About Stats Card 1 Entry',
    translateX: [-200, 0],
    translateY: [50, 0],
    rotate: [0, 0],
    startScroll: 2600,
    endScroll: 2900
  },
  {
    id: 'about-stats-0-exit',
    name: 'About Stats Card 1 Exit',
    translateX: [0, -200],
    translateY: [0, -50],
    rotate: [0, 0],
    startScroll: 2900,
    endScroll: 3200
  },
  {
    id: 'about-stats-1-entry',
    name: 'About Stats Card 2 Entry',
    translateX: [200, 0],
    translateY: [50, 0],
    rotate: [0, 0],
    startScroll: 2650,
    endScroll: 2950
  },
  {
    id: 'about-stats-1-exit',
    name: 'About Stats Card 2 Exit',
    translateX: [0, 200],
    translateY: [0, -50],
    rotate: [0, 0],
    startScroll: 2900,
    endScroll: 3200
  },
  {
    id: 'about-stats-2-entry',
    name: 'About Stats Card 3 Entry',
    translateX: [-200, 0],
    translateY: [50, 0],
    rotate: [0, 0],
    startScroll: 2700,
    endScroll: 3000
  },
  {
    id: 'about-stats-2-exit',
    name: 'About Stats Card 3 Exit',
    translateX: [0, -200],
    translateY: [0, -50],
    rotate: [0, 0],
    startScroll: 2900,
    endScroll: 3200
  },
  {
    id: 'about-stats-3-entry',
    name: 'About Stats Card 4 Entry',
    translateX: [200, 0],
    translateY: [50, 0],
    rotate: [0, 0],
    startScroll: 2750,
    endScroll: 3050
  },
  {
    id: 'about-stats-3-exit',
    name: 'About Stats Card 4 Exit',
    translateX: [0, 200],
    translateY: [0, -50],
    rotate: [0, 0],
    startScroll: 2900,
    endScroll: 3200
  },

  // Pricing Page - Hero Section Animations
  {
    id: 'pricing-transparent-entry',
    name: 'Pricing Transparent Entry',
    translateX: [0, -1200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 98,
    endScroll: 180
  },
  {
    id: 'pricing-transparent-exit',
    name: 'Pricing Transparent Exit',
    translateX: [0, -185],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 98,
    endScroll: 180
  },
  {
    id: 'pricing-no-hidden-fees-entry',
    name: 'Pricing No Hidden Fees Entry',
    translateX: [0, 800],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 180
  },
  {
    id: 'pricing-no-hidden-fees-exit',
    name: 'Pricing No Hidden Fees Exit',
    translateX: [0, 185],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 110,
    endScroll: 195
  },
  {
    id: 'pricing-fixed-costs-entry',
    name: 'Pricing Fixed Costs Entry',
    translateX: [0, -1000],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 110,
    endScroll: 250
  },
  {
    id: 'pricing-fixed-costs-exit',
    name: 'Pricing Fixed Costs Exit',
    translateX: [0, -175],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 110,
    endScroll: 250
  },
  {
    id: 'pricing-no-scope-creep-entry',
    name: 'Pricing No Scope Creep Entry',
    translateX: [0, 900],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 90,
    endScroll: 290
  },
  {
    id: 'pricing-no-scope-creep-exit',
    name: 'Pricing No Scope Creep Exit',
    translateX: [0, 175],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 90,
    endScroll: 250
  },
  {
    id: 'pricing-description-card-entry',
    name: 'Pricing Description Card Entry',
    translateX: [0, 1600],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 130,
    endScroll: 458
  },
  {
    id: 'pricing-description-card-exit',
    name: 'Pricing Description Card Exit',
    translateX: [0, 130],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 130,
    endScroll: 458
  },
  {
    id: 'pricing-cta-button-1-entry',
    name: 'Pricing CTA Button 1 Entry',
    translateX: [0, -509],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 150,
    endScroll: 601
  },
  {
    id: 'pricing-cta-button-1-exit',
    name: 'Pricing CTA Button 1 Exit',
    translateX: [0, -509],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 150,
    endScroll: 601
  },
  {
    id: 'pricing-cta-button-2-entry',
    name: 'Pricing CTA Button 2 Entry',
    translateX: [0, 559],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 165,
    endScroll: 595
  },
  {
    id: 'pricing-cta-button-2-exit',
    name: 'Pricing CTA Button 2 Exit',
    translateX: [0, 559],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 165,
    endScroll: 595
  },

  // Pricing Page - Services Section
  {
    id: 'pricing-services-title',
    name: 'Pricing Services Section Title',
    translateX: [-200, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 700,
    endScroll: 1400
  },
  {
    id: 'pricing-card-0-entry',
    name: 'Pricing Card 1 Entry',
    translateX: [437, -51],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 800,
    endScroll: 1350
  },
  {
    id: 'pricing-card-0-exit',
    name: 'Pricing Card 1 Exit',
    translateX: [0, -730],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 1350,
    endScroll: 1550
  },
  {
    id: 'pricing-card-1-entry',
    name: 'Pricing Card 2 Entry',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 850,
    endScroll: 1400
  },
  {
    id: 'pricing-card-1-exit',
    name: 'Pricing Card 2 Exit',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 1350,
    endScroll: 1550
  },
  {
    id: 'pricing-card-2-entry',
    name: 'Pricing Card 3 Entry',
    translateX: [-437, 51],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 900,
    endScroll: 1450
  },
  {
    id: 'pricing-card-2-exit',
    name: 'Pricing Card 3 Exit',
    translateX: [0, 730],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 1350,
    endScroll: 1550
  },

  // Pricing Page - Why Different Section
  {
    id: 'pricing-why-different-title-entry',
    name: 'Pricing Why Different Title Entry',
    translateX: [0, 0],
    translateY: [-100, 0],
    rotate: [0, 0],
    startScroll: 1600,
    endScroll: 1900
  },
  {
    id: 'pricing-why-different-title-exit',
    name: 'Pricing Why Different Title Exit',
    translateX: [0, 0],
    translateY: [0, -100],
    rotate: [0, 0],
    startScroll: 1900,
    endScroll: 2200
  },
  {
    id: 'pricing-why-different-0-entry',
    name: 'Pricing Why Different Card 1 Entry',
    translateX: [-300, 0],
    translateY: [100, 0],
    rotate: [0, 0],
    startScroll: 1700,
    endScroll: 2000
  },
  {
    id: 'pricing-why-different-0-exit',
    name: 'Pricing Why Different Card 1 Exit',
    translateX: [0, -300],
    translateY: [0, -100],
    rotate: [0, 0],
    startScroll: 2000,
    endScroll: 2300
  },
  {
    id: 'pricing-why-different-1-entry',
    name: 'Pricing Why Different Card 2 Entry',
    translateX: [300, 0],
    translateY: [100, 0],
    rotate: [0, 0],
    startScroll: 1750,
    endScroll: 2050
  },
  {
    id: 'pricing-why-different-1-exit',
    name: 'Pricing Why Different Card 2 Exit',
    translateX: [0, 300],
    translateY: [0, -100],
    rotate: [0, 0],
    startScroll: 2000,
    endScroll: 2300
  },
  {
    id: 'pricing-why-different-2-entry',
    name: 'Pricing Why Different Card 3 Entry',
    translateX: [-300, 0],
    translateY: [100, 0],
    rotate: [0, 0],
    startScroll: 1800,
    endScroll: 2100
  },
  {
    id: 'pricing-why-different-2-exit',
    name: 'Pricing Why Different Card 3 Exit',
    translateX: [0, -300],
    translateY: [0, -100],
    rotate: [0, 0],
    startScroll: 2000,
    endScroll: 2300
  },
  {
    id: 'pricing-why-different-3-entry',
    name: 'Pricing Why Different Card 4 Entry',
    translateX: [300, 0],
    translateY: [100, 0],
    rotate: [0, 0],
    startScroll: 1850,
    endScroll: 2150
  },
  {
    id: 'pricing-why-different-3-exit',
    name: 'Pricing Why Different Card 4 Exit',
    translateX: [0, 300],
    translateY: [0, -100],
    rotate: [0, 0],
    startScroll: 2000,
    endScroll: 2300
  },

  // Pricing Page - Process Section
  {
    id: 'pricing-process-title-entry',
    name: 'Pricing Process Title Entry',
    translateX: [-200, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 2400,
    endScroll: 2700
  },
  {
    id: 'pricing-process-title-exit',
    name: 'Pricing Process Title Exit',
    translateX: [0, -200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 2700,
    endScroll: 3000
  },
  {
    id: 'pricing-process-steps-entry',
    name: 'Pricing Process Steps Entry',
    translateX: [200, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 2400,
    endScroll: 2700
  },
  {
    id: 'pricing-process-steps-exit',
    name: 'Pricing Process Steps Exit',
    translateX: [0, 200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 2700,
    endScroll: 3000
  },

  // Pricing Page - Tech Stack Section
  {
    id: 'pricing-tech-stack-title-entry',
    name: 'Pricing Tech Stack Title Entry',
    translateX: [0, 0],
    translateY: [-100, 0],
    rotate: [0, 0],
    startScroll: 3100,
    endScroll: 3400
  },
  {
    id: 'pricing-tech-stack-title-exit',
    name: 'Pricing Tech Stack Title Exit',
    translateX: [0, 0],
    translateY: [0, -100],
    rotate: [0, 0],
    startScroll: 3400,
    endScroll: 3700
  },
  {
    id: 'pricing-tech-card-0-entry',
    name: 'Pricing Tech Card 1 Entry',
    translateX: [-200, 0],
    translateY: [50, 0],
    rotate: [0, 0],
    startScroll: 3200,
    endScroll: 3500
  },
  {
    id: 'pricing-tech-card-0-exit',
    name: 'Pricing Tech Card 1 Exit',
    translateX: [0, -200],
    translateY: [0, -50],
    rotate: [0, 0],
    startScroll: 3500,
    endScroll: 3800
  },
  {
    id: 'pricing-tech-card-1-entry',
    name: 'Pricing Tech Card 2 Entry',
    translateX: [200, 0],
    translateY: [50, 0],
    rotate: [0, 0],
    startScroll: 3250,
    endScroll: 3550
  },
  {
    id: 'pricing-tech-card-1-exit',
    name: 'Pricing Tech Card 2 Exit',
    translateX: [0, 200],
    translateY: [0, -50],
    rotate: [0, 0],
    startScroll: 3500,
    endScroll: 3800
  },
  {
    id: 'pricing-tech-card-2-entry',
    name: 'Pricing Tech Card 3 Entry',
    translateX: [-200, 0],
    translateY: [50, 0],
    rotate: [0, 0],
    startScroll: 3300,
    endScroll: 3600
  },
  {
    id: 'pricing-tech-card-2-exit',
    name: 'Pricing Tech Card 3 Exit',
    translateX: [0, -200],
    translateY: [0, -50],
    rotate: [0, 0],
    startScroll: 3500,
    endScroll: 3800
  },
  {
    id: 'pricing-tech-card-3-entry',
    name: 'Pricing Tech Card 4 Entry',
    translateX: [200, 0],
    translateY: [50, 0],
    rotate: [0, 0],
    startScroll: 3350,
    endScroll: 3650
  },
  {
    id: 'pricing-tech-card-3-exit',
    name: 'Pricing Tech Card 4 Exit',
    translateX: [0, 200],
    translateY: [0, -50],
    rotate: [0, 0],
    startScroll: 3500,
    endScroll: 3800
  }
]

const ScrollDebugContext = createContext<ScrollDebugContextType | null>(null)

interface ScrollDebugProviderProps {
  children: ReactNode
}

const DEFAULT_GLOBAL_SCROLL_SNAP: GlobalScrollSnapConfig = {
  enabled: true,
  type: 'y proximity',
  behavior: 'smooth'
}

const DEFAULT_SECTION_SCROLL_SNAP_CONFIGS: SectionScrollSnapConfig[] = [
  {
    id: 'hero',
    name: 'Hero Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  },
  {
    id: 'services',
    name: 'Services Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  },
  {
    id: 'process',
    name: 'Process Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  },
  {
    id: 'why-different',
    name: 'Why Different Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  },
  {
    id: 'about',
    name: 'About Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  },
  {
    id: 'contact',
    name: 'Contact Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  },
  {
    id: 'services-hero',
    name: 'Services Hero Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  },
  {
    id: 'mobile-applications',
    name: 'Mobile Applications Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  },
  {
    id: 'technology-stack',
    name: 'Technology Stack Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  },
  {
    id: 'client-testimonials',
    name: 'Client Testimonials Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  }
]

export function ScrollDebugProvider({ children }: ScrollDebugProviderProps) {
  const [configs, setConfigs] = useState<AnimationConfig[]>(DEFAULT_CONFIGS)
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
  const [highlightedElementId, setHighlightedElementId] = useState<string | null>(null)
  const [currentScrollY, setCurrentScrollY] = useState(0)
  const [isDebugMode, setIsDebugMode] = useState(false)
  const [globalScrollSnapConfig, setGlobalScrollSnapConfig] = useState<GlobalScrollSnapConfig>(DEFAULT_GLOBAL_SCROLL_SNAP)
  const [sectionScrollSnapConfigs, setSectionScrollSnapConfigs] = useState<SectionScrollSnapConfig[]>(DEFAULT_SECTION_SCROLL_SNAP_CONFIGS)

  // Check if debug mode should be enabled
  useEffect(() => {
    const showDebug = process.env.NODE_ENV === 'development' || 
                     localStorage.getItem('scroll-debug') === 'true' ||
                     window.location.search.includes('debug=scroll')
    setIsDebugMode(showDebug)
  }, [])

  // Track scroll position
  useEffect(() => {
    if (!isDebugMode) return

    const handleScroll = () => {
      setCurrentScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDebugMode])

  const updateConfig = (id: string, field: keyof AnimationConfig, value: any) => {
    setConfigs(prev => prev.map(config => 
      config.id === id 
        ? { ...config, [field]: value }
        : config
    ))
  }

  const getConfig = (id: string): AnimationConfig | null => {
    return configs.find(config => config.id === id) || null
  }

  const updateGlobalScrollSnap = (field: keyof GlobalScrollSnapConfig, value: any) => {
    setGlobalScrollSnapConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateSectionScrollSnap = (sectionId: string, field: keyof SectionScrollSnapConfig, value: any) => {
    setSectionScrollSnapConfigs(prev => prev.map(config => 
      config.id === sectionId 
        ? { ...config, [field]: value }
        : config
    ))
  }

  const highlightElement = (id: string) => {
    setHighlightedElementId(id)
    // Auto-clear highlight after 3 seconds
    setTimeout(() => {
      setHighlightedElementId(null)
    }, 3000)
  }

  const unhighlightElement = () => {
    setHighlightedElementId(null)
  }

  // Dynamic CSS injection for scroll snap changes
  useEffect(() => {
    if (!isDebugMode) return

    const styleId = 'scroll-snap-debug-styles'
    let styleElement = document.getElementById(styleId) as HTMLStyleElement
    
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    const scrollSnapType = globalScrollSnapConfig.enabled ? globalScrollSnapConfig.type : 'none'
    const scrollBehavior = globalScrollSnapConfig.behavior

    // Generate section-specific CSS rules
    const sectionRules = sectionScrollSnapConfigs
      .filter(config => config.enabled)
      .map(config => `
        .scroll-snap-section[data-section="${config.id}"] {
          scroll-snap-align: ${config.alignMode} !important;
          scroll-snap-stop: ${config.stopMode} !important;
        }
      `)
      .join('\n')

    styleElement.textContent = `
      html {
        scroll-snap-type: ${scrollSnapType} !important;
        scroll-behavior: ${scrollBehavior} !important;
      }
      ${sectionRules}
    `

    return () => {
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement)
      }
    }
  }, [isDebugMode, globalScrollSnapConfig, sectionScrollSnapConfigs])

  const value: ScrollDebugContextType = {
    configs,
    updateConfig,
    getConfig,
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
  }

  return (
    <ScrollDebugContext.Provider value={value}>
      {children}
    </ScrollDebugContext.Provider>
  )
}

export function useScrollDebug(): ScrollDebugContextType {
  const context = useContext(ScrollDebugContext)
  if (!context) {
    throw new Error('useScrollDebug must be used within a ScrollDebugProvider')
  }
  return context
}

// Helper function to calculate current transform values based on scroll position
export function calculateTransform(
  config: AnimationConfig,
  scrollY: number
): {
  translateX: number
  translateY: number
  rotate: number
  progress: number
} {
  const { startScroll, endScroll, translateX, translateY, rotate } = config
  
  // Calculate progress (0 to 1) based on scroll position
  const progress = Math.max(0, Math.min(1, (scrollY - startScroll) / (endScroll - startScroll)))
  
  // Interpolate values
  const currentTranslateX = translateX[0] + (translateX[1] - translateX[0]) * progress
  const currentTranslateY = translateY[0] + (translateY[1] - translateY[0]) * progress
  const currentRotate = rotate[0] + (rotate[1] - rotate[0]) * progress
  
  return {
    translateX: currentTranslateX,
    translateY: currentTranslateY,
    rotate: currentRotate,
    progress
  }
}