#!/usr/bin/env python3
"""
Debug script to examine the Leo Club model configuration
"""

import json
import os
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

def debug_model(model_path="leo_intent_model"):
    """Debug the model configuration and test predictions"""
    
    print("🔍 DEBUGGING LEO CLUB MODEL")
    print("=" * 50)
    
    # Check if model directory exists
    print(f"📂 Model path: {model_path}")
    print(f"📂 Path exists: {os.path.exists(model_path)}")
    print(f"📂 Current directory: {os.getcwd()}")
    
    if not os.path.exists(model_path):
        print("❌ Model directory not found!")
        return
    
    # List files in model directory
    files = os.listdir(model_path)
    print(f"📋 Files in model directory: {files}")
    
    # Check config.json
    config_path = os.path.join(model_path, "config.json")
    if os.path.exists(config_path):
        print("\n📄 CONFIG.JSON ANALYSIS:")
        print("-" * 30)
        
        with open(config_path, 'r') as f:
            config = json.load(f)
        
        print(f"🔧 Model type: {config.get('model_type', 'Unknown')}")
        print(f"🏷️ Number of labels: {config.get('num_labels', 'Unknown')}")
        print(f"🎯 Architecture: {config.get('architectures', 'Unknown')}")
        
        # Check for label mappings
        if 'id2label' in config:
            print(f"✅ Found id2label mapping:")
            id2label = config['id2label']
            print(f"   📊 Number of mappings: {len(id2label)}")
            print(f"   🏷️ Sample mappings:")
            for i, (k, v) in enumerate(list(id2label.items())[:10]):
                print(f"      {k} -> {v}")
            if len(id2label) > 10:
                print(f"      ... and {len(id2label) - 10} more")
        else:
            print("❌ No id2label mapping found!")
            
        if 'label2id' in config:
            print(f"✅ Found label2id mapping:")
            label2id = config['label2id']
            print(f"   📊 Number of mappings: {len(label2id)}")
            print(f"   🏷️ Sample mappings:")
            for i, (k, v) in enumerate(list(label2id.items())[:10]):
                print(f"      {k} -> {v}")
            if len(label2id) > 10:
                print(f"      ... and {len(label2id) - 10} more")
        else:
            print("❌ No label2id mapping found!")
            
        # Print full config (truncated)
        print(f"\n📋 Full config preview:")
        config_str = json.dumps(config, indent=2)
        if len(config_str) > 1000:
            print(config_str[:1000] + "\n... (truncated)")
        else:
            print(config_str)
    
    else:
        print("❌ config.json not found!")
        return
    
    # Try loading the model
    print("\n🤖 MODEL LOADING TEST:")
    print("-" * 30)
    
    try:
        print("🔤 Loading tokenizer...")
        tokenizer = AutoTokenizer.from_pretrained(model_path)
        print("✅ Tokenizer loaded successfully")
        
        print("🧠 Loading model...")
        model = AutoModelForSequenceClassification.from_pretrained(model_path)
        print(f"✅ Model loaded with {model.config.num_labels} labels")
        
        print("⚙️ Creating pipeline...")
        classifier = pipeline(
            "text-classification",
            model=model,
            tokenizer=tokenizer,
            return_all_scores=False
        )
        print("✅ Pipeline created successfully")
        
        # Test predictions
        print("\n🧪 PREDICTION TESTS:")
        print("-" * 30)
        
        test_messages = [
            "hello",
            "hi there",
            "what is leo club",
            "how to join",
            "tell me about activities",
            "when are meetings",
            "leadership opportunities"
        ]
        
        for msg in test_messages:
            try:
                result = classifier(msg)[0]
                label = result['label']
                confidence = result['score']
                
                # Try to map label
                if 'LABEL_' in label:
                    label_id = label.split('_')[1]
                else:
                    label_id = str(label)
                
                # Check if we can map to intent
                intent = "unmapped"
                if 'id2label' in config:
                    intent = config['id2label'].get(label_id, f"unmapped_label_{label_id}")
                
                print(f"   '{msg}' -> {label} (id: {label_id}) -> {intent} (conf: {confidence:.3f})")
                
            except Exception as e:
                print(f"   '{msg}' -> ERROR: {e}")
    
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        import traceback
        print(f"📋 Full traceback:")
        traceback.print_exc()
    
    print("\n" + "=" * 50)
    print("🏁 Debug complete!")

if __name__ == "__main__":
    debug_model()