import type { PluginConfig, WordPrettyItem } from "./types"

export const PLUGIN_NAME = "wordpretty"
export const PLUGIN_NAME_JA = "WordPretty"
export const PLUGIN_UID = `net.yuarasino.${PLUGIN_NAME}`
export const PLUGIN_VERSION = "0.0.0"
export const PLUGIN_AUTHOR = "yuarasino"
export const PLUGIN_AUTHOR_JA = "新篠ゆう"
export const PLUGIN_WEB_EP = `http://localhost:11180/plugins/${PLUGIN_UID}`
export const PLUGIN_API_EP = `http://localhost:11180/api/plugins/${PLUGIN_UID}`

export const DEFAULT_ITEM: WordPrettyItem = {
  enabled: true,
  id: "sample",
  name: "サンプル",
  pattern: "ふぐ\nフグ\n🐡",
  image: "fugu.png",
  size: 36,
}
export const DEFAULT_CONFIG: PluginConfig = {
  wordPretty: { items: [DEFAULT_ITEM] },
}

export const CONFIG_LS_KEY = "config"
