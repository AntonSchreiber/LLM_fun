var socket = io();
var startTime;

socket.on('bot_response', function(data) {
    var endTime = new Date();
    var elapsedTime = (endTime - startTime) / 1000;

    var messages = document.getElementById('messages');
    var generatingResponse = document.getElementById('generating-response');
    if (generatingResponse) {
        messages.removeChild(generatingResponse);
    }

    var message = document.createElement('div');
    message.className = 'message bot';

    var elapsedTimeElement = document.createElement('span');
    elapsedTimeElement.className = 'elapsed-time';
    elapsedTimeElement.textContent = elapsedTime.toFixed(2) + 's';
    message.appendChild(elapsedTimeElement);

    var messageContent = document.createElement('div');
    var responseText = data.message;
    var reasoningStart = responseText.indexOf('<think>');
    var reasoningEnd = responseText.indexOf('</think>');

    if (reasoningStart !== -1 && reasoningEnd !== -1) {
        var reasoningText = responseText.substring(reasoningStart + 7, reasoningEnd).trim();
        var finalAnswer = responseText.substring(reasoningEnd + 8).trim();

        if (reasoningText) {
            var reasoningElement = document.createElement('details');
            var summaryElement = document.createElement('summary');
            summaryElement.textContent = 'Reasoning';
            reasoningElement.appendChild(summaryElement);

            var reasoningContent = document.createElement('div');
            reasoningContent.textContent = reasoningText;
            reasoningElement.appendChild(reasoningContent);

            messageContent.appendChild(reasoningElement);

            var finalAnswerElement = document.createElement('div');
            finalAnswerElement.innerHTML = '<br><strong>Final Answer:</strong><br>' + finalAnswer;
            messageContent.appendChild(finalAnswerElement);
        } else {
            messageContent.innerHTML = '<br>' + finalAnswer;
        }
    } else {
        messageContent.textContent = responseText.replace(/<\/?think>/g, '');
    }

    message.appendChild(messageContent);
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;

    document.getElementById('spinner').style.display = 'none';
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

    document.getElementById('spinner').style.display = 'block';
    startTime = new Date();
    toggleSendButton();
}

function toggleSendButton() {
    var userInput = document.getElementById('user-input');
    var sendButton = document.getElementById('send-button');
    sendButton.disabled = userInput.value.trim() === '';
}