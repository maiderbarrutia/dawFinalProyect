import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderLogo from './HeaderLogo/HeaderLogo';
import NavigationMenu from './NavigationMenu/NavigationMenu';
import SocialLinks from './SocialLinks/SocialLinks';
import styles from './Header.module.scss';
import menuIcon from '@/assets/icons/menu-icon.svg';
import LoginButton from './LoginButton/LoginButton';


const Header: React.FC = () => {
    const location = useLocation(); //URL actual. Se usa para saber si estamos en la página principal o no.
    const navigate = useNavigate(); //Permite cambiar la URL del navegador y navegar entre diferentes páginas.
    const MOBILE_BREAKPOINT = 768;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
    const [isScrolled, setIsScrolled] = useState(false);
    const [selectedLink, setSelectedLink] = useState('#intro');

    const headerRef = useRef<HTMLElement | null>(null);
    const navRef = useRef<HTMLDivElement | null>(null);

    

    // Funciones Comunes
    const closeMenu = (link: string) => {
        setSelectedLink(link); //link seria #intro, #about,... (depende de cual sea seleccionado)
        if (isMobile) setIsMenuOpen(false);
    };

    const handleScrollToSection = (link: string) => {
        const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
        const element = document.querySelector(link) as HTMLElement; //Encuentra el elemento en el DOM que coincide con #about, #intro,...

        if (element) {
            const topPosition = element.getBoundingClientRect().top + window.scrollY; //Coge la posición del elemento
            window.scrollTo({
                top: link === '#intro' ? 0 : topPosition - headerHeight,
                behavior: 'smooth',
            });
        }
    };

    //Manejar el comportamiento del header cuando se realiza un scroll en la página.
    const handleHeaderActiveLinkOnScroll = () => {
        if (headerRef.current) {  //Referencia al header del sitio
            const headerHeight = headerRef.current.offsetHeight;
            setIsScrolled(window.scrollY > headerHeight); //Actualiza el estado isScrolled dependiendo de si el scroll vertical (window.scrollY) ha superado la altura del header

            const sections = ['#intro', '#about', '#projects', '#experience', '#contact'];
            let activeSection = '#intro';

            for (const section of sections) {
                const element = document.querySelector(section) as HTMLElement;
                if (element) {
                    /* Usa getBoundingClientRect() para obtener la posición superior (top) y la altura (height) de la sección.*/
                    const { top: elementTop, height: elementHeight } = element.getBoundingClientRect();
                    const middleOfScreen = window.scrollY + window.innerHeight / 2;

                    if (middleOfScreen >= elementTop + window.scrollY && middleOfScreen < elementTop + elementHeight + window.scrollY) {
                        activeSection = section;
                        break;
                    }
                }
            }
            setSelectedLink(activeSection);
        }
    };

    const handleNavigateToSection = (link: string) => {
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: link } });
        } else {
            handleScrollToSection(link);
        }
        closeMenu(link);
    };

    // Móvil
    const handleMobileMenuToggle = () => {
        setIsMenuOpen(prevMenu => !prevMenu);
    };

    const handleMobileResize = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    

    // Efectos

    useEffect(() => {
        if (location.pathname === '/' && location.state?.scrollTo) {
            handleScrollToSection(location.state.scrollTo);
        } else if (location.pathname === '/') {
            handleScrollToSection('#intro');
        }
    }, [location]);

   
    useEffect(() => {

        const updateNavPosition = () => {
            if (headerRef.current && navRef.current) {
                const headerHeight = headerRef.current.offsetHeight;
                navRef.current.style.paddingTop = isMobile ? `${headerHeight}px` : '0';
                navRef.current.style.top = isMobile ? '0' : 'auto';
            }
        };
        // Manejar scroll
        const handleScroll = () => {
            handleHeaderActiveLinkOnScroll();
        };
    
        // Manejar resize
        const handleResize = () => {
            handleMobileResize();
            updateNavPosition();
        };
    
        // Añadir event listeners
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        
        // Llamar a las funciones iniciales
        handleScroll();
        updateNavPosition();
    
        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobile, isMenuOpen]); 

    const isNotHomePage = location.pathname !== '/';

    return (
        <header id="main-header" className={`${styles.header} ${isScrolled ? styles['header--scrolled'] : ''} 
        ${styles['header--fixed']} ${isNotHomePage ? styles['header--notHome'] : ''}`} ref={headerRef}>
            <div className={styles.header__container}>
                <HeaderLogo closeMenu={closeMenu} />

                <div className={styles.header__menu}>
                    {isMobile && (
                        <button onClick={handleMobileMenuToggle} className={styles.header__button}>
                            <img src={menuIcon} height="16" width="16" alt="icono menú" />
                        </button>
                    )}

                    <nav className={`${styles.header__nav} ${isMenuOpen && isMobile ? styles['header__nav--active'] : ''}`} 
                    ref={navRef}>
                        <NavigationMenu 
                            closeMenu={closeMenu} 
                            handleNavigateToSection={handleNavigateToSection} 
                            selectedLink={selectedLink} 
                        />
                    </nav>
                    <LoginButton/>
                    
                    {!isMobile && (
                        <SocialLinks />
                    )}
                    
                </div>
            </div>
        </header>
    );
};

export default Header;