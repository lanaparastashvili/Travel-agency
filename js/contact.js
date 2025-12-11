
var pageName = "Contact Us";
var formSubmitted = false;


document.addEventListener('DOMContentLoaded', function() {
    console.log(pageName + " - Ready!");
    
 
    var submitBtn = document.querySelector('.btn-sub');
    var nameInput = document.querySelector('.input1');
    var emailInput = document.querySelector('.input2');
    var messageInput = document.querySelector('.input3');
    var emailBtn = document.querySelector('.email-btn');
    
 
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
