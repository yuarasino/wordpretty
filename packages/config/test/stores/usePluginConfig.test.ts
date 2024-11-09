import { describe, expect, spyOn, test } from "bun:test"
import { act, renderHook } from "@testing-library/react"
import * as consts from "@wordpretty/shared/lib/consts"
import { deepCopy } from "@wordpretty/shared/lib/utils"
import usePluginConfigStore from "../../src/stores/usePluginConfigStore"

describe("usePluginConfigStore/loadPluginConfig", () => {
  test("正常に実行できるか", () => {
    const { result } = renderHook(() => usePluginConfigStore())
    const config = deepCopy(consts.DEFAULT_CONFIG)

    spyOn(Storage.prototype, "getItem").mockReturnValue(JSON.stringify(config))
    act(() => {
      result.current.loadPluginConfig()
    })

    expect(result.current.pluginConfig).toStrictEqual(config)
  })
})

describe("usePluginConfigStore/savePluginConfig", () => {
  test("正常に実行できるか", () => {
    const { result } = renderHook(() => usePluginConfigStore())
    const config = deepCopy(consts.DEFAULT_CONFIG)

    const spySetItem = spyOn(Storage.prototype, "setItem")
    spyOn(Storage.prototype, "getItem").mockReturnValue(JSON.stringify(config))
    act(() => {
      result.current.loadPluginConfig()
      result.current.savePluginConfig()
    })

    expect(spySetItem).toHaveBeenCalledWith(
      "pluginConfig",
      JSON.stringify(config),
    )
  })
})
