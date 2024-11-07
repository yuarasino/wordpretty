import type {
  PluginAPI,
  PluginRequest,
  PluginResponse,
} from "@onecomme.com/onesdk/types/Plugin"
import type { PluginConfig } from "@wordpretty/shared/lib/types"

async function loadConfig(
  req: PluginRequest,
  api: PluginAPI,
): Promise<PluginResponse> {
  const config = api.store.store as PluginConfig
  return { code: 200, response: JSON.stringify(config) }
}

async function saveConfig(
  req: PluginRequest,
  api: PluginAPI,
): Promise<PluginResponse> {
  const config = JSON.parse(req.body) as PluginConfig
  api.store.store = config
  return { code: 200, response: JSON.stringify(config) }
}

export default async function request(
  req: PluginRequest,
  api: PluginAPI,
): Promise<PluginResponse> {
  switch (req.method) {
    case "GET":
      return loadConfig(req, api)
    case "POST":
      return saveConfig(req, api)
    default:
      throw new Error()
  }
}
