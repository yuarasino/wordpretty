import { execSync } from "node:child_process"
import { readdirSync } from "node:fs"
import { extname, sep } from "node:path"
import type {
  PluginAPI,
  PluginRequest,
  PluginResponse,
} from "@onecomme.com/onesdk/types/Plugin"
import type {
  ImageDirAction,
  ImageDirResult,
  PluginConfig,
} from "@wordpretty/core/src/types"
import generateCustomCss from "./logics/generateCustomCss"

async function loadPluginConfig(
  req: PluginRequest,
  api: PluginAPI,
): Promise<PluginResponse> {
  const config = api.store.store as PluginConfig
  generateCustomCss(api.dir, config)
  return { code: 200, response: JSON.stringify(config) }
}

async function savePluginConfig(
  req: PluginRequest,
  api: PluginAPI,
): Promise<PluginResponse> {
  const config = JSON.parse(req.body) as PluginConfig
  api.store.store = config
  generateCustomCss(api.dir, config)
  return { code: 200, response: JSON.stringify(config) }
}

async function openImageDir(req: PluginRequest, api: PluginAPI) {
  const imageDir = `${api.dir}${sep}images`
  let m_success: boolean
  try {
    execSync(`start ${imageDir}`)
    m_success = true
  } catch (error) {
    m_success = false
  }
  const result = { type: "open", success: m_success } as ImageDirResult
  return { code: 200, response: JSON.stringify(result) }
}

async function readImageDir(req: PluginRequest, api: PluginAPI) {
  const imageDir = `${api.dir}${sep}images`
  const images = (readdirSync(imageDir, { recursive: true }) as string[])
    .filter((image) => !!extname(image))
    .map((image) => image.replaceAll(sep, "/"))
  const result = { type: "read", images: images } as ImageDirResult
  return { code: 200, response: JSON.stringify(result) }
}

async function processImageDir(req: PluginRequest, api: PluginAPI) {
  const action = JSON.parse(req.body) as ImageDirAction
  switch (action.type) {
    case "open":
      return await openImageDir(req, api)
    case "read":
      return await readImageDir(req, api)
    default:
      throw new Error()
  }
}

export default async function request(
  req: PluginRequest,
  api: PluginAPI,
): Promise<PluginResponse> {
  switch (req.method) {
    case "GET":
      return await loadPluginConfig(req, api)
    case "POST":
      return await savePluginConfig(req, api)
    case "PUT":
      return await processImageDir(req, api)
    default:
      throw new Error()
  }
}
