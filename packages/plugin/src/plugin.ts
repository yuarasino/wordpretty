import * as consts from "@wordpretty/shared/src/consts"

import type { OnePlugin, PluginAPI } from "@onecomme.com/onesdk/types/Plugin"

function createPlugin(): OnePlugin {
  let _api: PluginAPI

  return {
    name: consts.PLUGIN_NAME_JP,
    uid: consts.PLUGIN_UID,
    version: consts.PLUGIN_VERSION,
    author: consts.PLUGIN_AUTHOR_JP,
    url: `${consts.PLUGIN_WEB_EP}/index.html`,
    permissions: ["filter.comment"],
    defaultState: {},

    init(api) {
      _api = api
    },

    async request(req) {
      return { code: 404, response: "" }
    },

    async filterComment(comment) {
      return comment
    },
  }
}

export default createPlugin()