
var pageName = "Contact Us";
var formSubmitted = false;
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
    }
});


document.addEventListener('DOMContentLoaded', function() {
    console.log(pageName + " - Ready!");
    
 
    var submitBtn = document.querySelector('.btn-sub');
    var nameInput = document.querySelector('.input1');
    var emailInput = document.querySelector('.input2');
    var messageInput = document.querySelector('.input3');
    var emailBtn = document.querySelector('.email-btn');
    var searchBtn = document.querySelector('.btn-login');

 if (searchBtn) {
        localStorage.setItem("packages", JSON.stringify([
    { id: 1, name: "Paris Trip", price: 2000 },
    { id: 2, name: "London Tour", price: 1800 },
    { id: 3, name: "New York Adventure", price: 2500 }
]));
     
    }

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


    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            var name = nameInput ? nameInput.value.trim() : '';
            var email = emailInput ? emailInput.value.trim() : '';
            var message = messageInput ? messageInput.value.trim() : '';
            
            
            if (!name) {
                alert('Please enter your name');
                return;
            }
           
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email');
                return;
            }
            
            var formData = {
                name: name,
                email: email,
                message: message,
                sentAt: new Date().toLocaleString()
            };
            
            localStorage.setItem('lastContact', JSON.stringify(formData));
            
         
            formSubmitted = true;
            alert('Thank you ' + name + '! We will contact you at ' + email);
            
         
            if (nameInput) nameInput.value = '';
            if (emailInput) emailInput.value = '';
            if (messageInput) messageInput.value = '';
        });
    }
    

    if (emailBtn) {
        emailBtn.addEventListener('click', function() {
            var email = prompt('Enter your email to subscribe:');
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && emailPattern.test(email)) {
                localStorage.setItem('subscriberEmail', email);
                alert('Subscribed: ' + email);
            } else if (email) {
                alert('Invalid email format');
            }
        });
    }
    
    var lastContact = localStorage.getItem('lastContact');
    if (lastContact) {
        var data = JSON.parse(lastContact);
        console.log('Last contact from:', data.name);
    }
});

console.log('--- Contact Page Ready ---');
