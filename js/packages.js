
var pageName = "Our Packages";
var selectedFilters = [];
var maxPrice = 5000;

document.addEventListener('DOMContentLoaded', function () {
    console.log(pageName + " - Ready!");

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
document.addEventListener('DOMContentLoaded', function () {
    console.log(pageName + " - Ready!");

    var priceSlider = document.getElementById('price');
    var priceDisplay = document.getElementById('priceDisplay');
    var detailButtons = document.querySelectorAll('.btn');
    var heartButtons = document.querySelectorAll('.icon-btn');
    var paginationBtns = document.querySelectorAll('.pagination button');
    var emailBtn = document.querySelector('.email-btn');
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
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
    if (priceSlider && priceDisplay) {
        priceSlider.addEventListener('input', function () {
            maxPrice = this.value;
            priceDisplay.textContent = this.value;

         
            sessionStorage.setItem('maxPrice', this.value);
        });

        var savedPrice = sessionStorage.getItem('maxPrice');
        if (savedPrice) {
            priceSlider.value = savedPrice;
            priceDisplay.textContent = savedPrice;
        }
    }

    detailButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var card = this.closest('.card');
            var title = card.querySelector('.card-title').textContent;
            var price = card.querySelector('.price').textContent;
            var location = card.querySelector('.card-location').textContent;

            var package = {
                title: title,
                price: price,
                location: location,
                viewedAt: new Date().toLocaleString()
            };

            localStorage.setItem('lastViewedPackage', JSON.stringify(package));
            alert('Package: ' + title + '\nPrice: ' + price);
        });
    });

 
    heartButtons.forEach(function (btn) {
        if (btn.textContent.includes('❤')) {
            btn.addEventListener('click', function () {
                var card = this.closest('.card');
                var title = card.querySelector('.card-title').textContent;

               
                var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

             
                var index = favorites.indexOf(title);
                if (index > -1) {
                    favorites.splice(index, 1);
                    alert('Removed from favorites: ' + title);
                } else {
                    favorites.push(title);
                    alert('Added to favorites: ' + title);
                }

                localStorage.setItem('favorites', JSON.stringify(favorites));
            });
        }
    });

    
    paginationBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
           
            paginationBtns.forEach(function (b) {
                b.classList.remove('active');
            });
            
            this.classList.add('active');

            sessionStorage.setItem('currentPage', this.textContent);
        });
    });

   
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            var label = document.querySelector('label[for="' + this.id + '"]');
            var filterName = label ? label.textContent : this.id;

            if (this.checked) {
                selectedFilters.push(filterName);
            } else {
                var index = selectedFilters.indexOf(filterName);
                if (index > -1) {
                    selectedFilters.splice(index, 1);
                }
            }

            console.log('Selected filters:', selectedFilters);
            sessionStorage.setItem('filters', JSON.stringify(selectedFilters));
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

    var savedFilters = sessionStorage.getItem('filters');
    if (savedFilters) {
        selectedFilters = JSON.parse(savedFilters);
        console.log('Loaded filters:', selectedFilters);
    }
});

console.log('--- Packages Page Ready ---');