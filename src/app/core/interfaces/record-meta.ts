export interface RecordMeta {
    timestamp: number;
    path: string;
    directory: string;
    hash: string;
    userSignature?: string;
    providerSignature?: string;
    transactionHash?: string;
}
