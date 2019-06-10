"use strict";
const loader = document.querySelector('#loader');

fetch(`./components/general.html`, {
    method: 'GET',
})
    .then(resolve => resolve.text())
    .then(result => app.innerHTML = result)
    .then(() => {
        loader.classList.add('hidden');
        credentials();
    })
    .then(() => {
        const closeMenu = document.querySelector('#close-menu');
        const mobMenu = document.querySelector('#mob-menu');

        closeMenu.addEventListener('click', (e) => {
            e.preventDefault();
            mobMenu.classList.remove('hidden');
        });

        const openMenu = document.querySelector('#hamburger');

        openMenu.addEventListener('click', (e) => {
            e.preventDefault();
            mobMenu.classList.remove('hidden');
        });

        closeMenu.addEventListener('click', (e) => {
            e.preventDefault();
            const navigation = document.querySelector('#navigation');
            mobMenu.classList.add('hidden');
        });

        mobMenu.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('nav__item')) {
                const navItems = document.querySelectorAll('.nav__item');
                navItems.forEach( (item) => item.classList.remove('bg-blue-300') );
                e.currentTarget.classList.add('hidden');
                const name = e.target.getAttribute('id');
                navigateTo(e.target, name);
            }

        })

        const credentials = () => {
            const diplomas = document.querySelector('[data-id="diplomas"]');
            const certificates = document.querySelector('[data-id="certificates"]');

            const openList = (e) => {
                const id = e.target.getAttribute('data-id');
                const item = document.querySelector('#' + id);
                console.log( e.target.children);
                for ( let i = 0; i < e.target.children.length; i++ ) {
                    e.target.children[i].classList.contains('arrow') ? e.target.children[i].classList.toggle('hidden') : null;
                }
                item.classList.toggle('hidden');
            }

            diplomas.addEventListener('click', openList );
            certificates.addEventListener('click', openList );
        }

        const navigateTo = (pageLink, pageName) => {
            const loader = document.querySelector('#loader');
            loader.classList.remove('hidden');
            pageLink.classList.add('bg-blue-300');
            const app = document.querySelector('#app');
            fetch(`./components/${ pageName + '' }.html`, {
                method: 'GET',
            })
                .then(resolve => resolve.text())
                .then(result => app.innerHTML = result)
                .then(() => {

                    loader.classList.add('hidden');
                    credentials();
                })
                .catch(err => console.log(err));
        }
    })
    .catch(err => console.log(err));
