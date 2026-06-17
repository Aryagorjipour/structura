import Link from 'next/link'
import { TOTAL_BOSSES } from '../data'

export default function HomePage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      background: 'radial-gradient(ellipse at 50% 30%, #0d1f2d 0%, #0a1520 40%, #050d14 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background rune rings */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(94,200,220,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.4em',
          color: 'var(--color-muted)',
          marginBottom: '1rem',
          textTransform: 'uppercase',
        }}>
          Welcome to
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.4rem, 4vw, 2.5rem)',
          letterSpacing: '0.06em',
          color: 'var(--color-cyan)',
          textShadow: '0 0 30px rgba(94,200,220,0.5), 0 0 60px rgba(94,200,220,0.2)',
          marginBottom: '0.5rem',
          lineHeight: 1.2,
        }}>
          Structura
        </h1>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(0.55rem, 1.5vw, 0.8rem)',
          letterSpacing: '0.2em',
          color: 'var(--color-gold)',
          textShadow: '0 0 12px rgba(226,196,106,0.4)',
        }}>
          Master Data Structures &amp; Algorithms
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        display: 'flex',
        gap: '2.5rem',
        marginBottom: '2.5rem',
        padding: '12px 28px',
        background: 'rgba(23,30,40,0.8)',
        border: '1px solid rgba(94,200,220,0.15)',
        borderRadius: 8,
        backdropFilter: 'blur(8px)',
      }}>
        {[
          { label: 'Zones', value: '11' },
          { label: 'Bosses', value: String(TOTAL_BOSSES) },
          { label: 'Languages', value: '6' },
          { label: 'Phases', value: '3' },
        ].map(({ label, value }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              color: 'var(--color-cyan)',
              textShadow: '0 0 10px rgba(94,200,220,0.4)',
            }}>
              {value}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              color: 'var(--color-dim)',
              letterSpacing: '0.12em',
              marginTop: 3,
            }}>
              {label.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      {/* How to play card */}
      <div style={{
        background: 'rgba(23,30,40,0.7)',
        border: '1px solid rgba(94,200,220,0.12)',
        borderRadius: 10,
        padding: '1.2rem 1.8rem',
        maxWidth: 460,
        marginBottom: '2.5rem',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.55rem',
          letterSpacing: '0.15em',
          color: 'var(--color-gold)',
          marginBottom: '0.8rem',
        }}>
          How to Play
        </div>
        {[
          { num: '①', text: 'Answer 5 questions to weaken the boss (Quiz Phase)' },
          { num: '②', text: 'Watch the algorithm animated step by step (Visual Trace)' },
          { num: '③', text: 'Write code in your chosen language to deliver the final blow' },
        ].map(({ num, text }) => (
          <div key={num} style={{
            display: 'flex',
            gap: '0.8rem',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'var(--color-muted)',
            lineHeight: 1.5,
          }}>
            <span style={{ color: 'var(--color-cyan)', flexShrink: 0 }}>{num}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>

      {/* Enter button */}
      <Link href="/map" style={{ textDecoration: 'none', marginBottom: '1.5rem' }}>
        <span className="enter-btn">⚔ Enter Structura</span>
      </Link>

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5rem',
        color: 'var(--color-dim)',
        letterSpacing: '0.15em',
      }}>
        v2.0.0 · STRUCTURA
      </div>
    </main>
  )
}
