let freeUsageCount = 0;
const maxFreeUses = 10;

async function askAI() {
    const question = document.getElementById("userInput").value.trim();

    if (!question) {
        document.getElementById("response").innerText = "Please enter a question!";
        return;
    }

    if (freeUsageCount < maxFreeUses) {
        freeUsageCount++;
        const responseText = await getAIResponse(question);
        document.getElementById("response").innerText = responseText;
    } else {
        document.getElementById("response").innerText = "You have reached your free usage limit. Please subscribe for premium access.";
        // You can add a payment link here for premium membership
    }
}

async function getAIResponse(question) {
    const apiKey = "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";  // Replace this with a secure backend API call in production
    const url = "https://api.deepseek.com/v1/inference";  // Ensure this is the correct DeepSeek API endpoint

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({ prompt: question, max_tokens: 150 })  // Adjust parameters as needed
        });

        if (!response.ok) {
            throw new Error(`DeepSeek API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.response || "Sorry, I couldn't generate a response.";
    } catch (error) {
        console.error("Error with DeepSeek API:", error);
        return "There was an error with the AI request. Please try again later.";
    }
    }
let isPremium = false;

async function askAI() {
    const question = document.getElementById("userInput").value.trim();

    if (!question) {
        document.getElementById("response").innerText = "Please enter a question!";
        return;
    }

    if (freeUsageCount < maxFreeUses || isPremium) {
        freeUsageCount++;
        const responseText = await getAIResponse(question);
        document.getElementById("response").innerText = responseText;
    } else {
        document.getElementById("paymentSection").style.display = "block";
        document.getElementById("response").innerText = "Free usage limit reached.";
    }
}

// Simulate payment with placeholder function
async function payWithMobileMoney() {
    const phoneNumber = "0888667077";
    const amount = 9usd/1002Lrd; // USD or LRD
    const transactionId = Math.floor(Math.random() * 1000000); // Simulate unique ID

    // Replace this with the actual Lonestar API call
    console.log(`Simulated payment to ${phoneNumber} for $${amount}. Transaction ID: ${transactionId}`);

    // Assume payment successful
    isPremium = true;
    alert("Payment successful! You are now a premium member.");
    document.getElementById("paymentSection").style.display = "none";
    }
