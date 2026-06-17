'use client'
import { getAvatar } from '@/lib/avatars'

interface Props {
  avatarId: string
  size?: number  // px, default 40
  selected?: boolean
  onClick?: () => void
}

export default function AvatarDisplay({ avatarId, size = 40, selected, onClick }: Props) {
  const avatar = getAvatar(avatarId)
  const fontSize = Math.round(size * 0.5)

  return (
    <div
      onClick={onClick}
      title={avatar.label}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: avatar.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        flexShrink: 0,
        cursor: onClick ? 'pointer' : 'default',
        border: selected ? '2px solid var(--color-cyan)' : '2px solid rgba(255,255,255,0.1)',
        boxShadow: selected ? '0 0 12px rgba(94,200,220,0.6), 0 0 24px rgba(94,200,220,0.3)' : 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        userSelect: 'none',
      }}
    >
      {avatar.emoji}
    </div>
  )
}
