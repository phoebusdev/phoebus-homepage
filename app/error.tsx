'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: '#f5f0e8',
    }}>
      <div style={{
        background: '#f5f0e8',
        borderRadius: '30px',
        padding: '3rem 2rem',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '12px 12px 24px rgba(0, 0, 0, 0.2), -12px -12px 24px rgba(255, 255, 255, 0.7)',
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#d32f2f' }}>
          error
        </span>
        <h2 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '1.75rem',
          fontWeight: 600,
          color: '#2a2a2a',
          margin: '1.5rem 0 1rem',
        }}>
          Something went wrong
        </h2>
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '1.125rem',
          color: '#4a4a4a',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}>
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            background: '#f5f0e8',
            border: 'none',
            borderRadius: '50px',
            padding: '1rem 2.5rem',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '1.05rem',
            fontWeight: 500,
            color: '#2a2a2a',
            cursor: 'pointer',
            boxShadow: '8px 8px 16px #d4cfc7, -8px -8px 16px #ffffff',
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
