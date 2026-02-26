# Import necessary libraries
import base64
import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from deepface import DeepFace
import logging

# Configure logging to show info-level messages
logging.basicConfig(level=logging.INFO)

# Initialize the Flask application
app = Flask(__name__)
# Enable Cross-Origin Resource Sharing (CORS) to allow your frontend
# to communicate with this server from a different origin (e.g., file:// or another port).
CORS(app)

print("DeepFace models are being loaded... This might take a moment.")
# Pre-load the models to avoid a long delay on the first API request.
# You can customize this to only load the models you need.
try:
    DeepFace.build_model("Emotion")
    DeepFace.build_model("Age")
    DeepFace.build_model("Gender")
    DeepFace.build_model("Race")
    print("DeepFace models loaded successfully.")
except Exception as e:
    print(f"Error loading DeepFace models: {e}")


@app.route('/')
def index():
    """A simple route to confirm the server is running."""
    return "DeepFace API is running!"

@app.route('/analyze', methods=['POST'])
def analyze():
    """
    This endpoint handles a detailed, single-image analysis.
    It receives a base64 encoded image and returns multiple facial attributes.
    """
    try:
        data = request.get_json()
        if 'image' not in data:
            return jsonify({'error': 'No image data found'}), 400

        image_data = data['image']
        header, encoded = image_data.split(",", 1)
        
        decoded_image = base64.b64decode(encoded)
        
        nparr = np.frombuffer(decoded_image, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({'error': 'Could not decode image'}), 400
            
        logging.info("Image received for detailed analysis.")

        # Perform a comprehensive analysis for multiple attributes.
        result = DeepFace.analyze(
            img_path=img,
            actions=['emotion', 'age', 'gender', 'race'],
            enforce_detection=False
        )
        
        logging.info(f"Detailed analysis result: {result}")

        if result and len(result) > 0:
            return jsonify(result[0])
        else:
            return jsonify({'error': 'No face detected or analysis failed'}), 404

    except Exception as e:
        logging.error(f"An error occurred during detailed analysis: {e}")
        return jsonify({'error': 'An internal server error occurred'}), 500

@app.route('/predict', methods=['POST'])
def predict():
    """
    This endpoint is optimized for real-time video frame analysis.
    It receives a single frame as a file from FormData, analyzes only the
    dominant emotion for speed, and returns it.
    """
    try:
        if 'frame' not in request.files:
            return jsonify({'error': 'No frame data found in the request'}), 400

        frame_file = request.files['frame']
        
        # Read the image file directly from the request
        nparr = np.frombuffer(frame_file.read(), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({'error': 'Could not decode frame from request'}), 400

        logging.info("Frame received for real-time prediction.")

        # Analyze only the emotion to keep the real-time analysis fast.
        # Using a faster, less accurate detector like 'opencv' is good for real-time.
        result = DeepFace.analyze(
            img_path=img,
            actions=['emotion'],
            enforce_detection=False,
            detector_backend='opencv' 
        )
        
        logging.info(f"Prediction result: {result}")

        if result and len(result) > 0:
            dominant_emotion = result[0]['dominant_emotion']
            return jsonify({'expression': dominant_emotion})
        else:
            # If no face is detected, we can return 'neutral' or a specific message.
            return jsonify({'expression': 'neutral'}) 

    except Exception as e:
        logging.error(f"An error occurred during prediction: {e}")
        return jsonify({'error': 'An internal server error occurred'}), 500

# This block runs the server when you execute `python server.py`
if __name__ == '__main__':
    # host='0.0.0.0' makes the server accessible on your local network
    # debug=True enables auto-reloading and detailed error pages
    app.run(host='0.0.0.0', port=5000, debug=True)