var socket = io();
var startTime;

socket.on('bot_response', function(data) {
    var messages = document.getElementById('messages');
    var generatingResponse = document.getElementById('generating-response');
    if (!generatingResponse) {
        generatingResponse = document.createElement('div');
        generatingResponse.id = 'generating-response';
        generatingResponse.className = 'message bot';
        messages.appendChild(generatingResponse);
    }

    var responseText = data.message;
    var reasoningStart = responseText.indexOf('<think>');
    var reasoningEnd = responseText.indexOf('</think>');

    if (reasoningStart !== -1 && reasoningEnd !== -1) {
        var reasoningText = responseText.substring(reasoningStart + 7, reasoningEnd).trim();
        var finalAnswer = responseText.substring(reasoningEnd + 8).trim();

        if (reasoningText === "") {
            generatingResponse.textContent = finalAnswer;
        } else {
            generatingResponse.innerHTML = '<strong>Chain of Thought:</strong><br>' + reasoningText + '<br><strong>Answer:</strong><br>' + finalAnswer;
        }
    } else {
        generatingResponse.textContent = responseText.replace(/<\/?think>/g, '');
    }

    messages.scrollTop = messages.scrollHeight;
});

socket.on('bot_response_complete', function() {
    var generatingResponse = document.getElementById('generating-response');
    if (generatingResponse) {
        generatingResponse.removeAttribute('id');
    }
});

function sendMessage() {
    var userInput = document.getElementById('user-input');
    var message = userInput.value;
    userInput.value = '';

    var messages = document.getElementById('messages');
    var userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.textContent = message;
    messages.appendChild(userMessage);

    socket.emit('user_message', {message: message});
    messages.scrollTop = messages.scrollHeight;

    startTime = new Date();
    toggleSendButton();
}

function toggleSendButton() {
    var userInput = document.getElementById('user-input');
    var sendButton = document.getElementById('send-button');
    sendButton.disabled = userInput.value.trim() === '';
}