
document.addEventListener("DOMContentLoaded", function () {
  // Handle add to cart forms - including both custom forms and product forms
  document.querySelectorAll('.add-to-cart-form, .product-form__buttons').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get the main product form that contains the variant ID and quantity
      const productForm = document.querySelector('.product-form');
      if (!productForm) {
        console.error('Product form not found');
        return;
      }

      const formData = new FormData(productForm);

      // Ensure quantity is properly set from the visible quantity input
      const quantityInput = productForm.querySelector('.quantity__input');
      if (quantityInput && quantityInput.value) {
        formData.set('quantity', quantityInput.value);
        console.log('Quantity set to:', quantityInput.value);
      }

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          // ✅ Open Kaching drawer after successful add to cart
          if (window.kachingCartApi && typeof window.kachingCartApi.Cart.open === 'function') {
            window.kachingCartApi.Cart.open();
            console.log("Product added to cart successfully:", data);
          }
        })
        .catch(err => {
          console.error('Error adding to cart:', err);
        });
    });
  });

  // Ensure quantity selector works properly with the new structure
  document.querySelectorAll('.product-form .quantity__button').forEach(button => {
    button.addEventListener('click', function() {
      const quantityInput = this.parentElement.querySelector('.quantity__input');
      const currentValue = parseInt(quantityInput.value) || 1;
      
      if (this.name === 'minus') {
        quantityInput.value = Math.max(1, currentValue - 1);
      } else if (this.name === 'plus') {
        quantityInput.value = currentValue + 1;
      }
      
      console.log('Quantity updated to:', quantityInput.value);
    });
  });

  // Log when Kaching Bundles is detected for debugging
  if (window.kachingCartApi) {
    console.log('Kaching Cart API detected');
  }
  
  if (window.kachingBundlesApi) {
    console.log('Kaching Bundles API detected');
  }
});

