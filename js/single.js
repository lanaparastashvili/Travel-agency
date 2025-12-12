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