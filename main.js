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
        console.log("Inloggning lyckades"); // Debug: Inloggning lyckades
        localStorage.setItem('isLoggedIn', true); // Sparar inloggningsstatus i localStorage
        window.location.href = 'index.html'; // Omdirigerar till chatt-sidan
    } else {
        console.log("Inloggning misslyckades"); // Debug: Inloggning misslyckades
        document.getElementById('error-message').style.display = 'block'; // Visar felmeddelande
    }
});

// Kontrollera inloggningsstatus
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // Kollar om användaren är inloggad
    console.log("Inloggningsstatus: ", isLoggedIn); // Skriver ut status för inloggning i konsolen

    // Om användaren inte är inloggad och inte befinner sig på start eller login-sidan
    const currentPage = window.location.pathname.split("/").pop(); // Kollar vilken sida vi är på
    if (!isLoggedIn && currentPage !== 'start.html' && currentPage !== 'login.html') {
        window.location.href = 'start.html'; // Omdirigerar användaren till startsidan
    }
}


// Kontrollera status när sidan laddas
window.onload = function() {
    console.log("Sidan laddas, kontrollerar inloggning"); // Debug: Sidan laddas
    checkLoginStatus(); // Kontrollera inloggning

    if (window.location.pathname === '/index.html') {
        console.log("På chattsidan"); // Debug: På chattsidan
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