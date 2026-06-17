'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useGameStore } from '@/store/gameStore'
import { useProfileStore } from '@/store/profileStore'
import AvatarDisplay from '@/components/ui/AvatarDisplay'

const NAV_LINKS = [
  { href: '/map',    label: 'Map' },
  { href: '/quests', label: 'Quests' },
  { href: '/skills', label: 'Skills' },
]

export default function TopNav() {
  const pathname = usePathname()
  const player = useGameStore((s) => s.player)
  const profile = useProfileStore()

  // Hide on title screen and fight screens
  if (pathname === '/' || pathname.startsWith('/fight')) return null

  return (
    <nav
      style={{
        background: 'rgba(15,20,25,0.92)',
        borderBottom: '1px solid rgba(94,200,220,0.15)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' }}>
        {/* Logo */}
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--color-cyan)', letterSpacing: '0.08em', textDecoration: 'none' }}>
          ⚔ Structura
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '2rem' }}>
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  color: active ? 'var(--color-cyan)' : 'var(--color-muted)',
                  textDecoration: 'none',
                  transition: 'color 150ms',
                  textShadow: active ? '0 0 12px rgba(94,200,220,0.5)' : 'none',
                }}
              >
                {label.toUpperCase()}
              </Link>
            )
          })}
        </div>

        {/* Player avatar + stats */}
        <Link href="/profile" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <AvatarDisplay avatarId={profile.avatarId} size={32} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--color-text)', letterSpacing: '0.04em' }}>
              {profile.username || 'Adventurer'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-gold)' }}>
              Lv.{player.level} · {player.xp} XP
            </span>
          </div>
        </Link>
      </div>
    </nav>
  )
}
