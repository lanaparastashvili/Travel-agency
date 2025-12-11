var pageName = "Chiang Mai Tour";
var adults = 1;
var children = 0;
var adultPrice = 490;
var childPrice = 200;

document.addEventListener('DOMContentLoaded', function () {
    console.log(pageName + " - Ready!");

    var bookBtn = document.querySelector('.book-btn');
    var detailBtns = document.querySelectorAll('.btn-details');
    var emailBtn = document.querySelector('.email-btn');
    var galleryImages = document.querySelectorAll('.gallery-grid img');
    var itineraryItems = document.querySelectorAll('.itinerary-item');


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
            var email = prompt('Enter your email:');
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email && emailPattern.test(email)) {
                localStorage.setItem('subscriberEmail', email);
                alert('Subscribed: ' + email);
            } else if (email) {
                alert('Invalid email format');
            }
        });
    }

    var lastBooking = localStorage.getItem('lastBooking');
    if (lastBooking) {
        var data = JSON.parse(lastBooking);
        console.log('Last booking:', data.destination, '- $' + data.total);
    }
});


function toggleItem(element) {
    var body = element.querySelector('.itinerary-body');
    if (body) {
        if (body.style.display === 'block') {
            body.style.display = 'none';
        } else {
            body.style.display = 'block';
        }
    }
}

console.log('--- Single Page Ready ---');
