export interface AvatarDef {
  id: string
  emoji: string
  label: string
  bg: string  // CSS gradient
}

export const AVATARS: AvatarDef[] = [
  { id: 'wizard',   emoji: '🧙', label: 'Wizard',     bg: 'linear-gradient(135deg, #1a0f3d, #2d1a5c)' },
  { id: 'elf',      emoji: '🧝', label: 'Elf',        bg: 'linear-gradient(135deg, #0f2d1a, #1a4a2d)' },
  { id: 'ninja',    emoji: '🥷', label: 'Ninja',      bg: 'linear-gradient(135deg, #111111, #222222)' },
  { id: 'royal',    emoji: '👑', label: 'Royal',      bg: 'linear-gradient(135deg, #3d2a0f, #5c3d15)' },
  { id: 'hero',     emoji: '🦸', label: 'Hero',       bg: 'linear-gradient(135deg, #0f1a3d, #1a2d5c)' },
  { id: 'vampire',  emoji: '🧛', label: 'Vampire',    bg: 'linear-gradient(135deg, #2d0f1a, #4a1a2d)' },
  { id: 'fairy',    emoji: '🧚', label: 'Fairy',      bg: 'linear-gradient(135deg, #2a0f3d, #3d1a5c)' },
  { id: 'fox',      emoji: '🦊', label: 'Fox',        bg: 'linear-gradient(135deg, #3d1a0f, #5c2a15)' },
  { id: 'dragon',   emoji: '🐉', label: 'Dragon',     bg: 'linear-gradient(135deg, #0f2d0f, #1a4a1a)' },
  { id: 'warrior',  emoji: '⚔️', label: 'Warrior',    bg: 'linear-gradient(135deg, #2d2d0f, #4a4a1a)' },
  { id: 'mermaid',  emoji: '🧜', label: 'Mermaid',    bg: 'linear-gradient(135deg, #0f2a3d, #1a3d5c)' },
  { id: 'archer',   emoji: '🏹', label: 'Archer',     bg: 'linear-gradient(135deg, #1a2d0f, #2d4a1a)' },
  { id: 'lion',     emoji: '🦁', label: 'Lion',       bg: 'linear-gradient(135deg, #3d2d0f, #5c4a15)' },
  { id: 'wolf',     emoji: '🐺', label: 'Wolf',       bg: 'linear-gradient(135deg, #1a1a2d, #2d2d4a)' },
  { id: 'eagle',    emoji: '🦅', label: 'Eagle',      bg: 'linear-gradient(135deg, #2d1a0f, #4a2d15)' },
  { id: 'mystic',   emoji: '🔮', label: 'Mystic',     bg: 'linear-gradient(135deg, #1a0f2d, #2d1a4a)' },
  { id: 'storm',    emoji: '⚡', label: 'Storm',      bg: 'linear-gradient(135deg, #2a2a0f, #4a4a1a)' },
  { id: 'pyro',     emoji: '🔥', label: 'Pyromancer', bg: 'linear-gradient(135deg, #3d0f0f, #5c1a1a)' },
  { id: 'frost',    emoji: '❄️', label: 'Frost',      bg: 'linear-gradient(135deg, #0f1f3d, #1a2d5c)' },
  { id: 'tidal',    emoji: '🌊', label: 'Tidal',      bg: 'linear-gradient(135deg, #0f2a3d, #1a3d5c)' },
  { id: 'scholar',  emoji: '📚', label: 'Scholar',    bg: 'linear-gradient(135deg, #0f3d2d, #1a5c4a)' },
  { id: 'blade',    emoji: '🗡️', label: 'Blade',      bg: 'linear-gradient(135deg, #2a0f0f, #4a1a1a)' },
  { id: 'guardian', emoji: '🛡️', label: 'Guardian',  bg: 'linear-gradient(135deg, #0f2d2d, #1a4a4a)' },
  { id: 'golem',    emoji: '🪨', label: 'Golem',      bg: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)' },
]

export function getAvatar(id: string): AvatarDef {
  return AVATARS.find(a => a.id === id) ?? AVATARS[0]
}
