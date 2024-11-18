import applyWordPretty from "./logics/applyWordPretty"

import type { Comment } from "@onecomme.com/onesdk/types/Comment"
import type { PluginAPI } from "@onecomme.com/onesdk/types/Plugin"
import type { PluginConfig } from "@wordpretty/core/src/types"

export default async function filter(
  comment: Comment,
  api: PluginAPI,
): Promise<Comment> {
  const config = api.store.store as PluginConfig
  comment.data.comment = applyWordPretty(comment.data.comment, config)
  return comment
}
