document.getElementById("checkButton").addEventListener("click", async function () {
    const urlInput = document.getElementById("urlInput").value; // Get the URL from the input field
    const resultContainer = document.getElementById("resultContainer"); // Result display container
    const resultText = document.getElementById("resultText"); // Text inside the result container
    const loadingSpinner = document.getElementById("loadingSpinner"); // Spinner to show during loading

    // Clear previous result and show the spinner
    resultContainer.classList.add("d-none");
    loadingSpinner.classList.remove("d-none");

    if (!urlInput) {
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
            body: JSON.stringify({ url: urlInput }), // Send the URL in the request body
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
