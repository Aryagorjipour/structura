import { notFound } from 'next/navigation'
import { getBoss, ALL_BOSSES } from '../../../data'
import FightArena from '../../../components/fight/FightArena'

export function generateStaticParams() {
  return ALL_BOSSES.map(b => ({ bossId: b.id }))
}

interface FightPageProps {
  params: Promise<{ bossId: string }>
}

export async function generateMetadata({ params }: FightPageProps) {
  const { bossId } = await params
  const boss = getBoss(bossId)
  return {
    title: boss ? `Fight: ${boss.bossName} | Structura` : 'Fight | Structura',
  }
}

export default async function FightPage({ params }: FightPageProps) {
  const { bossId } = await params
  const boss = getBoss(bossId)
  if (!boss) notFound()
  return <FightArena boss={boss} />
}
