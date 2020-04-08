export interface RecordMeta {
    path: string;
    directory: string;
    hash: string;
    userSignature?: string;
    providerSignature?: string;
    transactionHash?: string;
}
