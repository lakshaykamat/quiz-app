import * as repo from '../repositories/user.repository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.model'
import mongoose from 'mongoose'

const JWT_SECRET = process.env.JWT_SECRET!

export const signup = async(userData:User)=>{
    const { name,email,password} = userData
    if (!password) {
        throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await repo.createUser({
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        avatarUrl: 'https://avatar.iran.liara.run/public',
        bio: '',
        role: 'user',
        quizzesTaken: new mongoose.Types.DocumentArray([]),
        isEmailVerified: false
    })
    return user
}

export const login = async(email:string,password:string)=>{
    const user = await repo.findUserByEmail(email)
    if(!user || !user.password){
        throw new Error("User not found")
    }

    const valid = bcrypt.compare(password, user.password)
    if(!valid){
        throw new Error("Invalid credentials")
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' })
    return { token, user }
}

export const getUserProfile = async (userId: string) => {
    return await repo.findUserById(userId);
};

