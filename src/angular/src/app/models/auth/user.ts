import { Roles } from "./roles";

export interface User {
    uid: string;
    name: string;
    email: string;
    photoUrl?: string;
    roles: Roles;
}
