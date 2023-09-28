// src/custom.d.ts

declare namespace Express {
    export interface Request {
      user?: { id: number }; // Adjust the type as per your actual user object structure
    }
  }
  