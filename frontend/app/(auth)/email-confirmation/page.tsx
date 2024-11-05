import React, { CSSProperties } from 'react';

export default function EmailConfirmation() {
    return (
        <div style={styles.container}>
            <img 
                src="/favicon.ico" 
                alt="Email Confirmation" 
                style={styles.image} 
            />
            <h1 style={styles.heading}>Confirmation Link Sent to Your Email</h1>
            <p style={styles.paragraph}>
                A confirmation link has been sent to your email. Please check your inbox and follow the instructions to confirm your email.
            </p>
        </div>
    );
}

const styles: Record<string, CSSProperties> = {
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
        // Make sure to complete the style definition for paragraph
    },
};