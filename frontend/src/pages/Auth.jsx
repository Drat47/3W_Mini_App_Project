import { useState } from 'react';
import axios from 'axios';
import { FaUser, FaLock, FaEnvelope, FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';

const Auth = ({ setUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const apiUrl = import.meta.env.VITE_API_URL;
        const url = isLogin ? `${apiUrl}/auth/login` : `${apiUrl}/auth/register`;

        try {
            const res = await axios.post(url, formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);
        } catch (err) {
            setError(err.response?.data?.msg || err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">{isLogin ? 'Login' : 'Sign Up'}</h2>

                {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-group">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                name="username"
                                className="auth-input"
                                placeholder="Type your username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            name="email"
                            className="auth-input"
                            placeholder={isLogin ? "Type your email" : "Type your email"}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            name="password"
                            className="auth-input"
                            placeholder="Type your password"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {isLogin && <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#777', marginBottom: '20px' }}>Forgot password?</div>}

                    <button className="auth-btn">
                        {isLogin ? 'LOGIN' : 'SIGN UP'}
                    </button>
                </form>

                <div className="social-login">
                    <p style={{ fontSize: '0.9rem', color: '#777' }}>Or Sign Up Using</p>
                    <div className="social-icons">
                        <div className="social-icon facebook"><FaFacebookF /></div>
                        <div className="social-icon twitter"><FaTwitter /></div>
                        <div className="social-icon google"><FaGoogle /></div>
                    </div>
                </div>

                <div style={{ marginTop: '40px' }}>
                    <p style={{ fontSize: '0.9rem' }}>
                        {isLogin ? "Or Sign Up Using" : "Already have an account?"}
                    </p>
                    <a
                        style={{ fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none', color: '#333', fontSize: '1rem', textTransform: 'uppercase' }}
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'SIGN UP' : 'LOGIN'}
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Auth;
