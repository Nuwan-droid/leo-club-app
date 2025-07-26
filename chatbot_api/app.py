from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot_handler import LeoClubChatbot

import nltk  # Import NLTK here for global downloads if needed

# Download NLTK data globally before initializing anything
nltk.download('punkt', quiet=True)
nltk.download('wordnet', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('omw-1.4', quiet=True)

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173/chatbot"])  # Adjust if your React port is different (e.g., add "http://localhost:3000")

# Initialize the chatbot
chatbot = LeoClubChatbot()

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        
        # Check if 'message' key exists
        if not data or 'message' not in data:
            return jsonify({'error': 'No message provided', 'status': 'error'}), 400
        
        user_message = data['message'].strip()
        
        if len(user_message) > 200:
            return jsonify({'response': 'Keep questions concise.', 'status': 'success'})
        
        response = chatbot.get_response(user_message)
        return jsonify({'response': response, 'status': 'success'})
    
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({'error': 'An internal error occurred. Please try again.', 'status': 'error'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')
