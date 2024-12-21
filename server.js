document.getElementById("send-button").addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    // Display user input in the chat window
    const chatWindow = document.getElementById("chat-window");
    const userMessage = document.createElement("div");
    userMessage.textContent = `You: ${userInput}`;
    chatWindow.appendChild(userMessage);

    // Clear the input field immediately
    document.getElementById("user-input").value = "";

    // Send user input to the backend
    fetch("http://10.204.79.36:5000/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            // Display response from backend
            const botMessage = document.createElement("div");
            botMessage.textContent = `Bot: ${data.response}`;
            chatWindow.appendChild(botMessage);
        })
        .catch((error) => {
            console.error("Error:", error);

            // Display backend connection error in the chat window
            const errorMessage = document.createElement("div");
            errorMessage.textContent = "Bot: 后端连接错误";
            errorMessage.style.color = "red"; // Optional: Make the error message stand out
            chatWindow.appendChild(errorMessage);
        });
});
