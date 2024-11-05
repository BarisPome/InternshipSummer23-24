import React from 'react';

export default function ResetLink() {
    return (
        <div style={styles.container}>
            <img 
                src="/favicon.ico" 
                alt="Reset Password" 
                style={styles.image} 
            />
            <h1 style={styles.heading}>Reset Link Sent</h1>
            <p style={styles.paragraph}>
                A reset link has been sent to your email. Please check your inbox and follow the instructions to reset your password.
            </p>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
    },
    image: {
        width: 'auto',
        height: '100px',
        marginBottom: '20px',
    },
    heading: {
        fontSize: '2em',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
    },
    paragraph: {
        fontSize: '1em',
        color: '#666',
    },
};
