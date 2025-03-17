import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './HeaderLogo.module.scss';
import AisiPlanIcon from '@/assets/icons/logo-aisiplan.svg';

interface LogoProps {
    closeMenu: (link: string) => void;
}

const HeaderLogo: React.FC<LogoProps> = ({ closeMenu}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToHomeTop = () => {
        if (location.pathname !== '/') {
            navigate('/');
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleClick = (link: string) => {
        navigateToHomeTop();
        closeMenu(link);
    };

    return (
        <div className={styles.header__logo}>
            <a className={styles['header__logo-link']} onClick={() => handleClick('/')} style={{ cursor: 'pointer' }}>
                <img src={AisiPlanIcon} height="40"  alt="logo AisiPlan" />
                <p className={styles['header__logo-text']}>Logo AisiPlan</p>
            </a>
        </div>
    );
};

export default HeaderLogo;
