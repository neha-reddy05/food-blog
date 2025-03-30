const API_KEY = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY"; // Replace with your Gemini API Key

async function getGeminiResponse() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    // Display user message
    const chatBox = document.getElementById('chat-box');
    const userMessage = document.createElement('p');
    userMessage.classList.add('user-message');
    userMessage.innerText = userInput;
    chatBox.appendChild(userMessage);
    
    // Fetch Gemini AI Response
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            prompt: { text: userInput },
            temperature: 0.7
        })
    });

    const data = await response.json();
    const botReply = data?.candidates?.[0]?.output || "Sorry, I couldn't understand that.";

    // Display Gemini AI response
    const botMessage = document.createElement('p');
    botMessage.classList.add('bot-message');
    botMessage.innerText = botReply;
    chatBox.appendChild(botMessage);

    // Clear input field
    document.getElementById('user-input').value = "";

    // Scroll chat to latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// --- WEEKLY BAR CHART ---
const barCtx = document.getElementById('weeklyStatsChart').getContext('2d');
new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Calories Burnt',
            data: [500, 600, 700, 800, 750, 900, 950],
            backgroundColor: '#4CAF50'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// --- PROGRESSIVE LINE CHART ---
const lineCtx = document.getElementById('progressiveChart').getContext('2d');
new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Weight Loss Progress',
            data: [70, 69, 68, 67.5, 67, 66.5, 66], // Example: Progressive weight loss
            borderColor: '#FF5733',
            borderWidth: 2,
            fill: false,
            tension: 0.3, // Smooth curve
            pointRadius: 5
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: false, min: 65, max: 75 }
        }
    }
});
