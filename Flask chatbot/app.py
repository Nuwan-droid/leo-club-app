import nltk
nltk.download('popular')
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()
import pickle
import numpy as np
from keras.models import load_model
import json
import random
from flask import Flask, request, jsonify
from flask_cors import CORS

model = load_model('model.h5')

with open('data.json', encoding='utf-8') as f:
    intents = json.load(f)

words = pickle.load(open('texts.pkl', 'rb'))
classes = pickle.load(open('labels.pkl', 'rb'))

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(w.lower()) for w in sentence_words]
    return sentence_words

def bow(sentence, words):
    sentence_words = clean_up_sentence(sentence)
    bag = [0]*len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence, model):
    p = bow(sentence, words)
    res = model.predict(np.array([p]), verbose=0)[0]
    ERROR_THRESHOLD = 0.25
    results = [[i,r] for i,r in enumerate(res) if r>ERROR_THRESHOLD]
    results.sort(key=lambda x:x[1], reverse=True)
    if len(results) == 0:
        return [{"intent": "unknown", "probability": "0"}]
    return [{"intent": classes[r[0]], "probability": str(r[1])} for r in results]

def getResponse(ints, intents_json):
    if ints[0]['intent'] == "unknown":
        return "I'm here to help with questions about Leo Club UWU, our members, projects, and activities."
    tag = ints[0]['intent']
    for i in intents_json['intents']:
        if i['tag'] == tag:
            return random.choice(i['responses'])

def chatbot_response(msg):
    ints = predict_class(msg, model)
    res = getResponse(ints, intents)
    return ints[0]['intent'], float(ints[0]['probability']), res

app = Flask(__name__)
CORS(app)

@app.route("/api/chatbot/health", methods=['GET'])
def health_check():
    return jsonify({"status": "ok"})

@app.route("/api/chatbot/chat", methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message', '')
    sessionId = data.get('sessionId', None)
    if not message:
        return jsonify({"status":"error","error":"No message provided"}), 400
    intent, confidence, response = chatbot_response(message)
    return jsonify({
        "status": "success",
        "response": response,
        "intent": intent,
        "confidence": confidence,
        "sessionId": sessionId
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)
