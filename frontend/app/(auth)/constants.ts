export enum AuthError {
    EMAIL_RATE_LIMIT_EXCEEDED = "email_rate_limit_exceeded",
    INVALID_EMAIL = "invalid_email",
    INVALID_PASSWORD = "invalid_password",
    INVALID_OR_EXPIRED_CODE = "invalid_or_expired_code",
    FAILED_TO_AUTHENTICATE = "failed_to_authenticate",
    FAILED_TO_CHECK_SESSION = "failed_to_check_session",
    FAILED_TO_RESET_PASSWORD = "failed_to_reset_password",
    FAILED_TO_SIGN_OUT = "failed_to_sign_out",
    NO_RESET_CODE_PROVIDED = "no_reset_code_provided",
    UNMATCHED_PASSWORDS = "unmatched_passwords",
    WEAK_PASSWORD = "weak_password",
    UNHANDLED_ERROR = "unhandled_error"
}

export enum AuthSuccess {
    SUCCEEDED_TO_SIGN_OUT = "succeeded_to_sign_out",
    SUCCEEDED_TO_RESET_PASSWORD = "succeeded_to_reset_password",
}

export const authErrorMessages = {
    [AuthError.EMAIL_RATE_LIMIT_EXCEEDED]: "Email rate limit exceeded. Please try again later.",
    [AuthError.INVALID_EMAIL]: "Invalid email address. Please enter a valid email.",
    [AuthError.INVALID_PASSWORD]: "Invalid password. Please enter a valid password.",
    [AuthError.INVALID_OR_EXPIRED_CODE]: "Invalid or expired reset code. Please try again later.",
    [AuthError.FAILED_TO_AUTHENTICATE]: "Unable to authenticate user. Please try again later.",
    [AuthError.FAILED_TO_CHECK_SESSION]: "Failed to check session. Please try again later.",
    [AuthError.FAILED_TO_RESET_PASSWORD]: "Failed to reset password. Please try again later.",
    [AuthError.FAILED_TO_SIGN_OUT]: "Failed to sign out. Please try again later.",
    [AuthError.NO_RESET_CODE_PROVIDED]: "No reset code provided.",
    [AuthError.UNMATCHED_PASSWORDS]: "Passwords do not match.",
    [AuthError.WEAK_PASSWORD]: "Password is too weak. Please choose a stronger password.",
    [AuthError.UNHANDLED_ERROR]: "An unexpected error occurred. Please try again later."
}

export const authSuccessMessages = {
    [AuthSuccess.SUCCEEDED_TO_SIGN_OUT]: "Sign out successful.",
    [AuthSuccess.SUCCEEDED_TO_RESET_PASSWORD]: "Password reset successful."
}