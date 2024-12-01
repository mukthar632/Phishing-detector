// Run when the popup loads
document.addEventListener("DOMContentLoaded", async function () {
    const urlInput = document.getElementById("urlInput");
    const checkButton = document.getElementById("checkButton");
    const resultContainer = document.getElementById("resultContainer");
    const resultText = document.getElementById("resultText");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const featureDetailsContainer = document.getElementById("featureDetailsContainer");
    const contributingFeaturesList = document.getElementById("contributingFeaturesList");
    const allFeaturesTable = document.getElementById("allFeaturesTable");

    // Automatically fetch the active tab's URL
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const activeTab = tabs[0];
            urlInput.value = activeTab.url || ""; // Populate the input field with the active tab's URL
        }
    });

    // Add event listener for the "Check URL" button
    checkButton.addEventListener("click", async function () {
        const url = urlInput.value; // Get the URL from the input field

        // Clear previous result and show the spinner
        resultContainer.classList.add("d-none");
        featureDetailsContainer.classList.add("d-none");
        loadingSpinner.classList.remove("d-none");

        if (!url) {
            // If URL is empty, display an error
            loadingSpinner.classList.add("d-none");
            resultContainer.classList.remove("d-none", "alert-success", "alert-danger");
            resultContainer.classList.add("alert-warning");
            resultText.textContent = "Please enter a URL.";
            return;
        }

        try {
            // Make the API request
            const response = await fetch("http://127.0.0.1:5001/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }), // Send the URL in the request body
            });

            const data = await response.json(); // Parse the JSON response

            // Hide the spinner
            loadingSpinner.classList.add("d-none");

            // Display the result based on the API response
            if (response.ok) {
                resultContainer.classList.remove("d-none", "alert-warning");
                if (data.phishing) {
                    resultContainer.classList.remove("alert-success");
                    resultContainer.classList.add("alert-danger");
                    resultText.textContent = "🚨 Phishing Website Detected!";
                } else {
                    resultContainer.classList.remove("alert-danger");
                    resultContainer.classList.add("alert-success");
                    resultText.textContent = "✅ Legitimate Website.";
                }

                // Display contributing features
                contributingFeaturesList.innerHTML = "";
                if (data.contributing_features.length > 0) {
                    data.contributing_features.forEach((feature) => {
                        const li = document.createElement("li");
                        li.textContent = feature;
                        contributingFeaturesList.appendChild(li);
                    });
                } else {
                    const li = document.createElement("li");
                    li.textContent = "No contributing risky features detected.";
                    contributingFeaturesList.appendChild(li);
                }

                // Display all extracted features in a table
                allFeaturesTable.innerHTML = `
                    <tr>
                        <th>Feature</th>
                        <th>Value</th>
                    </tr>
                `;
                for (const [key, value] of Object.entries(data.extracted_features)) {
                    const row = document.createElement("tr");
                    row.innerHTML = `<td>${key}</td><td>${value}</td>`;
                    allFeaturesTable.appendChild(row);
                }

                // Show feature details
                featureDetailsContainer.classList.remove("d-none");
            } else {
                // Handle server-side errors
                resultContainer.classList.remove("d-none", "alert-success", "alert-danger");
                resultContainer.classList.add("alert-warning");
                resultText.textContent = data.error || "An error occurred while processing the request.";
            }
        } catch (error) {
            // Handle client-side errors
            console.error("Error connecting to the server:", error);
            loadingSpinner.classList.add("d-none");
            resultContainer.classList.remove("d-none", "alert-success", "alert-danger");
            resultContainer.classList.add("alert-warning");
            resultText.textContent = "Error connecting to the server. Please try again.";
        }
    });
});
