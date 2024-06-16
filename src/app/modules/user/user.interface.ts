/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constants";

export interface TUser {
    name: string;
    email: string;
    role: 'user' | 'admin';
    password: string;
    phone: string;
    address: string;
    
  }
  export interface UserModel extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>;
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
    
  }

  export type TUserRole = keyof typeof USER_ROLE;