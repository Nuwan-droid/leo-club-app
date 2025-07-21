import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './LeoChatbot.css';

const LeoChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm your Leo Club assistant. I can help you with information about our activities, membership, meetings, and leadership opportunities. What would you like to know?", 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { 
      text: inputMessage, 
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5001/api/chat', {
        message: inputMessage
      }, {
        timeout: 10000 // 10 second timeout
      });

      if (response.data.status === 'success' && response.data.response) {
        const botMessage = { 
          text: response.data.response, 
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(response.data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Connection error');
      
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please check if the chatbot service is running.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (!navigator.onLine) {
        errorMessage = 'No internet connection. Please check your connection.';
      }
      
      const errorBotMessage = { 
        text: errorMessage, 
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorBotMessage]);
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
        timestamp: new Date()
      }
    ]);
    setError(null);
  };

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
              <span className="status-indicator">
                {error ? '🔴 Connection Error' : '🟢 Online'}
              </span>
            </div>
            <div className="header-buttons">
              <button onClick={clearChat} title="Clear chat">🗑️</button>
              <button onClick={() => setIsOpen(false)} title="Close">×</button>
            </div>
          </div>
          
          <div className="leo-chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender} ${message.isError ? 'error' : ''}`}>
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
          
          <div className="leo-chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Leo Club activities, membership..."
              disabled={isLoading}
              maxLength={500}
            />
            <button 
              onClick={sendMessage} 
              disabled={isLoading || !inputMessage.trim()}
              title="Send message"
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
