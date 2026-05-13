import styles from './Footer.module.css'
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__inner}>
                <p className={styles.copyright}>&copy; Hironori Yanase</p>
            </div>
        </footer>
    );
};

export default Footer;

