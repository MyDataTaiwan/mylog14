export interface SharedLink {
    uid: string;
    url: string;
    createTime: number;
    expireTime: number;
    recordCount?: number;
}
