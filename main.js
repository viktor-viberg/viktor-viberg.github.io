// Dummy login credentials (kan ändras till en backend-anrop om det behövs)
const validUsername = "vipoUser";
const validPassword = "securePassword";

// Lyssnar på inloggningsformulärets submit-händelse
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Förhindrar att sidan laddas om

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Validerar inloggningsuppgifterna
    if (username === validUsername && password === validPassword) {
        localStorage.setItem('isLoggedIn', true); // Sparar inloggningsstatus i localStorage
        window.location.href = 'index.html'; // Omdirigerar till chatt-sidan
    } else {
        document.getElementById('error-message').style.display = 'block'; // Visar felmeddelande
    }
});

// Kontrollera inloggningsstatus
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn && window.location.pathname !== '/start.html') {
        window.location.href = 'start.html'; // Omdirigerar till start-sidan om användaren inte är inloggad
    }
}

// Kontrollera status när sidan laddas
window.onload = function() {
    checkLoginStatus();

    if (window.location.pathname === '/index.html') {
        simulateBotResponse("Hej, hur kan jag hjälpa dig idag?");
    }
};

// Funktion för att skicka meddelanden
function sendMessage() {
    let userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        addMessage(userInput, 'user');
        sendMessageToChatbot(userInput);
        document.getElementById('user-input').value = ''; // Rensar textfältet efter meddelande
        document.getElementById('user-input').style.height = '35px'; // Återställer höjden på textfältet
    }
}

// Funktion för att lägga till meddelanden i chatten
function addMessage(text, sender) {
    let messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;

    if (sender === 'user') {
        let messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = text;
        messageDiv.appendChild(messageContent);
    } else if (sender === 'bot') {
        let profileDiv = document.createElement('div');
        profileDiv.className = 'bot-profile';
        let profileImg = document.createElement('img');
        profileImg.src = 'logga.png'; // Profilbild för boten
        profileDiv.appendChild(profileImg);

        let messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = text;

        messageDiv.appendChild(profileDiv);
        messageDiv.appendChild(messageContent);
    }

    document.getElementById('messages').appendChild(messageDiv);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

// Simulerar botens svar
function simulateBotResponse(text) {
    showTypingIndicator();
    setTimeout(function() {
        hideTypingIndicator();
        addMessage(text, 'bot');
    }, 1500);
}