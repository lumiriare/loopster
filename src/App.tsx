import { useState } from 'react'
import { coasters } from './data/coasters'
import { compareCoasters } from './utils/compareCoasters'
import { formatHeight, formatLength, formatSpeed } from './utils/units'
import type { GuessResult } from './types/coaster'

// Réponse fixe pendant les tests, pour pouvoir vérifier la logique
// à la main. On la randomisera une fois que ça marche.
const ANSWER = coasters.find((c) => c.id === 'toutatis')!

const useMetric = true

function cellClasses(status: GuessResult['country']['status']) {
  switch (status) {
    case 'correct':
      return 'bg-green-100 border-green-400 text-green-800'
    case 'higher':
    case 'lower':
      return 'bg-amber-100 border-amber-400 text-amber-800'
    default:
      return 'bg-red-100 border-red-400 text-red-800'
  }
}

function arrow(status: GuessResult['inversions']['status']) {
  if (status === 'higher') return '↑'
  if (status === 'lower') return '↓'
  return ''
}

function App() {
  const [selectedId, setSelectedId] = useState(coasters[0].id)
  const [guesses, setGuesses] = useState<GuessResult[]>([])
  const [won, setWon] = useState(false)

  function handleGuess() {
    const guessCoaster = coasters.find((c) => c.id === selectedId)
    if (!guessCoaster) return

    const result = compareCoasters(guessCoaster, ANSWER)
    setGuesses((prev) => [...prev, result])
    if (result.isCorrect) setWon(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-800" style={{ color: 'black' }}>
          Loopster - Test
        </h1>

        <div className="mb-6 flex gap-2">
          <select
            className="rounded border border-slate-300 px-3 py-2"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            disabled={won}
          >
            {coasters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} - {c.park}
              </option>
            ))}
          </select>
          <button
            className="rounded bg-slate-800 px-4 py-2 text-white disabled:opacity-40"
            onClick={handleGuess}
            disabled={won}
          >
            Deviner
          </button>
        </div>

        {won && (
          <p className="mb-4 text-lg font-semibold text-green-700">
            Trouvé en {guesses.length} essai{guesses.length > 1 ? 's' : ''} !
          </p>
        )}

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-left">
              <th className="p-2">Coaster</th>
              <th className="p-2">Pays</th>
              <th className="p-2">Constructeur</th>
              <th className="p-2">Train</th>
              <th className="p-2">Inversions</th>
              <th className="p-2">Hauteur</th>
              <th className="p-2">Longueur</th>
              <th className="p-2">Vitesse</th>
            </tr>
          </thead>
          <tbody>
            {guesses.map((g, i) => (
              <tr key={i}>
                <td className="p-2 font-medium">{g.coasterName}</td>
                <td className={`border p-2 text-center ${cellClasses(g.country.status)}`}>
                  {g.country.value}
                </td>
                <td className={`border p-2 text-center ${cellClasses(g.manufacturer.status)}`}>
                  {g.manufacturer.value}
                </td>
                <td className={`border p-2 text-center ${cellClasses(g.seating.status)}`}>
                  {g.seating.value}
                </td>
                <td className={`border p-2 text-center ${cellClasses(g.inversions.status)}`}>
                  {g.inversions.value} {arrow(g.inversions.status)}
                </td>
                <td className={`border p-2 text-center ${cellClasses(g.height.status)}`}>
                  {formatHeight(g.height.value as number, useMetric)} {arrow(g.height.status)}
                </td>
                <td className={`border p-2 text-center ${cellClasses(g.length.status)}`}>
                  {formatLength(g.length.value as number, useMetric)} {arrow(g.length.status)}
                </td>
                <td className={`border p-2 text-center ${cellClasses(g.speed.status)}`}>
                  {formatSpeed(g.speed.value as number, useMetric)} {arrow(g.speed.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App