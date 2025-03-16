const appendLocation = '#user-list'; 
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch users from API
const fetchUsers = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok){
            throw new Error("API could not be reached");
        }

        const users = await response.json();
        localStorage.setItem('users', JSON.stringify(users));
        renderUsers(users);
    } catch (error) {
        console.error(error.message);
    }
};

//Render users
const renderUsers = (users) => {
    const container = document.querySelector(appendLocation);
    container.innerHTML = '';

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add("user-card");

        userElement.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>E-mail:</strong> ${user.email}</p>
            <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
            <button class="delete-button" data-id="${user.id}">Delete</button>
        `;
        container.appendChild(userElement);
    });
    addDeleteEventListeners();
};

// Delete user
const deleteUser = (userId) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    renderUsers(users);
};

// Add event listener to delete buttons
const addDeleteEventListeners = () => {
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const userId = parseInt(event.target.dataset.id);
            deleteUser(userId);
        });
    });
};

// Show button when all users are deleted
const observeUserList = () => {
    const container = document.querySelector(appendLocation);
    const observer = new MutationObserver(() => {
        if (container.children.length === 0 && !sessionStorage.getItem('buttonClicked')) {
            showFetchButton();
        }
    });
    observer.observe(container, { childList: true });
};

// Show users reload button
const showFetchButton = () => {
    const button = document.createElement('button');
    button.textContent = 'Reload Users';
    button.classList.add('reload-button');
    button.addEventListener('click', () => {
        fetchUsers();
        sessionStorage.setItem('buttonClicked', 'true');
        button.remove();
    });
    document.body.appendChild(button);
};

// Load users at startup
if (!localStorage.getItem('users')) {
    fetchUsers();
} else {
    renderUsers(JSON.parse(localStorage.getItem('users')));
}

// Add CSS styles 
const style = document.createElement('style');
style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

    body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f4f4f4;
        background-image: url('assets/image.jpg'); 
        background-size: cover; 
        background-position: center; 
        background-attachment: fixed;
        color: #333;
    }
    #user-list div {
        padding: 10px;
        border: 1px solid #ccc;
        max-width: 300px;
        margin: 10px auto;
    }
    .user-card { 
        background: #ffffff; 
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 20px;
        width: 300px;
        text-align: left;
        transition: transform 0.2s;
        margin: 10px;
        box-sizing: border-box;
    }
    .user-card:hover { 
        transform: scale(1.05);
    }
    .user-item {
        display: flex;
        justify-content: space-between;
        padding: 5px;
        border-bottom: 1px solid #ddd;
    }
    .delete-button, .reload-button {
        background-color: #f44336;
        color: white;
        border: none;
        padding: 5px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.3s;
    }
    .delete-button:hover {
        background-color: #cc0000;
    }
    .reload-button {
        display: block;
        margin: 10px auto;
        background: green;
    }
`;
document.head.appendChild(style);

observeUserList();
