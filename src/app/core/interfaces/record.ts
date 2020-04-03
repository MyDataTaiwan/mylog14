import { Snapshot } from './snapshot';
import { Condition } from './condition';

export interface Record {
    bodyTemperature: number;
    bodyTemperatureUnit: string;
    condition: Condition;
    snapshot: Snapshot;
}
