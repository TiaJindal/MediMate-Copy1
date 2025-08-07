// Medicine browsing functionality
document.addEventListener('DOMContentLoaded', function() {
    const medicinesContainer = document.getElementById('medicines-container');
    const searchInput = document.getElementById('search-medicines');
    const loadMoreBtn = document.getElementById('load-more-medicines');
    const cartBtn = document.getElementById('cart-btn');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    
    let displayedMedicines = 6;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Sample medicine data
    const medicines = [
        {
            id: 1,
            name: "Paracetamol 500mg",
            description: "Pain reliever and fever reducer",
            price: 5.99,
            category: "Pain Relief",
            prescription: false,
            image: "capsules"
        },
        {
            id: 2,
            name: "Cetrizine 10mg",
            description: "Antihistamine for allergies",
            price: 8.99,
            category: "Allergy",
            prescription: false,
            image: "prescription-bottle-alt"
        },
        {
            id: 3,
            name: "Amoxicillin 500mg",
            description: "Antibiotic for bacterial infections",
            price: 12.99,
            category: "Antibiotic",
            prescription: true,
            image: "tablets"
        },
        {
            id: 4,
            name: "Ibuprofen 200mg",
            description: "NSAID for pain and inflammation",
            price: 7.49,
            category: "Pain Relief",
            prescription: false,
            image: "prescription-bottle"
        },
        {
            id: 5,
            name: "Loratadine 10mg",
            description: "Antihistamine for allergies",
            price: 9.99,
            category: "Allergy",
            prescription: false,
            image: "capsules"
        },
        {
            id: 6,
            name: "Omeprazole 20mg",
            description: "Proton pump inhibitor for acid reflux",
            price: 11.99,
            category: "Digestive",
            prescription: false,
            image: "tablets"
        },
        {
            id: 7,
            name: "Aspirin 81mg",
            description: "Blood thinner and pain reliever",
            price: 6.49,
            category: "Cardiovascular",
            prescription: false,
            image: "pills"
        },
        {
            id: 8,
            name: "Metformin 500mg",
            description: "Diabetes medication",
            price: 15.99,
            category: "Diabetes",
            prescription: true,
            image: "prescription-bottle"
        },
        {
            id: 9,
            name: "Atorvastatin 20mg",
            description: "Cholesterol-lowering medication",
            price: 18.99,
            category: "Cardiovascular",
            prescription: true,
            image: "tablets"
        }
    ];
    
    // Update cart count
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }
    
    // Render medicines
    function renderMedicines() {
        medicinesContainer.innerHTML = '';
        const filteredMedicines = medicines.slice(0, displayedMedicines);
        
        filteredMedicines.forEach(medicine => {
            const medicineCard = document.createElement('div');
            medicineCard.className = 'medicine-card bg-white rounded-xl shadow-md overflow-hidden';
            
            medicineCard.innerHTML = `
                <div class="h-48 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                    <i class="fas fa-${medicine.image} text-white text-6xl"></i>
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-xl font-bold text-gray-900">${medicine.name}</h3>
                            <p class="text-gray-600 mt-1">${medicine.description}</p>
                        </div>
                        <span class="${medicine.prescription ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} text-xs font-semibold px-2.5 py-0.5 rounded">
                            ${medicine.prescription ? 'Rx' : 'OTC'}
                        </span>
                    </div>
                    <div class="mt-4 flex items-center justify-between">
                        <span class="text-2xl font-bold text-gray-900">$${medicine.price.toFixed(2)}</span>
                        <button class="add-to-cart bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm" data-id="${medicine.id}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
            
            medicinesContainer.appendChild(medicineCard);
        });
        
        // Add event listeners to add-to-cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const medicineId = parseInt(this.dataset.id);
                const medicine = medicines.find(m => m.id === medicineId);
                
                if (medicine) {
                    cart.push(medicine);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                    alert(`${medicine.name} added to cart!`);
                }
            });
        });
    }
    
    // Render cart items
    function renderCart() {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartTotal.textContent = '$0.00';
            return;
        }
        
        emptyCartMessage.style.display = 'none';
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price;
            const cartItem = document.createElement('div');
            cartItem.className = 'flex items-center p-4 border-b border-gray-200';
            
            cartItem.innerHTML = `
                <div class="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i class="fas fa-${item.image} text-blue-600"></i>
                </div>
                <div class="ml-4 flex-1">
                    <h3 class="font-medium text-gray-900">${item.name}</h3>
                    <p class="text-gray-600 text-sm">${item.description}</p>
                </div>
                <div class="ml-4 text-right">
                    <p class="font-medium text-gray-900">$${item.price.toFixed(2)}</p>
                    <button class="remove-item text-red-500 hover:text-red-700 text-sm mt-1" data-index="${index}">
                        Remove
                    </button>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                renderCart();
            });
        });
    }
    
    // Event listeners
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        displayedMedicines = medicines.length;
        renderMedicines();
        
        const medicineCards = document.querySelectorAll('.medicine-card');
        medicineCards.forEach(card => {
            const medicineName = card.querySelector('h3').textContent.toLowerCase();
            if (medicineName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    loadMoreBtn.addEventListener('click', function() {
        displayedMedicines += 3;
        if (displayedMedicines > medicines.length) {
            displayedMedicines = medicines.length;
            this.textContent = 'No More Medicines';
            this.disabled = true;
        }
        renderMedicines();
    });
    
    cartBtn.addEventListener('click', function() {
        renderCart();
        cartModal.classList.remove('hidden');
    });
    
    closeCart.addEventListener('click', function() {
        cartModal.classList.add('hidden');
    });
    
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert('Thank you for your order! This is a demo, so no actual purchase was made.');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
        cartModal.classList.add('hidden');
    });
    
    // Initialize
    updateCartCount();
    renderMedicines();
});