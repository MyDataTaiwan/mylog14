import { LocationProof } from './location-proof';

export interface Proof {
    timestamp: number;
    location?: LocationProof;
}

