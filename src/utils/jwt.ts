// src/utils/jwt.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET || 'your-secret-key';

export function generateToken(userId: number): string {
  const token = jwt.sign({ id: userId }, secret, { expiresIn: process.env.JWT_LIFETIME });
  return token;
}

export function verifyToken(token: string): { id: number } {
  return jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
}

