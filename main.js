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
        profileImg.src = 'logga.png'; // Profilbild för bot
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
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        if (!event.shiftKey) { // Kontrollera om Shift hålls nere för ny rad
            event.preventDefault(); // Förhindrar ny rad
            sendMessage();
        }
    }
});

// Anpassa höjden på textfältet baserat på innehållet
document.getElementById('user-input').addEventListener('input', function() {
    this.style.height = 'auto'; // Återställer höjden för att mäta korrekt
    this.style.height = (this.scrollHeight) + 'px'; // Justerar höjden till innehållet
});

// Event för att skicka meddelanden med "Skicka"-knappen
document.getElementById('send-button').addEventListener('click', function() {
    sendMessage();
});

// Event för filuppladdning
document.getElementById('file-upload').addEventListener('change', function(event) {
    let file = event.target.files[0];
    if (file) {
        addMessage(`Fil uppladdad: ${file.name}`, 'user');
        // Hantera filuppladdning här
    }
});

// Lägg till automatiskt välkomstmeddelande när sidan öppnas
window.onload = function() {
    simulateBotResponse("Hej, hur kan jag hjälpa dig idag?");
};
