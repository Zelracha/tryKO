// script.js
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

const API_KEY = '92964d4c-03a5-4565-951f-87a055b5e990'; // Replace with your actual ChatGPT API key

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = userInput.value;

    // Display user message
    displayMessage(userMessage, 'user');

    // Send user message to ChatGPT API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            messages: [{ role: 'user', content: userMessage }],
            model: 'gpt-3.5-turbo'
        })
    });

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    // Display assistant message
    displayMessage(assistantMessage, 'assistant');

    userInput.value = '';
});

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(`${sender}-message`);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}