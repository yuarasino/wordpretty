import * as consts from "@wordpretty/shared/lib/consts"
import { atom, useAtomValue, useSetAtom } from "jotai"
import { useMemo } from "react"

import type {
  ImageDirAction,
  ImageDirResult,
} from "@wordpretty/shared/lib/types"

export const imagesAtom = atom([] as string[])

export const openImageDirAtom = atom(null, async (get, set) => {
  const m_action = JSON.stringify({ type: "open" } as ImageDirAction)
  if (import.meta.env.PROD) {
    await fetch(consts.PLUGIN_API_EP, {
      method: "PUT",
      body: m_action,
    })
  } else {
    console.log("open")
  }
})

export const readImageDirAtom = atom(null, async (get, set) => {
  const m_action = JSON.stringify({ type: "read" } as ImageDirAction)
  let m_result: string
  if (import.meta.env.PROD) {
    const res = await fetch(consts.PLUGIN_API_EP, {
      method: "PUT",
      body: m_action,
    })
    const json = (await res.json()) as { response: string }
    m_result = json.response
  } else {
    m_result = JSON.stringify({
      type: "read",
      images: ["fugu.png", "samples/fugu2.png"],
    } as ImageDirResult)
  }
  const result = JSON.parse(m_result) as ImageDirResult
  if (result.type === "read") set(imagesAtom, result.images)
})

export default function useImageDirStore() {
  const images = useAtomValue(imagesAtom)
  const openImageDir = useSetAtom(openImageDirAtom)
  const readImageDir = useSetAtom(readImageDirAtom)

  return useMemo(
    () => ({
      images,
      openImageDir,
      readImageDir,
    }),
    [images, openImageDir, readImageDir],
  )
}
