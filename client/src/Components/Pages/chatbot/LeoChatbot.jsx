import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './LeoChatbot.css';

const LeoChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm your Leo Club assistant. I can help you with information about our activities, membership, meetings, and leadership opportunities. What would you like to know?", 
      sender: 'bot',
      timestamp: new Date(),
      id: Date.now()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('online');
  const messagesEndRef = useRef(null);
  const retryTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check API health on mount
  useEffect(() => {
    if (isOpen) {
      checkApiHealth();
    }
  }, [isOpen]);

  const checkApiHealth = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/health', {
        timeout: 5000
      });
      setConnectionStatus('online');
      setError(null);
    } catch (error) {
      setConnectionStatus('offline');
      setError('API connection failed');
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { 
      text: inputMessage, 
      sender: 'user',
      timestamp: new Date(),
      id: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const messageToSend = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: messageToSend
      }, {
        timeout: 15000, // Increased timeout
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data && response.data.status === 'success') {
        const botMessage = { 
          text: response.data.response, 
          sender: 'bot',
          timestamp: new Date(),
          id: Date.now() + 1
        };
        setMessages(prev => [...prev, botMessage]);
        setConnectionStatus('online');
      } else {
        throw new Error(response.data?.error || 'Invalid response format');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setConnectionStatus('error');
      
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. The server might be busy. Please try again.';
        setError('Request timeout');
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. The chatbot service might be having issues.';
        setError('Server error');
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid request. Please check your message format.';
        setError('Bad request');
      } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        errorMessage = 'Cannot connect to the chatbot service. Please check if the server is running on port 5000.';
        setError('Network error');
      } else if (!navigator.onLine) {
        errorMessage = 'No internet connection. Please check your connection.';
        setError('No connection');
      } else {
        errorMessage = `Connection failed: ${error.message || 'Unknown error'}`;
        setError('Connection error');
      }
      
      const errorBotMessage = { 
        text: errorMessage, 
        sender: 'bot',
        timestamp: new Date(),
        isError: true,
        id: Date.now() + 2
      };
      setMessages(prev => [...prev, errorBotMessage]);

      // Auto-retry after 3 seconds for network errors
      if (error.code === 'ERR_NETWORK') {
        retryTimeoutRef.current = setTimeout(() => {
          checkApiHealth();
        }, 3000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      { 
        text: "Hello! I'm your Leo Club assistant. How can I help you today?", 
        sender: 'bot',
        timestamp: new Date(),
        id: Date.now()
      }
    ]);
    setError(null);
    setConnectionStatus('online');
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'online': return '🟢 Online';
      case 'offline': return '🟠 Offline';
      case 'error': return '🔴 Error';
      default: return '🟡 Connecting';
    }
  };

  const retryConnection = async () => {
    setConnectionStatus('connecting');
    await checkApiHealth();
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`leo-chatbot-container ${isOpen ? 'open' : ''}`}>
      <div className="leo-chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        🦁
      </div>
      
      {isOpen && (
        <div className="leo-chatbot-window">
          <div className="leo-chatbot-header">
            <div>
              <h3>Leo Club Assistant</h3>
              <span className="status-indicator" onClick={retryConnection} title="Click to retry connection">
                {getStatusIcon()}
                {error && ` (${error})`}
              </span>
            </div>
            <div className="header-buttons">
              <button onClick={clearChat} title="Clear chat" disabled={isLoading}>
                🗑️
              </button>
              <button onClick={() => setIsOpen(false)} title="Close">
                ×
              </button>
            </div>
          </div>
          
          <div className="leo-chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender} ${message.isError ? 'error' : ''}`}>
                <div className="message-text">{message.text}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="message-text typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {connectionStatus === 'offline' && (
            <div className="connection-warning">
              ⚠️ Chatbot service is offline. <button onClick={retryConnection}>Retry</button>
            </div>
          )}
          
          <div className="leo-chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Leo Club activities, membership..."
              disabled={isLoading || connectionStatus === 'offline'}
              maxLength={500}
              aria-label="Chat message input"
            />
            <button 
              onClick={sendMessage} 
              disabled={isLoading || !inputMessage.trim() || connectionStatus === 'offline'}
              title="Send message"
              aria-label="Send message"
            >
              {isLoading ? '⏳' : '📤'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeoChatbot;