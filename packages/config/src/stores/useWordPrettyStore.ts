import * as consts from "@wordpretty/shared/lib/consts"
import { atom, useAtomValue, useSetAtom } from "jotai"
import { focusAtom } from "jotai-optics"
import { nanoid } from "nanoid"
import { useMemo } from "react"
import { pluginConfigAtom, savePluginConfigAtom } from "./usePluginConfigStore"

import type { WordPrettyItem } from "@wordpretty/shared/lib/types"

export const wordPrettyAtom = focusAtom(pluginConfigAtom, (optic) =>
  optic.prop("wordPretty"),
)

export const itemsAtom = focusAtom(wordPrettyAtom, (optic) =>
  optic.prop("items"),
)

export const activeItemAtom = atom(undefined as WordPrettyItem | undefined)

export const addItemAtom = atom(null, async (get, set) => {
  const items = get(itemsAtom)
  const newItem: WordPrettyItem = {
    ...consts.DEFAULT_ITEM,
    id: nanoid(8),
  }
  set(itemsAtom, [newItem, ...items])
  set(activeItemAtom, newItem)
  set(savePluginConfigAtom)
})

export const selectItemAtom = atom(
  null,
  async (get, set, targetItem: WordPrettyItem) => {
    set(activeItemAtom, targetItem)
  },
)

const moveItemAtom = atom(null, (get, set, newItems: WordPrettyItem[]) => {
  set(itemsAtom, newItems)
  set(savePluginConfigAtom)
})

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
    set(savePluginConfigAtom)
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
    set(savePluginConfigAtom)
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
    set(savePluginConfigAtom)
  },
)

export const editItemAtom = atom(
  null,
  async (get, set, targetItem: WordPrettyItem) => {
    const items = get(itemsAtom)
    const newItem: WordPrettyItem = {
      ...targetItem,
      pattern: targetItem.pattern.trim(),
    }

    set(
      itemsAtom,
      items.map((item) => (item.id === newItem.id ? newItem : item)),
    )
    set(activeItemAtom, newItem)
    set(savePluginConfigAtom)
  },
)

export default function useWordPrettyStore() {
  const wordPretty = useAtomValue(wordPrettyAtom)
  const items = useAtomValue(itemsAtom)
  const activeItem = useAtomValue(activeItemAtom)
  const addItem = useSetAtom(addItemAtom)
  const selectItem = useSetAtom(selectItemAtom)
  const moveItem = useSetAtom(moveItemAtom)
  const toggleItem = useSetAtom(toggleItemAtom)
  const copyItem = useSetAtom(copyItemAtom)
  const deleteItem = useSetAtom(deleteItemAtom)
  const editItem = useSetAtom(editItemAtom)

  return useMemo(
    () => ({
      wordPretty,
      items,
      activeItem,
      addItem,
      selectItem,
      moveItem,
      toggleItem,
      copyItem,
      deleteItem,
      editItem,
    }),
    [
      wordPretty,
      items,
      activeItem,
      addItem,
      selectItem,
      moveItem,
      toggleItem,
      copyItem,
      deleteItem,
      editItem,
    ],
  )
}
