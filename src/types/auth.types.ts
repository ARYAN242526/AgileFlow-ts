import { ROLES } from "../constants/roles";

export interface UserPayload {
    _id: string;
    email: string;
    role: ROLES;
}
