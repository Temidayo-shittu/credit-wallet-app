import { User } from "src/entities/User"
import db from '../db/connection';

export const createTokenUser = async (userId:number)=>{
    const user = await db('users').where({ id: userId }).first();
    return {
        userId: user.id,
        fullname: user.fullname,
        email: user.email
    }  
}