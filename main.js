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
        window.location.href = 'index.html'; // Omdirigerar till huvudchattsidan
    } else {
        document.getElementById('error-message').style.display = 'block'; // Visar felmeddelande
    }
});

// Kontrollera inloggningsstatus
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html'; // Omdirigera till login-sidan om användaren inte är inloggad
    }
}

// Anropa denna funktion på alla sidor som ska vara skyddade
if (window.location.pathname !== '/login.html') {
    checkLoginStatus();
}

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

// Funktion för att visa skrivindikation
function showTypingIndicator() {
    let typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.id = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    document.getElementById('messages').appendChild(typingIndicator);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

// Funktion för att dölja skrivindikation
function hideTypingIndicator() {
    let typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Simulerar botens svar
function simulateBotResponse(text) {
    showTypingIndicator();
    setTimeout(function() {
        hideTypingIndicator();
        addMessage(text, 'bot');
    }, 1500); // Tid för väntanimation
}

// Event för att skicka meddelanden med "Enter"-tangenten
document.getElementById('user-input')?.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        if (!event.shiftKey) { // Kontrollera om Shift hålls nere för ny rad
            event.preventDefault(); // Förhindrar ny rad
            sendMessage();
        }
    }
});

// Anpassa höjden på textfältet baserat på innehållet
document.getElementById('user-input')?.addEventListener('input', function() {
    this.style.height = 'auto'; // Återställ höjden för att mäta korrekt
    this.style.height = (this.scrollHeight) + 'px'; // Justerar höjden till innehållet
});

// Event för att skicka meddelanden med "Skicka"-knappen
document.getElementById('send-button')?.addEventListener('click', function() {
    sendMessage();
});

// Event för filuppladdning
document.getElementById('file-upload')?.addEventListener('change', function(event) {
    let file = event.target.files[0];
    if (file) {
        addMessage(`Fil uppladdad: ${file.name}`, 'user');
        // Hantera filuppladdning här
    }
});

// Lägg till automatiskt välkomstmeddelande när sidan öppnas
window.onload = function() {
    if (window.location.pathname === '/index.html') {
        simulateBotResponse("Hej, hur kan jag hjälpa dig idag?");
    }
};