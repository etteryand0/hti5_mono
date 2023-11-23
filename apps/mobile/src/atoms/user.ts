import { atom } from 'jotai'

interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    town: string | null;
    isStoreOwner: boolean;
    createdAt: Date;
}

export const userAtom = atom<User | null>(null)