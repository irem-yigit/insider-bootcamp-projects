# 👥 User Manager

This project includes an application that fetches user data from the **JSONPlaceholder API**, displays it as a list, and allows users to be deleted from this list.

## 🚀 Features

- **Fetching User Data:** Retrieves user data from the JSONPlaceholder API and stores it in local storage.
- **User Listing:** Displays users in a list.
- **Reload Button:** A one-time-only button that appears when all users are deleted, allowing users to be reloaded.
- **Smooth UI:** Modern and user-friendly interface with a background image.

## 🎨 UI Design

- **Responsive layout** for different screen sizes  
- **Styled using CSS with a clean and minimal design**

## 🏗️ Technologies Used

- **HTML5** → For the skeleton of the application.
- **CSS3** → For the styles of the application.
- **JavaScript (ES6+)** → For the logic and interactions of the application.
- **JSONPlaceholder API** → Provides user data.
- **Local Storage** → Used to store data locally.
- **Font Awesome** → Used for icons.

## 🔎 Requirements

* Access to the JSONPlaceholder API
* A modern web browser
* Internet connection

## 📂 Project Structure

    📦 User Manager/
    │── 📂 assets/ # Styles & Images
    │ ├── 🖼️ image # Background & other images
    ├── 📄 index.html # Main HTML file
    ├── 📄 script.js # JavaScript logic
    └── 📄 README.md # Documentation

## 🎯 Usage

* When the application opens, users are automatically fetched from the JSONPlaceholder API and listed.
* Each user has a "Delete" button next to it. You can delete the user by clicking this button.
* When all users are deleted, a "Reload Users" button appears at the bottom of the page. You can reload the users by clicking this button.

## 🌐 API Information

- **API Address:** https://jsonplaceholder.typicode.com/users
- **API Usage:** The project fetches user data from this API and stores it in local storage.

## 📸 Screenshots

### 🔹 **User List**
![Add Task](screenshots/user-list.png)

### 🔹 **Reload User List**
![Task List](screenshots/reload-button.png)

