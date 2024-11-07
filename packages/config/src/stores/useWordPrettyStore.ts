import { atom, useAtomValue, useSetAtom } from "jotai"
import { focusAtom } from "jotai-optics"
import { nanoid } from "nanoid"
import { useMemo } from "react"
import { configAtom, saveConfigAtom } from "./useConfigStore"

import type { WordPrettyItem } from "@wordpretty/shared/lib/types"

export const wordPrettyAtom = focusAtom(configAtom, (optic) =>
  optic.prop("wordPretty"),
)

export const itemsAtom = focusAtom(wordPrettyAtom, (optic) =>
  optic.prop("items"),
)

export const activeItemAtom = atom(undefined as WordPrettyItem | undefined)

export const addItemAtom = atom(null, async (get, set) => {
  const items = get(itemsAtom)
  const newItem: WordPrettyItem = {
    enabled: true,
    id: nanoid(8),
    name: "サンプル",
    pattern: "ふぐ\nフグ\n🐡",
    image: "fugu.png",
    size: 36,
  }
  set(itemsAtom, [newItem, ...items])
  set(activeItemAtom, newItem)
  set(saveConfigAtom)
})

export const selectItemAtom = atom(
  null,
  async (get, set, targetItem: WordPrettyItem) => {
    set(activeItemAtom, targetItem)
  },
)

export const toggleItemAtom = atom(
  null,
  async (get, set, targetItem: WordPrettyItem) => {
    const items = get(itemsAtom)
    const newItem: WordPrettyItem = {
      ...targetItem,
      enabled: !targetItem.enabled,
    }
    set(
      itemsAtom,
      items.map((item) => (item.id === targetItem.id ? newItem : item)),
    )
    set(saveConfigAtom)
  },
)

export const copyItemAtom = atom(
  null,
  async (get, set, targetItem: WordPrettyItem) => {
    const items = get(itemsAtom)
    const newItem: WordPrettyItem = {
      ...targetItem,
      id: nanoid(8),
    }
    set(itemsAtom, [newItem, ...items])
    set(activeItemAtom, newItem)
    set(saveConfigAtom)
  },
)

export const deleteItemAtom = atom(
  null,
  async (get, set, targetItem: WordPrettyItem) => {
    const items = get(itemsAtom)
    const activeItem = get(activeItemAtom)
    set(
      itemsAtom,
      items.filter((item) => item.id !== targetItem.id),
    )
    set(
      activeItemAtom,
      activeItem?.id !== targetItem.id ? activeItem : undefined,
    )
    set(saveConfigAtom)
  },
)

export default function useWordPrettyStore() {
  const wordPretty = useAtomValue(wordPrettyAtom)
  const items = useAtomValue(itemsAtom)
  const activeItem = useAtomValue(activeItemAtom)
  const addItem = useSetAtom(addItemAtom)
  const selectItem = useSetAtom(selectItemAtom)
  const toggleItem = useSetAtom(toggleItemAtom)
  const copyItem = useSetAtom(copyItemAtom)
  const deleteItem = useSetAtom(deleteItemAtom)

  return useMemo(
    () => ({
      wordPretty,
      items,
      activeItem,
      addItem,
      selectItem,
      toggleItem,
      copyItem,
      deleteItem,
    }),
    [
      wordPretty,
      items,
      activeItem,
      addItem,
      selectItem,
      toggleItem,
      copyItem,
      deleteItem,
    ],
  )
}
