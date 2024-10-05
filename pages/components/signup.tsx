'use client'
import { useState } from 'react';
import { doCreateUserWithEmailAndPassword } from '../api/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
        await doCreateUserWithEmailAndPassword(email, password);
        setEmail('');
        setPassword('');
    } catch (e) {
        console.error(e);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    backgroundColor: '#1f1f1f',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  heading: {
    color: '#fff',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  input: {
    marginBottom: '1rem',
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#333',
    color: '#fff',
    outline: 'none',
  },
  button: {
    padding: '0.8rem',
    fontSize: '1rem',
    backgroundColor: '#6200ee',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default SignUp;
