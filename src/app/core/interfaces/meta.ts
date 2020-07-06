export interface Meta {
    timestamp: number;
    path: string;
    hash: string;
    userSignature?: string;
    providerSignature?: string;
    transactionHash?: string;
}
