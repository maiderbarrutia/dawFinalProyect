import React, { useState, useEffect } from 'react';
import styles from './NavigationMenu.module.scss';
import { Link } from 'react-router-dom';
import SocialLinks from '../SocialLinks/SocialLinks';

interface NavigationMenuProps {
    closeMenu: (link: string) => void;
    handleNavigateToSection: (link: string) => void;
    selectedLink: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ 
    closeMenu, 
    handleNavigateToSection, 
    selectedLink 
}) => {
    const MOBILE_BREAKPOINT = 768;
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= MOBILE_BREAKPOINT);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        };

        window.addEventListener('resize', handleResize);

        // Limpieza del evento cuando el componente se desmonte
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    

    const handleClick = (link: string) => {
        handleNavigateToSection(link);
        closeMenu(link);
    };

    return (
        <>
            <ul className={styles.header__mainMenu}>
                <li>
                <Link 
                    to="/actividades"
                    className={`${styles['header__mainMenu-link']} ${selectedLink === '/actividades' ? styles['header__mainMenu-link--selected'] : ''}`}
                    onClick={() => handleClick('/actividades')}
                >
                    Actividades
                </Link>
                
                </li>
                
            </ul>

            {isMobile && (
                <SocialLinks />
            )}

        </>
        
    );
};

export default NavigationMenu;
