import { describe, expect, spyOn, test } from "bun:test"
import { act, renderHook } from "@testing-library/react"
import useImageDirStore from "../../src/stores/useImageDirStore"

describe("useImageDirStore/openImageDir", () => {
  test("正常に実行できるか", () => {
    const { result } = renderHook(() => useImageDirStore())

    const spyConsoleLog = spyOn(console, "log")
    act(() => {
      result.current.openImageDir()
    })

    expect(spyConsoleLog).toHaveBeenCalledWith("open")
  })
})

describe("useImageDirStore/readImageDir", () => {
  test("正常に実行できるか", () => {
    const { result } = renderHook(() => useImageDirStore())

    act(() => {
      result.current.readImageDir()
    })

    expect(result.current.images).toBeArrayOfSize(2)
  })
})
