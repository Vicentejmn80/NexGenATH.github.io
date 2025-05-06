document.addEventListener('DOMContentLoaded', function() {
    // Tailwind CSS Configuration
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    primary: '#57b5e7',
                    secondary: '#8d3fc1',
                    darkbg: '#0a0e17',
                    darkcard: 'rgba(16, 23, 36, 0.8)', /* Increased opacity slightly */
                    darkborder: 'rgba(87, 181, 231, 0.2)',
                    darkborderhover: 'rgba(87, 181, 231, 0.5)',
                    purpleborder: 'rgba(141, 63, 193, 0.5)',
                    purpleglow: 'rgba(141, 63, 193, 0.3)',
                    blueglow: 'rgba(87, 181, 231, 0.4)',
                },
                borderRadius: {
                    'button': '8px'
                },
                 spacing: {
                    '18': '4.5rem', /* Custom spacing for header padding */
                 }
             }
        }
    }

    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuButton = document.getElementById('close-menu-button');
    const menuOverlay = document.getElementById('menu-overlay');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden'); // Prevent scrolling when menu is open
    }

    if (mobileMenuButton && mobileMenu && closeMenuButton && menuOverlay) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
        closeMenuButton.addEventListener('click', toggleMobileMenu);
        menuOverlay.addEventListener('click', toggleMobileMenu); // Close when clicking outside menu

        // Close menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });
    }


    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset considering fixed header height
                const headerOffset = document.querySelector('nav').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon i'); // Get the icon element

            // Close other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherContent = otherHeader.nextElementSibling;
                    const otherIcon = otherHeader.querySelector('.accordion-icon i');
                    otherContent.classList.remove('active');
                    otherIcon.classList.remove('ri-arrow-up-s-line'); // Change icon back
                    otherIcon.classList.add('ri-arrow-down-s-line');
                    otherContent.style.maxHeight = null; // Reset max-height
                }
            });

            // Toggle current accordion
            content.classList.toggle('active');
            if (content.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px"; // Set max-height to content height
                icon.classList.remove('ri-arrow-down-s-line'); // Change icon to up
                icon.classList.add('ri-arrow-up-s-line');
            } else {
                content.style.maxHeight = null; // Collapse
                icon.classList.remove('ri-arrow-up-s-line'); // Change icon back to down
                icon.classList.add('ri-arrow-down-s-line');
            }
        });
    });
    // Basic Modal functionality (if needed in the future)
     const caseStudyModal = document.getElementById('caseStudyModal');
     const closeModalButton = document.getElementById('closeModal');

     if (caseStudyModal && closeModalButton) {
         closeModalButton.addEventListener('click', function() {
             caseStudyModal.classList.add('hidden');
             document.body.classList.remove('overflow-hidden');
         });
         caseStudyModal.addEventListener('click', function(e) {
             if (e.target === caseStudyModal) {
                 caseStudyModal.classList.add('hidden');
                 document.body.classList.remove('overflow-hidden');
             }
         });
         document.addEventListener('keydown', function(e) {
             if (e.key === 'Escape' && !caseStudyModal.classList.contains('hidden')) {
                 caseStudyModal.classList.add('hidden');
                 document.body.classList.remove('overflow-hidden');
             }
         });
     }
});