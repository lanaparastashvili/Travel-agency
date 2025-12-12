var shopName = "Travel Agency Shop";    
var cartCount = 0;                       
var isLoaded = false; 

function calculateTotal(price, quantity) {
    return price * quantity; }

    function getCartMessage() {
    if (cartCount === 0) {
        return "Your cart is empty";
    } else if (cartCount === 1) {
        return "1 item in cart";
    } else {
        return cartCount + " items in cart";
    }
}
document.addEventListener('DOMContentLoaded', function () {
    isLoaded = true;
    console.log(shopName + " - Ready!");

    
    var addButtons = document.querySelectorAll('.btn1, .btn2, .btn3, .btn4, .btn5');
    var selectButton = document.querySelector('.btn6');
    var emailButton = document.querySelector('.email-btn');
    var searchButton = document.querySelector('.btn-login');
       var searchBtn = document.querySelector('.btn-login');

        if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            var searchTerm = prompt('Search for:');
            if (searchTerm) {
                sessionStorage.setItem('searchTerm', searchTerm);
                alert('Searching for: ' + searchTerm);
            }
        });
    }
 if (searchButton) {
        searchButton.addEventListener('click', function () {
            var searchTerm = prompt('Search for a product:');

            if (searchTerm) {
                searchProducts(searchTerm);
            }
        });
    }
    addButtons.forEach(function (button) {
        button.addEventListener('click', function () {
           
            var productName = getProductName(this);
            var productPrice = getProductPrice(this);

            
            addToCart(productName, productPrice);
        });
    });


    if (selectButton) {
        selectButton.addEventListener('click', function () {
            alert('Visitor Insurance: Please choose $60 or $80 option');
        });
    }


    if (emailButton) {
        emailButton.addEventListener('click', function () {
            var email = prompt('Enter your email:');

            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email && emailPattern.test(email)) {
               
                localStorage.setItem('userEmail', email);
                alert('Email saved: ' + email);
            } else if (email) {
                alert('Please enter a valid email');
            }
        });
    }


    loadCart();
});
function getProductName(button) {
    var buttonClass = button.className;

    // Match button to product
    if (buttonClass === 'btn1') return 'Baggage Insurance';
    if (buttonClass === 'btn2') return 'Health Insurance';
    if (buttonClass === 'btn3') return 'Medical Insurance';
    if (buttonClass === 'btn4') return 'Tour Operator Liability';
    if (buttonClass === 'btn5') return 'Trip Cancellation Insurance';

    return 'Product';
}

function getProductPrice(button) {
    var buttonClass = button.className;

    if (buttonClass === 'btn1') return 50;
    if (buttonClass === 'btn2') return 220;
    if (buttonClass === 'btn3') return 45;  
    if (buttonClass === 'btn4') return 45;  
    if (buttonClass === 'btn5') return 39;

    return 0;
}


function addToCart(name, price) {
    cartCount++;


    var item = {
        name: name,
        price: price,
        addedAt: new Date().toLocaleTimeString()
    };


    var cart = JSON.parse(localStorage.getItem('cart')) || [];


    cart.push(item);

   
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Added: ' + name + ' - $' + price);
    console.log(getCartMessage());
}


function loadCart() {
    var savedCart = localStorage.getItem('cart');

    if (savedCart) {
        var cart = JSON.parse(savedCart);
        cartCount = cart.length;
        console.log('Cart loaded:', getCartMessage());
    }
}


function clearCart() {
    localStorage.removeItem('cart');
    cartCount = 0;
    console.log('Cart cleared');
}


console.log('--- Shop Page Ready ---');
