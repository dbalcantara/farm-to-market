import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined. Please set it in your .env file.');
}

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15d' });
    res.cookie('jwt', token, { 
        maxAge: 15 * 24 * 60 * 60 * 1000, // ms format
        httpOnly: true,
        sameSite: "strict"
    });
}
