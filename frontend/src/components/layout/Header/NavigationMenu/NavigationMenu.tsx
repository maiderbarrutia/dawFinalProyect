import React from 'react';
import styles from './NavigationMenu.module.scss';

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
    const handleClick = (link: string) => {
        handleNavigateToSection(link);
        closeMenu(link);
    };

    return (
        <ul className={styles.header__mainMenu}>
            <li>
                <a className={`${styles['header__mainMenu-link']} ${selectedLink === '/actividades' ? styles['header__mainMenu-link--selected'] : ''}`} onClick={() => handleClick('/actividades')}>
                    Actividades
                </a>
            </li>
            
        </ul>
    );
};

export default NavigationMenu;
