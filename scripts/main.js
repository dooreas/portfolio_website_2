// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Dynamic content loading for articles
    fetch('../data/articles.json')
        .then(response => response.json())
        .then(data => {
            const articlesContainer = document.getElementById('articles-container');
            data.articles.forEach(article => {
                const articleCard = document.createElement('div');
                articleCard.classList.add('card');
                articleCard.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.link}" target="_blank">Read more</a>
                `;
                articlesContainer.appendChild(articleCard);
            });
        })
        .catch(error => console.error('Error loading articles:', error));

    // Animation for section visibility on scroll
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});