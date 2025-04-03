async function askAI() {
    const question = document.getElementById("userInput").value.trim();

    if (!question) {
        document.getElementById("response").innerText = "Please enter a question!";
        return;
    }

    const responseText = await getAIResponse(question);
    document.getElementById("response").innerText = responseText;
}

async function getAIResponse(question) {
    const apiKey = "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";  // Your Hugging Face API key
    const url = "https://api-inference.huggingface.co/models/gpt2";  // GPT-2 model URL

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({ inputs: question })
        });

        if (!response.ok) {
            throw new Error(`Hugging Face API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data[0].generated_text;  // Extract and return the generated response from the model
    } catch (error) {
        console.error("Error with Hugging Face API:", error);
        document.getElementById("response").innerText = "There was an error with the AI request. Please try again later.";
        return null;
    }
}
