// Dummy login credentials (väldigt simpelt användarnamn och lösenord för test)
const validUsername = "test";
const validPassword = "1234";

// Funktion för att kontrollera inloggningsstatus
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // Kontrollera om användaren är inloggad
    const currentPage = window.location.pathname.split("/").pop(); // Kollar vilken sida som laddas

    // Om användaren inte är inloggad och försöker komma åt chattsidan (index.html)
    if (!isLoggedIn && currentPage === 'index.html') {
        window.location.href = 'start.html'; // Omdirigera till start-sidan om ej inloggad
    }
}

// Funktion för att hantera inloggningsförsöket
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validerar inloggningsuppgifterna
    if (username === validUsername && password === validPassword) {
        localStorage.setItem('isLoggedIn', true); // Spara inloggningsstatus
        window.location.href = 'index.html'; // Omdirigera till chatt-sidan
    } else {
        document.getElementById('error-message').style.display = 'block'; // Visa felmeddelande
    }
}

// Eventlyssnare för inloggningsformuläret
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Förhindra omladdning av sidan
    handleLogin(); // Hantera inloggningen
});

// Funktion för att skicka meddelanden i chatten
function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();

    if (userInput !== "") {
        addMessage(userInput, 'user'); // Lägg till användarens meddelande i chatten
        simulateBotResponse(); // Simulerar ett botsvar
        document.getElementById('user-input').value = ''; // Rensa inmatningsfältet
        document.getElementById('user-input').style.height = '35px'; // Återställ fältets höjd
    }
}

// Funktion för att lägga till meddelanden i chattfönstret
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;

    if (sender === 'user') {
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = text;
        messageDiv.appendChild(messageContent);
    } else if (sender === 'bot') {
        const profileDiv = document.createElement('div');
        profileDiv.className = 'bot-profile';
        const profileImg = document.createElement('img');
        profileImg.src = 'logga.png'; // Boten använder din logotyp som profilbild
        profileDiv.appendChild(profileImg);

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = text;

        messageDiv.appendChild(profileDiv);
        messageDiv.appendChild(messageContent);
    }

    document.getElementById('messages').appendChild(messageDiv);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight; // Scrolla till botten
}

// Funktion för att simulera ett botsvar
function simulateBotResponse() {
    showTypingIndicator(); // Visa skrivanimation
    setTimeout(function() {
        hideTypingIndicator();
        addMessage("Hej! Hur kan jag hjälpa dig idag?", 'bot');
    }, 1500); // Fördröjning innan botens svar visas
}

// Funktion för att visa en skrivanimation
function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.id = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    document.getElementById('messages').appendChild(typingIndicator);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight; // Scrolla till botten
}

// Funktion för att dölja skrivanimation
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Kontrollera inloggningsstatus när sidan laddas
window.onload = function() {
    checkLoginStatus(); // Kontrollera om användaren är inloggad

    // Om vi är på chattsidan, simulera ett automatiskt botsvar
    if (window.location.pathname === '/index.html') {
        simulateBotResponse();
    }
};

// Eventlyssnare för att skicka meddelanden när användaren trycker på Enter
document.getElementById('user-input')?.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) { // Skicka meddelande om Enter trycks och Shift ej hålls nere
        event.preventDefault();
        sendMessage();
    }
});

// Eventlyssnare för att skicka meddelanden med knappen
document.getElementById('send-button')?.addEventListener('click', function() {
    sendMessage(); // Skicka meddelandet
});