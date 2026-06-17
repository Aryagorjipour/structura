import WorldMap from '@/components/map/WorldMap'
import QuestBoard from '@/components/quests/QuestBoard'

export const metadata = { title: 'World Map — Structura' }

export default function MapPage() {
  return (
    <>
      <WorldMap />
      <QuestBoard />
    </>
  )
}
