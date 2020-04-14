import { Metadata } from '../interfaces/metadata';
import { FilesystemDirectory } from '@capacitor/core';

export class RecordMeta implements Metadata {
    timestamp: number;
    path: string;
    directory: FilesystemDirectory;
    hash: string;
    userSignature?: string;
    providerSignature?: string;
    transactionHash?: string;

    constructor(timestamp: number, path: string, directory: FilesystemDirectory, hash: string) {
        this.timestamp = timestamp;
        this.path = path;
        this.directory = directory;
        this.hash = hash;
    }
}
