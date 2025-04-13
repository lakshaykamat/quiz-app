import * as repo from '../repositories/user.repository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.model'
import mongoose from 'mongoose'

const JWT_SECRET = "dj}h%XQt}&{2KhH"

export const signup = async(userData:User)=>{
    const { name,email,password} = userData
    if (!password) {
        throw new Error('Password is required');
    }
    const existingUser = await repo.findUserByEmail(email)
    if (existingUser) {
        throw new Error('User already exists')
    }
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long')
    }
    if (password.length > 20) {
        throw new Error('Password must be at most 20 characters long')
    }
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
        throw new Error('Password must contain only letters and numbers')
    }
    if (!/^[a-zA-Z0-9]+$/.test(name)) {
        throw new Error('Name must contain only letters and numbers')
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
    const user = await repo.findUserByEmail(email,true)
    if(!user || !user.password){
        throw new Error("User not found")
    }

    const valid = await bcrypt.compare(password, user.password)
    if(!valid){
        throw new Error("Invalid email or password")
    }
    //TODO Bad practice to use user id as payload, use a random string instead
    //TODO use a better secret key and store it in an env variable
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
    return { token, user }
}

export const getUserProfile = async (userId: string) => {
    return await repo.findUserById(userId);
};

