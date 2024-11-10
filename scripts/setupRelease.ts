import { setOutput } from "@actions/core"
import * as consts from "@wordpretty/shared/lib/consts"

function setupRelease() {
  setOutput("name", consts.PLUGIN_NAME)
  setOutput("version", consts.PLUGIN_VERSION)
  setOutput("file", `${consts.PLUGIN_NAME}_v${consts.PLUGIN_VERSION}.zip`)
}

setupRelease()
