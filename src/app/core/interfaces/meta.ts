import { FilesystemDirectory } from '@capacitor/core';

export interface Meta {
    timestamp: number;
    path: string;
    directory: FilesystemDirectory;
    hash: string;
    userSignature?: string;
    providerSignature?: string;
    transactionHash?: string;
}
