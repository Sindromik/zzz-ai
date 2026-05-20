async function sendMessage() {

    const input = document.getElementById("input");
    const chat = document.getElementById("chat");

    const text = input.value.trim();

    if (!text) return;

    // USER MESSAGE
    chat.innerHTML += `
    
    <div class="message-row user">

        <div class="msg-avatar">
            Y
        </div>

        <div class="bubble user-bubble">
            ${text}
        </div>

    </div>
    
    `;

    input.value = "";

    // AUTO SCROLL
    chat.scrollTop = chat.scrollHeight;

    // TYPING ANIMATION
    const typingId = Date.now();

    chat.innerHTML += `
    
    <div class="message-row" id="typing-${typingId}">

        <div class="msg-avatar">
            S
        </div>

        <div class="typing-bubble">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>

    </div>
    
    `;

    chat.scrollTop = chat.scrollHeight;

    // REQUEST
    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: text
        })
    });

    const data = await response.json();

    // REMOVE TYPING
    document.getElementById(`typing-${typingId}`).remove();

    // AI MESSAGE
    chat.innerHTML += `
    
    <div class="message-row">

        <div class="msg-avatar">
            S
        </div>

        <div class="bubble bot-bubble">
            ${marked.parse(data.reply)}
        </div>

    </div>
    
    `;

    // SCROLL
    chat.scrollTop = chat.scrollHeight;
}

// ENTER SEND
document
    .getElementById("input")
    .addEventListener("keypress", function(e) {

        if (e.key === "Enter") {
            sendMessage();
        }

    });

const quickButtons = document.querySelectorAll(".quick-btn");

quickButtons.forEach(button => {

    button.addEventListener("click", () => {

        const input = document.getElementById("input");

        input.value = button.textContent;

        input.focus();

    });

});