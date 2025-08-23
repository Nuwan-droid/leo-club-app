#!/usr/bin/env python3
"""
Test script for the updated Leo Club Chatbot
"""

import logging
import sys
import os

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Import your updated chatbot
try:
    from chatbot_handler import LeoClubChatbot
    print("✓ Chatbot handler imported successfully")
except ImportError as e:
    print(f"✗ Failed to import chatbot handler: {e}")
    sys.exit(1)

def test_chatbot():
    """Test the chatbot with various inputs"""
    
    print("\n" + "="*50)
    print("TESTING LEO CLUB CHATBOT")
    print("="*50)
    
    # Initialize chatbot
    try:
        chatbot = LeoClubChatbot()
        print("✓ Chatbot initialized successfully")
        print(f"  Pipeline mode: {chatbot.pipeline}")
        
        if chatbot.pipeline == "trained":
            print("  Using trained Sentence Transformers model")
        elif chatbot.pipeline == "old":
            print("  Using old pickle model")
        else:
            print("  Using simple pattern matching")
            
    except Exception as e:
        print(f"✗ Failed to initialize chatbot: {e}")
        return
    
    # Test cases
    test_messages = [
        "Hello",
        "Hi there!",
        "What is Leo Club?",
        "Tell me about Leo Club",
        "How can I join?",
        "What activities do you do?",
        "When do you meet?",
        "I want to become a member",
        "What are your projects?",
        "Random question that doesn't match anything"
    ]
    
    print(f"\nTesting {len(test_messages)} messages...")
    print("-" * 50)
    
    for i, message in enumerate(test_messages, 1):
        try:
            response = chatbot.get_response(message)
            
            # Handle both old string format and new dict format
            if isinstance(response, dict):
                print(f"\n{i}. Message: '{message}'")
                print(f"   Intent: {response.get('intent', 'N/A')}")
                print(f"   Confidence: {response.get('confidence', 0):.3f}")
                print(f"   Model: {response.get('model', 'N/A')}")
                print(f"   Response: {response.get('response', 'N/A')}")
            else:
                # Old string format
                print(f"\n{i}. Message: '{message}'")
                print(f"   Response: {response}")
                
        except Exception as e:
            print(f"\n{i}. Message: '{message}'")
            print(f"   ERROR: {e}")
    
    print("\n" + "="*50)
    print("TEST COMPLETED")
    print("="*50)

def check_files():
    """Check if required files exist"""
    print("\nChecking required files...")
    
    files_to_check = [
        "leo_intent_model/config.json",
        "leo_intent_model/tokenizer.json",
        "leo_intent_model/model.safetensors",
        "label_map.json",
        "leo_club_intents.json"
    ]
    
    for file_path in files_to_check:
        if os.path.exists(file_path):
            print(f"✓ {file_path}")
        else:
            print(f"✗ {file_path} (missing - will use fallback)")
    
    # Check model directory
    model_dir = "leo_intent_model"
    if os.path.exists(model_dir):
        files_in_model_dir = os.listdir(model_dir)
        print(f"\nFiles in {model_dir}/:")
        for file in sorted(files_in_model_dir):
            print(f"  - {file}")
    else:
        print(f"\n✗ {model_dir} directory not found")

if __name__ == "__main__":
    print("LEO CLUB CHATBOT TESTER")
    print("=" * 30)
    
    # Check files first
    check_files()
    
    # Run tests
    test_chatbot()
    
    # Interactive mode
    print("\nEnter interactive mode? (y/n): ", end="")
    if input().lower().startswith('y'):
        chatbot = LeoClubChatbot()
        print("\nInteractive mode - Type 'quit' to exit")
        print("-" * 30)
        
        while True:
            user_input = input("\nYou: ").strip()
            if user_input.lower() in ['quit', 'exit', 'bye']:
                print("Goodbye!")
                break
                
            response = chatbot.get_response(user_input)
            
            if isinstance(response, dict):
                print(f"Bot: {response['response']}")
                print(f"     (Intent: {response['intent']}, Confidence: {response['confidence']:.3f})")
            else:
                print(f"Bot: {response}")