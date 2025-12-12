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


document.addEventListener('DOMContentLoaded', function () {

    const pageName = "Chiang Mai Tour";

    const ADULT_PRICE = 490;
    const CHILD_PRICE = 200;
    const HEALTH_INSURANCE_PRICE = 220;
    const MEDICAL_INSURANCE_PRICE = 45;

    let currentAdultCount = 1;
    let currentChildCount = 0;
    let isHealthInsuranceSelected = true;
    let isMedicalInsuranceSelected = true;

    const bookBtn = document.querySelector('.book-btn');

    const adultDisplay = document.querySelector('.adult-display');
    const childrenDisplay = document.querySelector('.children-display');

    const adultControls = document.querySelector('.adult-controls');
    const childrenControls = document.querySelector('.children-controls');

    const healthInsuranceItem = document.querySelector('.health-item');
    const medicalInsuranceItem = document.querySelector('.medical-item');

    const updatePrice = () => {
        const basePrice = (currentAdultCount * ADULT_PRICE) + (currentChildCount * CHILD_PRICE);
        const extra = 
            (isHealthInsuranceSelected ? HEALTH_INSURANCE_PRICE : 0) +
            (isMedicalInsuranceSelected ? MEDICAL_INSURANCE_PRICE : 0);

        const total = basePrice + extra;

        if (adultDisplay) adultDisplay.textContent = `over 18($ ${ADULT_PRICE * currentAdultCount})`;
        if (childrenDisplay) childrenDisplay.textContent = `under 18($ ${CHILD_PRICE * currentChildCount})`;

        if (adultControls) adultControls.textContent = `- ${currentAdultCount} +`;
        if (childrenControls) childrenControls.textContent = `- ${currentChildCount} +`;

        if (bookBtn) bookBtn.innerHTML = `<i class="fas fa-calendar-check"></i> book now for $ ${total}`;

        return total;
    };

    const handleCountChange = (type, action) => {
        if (type === 'adults') {
            if (action === 'increase') currentAdultCount++;
            else if (action === 'decrease' && currentAdultCount > 1) currentAdultCount--;
        } else if (type === 'children') {
            if (action === 'increase') currentChildCount++;
            else if (action === 'decrease' && currentChildCount > 0) currentChildCount--;
        }
        updatePrice();
    };

    const setupCounterControls = (element, type) => {
        if (!element) return;
        element.style.cursor = 'pointer';
        element.addEventListener('click', (e) => {
            const rect = element.getBoundingClientRect();
            const clickX = e.clientX;
            let action = null;
            if (clickX < rect.left + rect.width / 3) action = 'decrease';
            else if (clickX > rect.left + 2 * rect.width / 3) action = 'increase';
            if (action) handleCountChange(type, action);
        });
    };

    const setupServiceControl = (item, type) => {
        if (!item) return;
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            if (type === 'health') {
                isHealthInsuranceSelected = !isHealthInsuranceSelected;
                item.classList.toggle('included', isHealthInsuranceSelected);
                const icon = item.querySelector('i');
                if (icon) icon.className = isHealthInsuranceSelected ? 'fas fa-check' : 'far fa-square';
            } else if (type === 'medical') {
                isMedicalInsuranceSelected = !isMedicalInsuranceSelected;
                item.classList.toggle('included', isMedicalInsuranceSelected);
                const icon = item.querySelector('i');
                if (icon) icon.className = isMedicalInsuranceSelected ? 'fas fa-check' : 'far fa-square';
            }
            updatePrice();
        });
    };

    setupCounterControls(adultControls, 'adults');
    setupCounterControls(childrenControls, 'children');

    setupServiceControl(healthInsuranceItem, 'health');
    setupServiceControl(medicalInsuranceItem, 'medical');

    if (bookBtn) {
        bookBtn.addEventListener('click', function () {
            const total = updatePrice();
            const booking = {
                destination: pageName,
                adults: currentAdultCount,
                children: currentChildCount,
                total: total,
                services: {
                    health: isHealthInsuranceSelected,
                    medical: isMedicalInsuranceSelected
                },
                date: document.querySelector('.date-value') ? document.querySelector('.date-value').textContent : ''
            };
            localStorage.setItem('lastBooking', JSON.stringify(booking));
            alert(
                'Booking confirmed!\n' +
                'Tour: ' + pageName + '\n' +
                'Date: ' + booking.date + '\n' +
                'Adults: ' + currentAdultCount + '\n' +
                'Children: ' + currentChildCount + '\n' +
                'Services: ' +
                (isHealthInsuranceSelected ? 'Health ' : '') +
                (isMedicalInsuranceSelected ? 'Medical' : '') +
                '\nTotal: $' + total
            );
        });
    }

    updatePrice();
});
itineraryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var body = this.querySelector('.itinerary-body');
            if (body) {
                if (body.style.display === 'block') {
                    body.style.display = 'none';
                } else {
                    body.style.display = 'block';
                }
            }
        });
    });


    if (bookBtn) {
        bookBtn.addEventListener('click', function () {
            var total = (adults * adultPrice) + (children * childPrice);

            var booking = {
                destination: pageName,
                adults: adults,
                children: children,
                total: total,
                date: new Date().toLocaleString()
            };

            localStorage.setItem('lastBooking', JSON.stringify(booking));

            alert('Booking confirmed!\n' +
                'Tour: ' + pageName + '\n' +
                'Adults: ' + adults + '\n' +
                'Children: ' + children + '\n' +
                'Total: $' + total);
        });
    }


    detailBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var card = this.closest('.card');
            var title = card.querySelector('.destination-title').textContent;
            var price = card.querySelector('.price').textContent;

          
            sessionStorage.setItem('selectedPackage', title);
            sessionStorage.setItem('selectedPrice', price);

            alert('Package: ' + title + '\nPrice: ' + price);
        });
    });


    galleryImages.forEach(function (img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
          
            sessionStorage.setItem('lastViewedImage', this.src);

            if (this.style.transform === 'scale(1.5)') {
                this.style.transform = 'scale(1)';
                this.style.zIndex = '1';
            } else {
                this.style.transform = 'scale(1.5)';
                this.style.zIndex = '100';
            }
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


var lastBooking = localStorage.getItem('lastBooking');
if (lastBooking) {
    var data = JSON.parse(lastBooking);
    console.log('Last booking:', data.destination, '- $' + data.total);
}


function toggleItem(element) {
    var body = element.querySelector('.itinerary-body');
    if (body) {
        body.style.display = (body.style.display === 'block') ? 'none' : 'block';
    }
}

console.log('--- Single Page Ready ---');
