import { notFound } from 'next/navigation'
import { getBoss } from '../../../data'
import FightArena from '../../../components/fight/FightArena'

interface FightPageProps {
  params: Promise<{ bossId: string }>
}

export async function generateMetadata({ params }: FightPageProps) {
  const { bossId } = await params
  const boss = getBoss(bossId)
  return {
    title: boss ? `Fight: ${boss.bossName} | Algorithm Catacombs` : 'Fight | Algorithm Catacombs',
  }
}

export default async function FightPage({ params }: FightPageProps) {
  const { bossId } = await params
  const boss = getBoss(bossId)
  if (!boss) notFound()
  return <FightArena boss={boss} />
}
