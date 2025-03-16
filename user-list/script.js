const API_URL = "https://jsonplaceholder.typicode.com/users";
const STORAGE_KEY = "users";
const EXPIRATION_KEY = "users_expiration";
const ONE_DAY = 24 * 60 * 60 * 1000; 

const userContainer = document.querySelector(".ins-api-users");

// Fetch users from API
const fetchUsers = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok){
            throw new Error("API could not be reached");
        }

        const users = await response.json();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
        localStorage.setItem(EXPIRATION_KEY, new Date().getTime() + ONE_DAY);
        renderUsers(users);
    } catch (error) {
        userContainer.textContent = error.message; 
    }
};

// LocalStorage control
const getUsers = () => {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    const expiration = parseInt(localStorage.getItem(EXPIRATION_KEY));
    const now = new Date().getTime();

    if (storedUsers && expiration > now) {
        return JSON.parse(storedUsers);
    } else {
        fetchUsers();
        return []; 
    }
};

//Render users
const renderUsers = (users) => {
    if (!users || users.length === 0) {
        userContainer.innerHTML = "<p>No users available !</p>";
        return;
    }

    userContainer.innerHTML = "";

    users.forEach(user => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");

        const userName = document.createElement("h3");
        userName.textContent = user.name;

        const userEmail = document.createElement("p");
        userEmail.innerHTML = `E-mail: <span>${user.email}</span>`;

        const userAddress = document.createElement("p");
        userAddress.innerHTML = `Address: <span>${user.address.street}, ${user.address.city}</span>`;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-id", user.id);

        userCard.appendChild(userName);
        userCard.appendChild(userEmail);
        userCard.appendChild(userAddress);
        userCard.appendChild(deleteButton);

        userContainer.appendChild(userCard);
    });
};


// Delete user
const deleteUser = (id) => {
    try {
        let users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        users = users.filter(user => user.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
        renderUsers(users);    
    } catch (error) {
        console.error('Delete error:', error);
        alert('An error occurred during the deletion process');  
    }

};

// Delete button management with event delegation
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
        const userId = parseInt(event.target.getAttribute("data-id"));
        deleteUser(userId);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    renderUsers(getUsers() || []);
});

// Add CSS styles 
const style = document.createElement("style");
style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

    body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f4f4f4;
        background-image: url('images/image.jpg'); 
        background-size: cover; 
        background-position: center; 
        background-attachment: fixed;
        color: #333;
    }
    .ins-api-users { 
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        padding: 20px;
        justify-content: center;
        
    }
    .user-card { 
        background: #ffffff; 
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 20px;
        width: 300px;
        text-align: center;
        transition: transform 0.2s;
        margin: 10px;
        box-sizing: border-box;
    }
    .user-card:hover { 
        transform: scale(1.05);
    }
    .delete-button {
        background-color: #ff4d4d;
        color: white;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        border-radius: 5px;
        transition: background 0.3s;
    }
    h3 {
        font-size: 20px;
        font-weight: 500;
        color: #333;
    }
    p {
        font-size: 16px;
        color: #666;
    }
    .delete-button:hover {
        background-color: #cc0000;
    }
    .error-message {
        color: red;
        font-weight: bold;
    }
`;
document.head.appendChild(style);
