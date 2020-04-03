import { Snapshot } from './snapshot';
import { Condition } from './condition';
import { PhotoRecord } from './photo-record';

export interface Record {
    bodyTemperature?: number;
    bodyTemperatureUnit?: string;
    condition?: Condition;
    snapshot: Snapshot;
    photos?: PhotoRecord[];
}
