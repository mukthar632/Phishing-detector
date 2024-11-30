console.log("Phishing URL Detector extension loaded.");

// Listener for when the active tab changes or updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        console.log(`Tab updated: ${changeInfo.url}`);

        // Send the URL to the Flask server for detection
        fetch("http://127.0.0.1:5001/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: changeInfo.url }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Log the result (phishing or legitimate)
                if (data.phishing) {
                    console.log(`🚨 WARNING: Phishing website detected: ${changeInfo.url}`);
                } else {
                    console.log(`✅ Legitimate website: ${changeInfo.url}`);
                }
            })
            .catch((error) => {
                console.error(`Error detecting URL: ${changeInfo.url}`, error);
            });
    }
});

// Listener for the extension icon click (optional)
chrome.action.onClicked.addListener((tab) => {
    console.log("Extension icon clicked.");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].url) {
            console.log(`Current tab URL: ${tabs[0].url}`);
        } else {
            console.error("No URL found for the active tab.");
        }
    });
});
