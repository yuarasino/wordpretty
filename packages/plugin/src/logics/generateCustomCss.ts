import { writeFileSync } from "node:fs"
import { join } from "node:path"

import type { PluginConfig } from "@wordpretty/core/src/types"

export default function generateCustomCss(dir: string, config: PluginConfig) {
  let content = ""
  content += ".margin { margin-right: 4px; }\n"
  content += ".illust { margin-top: 2px; margin-bottom: 2px; }\n"

  for (const item of config.wordPretty.items) {
    content += `.illust-${item.id} { width: auto !important; height: ${item.size}px !important; }\n`
  }

  const path = join(dir, "wordpretty.css")
  writeFileSync(path, content)
}
