import React from 'react';
import styles from './SocialLinks.module.scss';
import instagramIcon from '@/assets/icons/instagram-icon.png';
import linkedinIcon from '@/assets/icons/linkedin-icon.png';
import facebookIcon from '@/assets/icons/facebook-icon.png';
import youtubeIcon from '@/assets/icons/youtube-icon.png';

const SocialLinks: React.FC = () => {
    return (
        <ul className={styles.socialLinks}>
            <li>
                <a href="#" target="_blank">
                    <img className={styles['socialLinks__img']} src={linkedinIcon} height="30" width="30" alt="LinkedIn" />
                </a>
            </li>
            <li>
                <a href="#" target="_blank">
                    <img className={styles['socialLinks__img']} src={instagramIcon} height="30" width="30" alt="GitHub" />
                </a>
            </li>
            <li>
                <a href="#" target="_blank">
                    <img className={styles['socialLinks__img']} src={facebookIcon} height="30" width="30" alt="LinkedIn" />
                </a>
            </li>
            <li>
                <a href="#" target="_blank">
                    <img className={styles['socialLinks__img']} src={youtubeIcon} height="30" width="30" alt="LinkedIn" />
                </a>
            </li>
        </ul>
    );
};

export default SocialLinks;
