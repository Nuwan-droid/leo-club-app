from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from chatbot_handler import LeoClubChatbot
import os
import nltk

# Download required NLTK data
try:
    nltk.download('punkt', quiet=True)
    nltk.download('wordnet', quiet=True)
    nltk.download('stopwords', quiet=True)
    nltk.download('omw-1.4', quiet=True)
except:
    pass

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://localhost:3001"])

# Initialize the chatbot
chatbot = LeoClubChatbot()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                'error': 'No message provided',
                'status': 'error'
            }), 400
        
        user_message = data['message'].strip()
        
        if not user_message:
            return jsonify({
                'error': 'Empty message',
                'status': 'error'
            }), 400
        
        # Get response from chatbot
        bot_response = chatbot.get_response(user_message)
        
        return jsonify({
            'response': bot_response,
            'status': 'success',
            'user_message': user_message
        })
        
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({
            'error': 'Internal server error. Please try again.',
            'status': 'error'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'Leo Club Chatbot API is running',
        'chatbot_ready': chatbot.pipeline is not None
    })

@app.route('/api/intents', methods=['GET'])
def get_intents():
    """Get available intents for debugging"""
    if chatbot.intents:
        intent_tags = [intent['tag'] for intent in chatbot.intents['intents']]
        return jsonify({
            'intents': intent_tags,
            'total': len(intent_tags)
        })
    return jsonify({'error': 'Intents not loaded'}), 500

if __name__ == '__main__':
    print("Starting Leo Club Chatbot API...")
    print("Make sure you have placed the following files in this directory:")
    print("- leo_chatbot_model.pkl")
    print("- leo_club_intents.json")
    
    # Check if required files exist
    required_files = ['leo_chatbot_model.pkl', 'leo_club_intents.json']
    missing_files = [f for f in required_files if not os.path.exists(f)]
    
    if missing_files:
        print(f"Warning: Missing files: {missing_files}")
        print("Please download these files from Google Colab and place them in this directory.")
    
    app.run(debug=True, port=5000, host='0.0.0.0')
