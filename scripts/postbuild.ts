import * as consts from "@wordpretty/shared/consts"
import {
  copySync,
  ensureDirSync,
  readFileSync,
  removeSync,
  writeFileSync,
} from "fs-extra"
import Mustache from "mustache"

function build() {
  removeSync("dist")
  ensureDirSync("dist")
  copySync("packages/config/dist", "dist")
  copySync("packages/plugin/dist", "dist")
  renderSync("scripts/README.temp", "dist/README.txt")
}

function renderSync(src: string, dst: string) {
  let text = readFileSync(src, { encoding: "utf-8" })
  text = Mustache.render(text, consts)
  writeFileSync(dst, text, { encoding: "utf-8" })
}

build()
