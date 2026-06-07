import { notFound } from "next/navigation";
import { StoryPage } from "@/components/StoryPage";
import { pages } from "@/data/demo";

export function generateStaticParams() {
  return pages.map((page) => ({ section: page.slug }));
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!pages.some((page) => page.slug === section)) {
    notFound();
  }
  return <StoryPage slug={section} />;
}
