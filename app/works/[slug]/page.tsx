import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getWork, getWorks } from "@/lib/works";
import styles from "./page.module.css";
import Image from "next/image";
import { ExternalLinkIcon } from "@/app/components/Icon";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const works = await getWorks();

  return works.contents.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWork(slug);

  if (!work) {
    notFound();
  }

  return {
    title: `${work.title} | 制作実績 | Portofole | Hironori Yanase`,
    description: work.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = await getWork(slug);

  if (!work) {
    notFound();
  }

  return (
    <main className={styles.detail}>
      <section className={styles.mv}>
        <div className={styles.inner}>
          <p className={styles.label}>WORKS / DETAIL</p>
          <h1 className={styles.title}>{work.title}</h1>

          <p className={styles.category}>{work.category}</p>

          <ul className={styles.tags}>
            {work.tags.map((tag) => (
              <li className={styles.tag} key={tag}>
                {tag}
              </li>
            ))}
          </ul>

          <Link href={work.url} className={styles.publishPage}>公開ページはこちら <span className={styles.externalLinkIcon}><ExternalLinkIcon aria-hidden="true" /></span></Link>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.imageWrap}>
            <Image src={work.image.url}  width={work.image.width} height={work.image.height} alt={work.title} className={styles.image} />
          </div>

          <div className={styles.textBox}>
            <h2>制作概要</h2>
            <p>{work.detail}</p>
          </div>

          <Link href="/works" className={styles.backLink}>
            ← 一覧へ戻る
          </Link>
        </div>
      </section>
    </main>
  );
}
