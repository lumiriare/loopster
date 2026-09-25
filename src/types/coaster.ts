// Données d'un coaster
export interface Coaster {
    id: string
    name: string
    park: string
    country: string
    manufacturer: string
    seating: string     // "Sit Down", "Inverted", "Floorless",...
    inversions: number
    heightM: number     // stocké en mètres
    lengthM: number     // stocké en mètres
    speedKmh: number    // stocké en km/h
    openingYear?: number
}

// Statut de comparaison d'un attribut par rapport au coaster mystère
export type AttributeStatus = 'correct' | 'incorrect' | 'higher' | 'lower' 

export interface AttributeComparison {
    value: string | number
    status: AttributeStatus
}

// Résultat complet d'une tentative de devinette
export interface GuessResult {
    coasterId: string
    coasterName: string
    country: AttributeComparison
    manufacturer: AttributeComparison
    seating: AttributeComparison
    inversions: AttributeComparison
    height: AttributeComparison
    length: AttributeComparison
    speed: AttributeComparison
    isCorrect: boolean
}

export interface Settings {
    useMetric: boolean
    harderEndless: boolean
}
