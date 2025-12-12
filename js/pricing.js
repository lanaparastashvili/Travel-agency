var siteName = "Travel Agency";                   
var basePrice = 50;                                
var isPageLoaded = false;                          
var selectedPackage = null;                        
var userEmail; 
document.addEventListener('DOMContentLoaded', function () {
    console.log(pricingCards + " - Ready!");

    var menuBtn = document.querySelector('.btn-menu');
    var navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.style.cursor = 'pointer';

        menuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            menuBtn.classList.toggle('open');
        });

        var navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                menuBtn.classList.remove('open');
            });
        });

        document.addEventListener('click', function (event) {
            var isClickInsideMenu = navMenu.contains(event.target);
            var isClickOnButton = menuBtn.contains(event.target);

            if (!isClickInsideMenu && !isClickOnButton) {
                navMenu.classList.remove('active');
                menuBtn.classList.remove('open');
            }
        });
    }});
var bookBtn = document.querySelector('.book-btn');
    var detailBtns = document.querySelectorAll('.btn-details');
    var emailBtn = document.querySelector('.email-btn');
    var galleryImages = document.querySelectorAll('.gallery-grid img');
    var itineraryItems = document.querySelectorAll('.itinerary-item');
    var searchBtn = document.querySelector('.btn-login');
    

 if (searchBtn) {
        localStorage.setItem("packages", JSON.stringify([
    { id: 1, name: "Paris Trip", price: 2000 },
    { id: 2, name: "London Tour", price: 1800 },
    { id: 3, name: "New York Adventure", price: 2500 }
]));
     
    }
    localStorage.setItem("packages", JSON.stringify([
    { id: 1, name: "Paris Trip", price: 2000 },
    { id: 2, name: "London Tour", price: 1800 },
    { id: 3, name: "New York Adventure", price: 2500 }
]));
 if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            var searchTerm = prompt('Search for:');
            if (searchTerm) {
                sessionStorage.setItem('searchTerm', searchTerm);

                var packages = JSON.parse(localStorage.getItem('packages')) || [];
                
                var results = packages.filter(function(pkg) {
                    return pkg.name.toLowerCase().includes(searchTerm.toLowerCase());
                });

                if (results.length > 0) {
                    var message = "Search results:\n";
                    results.forEach(function(pkg) {
                        message += pkg.name + " - $" + pkg.price + "\n";
                    });
                    alert(message);
                } else {
                    alert("No packages found for: " + searchTerm);
                }
            }
        });
    }


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


