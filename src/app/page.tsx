import Link from 'next/link'
import { TOTAL_BOSSES } from '../data'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-8">
      {/* ASCII title */}
      <pre className="text-green-500 text-xs font-mono leading-tight mb-8 text-center select-none">
{`  ___  _     __  ____  ____  ____  ____  __  __ _
 / _ \\| |   / _]|    \\|    ||    ||    ||  ||  | |
|   __| |  /  [ |  D  )|  | | |  | |  | \\  /| || |
|  |_  | |_|   _|    / |  | | |  | |  |  \\/ |  _  |
|   _] |   [  [_|    \\ |  | | |  | |  |  /  |  |  |
|  |   |   [     \\  . \\|  | | |  | |  | /   |  |  |
|__|   |_____\\____|\\____|____||____|____||__||__|__|

 ___  __  ____  __  __  ___  ___  _  _  ____
/ __)(  )(_  _)(  )(  )/ __)/ __)( \\/ )(_  _)
( (__  )(  _)(_  )(__)(( (__ \\__ \\ \\  / _)(_
 \\___)(__)(____)(__)(__)\\___)(___/  \\/  (____)`}
      </pre>

      <div className="text-center font-pixel space-y-4 max-w-lg">
        <p className="text-green-400 text-xs">
          MASTER DATA STRUCTURES &amp; ALGORITHMS
        </p>
        <p className="text-gray-500 text-xs leading-relaxed">
          11 ZONES · {TOTAL_BOSSES} BOSSES · 3-PHASE COMBAT
          <br />
          QUIZ → VISUAL TRACE → CODE DUEL
        </p>

        <div className="border border-green-800 bg-green-950/20 p-4 text-xs text-gray-400 leading-relaxed">
          <p className="text-green-400 mb-2">HOW TO PLAY:</p>
          <p>① Answer 5 questions to weaken the boss</p>
          <p>② Watch the algorithm visualized step by step</p>
          <p>③ Write code to deal the final blow</p>
        </div>

        <Link href="/map">
          <button className="font-pixel text-sm border-2 border-green-500 bg-green-950 text-green-400 px-8 py-4 hover:bg-green-900 transition-all animate-pulse mt-4 cursor-pointer">
            ▶ ENTER THE CATACOMBS
          </button>
        </Link>

        <p className="text-gray-700 text-xs mt-4">
          v1.0.0 · ALGORITHM CATACOMBS
        </p>
      </div>
    </main>
  )
}
