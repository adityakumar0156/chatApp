const socket = io('http://localhost:8000', { transports: ['websocket'] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');



const name = prompt("Enter your name to join:");
socket.emit('new-user-joined', name);

const textInput = document.getElementById('messageInp');
textInput.addEventListener('keypress', (e) => {
    // console.log(textInput.value);
    socket.emit('type', name);
})


const beep = new Audio('./static/media/whatsapp.mp3');
const entry = new Audio('./static/media/entry.mp3');
const left_mp3 = new Audio('./static//media/beep.mp3');
const send_mp3 = new Audio('./static/media/send.mp3');
const keypress = new Audio('./static/media/keypress.mp3');



const append = (name, message, position) => {

    const messageElement = document.createElement('div');
    const nameElement = document.createElement('div');
    const timeElement = document.createElement('div');

    timeElement.innerText = new Date().toLocaleString();
    nameElement.innerText = name;
    messageElement.innerText = message;

    nameElement.classList.add('name');
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    timeElement.classList.add('time');

    messageElement.append(timeElement);
    messageElement.append(nameElement);
    messageContainer.append(messageElement);

    //scroll to bottom 
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
const append_joined = (name) => {



    const messageElement = document.createElement('div');
    const timeElement = document.createElement('div');

    timeElement.innerText = new Date().toLocaleString();
    messageElement.innerText = name;
    messageElement.classList.add('joined');
    timeElement.classList.add('time');
    messageElement.classList.add('message');
    messageElement.append(timeElement);
    messageContainer.append(messageElement);

    //scroll to bottom 
    messageContainer.scrollTop = messageContainer.scrollHeight;
}


const append_top = (name) => {
    // console.log('append top is called!');
    const typingElement = document.getElementById('typing');
    typingElement.innerText = `${name} is Typing...`;
    keypress.play();
    setTimeout(() => {
        typingElement.innerText = '***';

    }, 2500);

}




form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append('You', message, 'right');
    socket.emit('send', message);
    send_mp3.play();
    messageInput.value = '';
})



socket.on('user-joined', name => {
    append_joined(`${name} Joined`);
    entry.play();
})

socket.on('recieve', (data) => {
    append(data.name, data.message, 'left');
    beep.play();
})

socket.on('left', (name) => {
    append_joined(`${name} Left`);
    left_mp3.play();
})

socket.on('typing', (name) => {
    // console.log(name, ' listening typing event!!');
    append_top(name);

})