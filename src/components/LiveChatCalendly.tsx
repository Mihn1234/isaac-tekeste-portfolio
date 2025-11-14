"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Calendar,
  Send,
  X,
  Clock,
  Video,
  Phone,
  Users,
  CheckCircle,
  Minimize2,
  Maximize2,
  MessageSquare
} from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot" | "agent";
  timestamp: Date;
  type?: "text" | "booking" | "resource";
}

const quickReplies = [
  "Tell me about AI implementation",
  "Schedule a consultation",
  "Pricing information",
  "Download resources",
  "Technical requirements"
];

const consultationTypes = [
  {
    id: "discovery-call",
    title: "Discovery Call",
    duration: "30 minutes",
    price: "Free",
    description: "Initial consultation to understand your needs and explore how AI can transform your financial services.",
    icon: <MessageSquare className="w-5 h-5" />,
    calendlyUrl: "https://calendly.com/isaac-tekeste/discovery-call"
  },
  {
    id: "technical-consultation",
    title: "Technical Deep Dive",
    duration: "60 minutes",
    price: "£300",
    description: "Detailed technical consultation covering implementation strategies, architecture, and roadmap planning.",
    icon: <Video className="w-5 h-5" />,
    calendlyUrl: "https://calendly.com/isaac-tekeste/technical-consultation"
  },
  {
    id: "strategy-session",
    title: "Strategy Session",
    duration: "90 minutes",
    price: "£500",
    description: "Comprehensive strategy session including market analysis, competitive positioning, and transformation roadmap.",
    icon: <Users className="w-5 h-5" />,
    calendlyUrl: "https://calendly.com/isaac-tekeste/strategy-session"
  }
];

export function LiveChatCalendly() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentView, setCurrentView] = useState<"chat" | "booking">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hi! I'm Isaac's AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      type: "text"
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<typeof consultationTypes[0] | null>(null);
  const [showCalendly, setShowCalendly] = useState(false);

  // Simulate bot responses
  const botResponses = {
    "ai implementation": "AI implementation typically involves assessment, pilot projects, and gradual rollout. Isaac specializes in banking AI, voice agents, and risk management systems. Would you like to schedule a discovery call?",
    "pricing": "Isaac offers various consultation packages starting with a free 30-minute discovery call. For detailed pricing on implementation projects, I'd recommend scheduling a technical consultation.",
    "consultation": "Great! Isaac offers three types of consultations: Discovery Call (Free, 30 min), Technical Deep Dive (£300, 60 min), and Strategy Session (£500, 90 min). Which interests you?",
    "schedule": "I can help you schedule a meeting with Isaac. What type of consultation would you prefer?",
    "resources": "We have excellent resources including AI Banking Transformation Guide, Voice Agents Playbook, and Risk Management Framework. Would you like me to share the download links?"
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Analytics tracking
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'chat_message', {
          event_category: 'engagement',
          event_label: 'live_chat',
          value: 1
        });
      }
    }

    // Simulate bot response
    setTimeout(() => {
      const messageText = newMessage.toLowerCase();
      let response = "Thanks for your message! Isaac typically responds within a few hours. For immediate assistance, you can schedule a consultation or download our resources.";

      Object.entries(botResponses).forEach(([key, value]) => {
        if (messageText.includes(key)) {
          response = value;
        }
      });

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
        type: "text"
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
    handleSendMessage();
  };

  const handleBookingSelect = (consultation: typeof consultationTypes[0]) => {
    setSelectedConsultation(consultation);
    setShowCalendly(true);

    // Analytics tracking
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'consultation_booking_start', {
          event_category: 'conversion',
          event_label: consultation.id,
          consultation_type: consultation.title,
          value: consultation.price === "Free" ? 0 : parseInt(consultation.price.replace(/[^0-9]/g, ''))
        });
      }

      if (window.lintrk) {
        window.lintrk('track', {
          conversion_id: 'consultation_booking',
          consultation_type: consultation.id
        });
      }
    }
  };

  // Load Calendly widget
  useEffect(() => {
    if (showCalendly && selectedConsultation) {
      // This would normally load the Calendly widget
      // For demo purposes, we'll simulate it
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showCalendly, selectedConsultation]);

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-teal-600 hover:bg-teal-700 shadow-2xl border-4 border-white"
          size="icon"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </Button>
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <Card className="h-full shadow-2xl border-2 border-teal-100 overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Isaac Tekeste</h3>
                <p className="text-xs opacity-75">AI & Fintech Consultant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <div className="flex gap-2 mt-3">
              <Button
                variant={currentView === "chat" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("chat")}
                className="text-xs"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Chat
              </Button>
              <Button
                variant={currentView === "booking" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("booking")}
                className="text-xs"
              >
                <Calendar className="w-3 h-3 mr-1" />
                Book Call
              </Button>
            </div>
          )}
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex-1 flex flex-col">
            {currentView === "chat" ? (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-96">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                          message.sender === "user"
                            ? "bg-teal-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-3 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Replies */}
                <div className="p-3 border-t">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {quickReplies.slice(0, 3).map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs"
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Booking Options */}
                <div className="p-4 space-y-4 overflow-y-auto">
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Schedule a Consultation</h3>
                    <p className="text-sm text-gray-600">Choose the consultation type that best fits your needs</p>
                  </div>

                  {consultationTypes.map((consultation) => (
                    <Card key={consultation.id} className="border-2 hover:border-teal-200 transition-colors cursor-pointer"
                          onClick={() => handleBookingSelect(consultation)}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                            {consultation.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-800">{consultation.title}</h4>
                              <Badge variant={consultation.price === "Free" ? "secondary" : "default"}>
                                {consultation.price}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{consultation.description}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {consultation.duration}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        )}
      </Card>

      {/* Calendly Modal */}
      <Dialog open={showCalendly} onOpenChange={setShowCalendly}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              {selectedConsultation?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedConsultation?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
            {/* This would normally contain the Calendly iframe */}
            <div className="text-center">
              <Calendar className="w-16 h-16 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {selectedConsultation?.title}
              </h3>
              <p className="text-gray-600 mb-4">
                Duration: {selectedConsultation?.duration} | Price: {selectedConsultation?.price}
              </p>
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => {
                  // In real implementation, this would open Calendly
                  window.open(selectedConsultation?.calendlyUrl, '_blank');
                }}
              >
                Open Calendly Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
