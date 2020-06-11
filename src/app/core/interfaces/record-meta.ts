import { FilesystemDirectory } from '@capacitor/core';

export interface RecordMeta {
    timestamp: number;
    path: string;
    directory: FilesystemDirectory;
    hash: string;
    schemaId: number;
    userSignature?: string;
    providerSignature?: string;
    transactionHash?: string;
}
