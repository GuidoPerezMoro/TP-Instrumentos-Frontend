import { Role } from "./enum/Role";

export default interface User {
    id: number;
    username: string;
    password: string;
    rol: Role;
  }