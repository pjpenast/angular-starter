export interface UserInput {
    name: string;
    email: string;
    password: string;
    address: string;
    country: string;
    city: string;
    id: string;
}

export interface Credential {
    token: string;
    lastLogin?: string;
}

export interface User {
    name: string;
    email: string;
    password: string;
    address: string;
    country: string;
    city: string;
    id: string;
}