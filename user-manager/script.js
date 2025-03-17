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
        alert("Failed to fetch users. Please try again later.");
    }
};

//Render users
const renderUsers = (users) => {
    const container = document.querySelector(appendLocation);

    if (!container) {
        console.error("Container element not found!");
        return;
    }
    container.innerHTML = '';

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add("user-card");

        userElement.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>E-mail:</strong> ${user.email}</p>
            <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
            <button class="delete-button" data-id="${user.id}"><i class="fas fa-trash"></i></button>
        `;
        container.appendChild(userElement);
    });
    addDeleteEventListeners();
};

// Delete user
const deleteUser = (userId) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(user => user.id !== parseInt(userId));
    localStorage.setItem('users', JSON.stringify(users));
    renderUsers(users);
};

// Add event listener to delete buttons
const addDeleteEventListeners = () => {
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const userId = event.currentTarget.dataset.id;
            deleteUser(userId);
        });
    });
};

// Show button when all users are deleted
const observeUserList = () => {
    const container = document.querySelector(appendLocation);

    if (!container) {
        console.error("Container not found for observer.");
        return;
    }

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
}
else {
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
        flex-wrap: wrap;
        justify-content: center;
        gap: 15px;
    }
    .user-card { 
        background:rgba(255, 255, 255, 0.15);
        border-radius: 15px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
        padding: 20px;
        width: 320px;
        text-align: left;
        transition: transform 0.2s, box-shadow 0.2s;
        margin: 15px auto;
    }
    .user-card:hover { 
        transform: scale(1.05);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }
    .user-item {
        display: flex;
        justify-content: space-between;
        padding: 5px;
        border-bottom: 1px solid #ddd;
    }
    .delete-button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
        transition: transform 0.2s, color 0.3s;
        color: #dc3545;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;  
        height: 40px; 
        padding: 5px;
        position: relative; 
        z-index: 1;
    }
    .delete-button i {
        font-size: 20px;
    }
    .delete-button:hover {
        color: #c82333;
        z-index: 2;
    }
    .reload-button {
        display: block;
        margin: 20px auto; 
        background: linear-gradient(45deg, #28a745, #218838); 
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        border: none;
        cursor: pointer;
        transition: background 0.3s, transform 0.2s;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        width: 150px; 
        height: 50px; 
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none; 

    }
    .reload-button:hover {
        background: linear-gradient(45deg, #218838, #1e7e34);
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

observeUserList();
