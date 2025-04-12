import User, { User as UserDoc } from "../models/User.model";

export const createUser = async(userData:UserDoc)=>User.create(userData);
export const findUserByEmail = async(email:string)=>User.findOne({email})
export const findUserById = (id: string) => User.findById(id);  
