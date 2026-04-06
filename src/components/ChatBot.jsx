import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import axios from 'axios';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'model', parts: [{ text: "Hi there! I'm Printifyy AI. How can I help you today?" }] }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const handleSend = async () => {
        if (!message.trim()) return;

        const userMessage = { role: 'user', parts: [{ text: message }] };
        setChatHistory(prev => [...prev, userMessage]);
        setMessage('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/ai/chat', {
                message: message,
                history: chatHistory
            });

            setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: response.data.text }] }]);
        } catch (error) {
            setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: "Sorry, I'm having some trouble connecting. Please try again later." }] }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col backdrop-blur-lg bg-opacity-90"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex justify-between items-center shadow-lg">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Printifyy AI</h3>
                                    <p className="text-[10px] opacity-80 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                        Online Support
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white hover:bg-opacity-10 rounded-full transition"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-200">
                            {chatHistory.map((chat, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: chat.role === 'user' ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                        chat.role === 'user' 
                                            ? 'bg-blue-600 text-white rounded-tr-none' 
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
                                    }`}>
                                        {chat.parts[0].text}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin text-blue-600" />
                                        <span className="text-xs text-gray-500">AI is thinking...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900 bg-opacity-50">
                            <div className="relative flex items-center">
                                <input 
                                    type="text" 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your question..."
                                    className="w-full p-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm dark:text-white"
                                />
                                <button 
                                    onClick={handleSend}
                                    disabled={isLoading || !message.trim()}
                                    className="absolute right-2 p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 dark:hover:bg-opacity-30 rounded-lg transition disabled:opacity-50"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                            <p className="text-[10px] text-center mt-2 text-gray-400">
                                Powered by Printifyy AI • Gemini 1.5 Flash
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center group relative overflow-hidden"
            >
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
                </motion.div>
                
                {!isOpen && (
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap ml-0 group-hover:ml-2 font-semibold">
                        Ask AI
                    </span>
                )}
                
                {/* Ping Indicator */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border-2 border-white"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default ChatBot;
