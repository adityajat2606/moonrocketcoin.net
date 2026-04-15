import { TaskListPage } from "@/components/tasks/task-list-page";
import { buildTaskMetadata } from "@/lib/seo";
import { taskPageMetadata } from "@/config/site.content";

export const revalidate = 3;
export const dynamic = "force-dynamic";

export const generateMetadata = () =>
  buildTaskMetadata("listing", {
    path: "/classifieds",
    title: taskPageMetadata.listing.title,
    description: taskPageMetadata.listing.description,
  });

export default async function ClassifiedsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string | string[] }>;
}) {
  const resolved = (await searchParams) || {};
  const raw = resolved.category;
  const category = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;

  return (
    <TaskListPage
      task="listing"
      category={category}
      hideIntro
      surfacePath="/classifieds"
      hideListingHeroLinks
      layoutKeyOverride="listing-directory"
    />
  );
}
