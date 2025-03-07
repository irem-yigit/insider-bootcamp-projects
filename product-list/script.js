$(document).ready(function() {
    $('#listProducts').click(function() {
      $.ajax({
        type: 'GET',
        url: 'products.json',
        dataType: 'json',
        success: function(data) {
          $('#productList').empty(); 
          
          $.each(data, function(index, product) {
            let cardHtml = `
              <div class="card">
                <h4>${product.name}</h4>
                <p>Price: ${product.price} $</p>
                <a href="${product.link}" target="_blank">Detailed Information</a>
              </div>
            `;
            $('#productList').append(cardHtml);
          });
        },
        error: function() {
            alert("An error occurred while loading products.");
        }
      });
    });
  });
  