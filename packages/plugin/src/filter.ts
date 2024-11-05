import type { Comment } from "@onecomme.com/onesdk/types/Comment"
import type { PluginAPI } from "@onecomme.com/onesdk/types/Plugin"

export default async function filter(
  comment: Comment,
  api: PluginAPI,
): Promise<Comment> {
  return comment
}
