import json
import joblib
import random
import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import numpy as np

class LeoClubChatbot:
    def __init__(self):
        try:
            # Load the trained model
            self.pipeline = joblib.load('leo_chatbot_model.pkl')
            
            # Load intents data
            with open('leo_club_intents.json', 'r') as f:
                self.intents = json.load(f)
            
            # Initialize preprocessing tools
            self.lemmatizer = WordNetLemmatizer()
            self.stop_words = set(stopwords.words('english'))
            
            print("Leo Club Chatbot initialized successfully!")
            
        except Exception as e:
            print(f"Error initializing chatbot: {e}")
            self.pipeline = None
            self.intents = None
    
    def preprocess_message(self, message):
        if not message:
            return ""
        
        words = nltk.word_tokenize(message.lower())
        words = [self.lemmatizer.lemmatize(word) for word in words 
                if word.isalnum() and word not in self.stop_words]
        return ' '.join(words)
    
    def predict_intent(self, message):
        if not self.pipeline:
            return "unknown", 0.0
        
        processed_message = self.preprocess_message(message)
        if not processed_message:
            return "unknown", 0.0
        
        try:
            predicted_intent = self.pipeline.predict([processed_message])[0]
            confidence = max(self.pipeline.predict_proba([processed_message])[0])
            return predicted_intent, confidence
        except Exception as e:
            print(f"Prediction error: {e}")
            return "unknown", 0.0
    
    def get_response(self, message):
        if not self.intents:
            return "Sorry, I'm currently unavailable. Please try again later."
        
        intent, confidence = self.predict_intent(message)
        
        # Low confidence or unknown intent
        if confidence < 0.3 or intent == "unknown":
            return "I'm sorry, I can only help with Leo Club related questions. You can ask me about our activities, membership, meetings, leadership opportunities, or general information about Leo Club."
        
        # Find the intent and return a random response
        for intent_data in self.intents['intents']:
            if intent_data['tag'] == intent:
                return random.choice(intent_data['responses'])
        
        return "I'm here to help with Leo Club information. What would you like to know about our organization?"

