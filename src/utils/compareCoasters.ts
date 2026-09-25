import type { AttributeComparison, Coaster, GuessResult } from '../types/coaster'
 
function compareText(guessValue: string, answerValue: string): AttributeComparison {
    return {
        value: guessValue,
        status: guessValue.toLowerCase() === answerValue.toLowerCase() ? 'correct' : 'incorrect',
    }
}

function compareNumber(guessValue: number, answerValue: number): AttributeComparison {
    if (guessValue === answerValue) {
        return { value: guessValue, status: 'correct' }
    }
    // "higher" veut dire : la vraie valeur est plus haute que la proposition
    return { value: guessValue, status: guessValue < answerValue ? 'higher' : 'lower' }
}

export function compareCoasters(guess: Coaster, answer: Coaster): GuessResult {
    return {
        coasterId: guess.id,
        coasterName: guess.name,
        country: compareText(guess.country, answer.country),
        manufacturer: compareText(guess.manufacturer, answer.manufacturer),
        seating: compareText(guess.seating, answer.seating),
        inversions: compareNumber(guess.inversions, answer.inversions),
        height: compareNumber(guess.heightM, answer.heightM),
        length: compareNumber(guess.lengthM, answer.lengthM),
        speed: compareNumber(guess.speedKmh, answer.speedKmh),
        isCorrect: guess.id === answer.id,
    }
}