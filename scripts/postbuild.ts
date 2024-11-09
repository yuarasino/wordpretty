import * as consts from "@wordpretty/shared/lib/consts"
import {
  copySync,
  mkdirSync,
  readFileSync,
  removeSync,
  writeFileSync,
} from "fs-extra"
import Mustache from "mustache"

function renderSync(src: string, dst: string) {
  let text = readFileSync(src, { encoding: "utf-8" })
  text = Mustache.render(text, consts)
  writeFileSync(dst, text, { encoding: "utf-8" })
}

function postBuild() {
  removeSync("dist")
  mkdirSync("dist")
  copySync("packages/config/dist", "dist")
  copySync("packages/plugin/dist", "dist")
  renderSync("scripts/README.temp", "dist/README.txt")
}

postBuild()
