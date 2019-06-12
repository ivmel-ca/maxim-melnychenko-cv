"use strict";
const loader = $('#loader');
const address = window.location.origin;
const initialLink = window.location.href;
const pageId = initialLink.split('/#')[1]; //current page position

fetch( pageId && pageId.length > 0 ? `./components/${pageId}.html` :`./components/general.html`, {
    method: 'GET',
})
    .then(resolve => resolve.text())
    .then(result => app.innerHTML = result)
    .then(() => {
        const pageName = pageId && pageId.length > 0 ? pageId : 'general';
        history.pushState( {pageName}, ``, `.#${pageId && pageId.length > 0 ? pageId : 'general'}`);
        setTimeout(() =>  $(loader).fadeOut(400), 800 );
        $(`#${pageName}`).addClass('bg-blue-300');

    })
    .then(() => {
        const closeMenu = document.querySelector('#close-menu');
        const mobMenu = document.querySelector('#mob-menu');

        closeMenu.addEventListener('click', (e) => {
            e.preventDefault();
            mobMenu.classList.remove('hidden');
            $('#id').show();
        });

        const openMenu = document.querySelector('#hamburger');

        openMenu.addEventListener('click', (e) => {
            e.preventDefault();
            mobMenu.classList.remove('hidden');
            $('#app').hide();
        });

        closeMenu.addEventListener('click', (e) => {
            e.preventDefault();
            const navigation = document.querySelector('#navigation');
            mobMenu.classList.add('hidden');
            $('#app').show();

        });

        mobMenu.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('nav__item')) {
                const navItems = document.querySelectorAll('.nav__item');
                navItems.forEach( (item) => item.classList.remove('bg-blue-300') );
                e.currentTarget.classList.add('hidden');
                const name = e.target.getAttribute('id');
                $('#app').show();
                navigateTo(e.target, name, false);
            }

        })

        const credentials = () => {
            const diplomas = document.querySelector('[data-id="diplomas"]');
            const certificates = document.querySelector('[data-id="certificates"]');

            const openList = (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const item = document.querySelector('#' + id);
                for ( let i = 0; i < e.currentTarget.children.length; i++ ) {
                    e.currentTarget.children[i].classList.contains('arrow') ? e.currentTarget.children[i].classList.toggle('hidden') : null;
                }
                $(item).slideToggle(500);
            }

            diplomas.addEventListener('click', openList );
            certificates.addEventListener('click', openList );
        }

        const navigateTo = ( pageLink , pageName, goBack) => {
            pageLink = $(pageLink);
            const loader = document.querySelector('#loader');
            $(loader).show();
            $(pageLink).addClass('bg-blue-300');
            const app = document.querySelector('#app');
            fetch(`./components/${ pageName + '' }.html`, {
                method: 'GET',
            })
                .then(resolve => resolve.text())
                .then(result => app.innerHTML = result)
                .then(() => {
                   !goBack ? history.pushState({pageName}, ``, `.#${pageName}`): null;
                    setTimeout(() =>  $(loader).fadeOut(400), 800 );
                    switch (pageName) {
                        case 'credentials' :
                            credentials();
                            break;
                        default :
                            null;
                    }
                })
                .catch(err => console.error(err));
        }

        window.addEventListener('popstate', e => {
            if (e.state !== null) {
                const navItems = document.querySelectorAll('.nav__item');
                navItems.forEach( (item) => item.classList.remove('bg-blue-300') );
                navigateTo($(`#${e.state.pageName}`), e.state.pageName, true);

            }
        })
    })
    .catch(err => console.error(err));