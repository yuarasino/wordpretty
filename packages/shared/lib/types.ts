export type WordPrettyItem = {
  enabled: boolean
  id: string
  name: string
  pattern: string
  image: string
  size: number
}

export type WordPrettyConfig = {
  items: WordPrettyItem[]
}

export type PluginConfig = {
  wordPretty: WordPrettyConfig
}
