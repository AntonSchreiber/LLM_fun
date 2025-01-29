from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
from ollama import ChatResponse, chat  

app = Flask(__name__)
socketio = SocketIO(app)

model = "deepseek-r1:7b" 

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('user_message')
def handle_user_message(data):
    user_message = data['message']
    response_generator = chat(model=model, messages=[{'role': 'user', 'content': user_message}], stream=True)

    full_response = ""
    for response in response_generator:
        full_response += response.message.content
        emit('bot_response', {'message': full_response})
    
    emit('bot_response_complete')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)