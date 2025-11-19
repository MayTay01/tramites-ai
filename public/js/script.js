console.log("El archivo script.js está funcionando");

async function sendMessage() {
    let input = document.getElementById("user-input");
    let message = input.value.trim();
    if (message === "") return;

    // Mostrar mensaje del usuario
    addMessage(message, "user-message");
    input.value = "";

    try {
        // Enviar al servidor Node
        const response = await fetch("https://tramites-ai-1.onrender.com/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        // Mostrar respuesta REAL de la IA
        addMessage(data.reply, "ai-message");

    } catch (error) {
        addMessage("Error: No se pudo conectar con el servidor.", "ai-message");
        console.error(error);
    }
}

function addMessage(text, className) {
    let box = document.getElementById("chat-box");
    let div = document.createElement("div");
    div.className = className;
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}


