import * as consts from "@wordpretty/shared/lib/consts"
import { deepCopy } from "@wordpretty/shared/lib/utils"
import { atom, useAtomValue, useSetAtom } from "jotai"
import { useMemo } from "react"

export const pluginConfigAtom = atom(deepCopy(consts.DEFAULT_CONFIG))

export const loadPluginConfigAtom = atom(null, async (get, set) => {
  let m_data: string
  if (import.meta.env.PROD) {
    // 本番環境ではプラグインのStoreから取得
    const res = await fetch(consts.PLUGIN_API_EP, { method: "GET" })
    const json = (await res.json()) as { response: string }
    m_data = json.response
  } else {
    // 開発環境ではブラウザのLocalStorageから取得
    m_data = localStorage.getItem("pluginConfig") ?? ""
  }
  if (m_data) {
    set(pluginConfigAtom, JSON.parse(m_data))
  }
})

export const savePluginConfigAtom = atom(null, async (get, set) => {
  const m_data = JSON.stringify(get(pluginConfigAtom))
  if (import.meta.env.PROD) {
    // 本番環境ではプラグインのStoreに保存
    await fetch(consts.PLUGIN_API_EP, { method: "POST", body: m_data })
  } else {
    // 開発環境ではブラウザのLocalStorageに保存
    localStorage.setItem("pluginConfig", m_data)
  }
})

export default function usePluginConfigStore() {
  const pluginConfig = useAtomValue(pluginConfigAtom)
  const loadPluginConfig = useSetAtom(loadPluginConfigAtom)
  const savePluginConfig = useSetAtom(savePluginConfigAtom)

  return useMemo(
    () => ({
      pluginConfig,
      loadPluginConfig,
      savePluginConfig,
    }),
    [pluginConfig, loadPluginConfig, savePluginConfig],
  )
}
