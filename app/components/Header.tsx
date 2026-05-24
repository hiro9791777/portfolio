import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
    return (
      <header className={styles.header}>
        <div className={styles.header__inner}>
            <Link className={styles.header__logo} href="/" aria-label="トップへ戻る">
                <Image
                    src="/images/logo.png"
                    alt="Hironori Yanase"
                    width={56}
                    height={56}
                    priority
                />
            </Link>
            <nav className={styles.header__nav} aria-label="グローバルナビゲーション">
                <Link href="/#works">WORKS</Link>
                <Link href="/#about">ABOUT</Link>
                <Link href="/#skills">SKILLS</Link>
                <Link href="/#contact">CONTACT</Link>
            </nav>
        </div>
      </header>
    );
};

export default Header;
