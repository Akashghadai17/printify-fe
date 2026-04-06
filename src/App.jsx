import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

// API Configuration
const API_BASE = 'http://localhost:3000/api';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Auth Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Chat State
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('printify_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const res = await axios.post(`${API_BASE}${endpoint}`, formData);
      
      const userData = {
        ...res.data.user,
        token: res.data.token
      };
      
      localStorage.setItem('printify_user', JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('printify_user');
    setUser(null);
    setMessages([]);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Map local messages to backend history format
      const history = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const res = await axios.post(`${API_BASE}/ai/chat`, {
        message: input,
        history: history
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      setMessages(prev => [...prev, { role: 'ai', content: res.data.text }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', content: "Failed to connect to AI. Please check server." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!user) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <h2>Printifyy</h2>
          {error && <div className="error-message">{error}</div>}
          <form className="auth-form" onSubmit={handleAuth}>
            {!isLogin && (
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your name"
                />
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                required 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>
          <div className="auth-switch">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a href="#" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Login'}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-page">
      <header className="chat-header">
        <h1>Printifyy AI Assistant</h1>
        <div className="user-info">
          <span>{user.name}</span>
          <button onClick={handleLogout} className="logout-btn ml-4">Logout</button>
        </div>
      </header>

      <main className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-screen">
            <h2>Welcome, {user.name}!</h2>
            <p>I'm your Printifyy Assistant. How can I help with your printing needs today?</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))
        )}
        {isTyping && <div className="typing-indicator">AI is thinking...</div>}
        <div ref={messagesEndRef} />
      </main>

      <form className="input-area" onSubmit={sendMessage}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about printing, prices, or delivery..."
          disabled={isTyping}
        />
        <button type="submit" className="send-btn" disabled={isTyping || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default App;
`,Description:
