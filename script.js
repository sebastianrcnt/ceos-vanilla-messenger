const users = [
  {
    name: "고은",
    imgSrc: "https://img.techpowerup.org/200817/ken.jpg",
  },
  {
    name: "유현우",
    imgSrc: "https://img.techpowerup.org/200817/hy.jpg",
  },
];

let messages = [
  { userIndex: 1, content: "안녕 은아" },
  { userIndex: 1, content: "만나서 반가워 🙌🏻" },
  { userIndex: 0, content: "안녕 현우야" },
  { userIndex: 0, content: "밥은 잘 먹었니?" },
  { userIndex: 1, content: "아하하" },
  { userIndex: 0, content: "그만해" },
  { userIndex: 0, content: "웃지마" },
  { userIndex: 1, content: "미안" },
];

let currentUserIndex = 0;

function MyMessageRow(message, isFirst = false) {
  return `
  <div class="message-row flex-row me ${isFirst ? "first" : ""}">
    <div class="message">${message}</div>
  </div>
  `;
}

function YourMessageRow(message, isFirst = false) {
  return `
  <div class="message-row flex-row you ${isFirst ? "first" : ""}">
    <img class="profile-image" src="${
      users[1 - currentUserIndex].imgSrc
    }" alt="" />
    <div class="message">${message}</div>
  </div>
  `;
}

const messagesElement = document.getElementById("messages");
const messageElement = document.getElementById("message");
const messageForm = document.querySelector("form.message-input");
const currentUserIndicatorElement = document.getElementById(
  "current-user-indicator"
);
const currentUserProfileImageElement = document.getElementById(
  "current-user-profile-image"
);

// handlers
function handleSendButtonClick() {
  if (messageElement.value) {
    messages.push({
      userIndex: currentUserIndex,
      content: messageElement.value,
    });
    messageElement.value = "";
    render();
    messagesElement.scrollTop = messagesElement.scrollHeight + 100000;
  }
}

function handleUserToggle() {
  currentUserIndex = 1 - currentUserIndex;
  render();
}

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSendButtonClick();
});

function render() {
  renderMessages();
  renderProfile();
}

function renderMessages() {
  messagesElement.innerHTML = "";
  let prevUserIndex = null;
  for (let message of messages) {
    messagesElement.innerHTML +=
      message.userIndex === currentUserIndex
        ? MyMessageRow(message.content, prevUserIndex !== message.userIndex)
        : YourMessageRow(
            message.content,
            prevUserIndex !== message.userIndex
          );
    prevUserIndex = message.userIndex;
  }
}

function renderProfile() {
  currentUserIndicatorElement.innerText = users[1 - currentUserIndex].name;
  currentUserProfileImageElement.src = users[1 - currentUserIndex].imgSrc;
}

render();
