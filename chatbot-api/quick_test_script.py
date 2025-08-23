#!/usr/bin/env python3
"""
Quick test to verify the chatbot is working
"""

from chatbot_handler import LeoClubChatbot

def main():
    print("🚀 QUICK CHATBOT TEST")
    print("=" * 30)
    
    # Initialize chatbot
    chatbot = LeoClubChatbot()
    
    # Get status
    status = chatbot.get_status()
    print(f"\n📊 Status:")
    print(f"   Ready: {status['is_ready']}")
    print(f"   Model loaded: {status['model_loaded']}")
    print(f"   Intents: {status['num_intents']}")
    
    if not status['is_ready']:
        print(f"❌ Not ready: {status.get('error_message', 'Unknown error')}")
        return
    
    # Test messages
    test_messages = [
        "hi",
        "hello", 
        "what is leo club",
        "how to join",
        "activities",
        "meetings"
    ]
    
    print(f"\n💬 Testing {len(test_messages)} messages:")
    print("-" * 30)
    
    for msg in test_messages:
        response = chatbot.get_response(msg)
        
        print(f"\n🔵 You: {msg}")
        print(f"🤖 Bot: {response['response']}")
        print(f"   Intent: {response['intent']} (confidence: {response['confidence']:.3f})")
    
    print("\n" + "=" * 30)
    print("✅ Test completed! Your chatbot is working!")
    
    # Interactive test
    print("\n🎯 Want to test interactively? (y/n): ", end="")
    if input().lower().startswith('y'):
        print("\n💭 Interactive mode - type 'quit' to exit")
        print("-" * 30)
        
        while True:
            user_input = input("\n🔵 You: ").strip()
            if user_input.lower() in ['quit', 'exit', 'bye']:
                print("👋 Goodbye!")
                break
                
            if not user_input:
                continue
                
            response = chatbot.get_response(user_input)
            print(f"🤖 Bot: {response['response']}")
            print(f"   [{response['intent']} - {response['confidence']:.3f}]")

if __name__ == "__main__":
    main()