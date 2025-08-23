import json
import os
import pickle
import random
import re
from datetime import datetime

class LeoClubChatbot:
    def __init__(self):
        self.intents = None
        self.pipeline = None
        self.responses = {}
        
        try:
            self.load_intents()
            self.load_model()
            print("✅ Chatbot initialized successfully")
        except Exception as e:
            print(f"⚠️  Chatbot initialization error: {e}")
            self.setup_fallback_responses()
    
    def load_intents(self):
        """Load intents from JSON file"""
        try:
            if os.path.exists('leo_club_intents.json'):
                with open('leo_club_intents.json', 'r', encoding='utf-8') as file:
                    self.intents = json.load(file)
                print("✅ Intents loaded successfully")
            else:
                raise FileNotFoundError("leo_club_intents.json not found")
        except Exception as e:
            print(f"❌ Error loading intents: {e}")
            self.setup_default_intents()
    
    def load_model(self):
        """Load the trained model"""
        try:
            if os.path.exists('leo_chatbot_model.pkl'):
                with open('leo_chatbot_model.pkl', 'rb') as file:
                    self.pipeline = pickle.load(file)
                print("✅ Model loaded successfully")
            else:
                raise FileNotFoundError("leo_chatbot_model.pkl not found")
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            self.pipeline = None
    
    def setup_default_intents(self):
        """Setup basic intents if file is missing"""
        self.intents = {
            "intents": [
                {
                    "tag": "greeting",
                    "patterns": ["hello", "hi", "hey", "good morning", "good afternoon"],
                    "responses": ["Hello! I'm your Leo Club assistant. How can I help you today?"]
                },
                {
                    "tag": "goodbye",
                    "patterns": ["bye", "goodbye", "see you later", "thanks"],
                    "responses": ["Goodbye! Feel free to ask if you need more information about Leo Club!"]
                },
                {
                    "tag": "about_leo",
                    "patterns": ["what is leo club", "about leo", "tell me about leo club"],
                    "responses": ["Leo Club is a youth organization for ages 12-18 that focuses on community service, leadership development, and fellowship. We work on various service projects to help our community."]
                },
                {
                    "tag": "membership",
                    "patterns": ["how to join", "membership", "become a member", "join leo club"],
                    "responses": ["To join Leo Club, you need to be between 12-18 years old and have a passion for community service. Contact your local Leo Club advisor for more information about membership requirements."]
                },
                {
                    "tag": "activities",
                    "patterns": ["what activities", "what do you do", "projects", "service"],
                    "responses": ["Leo Clubs participate in various activities including community service projects, fundraising events, environmental initiatives, and leadership training. Each club has unique projects based on community needs."]
                },
                {
                    "tag": "meetings",
                    "patterns": ["when do you meet", "meeting schedule", "meeting times"],
                    "responses": ["Meeting schedules vary by club. Most Leo Clubs meet weekly or bi-weekly. Contact your local Leo Club for specific meeting times and locations."]
                }
            ]
        }
    
    def setup_fallback_responses(self):
        """Setup basic keyword-based responses"""
        self.responses = {
            'greeting': [
                "Hello! I'm your Leo Club assistant. How can I help you today?",
                "Hi there! I'm here to help with Leo Club information. What would you like to know?",
                "Welcome! I can help you learn about Leo Club activities and membership."
            ],
            'goodbye': [
                "Goodbye! Thanks for learning about Leo Club!",
                "See you later! Feel free to ask if you need more Leo Club information.",
                "Bye! Hope to see you at a Leo Club meeting soon!"
            ],
            'leo_club': [
                "Leo Club is a youth organization for ages 12-18 focused on community service and leadership development.",
                "Leo Clubs are part of Lions International, providing young people opportunities to serve their communities.",
                "Leo Club members work together on service projects and develop leadership skills."
            ],
            'membership': [
                "To join Leo Club, you need to be 12-18 years old with interest in community service.",
                "Membership in Leo Club is open to youth who want to make a difference in their community.",
                "Contact your local Leo Club advisor to learn about joining requirements."
            ],
            'activities': [
                "Leo Clubs organize community service projects, fundraising events, and leadership activities.",
                "Activities include environmental projects, helping elderly, youth programs, and more.",
                "Each Leo Club focuses on projects that meet their community's specific needs."
            ],
            'meetings': [
                "Meeting times vary by club - most meet weekly or bi-weekly.",
                "Contact your local Leo Club for specific meeting schedule and location.",
                "Meetings typically include planning service projects and club business."
            ],
            'default': [
                "I'm here to help with Leo Club information. You can ask about membership, activities, meetings, or our mission.",
                "I can provide information about Leo Club activities, how to join, and what we do in the community.",
                "Feel free to ask about Leo Club membership requirements, service projects, or meeting schedules."
            ]
        }
    
    def get_intent_from_text(self, text):
        """Simple keyword-based intent detection"""
        text_lower = text.lower()
        
        # Greeting patterns
        greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening']
        if any(word in text_lower for word in greetings):
            return 'greeting'
        
        # Goodbye patterns
        goodbyes = ['bye', 'goodbye', 'see you', 'thanks', 'thank you']
        if any(word in text_lower for word in goodbyes):
            return 'goodbye'
        
        # Leo Club related
        leo_keywords = ['leo club', 'leo', 'club']
        if any(word in text_lower for word in leo_keywords):
            return 'leo_club'
        
        # Membership related
        membership_keywords = ['join', 'member', 'membership', 'become', 'sign up']
        if any(word in text_lower for word in membership_keywords):
            return 'membership'
        
        # Activities related
        activity_keywords = ['activities', 'do', 'projects', 'service', 'volunteer', 'help']
        if any(word in text_lower for word in activity_keywords):
            return 'activities'
        
        # Meetings related
        meeting_keywords = ['meet', 'meeting', 'when', 'schedule', 'time']
        if any(word in text_lower for word in meeting_keywords):
            return 'meetings'
        
        return 'default'
    
    def get_response(self, user_input):
        """Get response for user input"""
        try:
            if not user_input or not user_input.strip():
                return "I didn't receive your message clearly. Could you please try again?"
            
            user_input = user_input.strip()
            
            # Try using the trained model first
            if self.pipeline and self.intents:
                try:
                    predicted_intent = self.pipeline.predict([user_input])[0]
                    
                    # Find matching intent in intents data
                    for intent in self.intents['intents']:
                        if intent['tag'] == predicted_intent:
                            return random.choice(intent['responses'])
                except Exception as e:
                    print(f"Model prediction error: {e}")
                    # Fall through to keyword-based matching
            
            # Fallback to keyword-based responses
            intent = self.get_intent_from_text(user_input)
            
            if intent in self.responses:
                return random.choice(self.responses[intent])
            else:
                return random.choice(self.responses['default'])
                
        except Exception as e:
            print(f"Error generating response: {e}")
            return "I'm sorry, I encountered an error processing your request. Please try again."
    
    def is_ready(self):
        """Check if chatbot is ready to respond"""
        return self.intents is not None or bool(self.responses)

# Test the chatbot if run directly
if __name__ == "__main__":
    print("Testing Leo Club Chatbot...")
    chatbot = LeoClubChatbot()
    
    test_messages = [
        "Hello",
        "What is Leo Club?",
        "How can I join?",
        "What activities do you do?",
        "When do you meet?",
        "Goodbye"
    ]
    
    for message in test_messages:
        response = chatbot.get_response(message)
        print(f"User: {message}")
        print(f"Bot: {response}")
        print("-" * 40)