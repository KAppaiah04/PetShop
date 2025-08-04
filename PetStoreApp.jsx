import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PetStoreApp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hi! I'm your pet assistant. How can I help you today? 🐾", isBot: true }
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Services carousel data
  const services = [
    {
      id: 1,
      title: "Professional Grooming",
      description: "Keep your furry friend looking and feeling their best",
      image: "https://images.pexels.com/photos/4588040/pexels-photo-4588040.jpeg?auto=compress&w=400&h=250&fit=crop",
      icon: "🛁",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Health Check-ups",
      description: "Regular health check-ups and vaccinations",
      image: "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&w=400&h=250&fit=crop",
      icon: "🏥",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "Food Delivery",
      description: "Premium pet food delivered to your doorstep",
      image: "https://images.pexels.com/photos/4587991/pexels-photo-4587991.jpeg?auto=compress&w=400&h=250&fit=crop",
      icon: "🛒",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 4,
      title: "Activity Events",
      description: "Fun pet events and training sessions",
      image: "https://images.pexels.com/photos/4588057/pexels-photo-4588057.jpeg?auto=compress&w=400&h=250&fit=crop",
      icon: "🎉",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 5,
      title: "Pet Adoption",
      description: "Find your perfect companion",
      image: "https://images.pexels.com/photos/4587973/pexels-photo-4587973.jpeg?auto=compress&w=400&h=250&fit=crop",
      icon: "🏠",
      color: "from-pink-500 to-pink-600"
    }
  ];

  // Pet of the Month data
  const petOfTheMonth = {
    name: "Luna",
    breed: "Golden Retriever",
    age: "2 years old",
    image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&w=400&h=400&fit=crop",
    description: "Luna is a sweet and energetic Golden Retriever who loves playing fetch and going for long walks. She's great with kids and other pets, making her the perfect family companion."
  };

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [services.length]);

  // Enhanced chatbot responses
  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('grooming')) {
      return "We offer professional grooming services including baths, haircuts, nail trimming, and ear cleaning. Prices start at $45. Would you like to book an appointment?";
    } else if (lowerMessage.includes('daycare') || lowerMessage.includes('timing')) {
      return "Our daycare hours are Monday-Friday 7AM-7PM, Saturday 8AM-6PM, and Sunday 9AM-5PM. We offer both half-day and full-day options.";
    } else if (lowerMessage.includes('vet') || lowerMessage.includes('appointment')) {
      return "You can book a vet appointment by calling us at (555) 123-4567 or through our online booking system. We have appointments available Monday-Saturday.";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Our services range from $25 for basic check-ups to $150 for comprehensive grooming packages. Would you like a detailed price list?";
    } else if (lowerMessage.includes('adopt') || lowerMessage.includes('puppy')) {
      return "We have several adorable puppies available for adoption! Visit our adoption section to see all available pets and start the application process.";
    } else if (lowerMessage.includes('food') || lowerMessage.includes('delivery')) {
      return "We offer premium pet food delivery service! Fresh, nutritious food delivered right to your doorstep. Orders over $50 get free delivery.";
    } else if (lowerMessage.includes('event') || lowerMessage.includes('activity')) {
      return "Join our fun pet events! We host training sessions, pet socials, and adoption events every month. Check our events calendar for upcoming activities.";
    } else {
      return "I'm here to help with any pet-related questions! You can ask about grooming, daycare, vet appointments, adoption, pricing, food delivery, or events.";
    }
  };

  const handleSendMessage = (message) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), text: message, isBot: false };
    setChatMessages(prev => [...prev, userMessage]);

    // Add bot response
    setTimeout(() => {
      const botResponse = { id: Date.now() + 1, text: getBotResponse(message), isBot: true };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-md shadow-lg border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🐾</span>
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Paws & Whiskers</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} hover:scale-110 transition-all duration-300`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-8">
        <div className="w-full min-h-[400px] relative overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex items-center justify-center h-full py-16 px-4">
            <div className="text-center text-white max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                Welcome to <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Paws & Whiskers</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 font-light">
                Your trusted partner for all things pets 🐾
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#services" className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                  Explore Services
                </a>
                <a href="#gallery" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-105">
                  Meet Our Pets
                </a>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 text-4xl animate-bounce">🐕</div>
          <div className="absolute top-20 right-20 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🐱</div>
          <div className="absolute bottom-20 left-20 text-3xl animate-bounce" style={{animationDelay: '1s'}}>🐾</div>
          <div className="absolute bottom-10 right-10 text-4xl animate-bounce" style={{animationDelay: '1.5s'}}>🦮</div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Pet of the Month Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Pet of the Month
          </h2>
          <div className={`rounded-2xl p-8 shadow-lg border-2 ${isDarkMode ? 'bg-gray-800/50 border-gray-600' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300'} text-center relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-400 to-pink-400`}></div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src={petOfTheMonth.image} 
                  alt={petOfTheMonth.name} 
                  className="w-48 h-48 object-cover rounded-full shadow-xl mb-4 border-4 border-white transition-all duration-300 mx-auto hover:scale-110 hover:shadow-2xl"
                />
              </div>
              <div>
                <h3 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>{petOfTheMonth.name}</h3>
                <p className={`text-lg mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{petOfTheMonth.breed} • {petOfTheMonth.age}</p>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{petOfTheMonth.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Learn About Pet Care Video Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Learn About Pet Care
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
              <div className="aspect-video">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/V4LnorVVxfw" 
                  title="Navigating Pet Care: Daycare Tips and Veterinary Insights"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Navigating Pet Care: Daycare Tips and Veterinary Insights</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Essential tips for pet daycare and veterinary care from industry experts.</p>
              </div>
            </div>
            
            <div className={`rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
              <div className="aspect-video">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/bwPjzH1a0Kc" 
                  title="South Side Shop: Keeping Your Pet Healthy, Happy and Pampered"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>South Side Shop: Keeping Your Pet Healthy, Happy and Pampered</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Comprehensive guide to keeping your pets healthy, happy, and well-groomed.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Enhanced Services Carousel */}
        <section id="services" className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Our Services
          </h2>
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {services.map((service, index) => (
                  <div key={service.id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4">
                    <motion.div 
                      className={`rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                      <div className="p-6">
                        <div className="text-3xl mb-3">{service.icon}</div>
                        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {service.title}
                        </h3>
                        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {service.description}
                        </p>
                        <button className={`bg-gradient-to-r ${service.color} text-white px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg`}>
                          Learn More
                        </button>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
              
              {/* Enhanced Gradient Overlays */}
              <div className={`absolute left-0 top-0 bottom-0 w-16 pointer-events-none z-10 ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-transparent' : 'bg-gradient-to-r from-white to-transparent'}`}></div>
              <div className={`absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-10 ${isDarkMode ? 'bg-gradient-to-l from-gray-800 to-transparent' : 'bg-gradient-to-l from-white to-transparent'}`}></div>
            </div>

            {/* Enhanced Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>

            {/* Enhanced Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-blue-500' 
                      : isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>


      </div>

      {/* Enhanced Floating Chatbot Button */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
      >
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          <span className="font-semibold text-sm hidden sm:block group-hover:scale-105 transition-transform duration-300">Ask Us</span>
        </div>
      </button>

      {/* Enhanced Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed bottom-24 right-6 z-50 w-80 h-96 rounded-2xl shadow-2xl border flex flex-col ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🐕</span>
                <div>
                  <h3 className="font-bold">Pet Assistant</h3>
                  <p className="text-sm opacity-90">Ask me anything!</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-gray-200 transition-colors duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs px-4 py-3 rounded-2xl ${
                    message.isBot 
                      ? `${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800'}` 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Enhanced Chat Input */}
            <EnhancedChatInput onSendMessage={handleSendMessage} isDarkMode={isDarkMode} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Chat Input Component
const EnhancedChatInput = ({ onSendMessage, isDarkMode }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 border-t rounded-b-2xl ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
      <div className="flex space-x-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything about pets..."
          className={`flex-1 px-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base min-h-[50px] ${
            isDarkMode 
              ? 'bg-gray-600 border-gray-500 text-gray-200 placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
          }`}
          rows="2"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button 
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center min-h-[50px]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

// Original Chat Input Component (keeping for compatibility)
const ChatInput = ({ onSendMessage, isDarkMode }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
      <div className="flex space-x-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything about pets..."
          className={`flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-500 resize-none`}
          rows="1"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button 
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default PetStoreApp; 