import { describe, expect, test } from "bun:test"
import plugin from "../src/plugin"

describe("plugin", () => {
  test("プラグイン名が設定されていること", () => {
    expect(plugin.name).toBeTruthy()
  })
})
