# Importing required libraries
from flask import Flask, request, jsonify
import numpy as np
import pickle
import logging
from feature import FeatureExtraction

# Set up logging
logging.basicConfig(
    filename='url_logs.log',   # Log file name
    level=logging.INFO,        # Logging level
    format='%(asctime)s - %(levelname)s - %(message)s'  # Log format
)

# Load the trained model
file = open("newmodel.pkl", "rb")
gbc = pickle.load(file)
file.close()

# Initialize Flask app
app = Flask(__name__)

@app.route("/predict", methods=['POST'])
def predict():
    """
    Endpoint for the browser extension to check URLs.
    Accepts a JSON request with a URL and returns a prediction.
    Logs the feature extraction details for debugging.
    """
    try:
        # Extract URL from the request
        data = request.get_json()
        url = data.get('url', '')

        if not url:
            logging.warning("Received a request with no URL provided.")
            return jsonify({'error': 'No URL provided'}), 400

        # Feature extraction
        obj = FeatureExtraction(url)
        features = np.array(obj.getFeaturesList()).reshape(1, 30)

        # Log extracted features
        logging.info(f"URL: {url}")
        logging.info(f"Extracted Features: {obj.getFeaturesList()}")

        # Prediction
        y_pred =gbc.predict(features)[0]

        # Log prediction result
        prediction = "Phishing" if y_pred == -1 else "Legitimate"
        logging.info(f"Prediction: {prediction}")

        # Return result as JSON
        return jsonify({
            'url': url,
            'phishing': bool(y_pred == -1),  # True for phishing, False for legitimate
            'message': "Phishing website detected!" if y_pred == -1 else "Legitimate website"
        })

    except Exception as e:
        # Log the error
        logging.error(f"Error processing URL: {url} - {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
