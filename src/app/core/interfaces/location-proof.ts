export interface LocationProof {
    latitude: number;
    longitude: number;
    accuracy: number;
    speed?: number;
    altitude?: number;
    altitudeAccuracy?: number;
    heading?: number;
}
