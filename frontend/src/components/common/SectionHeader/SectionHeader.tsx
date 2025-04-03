import Button from "@components/common/Button/Button";
import styles from "./SectionHeader.module.scss";


interface SectionHeaderProps {
    title: string;
    buttonText?: string;
    buttonLink?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, buttonText, buttonLink }) => {
    return (
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeader__title}>{title}</h2>
            {buttonText && buttonLink && (
                <Button
                    text={buttonText}
                    ariaLabel={`Ir a la página de ${buttonText.toLowerCase()}`}
                    link={buttonLink}
                    className={styles.sectionHeader__button}
                />
            )}
        </div>
    );
};

export default SectionHeader;