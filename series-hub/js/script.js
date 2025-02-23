document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    if (hamburger && menu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });

                if (menu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    menu.classList.remove('active');
                }
            });
        });
    }

    const favoriteButton = document.querySelector('#favorite-button');
    if (favoriteButton) {
        favoriteButton.addEventListener('click', function() {
            this.classList.toggle('favorited');
        });
    }
});
