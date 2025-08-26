/**
 * Product Grid JavaScript
 * Handles quick add to cart functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Handle quick add buttons
  document.querySelectorAll('.product-card__quick-add').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const variantId = this.dataset.variantId;
      const productTitle = this.dataset.productTitle;
      
      if (!variantId) {
        console.error('Variant ID not found');
        return;
      }
      
      // Set loading state
      this.disabled = true;
      this.textContent = 'Adding...';
      
      // Create form data for the variant
      const formData = new FormData();
      formData.append('id', variantId);
      formData.append('quantity', '1');
      
      // Add to cart
      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Product added to cart:', data);
        
        // Open Kaching Cart drawer if available
        if (window.kachingCartApi && typeof window.kachingCartApi.Cart.open === 'function') {
          window.kachingCartApi.Cart.open();
        }
        
        // Reset button state
        this.textContent = 'Added!';
        setTimeout(() => {
          this.textContent = 'Add to cart';
          this.disabled = false;
        }, 2000);
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        console.log('Variant ID used:', variantId);
        console.log('Product title:', productTitle);
        
        // Reset button state on error
        this.textContent = 'Add to cart';
        this.disabled = false;
      });
    });
  });
  
  // Log when Kaching APIs are detected
  if (window.kachingCartApi) {
    console.log('Kaching Cart API detected');
  }
  
  if (window.kachingBundlesApi) {
    console.log('Kaching Bundles API detected');
  }
});
