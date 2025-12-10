var siteName = "Travel Agency";                   
var basePrice = 50;                                
var isPageLoaded = false;                          
var selectedPackage = null;                        
var userEmail; 

function calculateDiscount(price, percent) {
    return price - (price * percent / 100);        
}

function formatPrice(amount) {
    return "$" + amount.toFixed(2);
}

function getDiscountMessage(price) {
    if (price > 600) {
        return "Premium package - 15% discount!";
    } else if (price > 400) {
        return "Standard package - 10% discount!";
    } else {
        return "Budget friendly!";
    }
}
document.addEventListener<'DOMContentLoaded', function () {
    isPageLoaded = true;
    console.log(siteName + " - Page loaded!")};


    var heroTitle = document.querySelector('.hero-title');
    var pricingCards = document.querySelectorAll('.pricing-card, .pricing-card2, .pricing-card3');
    var cardButtons = document.querySelectorAll('.bt-card, .bt-card2, .bt-card3');
    var tripItems = document.querySelectorAll('.trip-item');
    var searchBtn = document.querySelector('.btn-login');
    var emailBtn = document.querySelector('.email-btn');

if (searchButton) {
        searchButton.addEventListener('click', function () {
            var searchTerm = prompt('Search for a product:');

            if (searchTerm) {
                searchProducts(searchTerm);
            }
        });
    }
  
    cardButtons.forEach(function (btn) {
        btn.addEventListener('click', handleCardClick);
    });

    pricingCards.forEach(function (card, index) {
        card.style.transition = 'transform 0.3s, box-shadow 0.3s';

        card.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(27, 188, 155, 0.3)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

     tripItems.forEach(function (item) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function () {
            var tripName = this.querySelector('span').textContent;
            var tripPrice = this.querySelector('.trip-price').textContent;


            sessionStorage.setItem('selectedTrip', tripName);
            sessionStorage.setItem('selectedPrice', tripPrice);

            alert('Selected: ' + tripName + ' - ' + tripPrice);
        });
    });
     if (emailBtn) {
        emailBtn.addEventListener('click', function () {
            userEmail = prompt('Enter your email:');
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (userEmail && emailPattern.test(userEmail)) {
               
                localStorage.setItem('userEmail', userEmail);
                alert('Email saved: ' + userEmail);
            } else if (userEmail) {
                alert('Invalid email format!');
            }
        });
    }
     var visits = parseInt(localStorage.getItem('visitCount')) || 0;
    visits++;
    localStorage.setItem('visitCount', visits.toString());
    console.log('Visit #' + visits);

     fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('API connected:', data.title);
        })
        .catch(function (error) {
            console.log('Offline mode');
        });

function handleCardClick(event) {
    var button = event.target;
    var card = button.closest('.pricing-card, .pricing-card2, .pricing-card3');
    var titleEl = card.querySelector('.card-t, .card-t2, .card-t3');
    var priceEl = card.querySelector('.price, .price2, .price3');

    if (titleEl && priceEl) {
        var packageName = titleEl.textContent;
        var packagePrice = priceEl.textContent;

       
        selectedPackage = {
            name: packageName,
            price: packagePrice,
            selectedAt: new Date().toISOString()
        };

       
        localStorage.setItem('selectedPackage', JSON.stringify(selectedPackage));

        alert('Added to cart: ' + packageName + ' - ' + packagePrice);
    }
}
f (typeof jQuery !== 'undefined') 
    $(document).ready(function () {

        $('button').hover(
            function () { $(this).css('opacity', '0.9'); },
            function () { $(this).css('opacity', '1'); }
        );

    });


console.log('--- Pricing Page Loaded ---');


