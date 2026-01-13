document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DESTINATIONS PAGE FILTERING LOGIC ---
    // Handles the "Show Solo Deals Only" toggle and Activity checkboxes.

    const filterForm = document.getElementById('filter-form');
    // Ensure you have added id="filter-form" to your destinations.html form tag
    
    if (filterForm) {
        // Event listener for any change within the filter form
        filterForm.addEventListener('change', updateDestinationCards);
        
        // Run once on load to show all cards initially
        updateDestinationCards();
    }

    function updateDestinationCards() {
        // Get filter values
        const soloOnly = document.getElementById('soloTravelerCheck').checked;
        const checkedActivities = Array.from(filterForm.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value)
            .filter(value => value !== 'on'); // Filter out the solo check if it's not explicitly coded

        const allCards = document.querySelectorAll('.destination-card'); 
        
        allCards.forEach(card => {
            // Get data attributes from the card (Must be added to HTML cards!)
            const cardIsSolo = card.dataset.solo === 'true'; // data-solo="true" or "false"
            const cardActivity = card.dataset.activity; // data-activity="Trekking"
            
            let matchesSolo = true;
            let matchesActivity = true;

            // Check 1: Solo Filter
            if (soloOnly) {
                matchesSolo = cardIsSolo;
            }

            // Check 2: Activity Filter
            if (checkedActivities.length > 0) {
                // Check if the card's activity matches ANY of the checked activities
                matchesActivity = checkedActivities.includes(cardActivity);
            }

            // Apply visibility changes
            if (matchesSolo && matchesActivity) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }


    // --- 2. CONTACT FORM SUBMISSION VALIDATION ---
    // Ensures required fields are filled and prevents empty submission.

    const contactForm = document.getElementById('contactForm');
    // Ensure you have added id="contactForm" to your contact.html form tag
    
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            if (!validateContactForm(event)) {
                event.preventDefault(); 
            }
        });
    }

    function validateContactForm(event) {
        let isValid = true;

        // Reset previous error states
        contactForm.querySelectorAll('.form-control, .form-select').forEach(input => {
            input.classList.remove('is-invalid');
        });

        // 1. Full Name Check
        const fullNameInput = document.getElementById('fullName');
        if (!fullNameInput || fullNameInput.value.trim() === '') {
            fullNameInput.classList.add('is-invalid');
            isValid = false;
        }

        // 2. Email Format Check
        const emailInput = document.getElementById('emailAddress');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput || !emailPattern.test(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        }

        // 3. Subject/Topic Check
        const subjectSelect = document.getElementById('subjectTopic');
        if (!subjectSelect || subjectSelect.value === '') {
            subjectSelect.classList.add('is-invalid');
            isValid = false;
        }

        // 4. Message Check (Optional)
        const messageText = document.getElementById('messageText');
        if (!messageText || messageText.value.trim().length < 10) {
            // You can choose to enforce this or leave it optional
        }


        // If validation failed, scroll to the first invalid field for better UX
        if (!isValid) {
            const firstInvalid = contactForm.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        return isValid;
    }
});