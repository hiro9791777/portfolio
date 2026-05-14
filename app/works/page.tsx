import { getWorks } from "@/lib/works";
import WorksClient from "./WorksClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "制作実績 | Portfolio | Hironori Yanase",
  description: "Webサイト制作・フロントエンド開発のご相談を承っています。制作実績、スキル、対応領域をまとめたポートフォリオサイトです。",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function WorksPage() {
  const works = await getWorks();

  return <WorksClient works={works.contents} />;
}