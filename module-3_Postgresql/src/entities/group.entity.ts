export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface GroupEntity {
    id: string;
    name: string;
    permissions: Array<Permission>;
    users?: Array<string>;
}
