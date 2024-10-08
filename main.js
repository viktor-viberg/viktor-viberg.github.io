// Kollapsa eller expandera sidofältet
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
}

// Starta en ny chatt genom att rensa chattfönstret och initiera en ny chatt
function startNewChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = ''; // Rensa tidigare chattar
    initializeChat(); // Starta AI-chatten igen
}

// Dynamiskt justera höjden på textinmatningsfältet baserat på innehållet
const textarea = document.getElementById('message-input');
textarea.addEventListener('input', autoResize);

function autoResize() {
    textarea.style.height = 'auto'; // Återställ höjden först
    let scrollHeight = textarea.scrollHeight; // Höjden för innehållet
    const maxHeight = 160; // Maxhöjd motsvarande 8 rader

    if (scrollHeight > maxHeight) {
        textarea.style.height = maxHeight + 'px'; // Sätt maxhöjd och aktivera skrollning
        textarea.style.overflowY = 'auto'; // Tillåt skroll om texten överstiger maxhöjden
    } else {
        textarea.style.height = scrollHeight + 'px'; // Anpassa höjden efter innehållet
        textarea.style.overflowY = 'hidden'; // Dölja skroll om texten är mindre än maxhöjden
    }
}

// Initiera en chatt med prickanimation följt av AI:s meddelande
function initializeChat() {
    const chatBox = document.getElementById('chat-box');

    // Visa prickanimation för att indikera att AI "skriver"
    const aiTypingIndicator = document.createElement('div');
    aiTypingIndicator.classList.add('message', 'ai');
    aiTypingIndicator.innerHTML = `
        <img src="robot.png" alt="AI Profilbild">
        <div class="bubble"><div class="dot-typing"><span></span><span></span><span></span></div></div>
    `;
    chatBox.appendChild(aiTypingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Efter 1 sekund, ta bort prickarna och visa AI:s välkomstmeddelande
    setTimeout(() => {
        aiTypingIndicator.remove();
        const aiMessage = document.createElement('div');
        aiMessage.classList.add('message', 'ai');
        aiMessage.innerHTML = `
            <img src="robot.png" alt="AI Profilbild">
            <div class="bubble">Hej, hur kan jag hjälpa dig?</div>
        `;
        chatBox.appendChild(aiMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000); // 1 sekunds fördröjning
}

// Skicka användarens meddelande när Enter trycks
textarea.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Förhindrar ny rad vid Enter
        sendMessage(); // Skickar meddelandet
    }
});

// Hantera uppladdning av filer
document.getElementById('file-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        alert(`Fil uppladdad: ${file.name}`);
    }
});

// Funktion för att skicka meddelande och visa AI-svar
function sendMessage() {
    const message = textarea.value.trim();
    if (message) {
        const chatBox = document.getElementById('chat-box');
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user');
        userMessage.innerHTML = `<div class="bubble">${message}</div>`;
        chatBox.appendChild(userMessage);
        textarea.value = ''; // Töm textfältet
        textarea.style.height = 'auto'; // Återställ höjden till ursprungliga 2 rader
        chatBox.scrollTop = chatBox.scrollHeight;

        // Lägg till AI:s väntindikator (prickar)
        const aiTypingIndicator = document.createElement('div');
        aiTypingIndicator.classList.add('message', 'ai');
        aiTypingIndicator.innerHTML = `
            <img src="robot.png" alt="AI Profilbild">
            <div class="bubble"><div class="dot-typing"><span></span><span></span><span></span></div></div>
        `;
        chatBox.appendChild(aiTypingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;

        // Efter 1 sekund, ta bort prickarna och lägg till AI-svaret
        setTimeout(() => {
            aiTypingIndicator.remove();
            const aiMessage = document.createElement('div');
            aiMessage.classList.add('message', 'ai');
            aiMessage.innerHTML = `
                <img src="robot.png" alt="AI Profilbild">
                <div class="bubble">Det här är ett AI-svar på ditt meddelande: "${message}"</div>
            `;
            chatBox.appendChild(aiMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000); // 1 sekunds fördröjning
    }
}
