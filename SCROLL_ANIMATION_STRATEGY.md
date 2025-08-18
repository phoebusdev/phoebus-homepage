# Scroll Animation Strategy: Navigation Collision Avoidance

## Overview

The hero section implements a sophisticated scroll animation system where cards exit the viewport in precisely timed waves to avoid collision with the descending sticky navigation. This creates a seamless user experience where content gracefully moves out of the way just as the navigation would cover it.

## Core Principle: Physical Collision Detection

**The timing is not arbitrary - it's based on physics simulation of when the sticky navigation will physically collide with each card based on:**
- **Vertical Position** (which row the card is in)  
- **Card Dimensions** (CSS grid span width)
- **Collision Path** (which part of the card gets hit first)

## Card Layout & Timing Analysis

### Row 1 (Top of Hero Section)
| Card | Width (Grid Span) | Start Timing | Logic |
|------|------------------|--------------|-------|
| **No Hidden Fees** | 42% (col-span-5) | **50px** | TOP-RIGHT position + smaller size → hit FIRST by descending nav |
| **Digital Products** | 58% (col-span-7) | **98px** | TOP-LEFT position + larger size → collision occurs slightly later |

### Row 2 (Second Tier)
| Card | Width (Grid Span) | Start Timing | Logic |
|------|------------------|--------------|-------|
| **Built Right** | 50% (col-span-6) | **110px** | Lower vertical position → more scroll time before collision |
| **No Drag-outs** | 50% (col-span-6) | **110px** | Same row = identical collision timing |

### Row 3 (Third Tier)
| Card | Width (Grid Span) | Start Timing | Logic |
|------|------------------|--------------|-------|
| **Delivered Fast** | 67% (col-span-8) | **233px** | Larger width + lower position → extended wait time |
| **No Lock-in** | 33% (col-span-4) | **233px** | Same row timing despite smaller size |

### Row 4 (Fourth Tier)
| Card | Width (Grid Span) | Start Timing | Logic |
|------|------------------|--------------|-------|
| **Description Card** | 100% (col-span-12) | **370px** | Full width + lowest position → maximum collision delay |

### Row 5 (CTA Section)
| Card | Width (Grid Span) | Start Timing | Logic |
|------|------------------|--------------|-------|
| **CTA Button 1** | ~auto (button) | **500px** | Bottom position → latest collision point |
| **CTA Button 2** | ~auto (button) | **501px** | Bottom position → latest collision point |

## Animation Characteristics

### Exit Behavior
- **No Rotation**: `rotate={[0, 0]}` - clean, professional movement
- **No Vertical Movement**: `translateY={[0, 0]}` - cards maintain height consistency  
- **Horizontal Translation**: High values (155-559px) ensure complete viewport clearance
- **Directional Logic**: Left-side cards move left (negative X), right-side cards move right (positive X)

### Timing Patterns
1. **Collision-Based Grouping**: Cards in the same row exit at similar times
2. **Size Adjustments**: Within a row, collision path determines minor timing variations
3. **Synchronized Waves**: Creates coordinated exit sequences that feel natural
4. **Progressive Delay**: Each row waits longer as vertical distance from navigation increases

## Implementation Notes

### Technical Structure
- Uses `DebugParallax` components with `startScroll` and `endScroll` parameters
- Grid layout: 12-column system with responsive breakpoints
- Context-based configuration allows real-time tuning via debug tool

### Key Insight
**This is not just animation - it's physics simulation.** Each card's exit timing is calculated to occur precisely when the sticky navigation would physically overlap that specific card's position and dimensions.

## Result
The hero section creates a **"collision avoidance choreography"** where content intelligently moves out of the way, maintaining perfect readability and visual flow as users scroll through the interface.

---

*This system demonstrates how sophisticated UX can emerge from understanding the physical relationships between interface elements and user scroll behavior.*