from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
from ollama import ChatResponse, chat  # Assuming deepseek is a module you can import

app = Flask(__name__)
socketio = SocketIO(app)

model = "deepseek-r1:7b"  # Replace with your actual model name

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('user_message')
def handle_user_message(data):
    user_message = data['message']
    response = chat(model=model, messages=[
        {
            'role': 'user',
            'content': user_message,
        },
    ])
    emit('bot_response', {'message': response.message.content})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)