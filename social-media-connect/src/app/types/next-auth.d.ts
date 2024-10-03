// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Updated to string
      name?: string | null;
      email?: string | null;
      subscription?: {
        id: string;
        status: 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'UNPAID'; // Example statuses
        plan: 'BASIC' | 'PRO' | 'ENTERPRISE'; // Example plans
        currentPeriodEnd: string; // Date string or Date type
      } | null;
    };
      
    };
  

  interface User {
    id: string; // Updated to string
    name?: string | null;
    email?: string | null;
    
  }
}
