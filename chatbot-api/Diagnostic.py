#!/usr/bin/env python3
"""
Diagnostic script to identify why the chatbot isn't working properly
"""

import os
import json
import logging
import sys

# Enable detailed logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

def check_environment():
    """Check if required libraries are installed"""
    print("=== CHECKING ENVIRONMENT ===")
    
    required_packages = [
        'torch',
        'transformers', 
        'sentence_transformers',
        'nltk',
        'sklearn'
    ]
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"✓ {package} is installed")
        except ImportError:
            print(f"✗ {package} is NOT installed")
            if package in ['torch', 'transformers']:
                print(f"  → Install with: pip install {package}")

def check_files():
    """Check if all required files exist"""
    print("\n=== CHECKING FILES ===")
    
    # Check model directory and files
    model_dir = "leo_intent_model"
    if not os.path.exists(model_dir):
        print(f"✗ Model directory '{model_dir}' does not exist")
        print("  → Create the directory and copy your model files there")
        return False
    else:
        print(f"✓ Model directory '{model_dir}' exists")
    
    # Check individual model files
    model_files = [
        "config.json",
        "tokenizer.json", 
        "tokenizer_config.json"
    ]
    
    # Check for model weight files
    model_weight_files = ["pytorch_model.bin", "model.safetensors"]
    has_model_weights = False
    
    for file in model_weight_files:
        file_path = os.path.join(model_dir, file)
        if os.path.exists(file_path):
            print(f"✓ {file} exists ({os.path.getsize(file_path) / 1024 / 1024:.1f} MB)")
            has_model_weights = True
            break
    
    if not has_model_weights:
        print(f"✗ No model weights found. Need either pytorch_model.bin or model.safetensors")
        return False
    
    # Check other required files
    for file in model_files:
        file_path = os.path.join(model_dir, file)
        if os.path.exists(file_path):
            print(f"✓ {file} exists")
        else:
            print(f"✗ {file} is missing")
            if file == "config.json":
                print("  → This is critical for model loading")
                return False
    
    # Check optional files
    optional_files = [
        "label_map.json",
        "leo_club_intents.json", 
        "training_data.json"
    ]
    
    print("\nOptional files:")
    for file in optional_files:
        if os.path.exists(file):
            print(f"✓ {file} exists")
        else:
            print(f"- {file} not found (will use defaults)")
    
    return True

def test_model_loading():
    """Test if the model can be loaded"""
    print("\n=== TESTING MODEL LOADING ===")
    
    try:
        from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
        print("✓ Transformers library imported successfully")
    except ImportError as e:
        print(f"✗ Failed to import transformers: {e}")
        return False
    
    model_path = "leo_intent_model"
    
    try:
        print(f"Attempting to load tokenizer from {model_path}...")
        tokenizer = AutoTokenizer.from_pretrained(model_path)
        print("✓ Tokenizer loaded successfully")
        
        print(f"Attempting to load model from {model_path}...")
        model = AutoModelForSequenceClassification.from_pretrained(model_path)
        print("✓ Model loaded successfully")
        print(f"  Model has {model.config.num_labels} output labels")
        
        print("Creating classification pipeline...")
        classifier = pipeline("text-classification", model=model, tokenizer=tokenizer)
        print("✓ Pipeline created successfully")
        
        # Test prediction
        test_message = "hello"
        print(f"Testing prediction with: '{test_message}'")
        result = classifier(test_message)
        print(f"✓ Prediction successful: {result}")
        
        return True
        
    except Exception as e:
        print(f"✗ Model loading failed: {e}")
        print(f"Error type: {type(e).__name__}")
        return False

def test_chatbot_init():
    """Test chatbot initialization"""
    print("\n=== TESTING CHATBOT INITIALIZATION ===")
    
    try:
        # Try importing your chatbot
        from chatbot_handler import LeoClubChatbot
        print("✓ Chatbot class imported successfully")
        
        print("Initializing chatbot...")
        chatbot = LeoClubChatbot()
        print("✓ Chatbot initialized successfully")
        
        # Get chatbot status instead of pipeline
        status = chatbot.get_status()
        print(f"  Model loaded: {status['model_loaded']}")
        print(f"  Has classifier: {status['has_classifier']}")
        print(f"  Number of intents: {status['num_intents']}")
        if status['initialization_error']:
            print(f"  Error: {status['initialization_error']}")
        
        # Test a simple message
        test_messages = ["hi", "hello", "what is leo club"]
        
        for msg in test_messages:
            print(f"\nTesting message: '{msg}'")
            response = chatbot.get_response(msg)
            
            if isinstance(response, dict):
                print(f"  Response: {response['response'][:100]}...")
                print(f"  Intent: {response.get('intent', 'N/A')}")
                print(f"  Confidence: {response.get('confidence', 0):.3f}")
                print(f"  Model: {response.get('model', 'N/A')}")
            else:
                print(f"  Response: {response[:100]}...")
        
        return True
        
    except Exception as e:
        print(f"✗ Chatbot initialization failed: {e}")
        print(f"Error type: {type(e).__name__}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        return False

def check_config_file():
    """Check the model config file for details"""
    print("\n=== CHECKING MODEL CONFIG ===")
    
    config_path = "leo_intent_model/config.json"
    if not os.path.exists(config_path):
        print(f"✗ Config file not found at {config_path}")
        return
    
    try:
        with open(config_path, 'r') as f:
            config = json.load(f)
        
        print("✓ Config file loaded successfully")
        print(f"  Model type: {config.get('model_type', 'Unknown')}")
        print(f"  Architecture: {config.get('architectures', ['Unknown'])[0]}")
        print(f"  Number of labels: {config.get('num_labels', 'Unknown')}")
        print(f"  Vocabulary size: {config.get('vocab_size', 'Unknown')}")
        
        # Check if labels are defined
        if 'id2label' in config:
            print(f"  Label mapping found: {len(config['id2label'])} labels")
            labels = list(config['id2label'].values())
            print(f"  Labels: {labels}")
        else:
            print("  No label mapping found in config")
            
    except Exception as e:
        print(f"✗ Error reading config: {e}")

def main():
    print("LEO CLUB CHATBOT DIAGNOSTIC TOOL")
    print("=" * 40)
    
    all_good = True
    
    # Run all checks
    check_environment()
    
    if not check_files():
        all_good = False
        
    check_config_file()
    
    if not test_model_loading():
        all_good = False
        
    if not test_chatbot_init():
        all_good = False
    
    print("\n" + "=" * 40)
    if all_good:
        print("✓ ALL CHECKS PASSED - Your chatbot should be working!")
    else:
        print("✗ ISSUES FOUND - Please fix the problems above")
        
    print("\nCommon solutions:")
    print("1. Install missing packages: pip install torch transformers sentence-transformers")
    print("2. Ensure all model files are in leo_intent_model/ directory")
    print("3. Check that config.json has correct num_labels")
    print("4. Verify model files aren't corrupted")
    print("5. Check file permissions")

if __name__ == "__main__":
    main()