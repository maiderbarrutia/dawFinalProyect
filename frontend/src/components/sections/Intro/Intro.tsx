import React from 'react';
import styles from './Intro.module.scss';
import { getAssetSrc } from '@/utils/srcUtils'; 

const Intro: React.FC = () => {
    

    return (
        <section id="intro" className={`${styles['intro']} ${styles['home-section']}`}
        style={{ backgroundImage: `url(${getAssetSrc(`images/intro-image.jpg`)})` }}
        >
            
        </section>

        
    );
};

export default Intro;