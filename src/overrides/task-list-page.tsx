import type { TaskKey } from '@/lib/site-config'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = false

export async function TaskListPageOverride(_: {
  task: TaskKey
  category?: string
  hideIntro?: boolean
  surfacePath?: string
  hideListingHeroLinks?: boolean
  layoutKeyOverride?: string
}) {
  return null
}
