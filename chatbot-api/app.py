from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
import json
import nltk
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Download required NLTK data
try:
    nltk.download('punkt', quiet=True)
    nltk.download('wordnet', quiet=True)
    nltk.download('stopwords', quiet=True)
    nltk.download('omw-1.4', quiet=True)
    logger.info("NLTK data downloaded successfully")
except Exception as e:
    logger.warning(f"Failed to download NLTK data: {e}")

app = Flask(__name__)

# Fix CORS - allow all origins for development, specify exact origins for production
CORS(app, origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"])

# Initialize chatbot with error handling
chatbot = None
try:
    from chatbot_handler import LeoClubChatbot
    chatbot = LeoClubChatbot()
    logger.info("Chatbot initialized successfully")
except ImportError as e:
    logger.error(f"Failed to import chatbot_handler: {e}")
    chatbot = None
except Exception as e:
    logger.error(f"Failed to initialize chatbot: {e}")
    chatbot = None

# Fallback responses when chatbot is not available
FALLBACK_RESPONSES = {
    "greeting": "Hello! I'm your Leo Club assistant. Unfortunately, I'm experiencing some technical difficulties right now.",
    "default": "I'm sorry, I'm currently unable to process your request due to technical issues. Please try again later.",
    "error": "I encountered an error while processing your request. Please try again."
}

def get_fallback_response(user_message):
    """Provide basic responses when main chatbot is unavailable"""
    user_message_lower = user_message.lower()
    
    greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening']
    leo_keywords = ['leo club', 'leo', 'activities', 'membership', 'meeting', 'volunteer']
    
    if any(greeting in user_message_lower for greeting in greetings):
        return FALLBACK_RESPONSES["greeting"]
    elif any(keyword in user_message_lower for keyword in leo_keywords):
        return "I'd love to help you with Leo Club information, but I'm currently experiencing technical difficulties. Please try again in a few minutes or contact your Leo Club advisor directly."
    else:
        return FALLBACK_RESPONSES["default"]

@app.route('/')
def home():
    try:
        return render_template('index.html')
    except Exception as e:
        logger.error(f"Error rendering home page: {e}")
        return jsonify({'error': 'Unable to load home page'}), 500

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        return jsonify({'status': 'ok'}), 200
    
    try:
        # Validate request content type
        if not request.is_json:
            return jsonify({
                'error': 'Request must be JSON',
                'status': 'error'
            }), 400
        
        data = request.get_json(force=True)
        
        if not data:
            return jsonify({
                'error': 'Invalid JSON data',
                'status': 'error'
            }), 400
            
        if 'message' not in data:
            return jsonify({
                'error': 'No message field provided',
                'status': 'error'
            }), 400
        
        user_message = data['message']
        
        # Validate message type and content
        if not isinstance(user_message, str):
            return jsonify({
                'error': 'Message must be a string',
                'status': 'error'
            }), 400
            
        user_message = user_message.strip()
        
        if not user_message:
            return jsonify({
                'error': 'Message cannot be empty',
                'status': 'error'
            }), 400
        
        # Length validation
        if len(user_message) > 500:
            return jsonify({
                'error': 'Message too long (max 500 characters)',
                'status': 'error'
            }), 400
        
        logger.info(f"Received message: {user_message}")
        
        # Get response from chatbot or fallback
        if chatbot and hasattr(chatbot, 'get_response'):
            try:
                bot_response = chatbot.get_response(user_message)
                logger.info(f"Chatbot response: {bot_response}")
            except Exception as e:
                logger.error(f"Chatbot error: {e}")
                bot_response = get_fallback_response(user_message)
        else:
            logger.warning("Chatbot not available, using fallback")
            bot_response = get_fallback_response(user_message)
        
        return jsonify({
            'response': bot_response,
            'status': 'success',
            'user_message': user_message,
            'timestamp': str(int(time.time() * 1000)) if 'time' in globals() else None
        }), 200
        
    except json.JSONDecodeError as e:
        logger.error(f"JSON decode error: {e}")
        return jsonify({
            'error': 'Invalid JSON format',
            'status': 'error'
        }), 400
    except Exception as e:
        logger.error(f"Unexpected error in chat endpoint: {e}")
        return jsonify({
            'error': 'Internal server error. Please try again.',
            'status': 'error'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    try:
        chatbot_status = False
        chatbot_info = "Not initialized"
        
        if chatbot:
            if hasattr(chatbot, 'pipeline'):
                chatbot_status = chatbot.pipeline is not None
                chatbot_info = "Pipeline loaded" if chatbot_status else "Pipeline not loaded"
            else:
                chatbot_status = True
                chatbot_info = "Basic chatbot ready"
        
        return jsonify({
            'status': 'Leo Club Chatbot API is running',
            'chatbot_ready': chatbot_status,
            'chatbot_info': chatbot_info,
            'required_files_exist': check_required_files()
        }), 200
    except Exception as e:
        logger.error(f"Health check error: {e}")
        return jsonify({
            'status': 'API running with errors',
            'error': str(e)
        }), 500

@app.route('/api/intents', methods=['GET'])
def get_intents():
    """Get available intents for debugging"""
    try:
        if chatbot and hasattr(chatbot, 'intents') and chatbot.intents:
            intent_tags = [intent['tag'] for intent in chatbot.intents['intents']]
            return jsonify({
                'intents': intent_tags,
                'total': len(intent_tags),
                'status': 'success'
            }), 200
        else:
            return jsonify({
                'error': 'Intents not loaded or chatbot not available',
                'status': 'error'
            }), 500
    except Exception as e:
        logger.error(f"Error getting intents: {e}")
        return jsonify({
            'error': f'Error retrieving intents: {str(e)}',
            'status': 'error'
        }), 500

def check_required_files():
    """Check if required files exist"""
    required_files = ['leo_chatbot_model.pkl', 'leo_club_intents.json']
    existing_files = {}
    
    for file in required_files:
        exists = os.path.exists(file)
        existing_files[file] = exists
        if exists:
            try:
                file_size = os.path.getsize(file)
                existing_files[f"{file}_size"] = f"{file_size} bytes"
            except:
                existing_files[f"{file}_size"] = "unknown"
    
    return existing_files

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Endpoint not found',
        'status': 'error'
    }), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({
        'error': 'Method not allowed',
        'status': 'error'
    }), 405

@app.errorhandler(500)
def internal_server_error(error):
    logger.error(f"Internal server error: {error}")
    return jsonify({
        'error': 'Internal server error',
        'status': 'error'
    }), 500

if __name__ == '__main__':
    import time
    
    print("="*50)
    print("Starting Leo Club Chatbot API...")
    print("="*50)
    
    # Check required files
    required_files = ['leo_chatbot_model.pkl', 'leo_club_intents.json']
    missing_files = [f for f in required_files if not os.path.exists(f)]
    
    if missing_files:
        print(f"⚠️  WARNING: Missing files: {missing_files}")
        print("📁 Please ensure these files are in the current directory:")
        for file in required_files:
            status = "✅ Found" if os.path.exists(file) else "❌ Missing"
            print(f"   - {file}: {status}")
        print()
    else:
        print("✅ All required files found!")
    
    if chatbot:
        print("🤖 Chatbot initialized successfully")
    else:
        print("⚠️  Chatbot initialization failed - using fallback responses")
    
    print("\n🌐 API will be available at:")
    print("   - http://localhost:5000")
    print("   - http://127.0.0.1:5000")
    print("\n🔗 Endpoints:")
    print("   - POST /api/chat - Main chat endpoint")
    print("   - GET /api/health - Health check")
    print("   - GET /api/intents - View available intents")
    print("\n" + "="*50)
    
    try:
        app.run(debug=True, port=5000, host='0.0.0.0')
    except Exception as e:
        logger.error(f"Failed to start server: {e}")
        print(f"❌ Failed to start server: {e}")