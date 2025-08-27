import React, { useState, useRef, useEffect } from "react";

const LeoChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("online");

  const messagesEndRef = useRef(null);
  const API_BASE_URL = "http://localhost:5000/api/chatbot";
  const healthCheckIntervalRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const checkApiHealth = async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(`${API_BASE_URL}/health`, { method: "GET", signal: controller.signal });
      clearTimeout(timeout);
      if (res.ok) setConnectionStatus("online");
      else setConnectionStatus("offline");
    } catch {
      setConnectionStatus("error");
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { text: inputMessage, sender: "user", id: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    const typingMessageId = Date.now() + 999;
    setMessages((prev) => [...prev, { text: "", sender: "bot", isTyping: true, id: typingMessageId }]);

    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text, sessionId }),
      });
      const data = await res.json();
      setMessages((prev) => prev.filter((m) => m.id !== typingMessageId));
      const botMessage = { text: data.response || "I'm here to help with Leo Club questions!", sender: "bot", id: Date.now() + 1 };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => prev.filter((m) => !m.isTyping));
      setMessages((prev) => [...prev, { text: "Sorry, something went wrong. Please try again.", sender: "bot", id: Date.now() + 2 }]);
      setConnectionStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{ text: "Hello! I'm your Leo Club assistant. How can I help you today?", sender: "bot", id: Date.now() }]);
    setSessionId(Date.now().toString());
  };

  const getStatusIndicator = () => {
    switch (connectionStatus) {
      case "online": return <span className="text-green-500 font-bold">🟢 Online</span>;
      case "offline": return <span className="text-yellow-500 font-bold">🟠 Offline</span>;
      case "error": return <span className="text-red-500 font-bold">🔴 Error</span>;
      default: return <span className="text-gray-500 font-bold">⚪ Unknown</span>;
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      const newSessionId = Date.now().toString();
      setSessionId(newSessionId);
      setMessages([{ text: "Hello! I'm your Leo Club assistant. I can help you with activities, members, projects, and meetings.", sender: "bot", id: Date.now() }]);
      checkApiHealth();
      healthCheckIntervalRef.current = setInterval(checkApiHealth, 10000);
    } else {
      clearInterval(healthCheckIntervalRef.current);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="w-14 h-14 rounded-full bg-purple-700 flex items-center justify-center text-white text-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform" onClick={toggleChat}>🦁</div>
      {isOpen && (
        <div className="mt-2 w-96 h-[550px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
          <div className="flex justify-between items-center p-3 bg-purple-700 text-white font-semibold">
            <div>Leo Club Assistant</div>
            <div className="flex items-center gap-3">
              {getStatusIndicator()}
              <button onClick={clearChat} className="bg-white text-purple-700 px-2 py-1 rounded hover:bg-gray-100 transition">🗑️</button>
              <button onClick={toggleChat} className="bg-white text-purple-700 px-2 py-1 rounded hover:bg-gray-100 transition">×</button>
            </div>
          </div>
          <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`max-w-[75%] p-3 rounded-xl break-words text-sm ${msg.sender === "user" ? "self-end bg-purple-700 text-white" : "self-start bg-gray-200 text-gray-800"} ${msg.isTyping ? "italic" : ""}`}>
                {msg.isTyping ? (
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce delay-300"></span>
                  </span>
                ) : msg.text}
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
          <div className="flex p-3 gap-2 border-t border-gray-300">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Leo Club activities, members, projects..."
              className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-gray-800"
              rows={1}
            />
            <button onClick={sendMessage} className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition">📤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeoChatbot;
