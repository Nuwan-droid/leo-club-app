from flask import Flask, request, jsonify, session
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import torch
import secrets
from chatbot_handler import LeoClubChatbot

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

# Initialize chatbot
chatbot = LeoClubChatbot(model_path="./fine_tuned_dialo_gpt")

# Conversation history per session
conversation_histories = {}

@app.route('/api/status', methods=['GET'])
def status():
    status_data = chatbot.get_status()
    return jsonify({
        "is_ready": status_data["is_ready"],
        "model_loaded": status_data["model_loaded"],
        "has_classifier": status_data["has_classifier"],
        "error_message": status_data["error_message"]
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get('message', '').strip()
    if not user_input:
        return jsonify({"reply": "Please provide a message.", "intent": "empty", "confidence": 0.0}), 400

    if not chatbot.is_ready:
        return jsonify({
            "reply": f"Sorry, I'm having technical difficulties: {chatbot.error_message}. Leo Club info: We're a youth leadership organization!",
            "intent": "error",
            "confidence": 0.0
        }), 500

    session_id = session.get('session_id')
    if not session_id:
        session_id = secrets.token_hex(8)
        session['session_id'] = session_id
        conversation_histories[session_id] = ""

    history = conversation_histories.get(session_id, "")
    prompt = f"{history}User: {user_input}<|endoftext|>Assistant:"
    response_data = chatbot.get_response(prompt, session_id)
    
    updated_history = f"{prompt}{response_data['response']}<|endoftext|>"
    conversation_histories[session_id] = updated_history[-1024:]

    return jsonify({
        "reply": response_data['response'],
        "intent": response_data.get('intent', 'generated'),
        "confidence": response_data.get('confidence', 1.0)
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)