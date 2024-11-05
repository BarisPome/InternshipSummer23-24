"use server"

import { AuthError } from "./constants";

export async function handleAuthError(error: any) {
    if (!error.message) {
        throw new Error(AuthError.UNHANDLED_ERROR)
    } else if (error.message.includes("rate limit")) {
        throw new Error(AuthError.EMAIL_RATE_LIMIT_EXCEEDED);
    } else if (error.message.includes("invalid email")) {
        throw new Error(AuthError.INVALID_EMAIL);
    } else if (error.message.includes("invalid password")) {
        throw new Error(AuthError.INVALID_PASSWORD);
    } else if (error.message.includes("weak password")) {
        throw new Error(AuthError.WEAK_PASSWORD); 
    } else {
        throw new Error(error.message);
    }
}