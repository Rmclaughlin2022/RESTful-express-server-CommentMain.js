d//Comment the first 48 lines of code.

// Wait until the entire html document is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Handle delete buttons

  // Selects all elements with the name delete-btn 
  document.querySelectorAll('.delete-btn').forEach(button => {

    // adds an event listener (Detects user interactions for when they
    // click) and adds that to the delete-btn
    button.addEventListener('click', async (e) => {
      // Get the productId from the dataset
      const productId = e.target.dataset.id;

      // asks the user to confirm blah blah blah
      if (confirm('Are you sure you want to delete this product?')) {
        // If the user confirms then
        try {
          // sends a DELETE request to the server
          const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE'
          });
          // If the DELETE response works / sends to the server
          if (response.ok) {
            // Checks to see if the user is on the /products page
            if (window.location.pathname === '/products') {
              // Remove from DOM if on list page so the user cannot see it
              const productCard = e.target.closest('.product-card');
              productCard.remove();
            } else {
              // In case the user is on the products details page, It redirects
              // the user back to the products page
              window.location.href = '/products';
            }
          } else {
            // if the deletion fails then you show an alert
            alert('Failed to delete the product');
          }
          // catching an error
        } catch (err) {
          // if something went wrong with sending a delete request to the
          // server then show in the console an error message
          console.error('Error:', err);
          alert('An error occurred while deleting the product');
        }
      }
    });
  });

  // Handle search functionality

  // Make a const that gets the 'search' id
  const searchInput = document.getElementById('search');

  // if the searchInput exists on the page
  if (searchInput) {
    // add an input event listener to filterProducts
    // What is an input event listener? Something that changes the input element depending on what the user does
    searchInput.addEventListener('input', filterProducts);
  }
  // Handle category filter

  // Initilize a const variable categoryfilter by the Id of 
  // 'category-filter'
  const categoryFilter = document.getElementById('category-filter');
  // If the categoryFilter exists on the page
  if (categoryFilter) {
    // Add a event listener to change filterProducts when a category
    // -filter is selected.
    categoryFilter.addEventListener('change', filterProducts);
  }
// stop here
  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value.toLowerCase();

    document.querySelectorAll('.product-card').forEach(product => {
      const name = product.querySelector('h3').textContent.toLowerCase();
      const productCategory = product.querySelector('.category').textContent.toLowerCase();
      const matchesSearch = name.includes(searchTerm);
      const matchesCategory = !category || productCategory.includes(category);

      if (matchesSearch && matchesCategory) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

  // Handle form submission with validation
  const productForm = document.getElementById('productForm');
  if (productForm) {
    productForm.addEventListener('submit', function (e) {
      const nameInput = document.getElementById('name');
      const priceInput = document.getElementById('price');
      const categoryInput = document.getElementById('category');

      let isValid = true;
      let errorMessage = '';

      if (!nameInput.value.trim()) {
        isValid = false;
        errorMessage += 'Product name is required\n';
      }

      if (!priceInput.value || isNaN(priceInput.value) || Number(priceInput.value) <= 0) {
        isValid = false;
        errorMessage += 'Price must be a positive number\n';
      }

      if (!categoryInput.value) {
        isValid = false;
        errorMessage += 'Please select a category\n';
      }

      if (!isValid) {
        e.preventDefault();
        alert(errorMessage);
      }
    });
  }
});