var socket = io();
var startTime;

socket.on('bot_response', function(data) {
    var endTime = new Date();
    var elapsedTime = (endTime - startTime) / 1000;

    var messages = document.getElementById('messages');
    var message = document.createElement('div');
    message.className = 'message bot';
    message.textContent = data.message + ' (Elapsed time: ' + elapsedTime.toFixed(2) + 's)';
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
}