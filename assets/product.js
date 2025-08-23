// Product functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize product forms
  const productForms = document.querySelectorAll('.product-form');
  
  productForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const variantId = formData.get('id');
      const quantity = formData.get('quantity') || 1;
      
      // Add to cart functionality would go here
      console.log('Adding to cart:', { variantId, quantity });
      
      // For now, just show a success message
      alert('Product added to cart!');
    });
  });
  
  // Initialize quantity selectors
  const quantityInputs = document.querySelectorAll('.quantity__input');
  
  quantityInputs.forEach(input => {
    const minusBtn = input.parentNode.querySelector('.quantity__button[name="minus"]');
    const plusBtn = input.parentNode.querySelector('.quantity__button[name="plus"]');
    
    if (minusBtn) {
      minusBtn.addEventListener('click', function() {
        const currentValue = parseInt(input.value) || 1;
        if (currentValue > 1) {
          input.value = currentValue - 1;
        }
      });
    }
    
    if (plusBtn) {
      plusBtn.addEventListener('click', function() {
        const currentValue = parseInt(input.value) || 1;
        input.value = currentValue + 1;
      });
    }
  });
});
