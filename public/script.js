var socket = io();
const chatDisplay = document.querySelector("#chat-display");
const container = document.querySelector("#container");
const form = document.querySelector("#send-msg");
const input = document.querySelector("#input");


let name = prompt("Your name");

const infinity = Math.pow(10, 1000); // doesn't seem to be referenced

let newDiv = document.createElement("div");
newDiv.classList.add("new-div");
container.insertBefore(newDiv, chatDisplay);
newDiv.style.padding = "5px";
newDiv.style.display = "flex";
newDiv.style.justifyContent = "space-between";
newDiv.style.alignItems = "center";


let newActDiv = document.createElement("div");
newDiv.appendChild(newActDiv);





// sending event to app.js when new user has joined
socket.emit('new-user-joined', name);






// receiving event from app.js when joined the chat
socket.on('self-joined', data => {
    newActDiv.innerHTML = "Active Users: " + data.activeUsers;


    let selfName = document.createElement("div");
    selfName.innerHTML = "You: " + data.name;
    newDiv.appendChild(selfName);




    let newNotif = document.createElement("div");
    newNotif.classList.add("msgs");
    newNotif.classList.add("updates");
    chatDisplay.appendChild(newNotif);

    let pInNotif = document.createElement("p");
    pInNotif.innerHTML = "You joined as " + "\"" + data.name + "\"";
    newNotif.appendChild(pInNotif);

    chatDisplay.scrollTo(0, chatDisplay.scrollHeight);
});









// receiving event from app.js when new user joined
socket.on('user-joined', data => {
    newActDiv.innerHTML = "Active Users: " + data.activeUsers;

    let newNotif = document.createElement("div");
    newNotif.classList.add("msgs");
    newNotif.classList.add("updates");
    chatDisplay.appendChild(newNotif);

    let pInNotif = document.createElement("p");
    pInNotif.innerHTML = "\"" + data.name + "\"" + " joined";
    newNotif.appendChild(pInNotif);

    chatDisplay.scrollTo(0, chatDisplay.scrollHeight);
});











// on submitting the form (send msg)
form.addEventListener('submit', function (e) {
    e.preventDefault();



    // sending event to app.js on submitting the form (send msg)
    socket.emit('msg-sent', input.value);

    let newSelfMsg = document.createElement("div");
    newSelfMsg.classList.add("msgs");
    newSelfMsg.classList.add("self");
    chatDisplay.appendChild(newSelfMsg);

    let nameSelfMsg = document.createElement("p");
    nameSelfMsg.setAttribute("id", "self-name");
    nameSelfMsg.textContent = name;
    newSelfMsg.appendChild(nameSelfMsg);

    let pInNewSelfMsg = document.createElement("p");
    pInNewSelfMsg.setAttribute("id", "self-msg");
    pInNewSelfMsg.textContent = input.value;
    newSelfMsg.appendChild(pInNewSelfMsg);

    input.value = "";
    chatDisplay.scrollTo(0, chatDisplay.scrollHeight);
});



// receiving event from app.js on receiving msg
socket.on('msg-receive', data => {
    let newMsg = document.createElement("div");
    newMsg.classList.add("msgs");
    newMsg.classList.add("other");
    chatDisplay.appendChild(newMsg);

    let nameMsg = document.createElement("p");
    nameMsg.setAttribute("id", "other-name");
    nameMsg.textContent = data.name;
    newMsg.appendChild(nameMsg);

    let pInNewMsg = document.createElement("p");
    pInNewMsg.setAttribute("id", "other-msg");
    pInNewMsg.textContent = data.message;
    newMsg.appendChild(pInNewMsg);

    chatDisplay.scrollTo(0, chatDisplay.scrollHeight);
});



// receiving event from app.js when new user disconnects
socket.on('who-disconnected', name => {
    let newNotif = document.createElement("div");
    newNotif.classList.add("msgs");
    newNotif.classList.add("updates");
    chatDisplay.appendChild(newNotif);

    let pInNotif = document.createElement("p");
    pInNotif.innerHTML = "\"" + name + "\"" + " disconnected";
    newNotif.appendChild(pInNotif);

    chatDisplay.scrollTo(0, chatDisplay.scrollHeight);
});




// Show users object length when disconnected
socket.on('user-disconnected', (activeUsers) => {
    newActDiv.innerHTML = "Active Users: " + activeUsers;
});

