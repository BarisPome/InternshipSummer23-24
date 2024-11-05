"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { handleAuthError } from "./helpers";
import { AuthError } from "./constants";

export async function handleSignIn(email: string, password: string) {
    const supabase = createClient();
    const { error }: any = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        await handleAuthError(error);
    }

    revalidatePath('/', 'layout')
    redirect("/")
};

export async function handleSignUp(email: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
        throw new Error(AuthError.UNMATCHED_PASSWORDS);
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
        await handleAuthError(error);
    }

    // @TODO: Add check your inbox page, after signing up no informative message is displayed yet
    // @TODO: Add home page as the redirect url of confirmation email not the sign in page 
    revalidatePath('/', 'layout'); // Make sure revalidatePath is defined
    redirect("/email-confirmation"); // Make sure redirect is defined
};

export async function handleSignOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
        
    if (error) {
        throw new Error(AuthError.FAILED_TO_SIGN_OUT);
    }
     
    redirect("/sign-in");
};  

export async function handleForgotPassword(email: string) {
    const origin = headers().get('origin');
    const supabase = createClient();
    const { error } : any = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/reset-password` });

    if (error) {
        await handleAuthError(error);
    }

    redirect("/reset-link?message=ResetLinkSent");
}

export async function handleResetPassword(password: string, confirmPassword: string, code: string | null) {
    const supabase = createClient();
    const { data: sessionData, error: sessionCheckError } = await supabase.auth.getSession();
    
    if (sessionCheckError) {
        throw new Error(AuthError.FAILED_TO_CHECK_SESSION);
    }

    if (code === null) {
        throw new Error(AuthError.INVALID_OR_EXPIRED_CODE);
    }

    if (!sessionData.session) {
        const supabase = createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
            return redirect("/reset-password?message=Invalid or expired link");
        }
    }    

    if (password !== confirmPassword) {
        throw new Error(AuthError.UNMATCHED_PASSWORDS);
    }
    
    const { error } = await supabase.auth.updateUser({ password });
    
    if (error) {
        await handleAuthError(error)
    }

    redirect("/sign-in?message=PasswordResetSuccess");
}