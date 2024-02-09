/* For index.html */

// TODO: If a user clicks to create a chat, create an auth key for them
// and save it. Redirect the user to /chat/<chat_id>
function createChat() {

}

/* For chat.html */

// TODO: Fetch the list of existing chat messages.
// POST to the API when the user posts a new message.
// Automatically poll for new messages on a regular interval.
function postMessage() {
  const userId = WATCH_PARTY_USER_ID;
  const messageBody = document.querySelector('.comment_box textarea').value;
  // extract roomId
  const roomId = document.querySelector('.invite a').getAttribute('href').split('/').pop();
  console.log(roomId);
  fetch(`/api/rooms/${roomId}/messages`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WATCH_PARTY_API_KEY}`
    },
    body: JSON.stringify({body: messageBody, user_id: userId})
  })
  .then(response => {
      if (!response.ok) {
        console.error('Failed to post message');
      } else {
        document.querySelector('.comment_box textarea').value = '';
        getMessages();
      }
  })
  .catch(error => console.error('Error when posting message: ', error));
}

function getMessages() {
  const roomId = document.querySelector('.invite a').getAttribute('href').split('/').pop();
  console.log(roomId);
  fetch(`/api/rooms/${roomId}/messages`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${WATCH_PARTY_API_KEY}`
    }
  })
  .then(response => response.json())
  .then(messages => {
    const messagesContainer = document.querySelector('.messages');
    messagesContainer.innerHTML = '';
    messages.forEach(message => {
        const messageElement = document.createElement('message');
        
        const authorElement = document.createElement('author');
        authorElement.textContent = message.user_name;
        const contentElement = document.createElement('content');
        contentElement.textContent = message.body;

        messageElement.appendChild(authorElement);
        messageElement.appendChild(contentElement);
        messagesContainer.appendChild(messageElement);
    });
  })
  .catch(error => console.error('Error when getting messages: ', error));
}

function startMessagePolling() {
  //setInterval(getMessages, 100);
  return;
}

function updateUserName(newUsername) {
  fetch('/api/user/name', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <WATCH_PARTY_API_KEY>'
    },
    body: JSON.stringify({name: newUsername})
  })
  .then(response => {
      if (!response.ok) {
        console.error('Failed to update username');
      } else {
        alert('Username updated successfully');
      }
  })
  .catch(error => console.error('Error when updating username: ', error));
}

function updatePassword(newPassword) {
  fetch('/api/user/name', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <WATCH_PARTY_API_KEY>'
    },
    body: JSON.stringify({password: newPassword})
  })
  .then(response => {
      if (!response.ok) {
        console.error('Failed to update password');
      } else {
        alert('Password updated successfully');
      }
  })
  .catch(error => console.error('Error when updating password: ', error));
}

function updateRoomName(roomId, newRoomName) {
  fetch(`/api/rooms/${roomId}/name`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer <WATCH_PARTY_API_KEY>'
      },
      body: JSON.stringify({name: newRoomName})
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to update room name');
      }
      console.log('Room name updated successfully');
  })
  .catch(error => console.error('Error updating room name:', error));
}

function eventListeners() {
  // for posting message
  document.getElementById('comment_form').addEventListener('submit', function(e) {
    e.preventDefault();
    postMessage();
  });

  // for updating username

}

document.addEventListener('DOMContentLoaded', function() {
  startMessagePolling();
  eventListeners();
});
