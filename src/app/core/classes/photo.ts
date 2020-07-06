import { Proof } from '../interfaces/proof';

export class Photo {

    timestamp: number;
    readonly byteString: string;
    proof: Proof;
    templateName: string;
    caption?: string;

    constructor(timestamp: number, byteString: string, proof?: Proof) {
        this.timestamp = timestamp;
        this.byteString = byteString;
        this.proof = proof;
    }

    getUri(): string {
        return 'data:image/jpeg;base64,' + this.byteString;
    }

    setCaption(caption: string): void {
        this.caption = caption;
    }

    setProof(proof: Proof): void {
        this.timestamp = proof.timestamp;
        this.proof = proof;
    }

    setTemplateName(templateName: string): void {
        this.templateName = templateName;
    }

}
