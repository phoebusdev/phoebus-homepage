import React from 'react'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  highlightWords?: string[]
  className?: string
}

export function SectionHeader({ title, subtitle, highlightWords = [], className = "" }: SectionHeaderProps) {
  const renderTitle = () => {
    if (highlightWords.length === 0) {
      return <span className="neumorphic-text-3d">{title}</span>
    }

    let processedTitle = title
    highlightWords.forEach(word => {
      processedTitle = processedTitle.replace(
        new RegExp(`\\b${word}\\b`, 'g'),
        `<span class="plastic-tube-text">${word}</span>`
      )
    })

    return <span dangerouslySetInnerHTML={{ __html: processedTitle }} />
  }

  return (
    <div className={`text-center mb-12 md:mb-16 ${className}`}>
      <h2 className="text-2xl sm:text-3xl mb-4 font-display break-words">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg md:text-xl text-[#666] max-w-3xl mx-auto px-4">
          {subtitle}
        </p>
      )}
    </div>
  )
}