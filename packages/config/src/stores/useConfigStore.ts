import * as consts from "@wordpretty/shared/lib/consts"
import { atom, useAtomValue, useSetAtom } from "jotai"
import { useMemo } from "react"

import type { PluginConfig } from "@wordpretty/shared/lib/types"

export const configAtom = atom({
  wordPretty: { items: [] },
} as PluginConfig)

export const loadConfigAtom = atom(null, async (_get, set) => {
  let m_data: string
  if (import.meta.env.PROD) {
    // 本番環境ではプラグインのStoreから取得
    const res = await fetch(consts.PLUGIN_API_EP, { method: "GET" })
    const resp = (await res.json()) as { response: string }
    m_data = resp.response
  } else {
    // 開発環境ではブラウザのLocalStorageから取得
    m_data = localStorage.getItem("config") ?? ""
  }
  if (m_data) {
    set(configAtom, JSON.parse(m_data))
  }
})

export const saveConfigAtom = atom(null, async (get, _set) => {
  const m_data = JSON.stringify(get(configAtom))
  if (import.meta.env.PROD) {
    // 本番環境ではプラグインのStoreに保存
    await fetch(consts.PLUGIN_API_EP, { method: "POST", body: m_data })
  } else {
    // 開発環境ではブラウザのLocalStorageに保存
    localStorage.setItem("config", m_data)
  }
})

export default function useConfigStore() {
  const config = useAtomValue(configAtom)
  const loadConfig = useSetAtom(loadConfigAtom)
  const saveConfig = useSetAtom(saveConfigAtom)

  return useMemo(
    () => ({
      config,
      loadConfig,
      saveConfig,
    }),
    [config, loadConfig, saveConfig],
  )
}
