"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Work } from "@/app/types/works";
import styles from "./page.module.css";
import Image from "next/image";

type Props = {
  works: Work[];
};

const normalizeFilter = (value: unknown) => String(value).replace(/\s+/g, " ").trim();

export default function WorksClient({ works }: Props) {
  const filters = useMemo(() => {
    const categories = works.map((work) => normalizeFilter(work.category));
    const tags = works.flatMap((work) => work.tags.map(normalizeFilter));
    const uniqueFilters = Array.from(new Set([...categories, ...tags])).filter(
      (filter) => filter && filter !== "ALL",
    );

    return ["ALL", ...uniqueFilters];
  }, [works]);

  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredWorks =
    activeFilter === "ALL"
      ? works
      : works.filter((work) => {
          return (
            normalizeFilter(work.category) === activeFilter ||
            work.tags.some((tag) => normalizeFilter(tag) === activeFilter)
          );
        });

  return (
    <div className={styles.works}>
      <section className={styles.mv}>
        <div className={styles.inner}>
          <p className={styles.label}>WORKS / PORTFOLIO</p>
          <h1 className={styles.title}>制作実績</h1>
          <p className={styles.lead}>Web制作の実績をご紹介します。</p>

          <ul className={styles.filters}>
            {filters.map((filter) => (
              <li key={filter}>
                <button
                  className={`${styles.filterButton} ${
                    activeFilter === filter ? styles.isActive : ""
                  }`}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.worksSection}>
        <div className={styles.inner}>
          {filteredWorks.length > 0 ? (
            <div className={styles.grid}>
              {filteredWorks.map((work) => (
                <article className={styles.card} key={work.id}>
                  <div className={styles.imageWrap}>
                    <Image src={work.image.url} width={work.image.width} height={work.image.height} alt={work.title} className={styles.image} />
                  </div>

                  <div className={styles.body}>
                    <p className={styles.category}>{work.category}</p>
                    <h2 className={styles.cardTitle}>{work.title}</h2>
                    <p className={styles.description}>{work.description}</p>

                    <ul className={styles.tags}>
                      {work.tags.map((tag) => (
                        <li className={styles.tag} key={tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <Link href={`/works/${work.slug}`} className={styles.link}>
                      詳細を見る
                      <span className={styles.linkArrow}>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.emptyMessage}>該当データが存在しません。</p>
          )}
        </div>
      </section>
    </div>
  );
}
