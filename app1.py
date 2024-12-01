# Importing required libraries
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import pickle
import logging
from feature import FeatureExtraction

# Set up logging
logging.basicConfig(
    filename='url_logs.log',   # Log file name
    level=logging.INFO,        # Logging level
    format='%(asctime)s - %(levelname)s - %(message)s'  # Log format
)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
file = open("newmodel.pkl", "rb")
gbc = pickle.load(file)
file.close()

@app.route("/predict", methods=['POST'])
def predict():
    """
    Endpoint for the browser extension to check URLs.
    Returns the prediction along with detailed feature explanations.
    """
    try:
        # Extract URL from the request
        data = request.get_json()
        url = data.get('url', '').strip()  # Remove leading/trailing spaces

        if not url:
            logging.warning("Received a request with no URL provided.")
            return jsonify({'error': 'No URL provided'}), 400

        # Validate if the input is a proper URL
        if not url.startswith(("http://", "https://")):
            logging.warning(f"Invalid URL format: {url}")
            return jsonify({'error': 'Invalid URL format. Ensure it starts with http:// or https://'}), 400

        # Feature extraction
        obj = FeatureExtraction(url)
        feature_list = obj.getFeaturesList()

        # Define the feature names
        feature_names = [
            "UsingIP", "LongURL", "ShortURL", "Symbol@", "Redirecting//",
            "PrefixSuffix-", "SubDomains", "HTTPS", "DomainRegLen", "Favicon",
            "NonStdPort", "HTTPSDomainURL", "RequestURL", "AnchorURL",
            "LinksInScriptTags", "ServerFormHandler", "InfoEmail", "AbnormalURL",
            "WebsiteForwarding", "StatusBarCust", "DisableRightClick",
            "UsingPopupWindow", "IframeRedirection", "AgeofDomain",
            "DNSRecording", "WebsiteTraffic", "PageRank", "GoogleIndex",
            "LinksPointingToPage", "StatsReport"
        ]

        # Create a DataFrame for features
        features_df = pd.DataFrame([feature_list], columns=feature_names)

        # Log extracted features
        logging.info(f"URL: {url}")
        logging.info(f"Extracted Features: {feature_list}")

        # Make prediction
        y_pred = gbc.predict(features_df)[0]  # Use DataFrame to avoid warnings
        prediction = "Phishing" if y_pred == -1 else "Legitimate"

        # Log prediction result
        logging.info(f"Prediction: {prediction}")

        # Identify contributing features (Example: using basic conditions)
        contributing_features = []
        for name, value in zip(feature_names, feature_list):
            if value == -1:  # Negative value indicates a risky feature
                contributing_features.append(name)

        # Return detailed response as JSON
        return jsonify({
            'url': url,
            'phishing': bool(y_pred == -1),  # True for phishing, False for legitimate
            'message': "Phishing website detected!" if y_pred == -1 else "Legitimate website",
            'extracted_features': dict(zip(feature_names, feature_list)),
            'contributing_features': contributing_features
        })

    except Exception as e:
        # Log the error
        logging.error(f"Error processing URL: {url} - {str(e)}")
        return jsonify({'error': f"Server Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)
