import { Proof } from './proof';

export interface Photo {
    byteString: string;
    proof?: Proof;
}
