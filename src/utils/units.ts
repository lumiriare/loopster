// Convertions de mesures et formatage pour l'affichage
export const mToFt = (m: number): number => Math.round(m * 3.28084)
export const kmhToMph = (kmh: number): number => Math.round(kmh * 0.621371)
 
// Hauteur
export function formatHeight(heightM: number, useMetric: boolean): string {
    return useMetric ? `${heightM} m` : `${mToFt(heightM)} ft`
}

// Longueur
export function formatLength(lengthM: number, useMetric: boolean): string {
    return useMetric ? `${lengthM} m` : `${mToFt(lengthM)} ft`
}
 
// Vitesse
export function formatSpeed(speedKmh: number, useMetric: boolean): string {
    return useMetric ? `${speedKmh} km/h` : `${kmhToMph(speedKmh)} mph`
}