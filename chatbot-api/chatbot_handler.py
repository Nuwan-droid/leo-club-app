#!/usr/bin/env python3
"""
Fixed Leo Club Chatbot Handler
Handles dialogue generation with fine-tuned DialoGPT model
"""

import os
import logging
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LeoClubChatbot:
    """Leo Club chatbot using fine-tuned DialoGPT model for conversational responses"""
    
    def __init__(self, model_path="fine_tuned_dialo_gpt"):
        """Initialize chatbot with fine-tuned DialoGPT model"""
        print("🤖 Initializing Leo Club Chatbot...")
        
        self.model_path = model_path
        self.tokenizer = None
        self.model = None
        self.classifier = None  # Optional boundary classifier
        self.is_ready = False
        self.error_message = None
        
        try:
            self._check_dependencies()
            self._load_model()
            self._setup_boundary_classifier()  # Optional for runtime checks
            self.is_ready = True
            print("✅ Chatbot ready!")
            
        except Exception as e:
            self.error_message = str(e)
            print(f"❌ Chatbot initialization failed: {e}")
            import traceback
            print(f"Full error: {traceback.format_exc()}")
    
    def _check_dependencies(self):
        """Check if required libraries are available"""
        try:
            global AutoTokenizer, AutoModelForCausalLM, pipeline
            from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
            print("✅ Transformers library loaded")
        except ImportError:
            raise Exception("Missing transformers library. Install with: pip install transformers torch")
    
    def _load_model(self):
        """Load the fine-tuned DialoGPT model"""
        print(f"📂 Loading model from: {self.model_path}")
        
        if not os.path.exists(self.model_path):
            raise Exception(f"Model directory not found: {self.model_path}")
        
        files = os.listdir(self.model_path)
        print(f"📋 Model files: {files}")
        
        if 'config.json' not in files:
            raise Exception("Missing config.json in model directory")
        
        has_weights = any(f in files for f in ['pytorch_model.bin', 'model.safetensors'])
        if not has_weights:
            raise Exception("Missing model weights (need pytorch_model.bin or model.safetensors)")
        
        try:
            print("🔤 Loading tokenizer...")
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_path)
            self.tokenizer.pad_token = self.tokenizer.eos_token  # DialoGPT uses EOS for padding
            print("✅ Tokenizer loaded")
            
            print("🧠 Loading model...")
            self.model = AutoModelForCausalLM.from_pretrained(self.model_path)
            print(f"✅ Model loaded with {self.model.config.n_positions} max positions")
            
        except Exception as e:
            raise Exception(f"Failed to load model: {e}")
    
    def _setup_boundary_classifier(self):
        """Set up a classifier to enforce boundaries (optional)"""
        print("⚙️ Setting up boundary classifier...")
        try:
            self.classifier = pipeline("text-classification", model="unitary/toxic-bert")
            print("✅ Boundary classifier ready")
        except Exception as e:
            print(f"⚠️ Failed to load boundary classifier: {e}. Proceeding without it.")
            self.classifier = None
    
    def get_response(self, prompt, session_id=None):
        """Generate response based on user input and conversation history"""
        if not self.is_ready:
            return {
                "response": f"Sorry, I'm having technical difficulties: {self.error_message}. Leo Club info: We're a youth leadership organization!",
                "intent": "error",
                "confidence": 0.0
            }
        
        try:
            # Generate response
            inputs = self.tokenizer.encode(prompt, return_tensors="pt")
            outputs = self.model.generate(
                inputs,
                max_length=150,
                num_return_sequences=1,
                no_repeat_ngram_size=2,
                temperature=0.7,
                top_p=0.9,
                eos_token_id=self.tokenizer.eos_token_id,
                pad_token_id=self.tokenizer.pad_token_id
            )
            
            response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
            response = response.replace(prompt, "").strip()  # Extract assistant part
            
            # Enforce boundaries if classifier is available
            if self.classifier and not self._check_boundaries(response):
                response = "Sorry, I can only provide responses about Leo Club UWU."
            
            return {
                "response": response,
                "intent": "generated",
                "confidence": 1.0  # DialoGPT doesn’t provide confidence scores
            }
            
        except Exception as e:
            print(f"❌ Error in generation: {e}")
            return {
                "response": "I'm having technical issues, but Leo Club UWU is a great youth organization! Ask me again later.",
                "intent": "error_recovery",
                "confidence": 0.0
            }
    
    def _check_boundaries(self, text):
        """Check if response is within boundaries"""
        if not self.classifier:
            return True  # Skip if no classifier
        toxicity = self.classifier(text)[0]['score']
        allowed_keywords = ["leo", "club", "uwu", "leadership", "service", "membership", "event"]
        return toxicity <= 0.5 and any(keyword in text.lower() for keyword in allowed_keywords)
    
    def get_status(self):
        """Get chatbot status"""
        return {
            "is_ready": self.is_ready,
            "model_loaded": self.model is not None,
            "has_classifier": self.classifier is not None,
            "error_message": self.error_message
        }
    
    def test_prediction(self, message="hello"):
        """Test the model with a message"""
        if not self.is_ready:
            return f"Chatbot not ready: {self.error_message}"
        
        try:
            prompt = f"User: {message}<|endoftext|>Assistant:"
            response = self.get_response(prompt)
            return {
                "input": message,
                "response": response,
                "status": self.get_status()
            }
        except Exception as e:
            return f"Test failed: {e}"

if __name__ == "__main__":
    print("🧪 Testing Leo Club Chatbot...")
    chatbot = LeoClubChatbot()
    print(f"\n📊 Status: {chatbot.get_status()}")
    
    if chatbot.is_ready:
        test_messages = ["hi", "what is leo club", "tell me a joke"]
        for msg in test_messages:
            result = chatbot.test_prediction(msg)
            print(f"\n💬 '{result['input']}'")
            print(f"   💭 Response: {result['response']['response']}")
    else:
        print(f"❌ Chatbot not ready: {chatbot.error_message}")