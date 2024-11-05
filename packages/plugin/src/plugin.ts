import * as consts from "@wordpretty/shared/lib/consts"
import filter from "./filter"
import request from "./request"

import type { OnePlugin, PluginAPI } from "@onecomme.com/onesdk/types/Plugin"
import type { PluginConfig } from "@wordpretty/shared/lib/types"

function createPlugin(): OnePlugin {
  let _api: PluginAPI

  return {
    name: consts.PLUGIN_NAME_JA,
    uid: consts.PLUGIN_UID,
    version: consts.PLUGIN_VERSION,
    author: consts.PLUGIN_AUTHOR_JA,
    url: `${consts.PLUGIN_WEB_EP}/index.html`,
    permissions: ["filter.comment"],
    defaultState: { wordPretty: { items: [] } } as PluginConfig,

    init(api) {
      _api = api
    },

    async request(req) {
      return await request(req, _api)
    },

    async filterComment(comment) {
      return await filter(comment, _api)
    },
  }
}

export default createPlugin()
