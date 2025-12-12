var siteName = "Travel Agency";
var basePrice = 50;
var isPageLoaded = false;
var selectedPackage = null;
var userEmail;

document.addEventListener('DOMContentLoaded', function () {

    console.log(siteName + " - Ready!");

    var menuBtn = document.querySelector('.btn-menu');
    var navMenu = document.querySelector('.nav-menu');
    var searchBtn = document.querySelector('.btn-login');
    var emailBtn = document.querySelector('.email-btn');
    var pricingCards = document.querySelectorAll('.pricing-card, .pricing-card2, .pricing-card3');
    var cardButtons = document.querySelectorAll('.bt-card, .bt-card2, .bt-card3');
    var tripItems = document.querySelectorAll('.trip-item');
    var itineraryItems = document.querySelectorAll('.itinerary-item');

    isPageLoaded = true;


 
    if (menuBtn && navMenu) {
        menuBtn.style.cursor = 'pointer';

        menuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            menuBtn.classList.toggle('open');
        });

        document.addEventListener('click', function (event) {
            var inside = navMenu.contains(event.target);
            var button = menuBtn.contains(event.target);
            if (!inside && !button) {
                navMenu.classList.remove('active');
                menuBtn.classList.remove('open');
            }
        });
    }


    if (searchBtn) {

        localStorage.setItem("packages", JSON.stringify([
            { id: 1, name: "Paris Trip", price: 2000 },
            { id: 2, name: "London Tour", price: 1800 },
            { id: 3, name: "New York Adventure", price: 2500 }
        ]));

        searchBtn.addEventListener('click', function () {
            var searchTerm = prompt('Search for:');
            if (!searchTerm) return;

            sessionStorage.setItem('searchTerm', searchTerm);

            var packages = JSON.parse(localStorage.getItem('packages')) || [];

            var results = packages.filter(function (pkg) {
                return pkg.name.toLowerCase().includes(searchTerm.toLowerCase());
            });

            if (results.length > 0) {
                var message = "Search results:\n";
                results.forEach(function (pkg) {
                    message += pkg.name + " - $" + pkg.price + "\n";
                });
                alert(message);
            } else {
                alert("No packages found for: " + searchTerm);
            }
        });
    }



    cardButtons.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            var card = event.target.closest('.pricing-card, .pricing-card2, .pricing-card3');
            var titleEl = card.querySelector('.card-t, .card-t2, .card-t3');
            var priceEl = card.querySelector('.price, .price2, .price3');

            if (titleEl && priceEl) {
                selectedPackage = {
                    name: titleEl.textContent,
                    price: priceEl.textContent,
                    selectedAt: new Date().toISOString()
                };

                localStorage.setItem('selectedPackage', JSON.stringify(selectedPackage));

                alert('Added to cart: ' + selectedPackage.name + ' - ' + selectedPackage.price);
            }
        });
    });


 
    pricingCards.forEach(function (card) {
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

            var email = prompt('Please enter your email:');
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email) {
                alert('Email is required.');
                return;
            }

            if (!emailPattern.test(email)) {
                alert('Invalid email format');
                return;
            }

            var confirmSub = prompt('Do you want to subscribe? (yes/no)').toLowerCase();

            if (confirmSub === 'yes') {
                localStorage.setItem('subscriberEmail', email);
                alert('Subscribed: ' + email);
            } else if (confirmSub === 'no') {
                alert('Subscription cancelled.');
            } else {
                alert('Invalid response.');
            }
        });
    }



    itineraryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var body = item.querySelector('.itinerary-body');
            if (body) {
                body.style.display = body.style.display === 'block' ? 'none' : 'block';
            }
        });
    });


    var visits = parseInt(localStorage.getItem('visitCount')) || 0;
    visits++;
    localStorage.setItem('visitCount', visits.toString());
    console.log('Visit #' + visits);


  
 var allDemosBtn = document.querySelector('.one');
var purchaseThemeBtn = document.querySelector('.two');

if (allDemosBtn) {

  
    var demoPackages = [
        { id: 1, name: "travel insurance", price: 50.00 },
        { id: 2, name: "medical insurance", price: 65.00 },
        { id: 3, name: "full coverage", price: 73.00 }
    ];

    allDemosBtn.addEventListener('click', function () {

     
        sessionStorage.setItem("demoPackages", JSON.stringify(demoPackages));

        var packages = JSON.parse(sessionStorage.getItem("demoPackages")) || [];

        if (packages.length > 0) {
            var message = "Available Demos:\n\n";
            packages.forEach(function(pkg) {
                message += pkg.name + " - $" + pkg.price + "\n";
            });
            alert(message);
        } else {
            alert("No demos available");
        }

    });
}

if (purchaseThemeBtn) {
    purchaseThemeBtn.addEventListener('click', function () {

        var product = {
            name: "Theme Purchase",
            price: 188,
            purchasedAt: new Date().toLocaleString()
        };

        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);

        localStorage.setItem('cart', JSON.stringify(cart));

        alert("Theme added to cart: $49");
    });
}
    console.log('--- Pricing Page Loaded ---');
});