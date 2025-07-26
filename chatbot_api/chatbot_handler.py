import json
import joblib
import random
import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

class LeoClubChatbot:
    def __init__(self):
        # Download required NLTK data quietly (only if not already downloaded)
        nltk.download('punkt', quiet=True)
        nltk.download('wordnet', quiet=True)
        nltk.download('stopwords', quiet=True)
        nltk.download('omw-1.4', quiet=True)
        
        try:
            # Load the trained AI model
            self.pipeline = joblib.load('leo_chatbot_model.pkl')
        except Exception as e:
            print(f"Error loading model: {e}")
            self.pipeline = None
        
        try:
            # Load the intents data
            with open('leo_club_intents.json', 'r') as f:
                self.intents = json.load(f)
        except Exception as e:
            print(f"Error loading intents: {e}")
            self.intents = None
        
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))
        self.valid_keywords = {'leo', 'club', 'leadership', 'experience', 'opportunity', 'navigate', 'events', 'members'}

    def clean_message(self, message):
        words = nltk.word_tokenize(message.lower())
        words = [self.lemmatizer.lemmatize(word) for word in words if word.isalnum() and word not in self.stop_words]
        return ' '.join(words)

    def is_leo_related(self, message):
        words = set(self.clean_message(message).split())
        return bool(words.intersection(self.valid_keywords))

    def get_response(self, message):
        if self.pipeline is None or self.intents is None:
            return "Sorry, the chatbot is not properly initialized. Please check the server."
        
        if not self.is_leo_related(message):
            return "I can only help with Leo Club information and website navigation."
        
        clean_msg = self.clean_message(message)
        predicted_intent = self.pipeline.predict([clean_msg])[0]
        confidence = max(self.pipeline.predict_proba([clean_msg])[0])
        
        if confidence < 0.3:
            return "Please ask about Leo Club topics."
        
        for intent_data in self.intents['intents']:
            if intent_data['tag'] == predicted_intent:
                return random.choice(intent_data['responses'])
        
        return "I'm here to help with Leo Club information."
