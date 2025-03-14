# Product Hub

This project is a web application that dynamically fetches product information from a **JSON** data file and lists the products using **jQuery**. A pop-up displays detailed information when products are clicked, and various animations enhance user interaction.

## ⚡ Features

- **Dynamic Product Listing:** Displays products using data from a JSON file.
- **Popup Product Details:** Opens a detail popup when clicking on a product.
- **Close popup:** Click outside the popup or use the close button to close it.
- **Overlay Effect:** Background darkens when the popup is open.
- **Smooth animations and transitions:** Products expand slightly on hover.
- **Responsive and user-friendly UI:** Adapts to different screen sizes.

## 🏗️ Technologies Used

- **HTML5:** → Page structure
- **CSS3:** → Styling and animations
- **jQuery:** → Dynamic content loading and event handling
- **JSON:** → Storing product data

## 🔎 Requirements

*   Web browser
*   jQuery library (provided via CDN)
*   `products.json` file (containing product data)

## 📂 Project Structure

    📦 Product-Hub/
    ├── 📂 assets/ # Styles & Images
    │ ├── 🖼️ image.png # Product images
    ├── 📄 index.html # Main HTML file
    ├── 📄 products.json # JSON file containing product data
    └── 📄 README.md # Documentation

## 📝 JSON Data Structure

Each product in the products.json file follows this structure:

    [
        {
            "id": "Product Id",
            "name": "Product Name",
            "price": 100,
            "image": "assets/product1.jpg",
            "link": "https://example.com/product1",
            "details": "Product description",
        }
    ]

## 📸 Screenshots

### 🔹 **Product List**
![Product List](images/product-list.png)

### 🔹 **Product Detail**
![Product Detail](images/product-detail.png)
 
## 🎯 Additional Information

* The project uses only jQuery.
* HTML and CSS codes are also dynamically generated using jQuery.
* All codes are designed to work when pasted into the `index.html` file.
* All codes will also work when pasted into the console.




