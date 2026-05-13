import Link from "next/link";
import { BriefcaseBusinessIcon, ChevronRightIcon, CodeXmlIcon, EnvelopeIcon, HtmlIcon, JavaScriptIcon, LockIcon, PanelToLeftIcon, ReactIcon, TypeScriptIcon, WordPressIcon } from "./components/Icon";
import ScrollReveal from "./components/ScrollReveal";
import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio | Hironori Yanase",
  description: "Webサイト制作・フロントエンド開発のご相談を承っています。制作実績、スキル、対応領域をまとめたポートフォリオサイトです。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Home() {
  return (
    <>
      <section className={styles.hero} id="top">
        <div className={styles.hero__visual} aria-hidden="true">
          <div className={styles.particles}></div>

          <span className={`${styles.shape} ${styles["shape--circle"]} ${styles["shape--01"]}`}></span>
          <span className={`${styles.shape} ${styles["shape--hex"]} ${styles["shape--02"]}`}></span>
          <span className={`${styles.shape} ${styles["shape--circle"]} ${styles["shape--03"]}`}></span>

          <svg className={`${styles.circuit} ${styles["circuit--01"]}`} viewBox="0 0 640 270">
            <path className={styles.circuit__base} d="M40 92 H190 L240 52 H390 L445 110 H590"></path>
            <path className={styles.circuit__base} d="M100 178 H250 L300 136 H430 L490 184 H620"></path>
            <path className={styles.circuit__flow} d="M40 92 H190 L240 52 H390 L445 110 H590"></path>
            <path className={styles.circuit__flow} d="M100 178 H250 L300 136 H430 L490 184 H620"></path>
            <circle cx="190" cy="92" r="4"></circle>
            <circle cx="390" cy="52" r="4"></circle>
            <circle cx="490" cy="184" r="4"></circle>
          </svg>

          <svg className={`${styles.circuit} ${styles["circuit--02"]}`} viewBox="0 0 560 220">
            <path className={styles.circuit__base} d="M24 82 H150 L206 134 H330 L388 86 H530"></path>
            <path className={styles.circuit__base} d="M84 158 H210 L272 116 H414"></path>
            <path className={styles.circuit__flow} d="M24 82 H150 L206 134 H330 L388 86 H530"></path>
            <path className={styles.circuit__flow} d="M84 158 H210 L272 116 H414"></path>
            <circle cx="150" cy="82" r="4"></circle>
            <circle cx="330" cy="134" r="4"></circle>
            <circle cx="414" cy="116" r="4"></circle>
          </svg>
        </div>

        <div className={styles.hero__inner}>
          <div className={styles.hero__content}>
            <div>
              <div className={styles.hero__label}>WEB CREATOR / FRONT-END</div>

              <ScrollReveal className={styles.reveal}>
                <h1 className={styles.hero__title}>
                  制作と開発の<br className="sp-only" />経験を、<br />
                  <span>伝わるWebへ。</span>
                </h1>
              </ScrollReveal>

              <p className={styles.hero__lead}>
                企業サイトやLPなどのWeb制作経験と、システム開発で得た視点を活かし、<br className="pc-only" />
                見やすく、使いやすく、目的が伝わるWebサイトを制作します。
              </p>

              <div className={styles.hero__actions}>
                <a href="#about" className={`${styles.button} ${styles["button--primary"]}`}>経験・スキルを見る <span><ChevronRightIcon className={styles.button__arrow} aria-hidden="true" /></span></a>
                <a href="#contact" className={`${styles.button} ${styles["button--secondary"]}`}>お問い合わせ <span><ChevronRightIcon className={styles.button__arrow} aria-hidden="true" /></span></a>
              </div>
            </div>
          </div>

          <div className={styles.hero__bottom}>
            <div className={styles.hero__meta}>
              <div className={styles["hero__meta-item"]}>
                <span className={styles.hero__icon}><BriefcaseBusinessIcon aria-hidden="true" /></span>
                <span>制作・開発の実務経験</span>
              </div>
              <div className={styles["hero__meta-item"]}>
                <span className={styles.hero__icon}><PanelToLeftIcon aria-hidden="true" /></span>
                <span>企業サイト / オウンドメディア / LP / イベントサイト / HTMLメール</span>
              </div>
              <div className={styles["hero__meta-item"]}>
                <span className={styles.hero__icon}><CodeXmlIcon aria-hidden="true" /></span>
                <span>React / Next.js での制作</span>
              </div>
            </div>
            <div className={styles.hero__name}>HIRONORI YANASE</div>
          </div>
        </div>
      </section>

      <section className={`section ${styles["works-entry"]}`} id="works">
        <div className="container">
          <div className={styles["works-card"]}>
            <div className={styles["works-card__content"]}>
              <div className="section-label">WORKS / PROTECTED AREA</div>
              <ScrollReveal className={styles.reveal}>
                <h2 className="section-title">制作実績</h2>
              </ScrollReveal>
              <p className={`section-text ${styles["works-card__text"]}`}>
                実務案件・自主制作の詳細は、関係者向けページに掲載しています。<br />
                閲覧には認証情報が必要です。
              </p>
              <Link href="/works" prefetch={false} className={`${styles.button} ${styles["button--secondary"]} ${styles["works-card__button"]}`}>
                <span>制作実績を見る</span>
                <span><LockIcon aria-hidden="true" className={styles.button__lock}/></span>
              </Link>
            </div>

            <div className={styles["lock-visual"]} aria-hidden="true">
              <div className={styles["lock-visual__circle"]}>
                <div className={styles["lock-visual__icon"]}>
                  <span className={styles["lock-visual__symbol"]}><LockIcon aria-hidden="true" /></span>
                  <span className={styles["lock-visual__text"]}>LOCKED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.about}`} id="about">
        <div className="container">
          <div className={styles["about-card"]}>
            <div className={styles["about-card__body"]}>
              <div className="section-label">ABOUT / SKILLS</div>
              <ScrollReveal className={styles.reveal}>
                <h2 className="section-title">制作と開発の視点で、<br className="pc-only"/>伝わるWebを形にします。</h2>
              </ScrollReveal>
              <p className="section-text">
                コーポレートサイト、LP、イベントサイト、HTMLメールなどの制作経験を活かし、情報が整理され、目的が伝わるWebサイトを制作します。<br />
                デザインの意図を汲み取りながら、HTML / CSS / JavaScriptを用いた実装を行い、現在はReact / Next.jsを用いたWebアプリ制作にも取り組み、実装の幅を広げています。
              </p>
            </div>

            <div className={styles.skills}>
              <div className={styles.skill}>
                <div className={styles.skill__icon}><HtmlIcon aria-hidden="true" /></div>
                <div>
                  <div className={styles.skill__title}>HTML / CSS</div>
                  <div className={styles.skill__text}>セマンティックで保守性の高いマークアップ</div>
                </div>
              </div>

              <div className={styles.skill}>
                <div className={styles.skill__icon}><JavaScriptIcon aria-hidden="true" /></div>
                <div>
                  <div className={styles.skill__title}>JavaScript</div>
                  <div className={styles.skill__text}>UI制御やインタラクションの実装</div>
                </div>
              </div>

              <div className={styles.skill}>
                <div className={styles.skill__icon}><WordPressIcon aria-hidden="true" /></div>
                <div>
                  <div className={styles.skill__title}>WordPress</div>
                  <div className={styles.skill__text}>オリジナルテーマ制作・更新運用</div>
                </div>
              </div>

              <div className={styles.skill}>
                <div className={styles.skill__icon}><ReactIcon aria-hidden="true" /></div>
                <div>
                  <div className={styles.skill__title}>React / Next.js</div>
                  <div className={styles.skill__text}>コンポーネント設計とWebアプリ制作</div>
                </div>
              </div>

              <div className={styles.skill}>
                <div className={styles.skill__icon}><TypeScriptIcon aria-hidden="true" /></div>
                <div>
                  <div className={styles.skill__title}>TypeScript</div>
                  <div className={styles.skill__text}>型定義を意識したコード実装</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.contact}`} id="contact">
        <div className="container">
          <div className={styles["contact-card"]}>
            <div className={styles["contact-card__inner"]}>
              <div className="section-label">CONTACT</div>
              <ScrollReveal className={styles.reveal}>
                <h2 className={styles["contact-card__title"]}>お仕事のご依頼やご相談など、<br className="pc-only" />お気軽にご連絡ください。</h2>
              </ScrollReveal>
              <a href="mailto:hyanase4@gmail.com" className={`${styles.button} ${styles["button--primary"]} ${styles["contact-card__button"]}`}>
                <span><EnvelopeIcon aria-hidden="true" />　メールで連絡する</span>
                <span><ChevronRightIcon className={styles.button__arrow} aria-hidden="true" /></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
