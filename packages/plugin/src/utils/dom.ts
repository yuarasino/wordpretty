import { Window } from "happy-dom"

import type { Document, HTMLElement, Node } from "happy-dom"

const URL_PATTERN = /https?:\/\/[\w/:%#$&?()~.=+@,-]+/g

export function createDocument(text: string): Document {
  const document = new Window().document
  document.body.innerHTML = text
  return document
}

export function execFuncOnElementNode(
  document: Document,
  func: (child: HTMLElement) => void,
) {
  const children = Array.from(document.body.childNodes)
  for (const child of children) {
    if (child.nodeType === document.ELEMENT_NODE) {
      func(child as HTMLElement)
    }
  }
}

export function execFuncOnTextNode(
  document: Document,
  func: (child: Node) => void,
) {
  const children = Array.from(document.body.childNodes)
  for (const child of children) {
    if (child.nodeType === document.TEXT_NODE) {
      func(child)
    }
  }
}

export function updateNodeWithHtmlContent(
  document: Document,
  child: Node,
  content: string,
) {
  const div = document.createElement("div")
  div.innerHTML = content
  const nodes = Array.from(div.childNodes)
  for (const node of nodes) {
    document.body.insertBefore(node, child)
  }
  document.body.removeChild(child)
}

export function wrapUrlPattern(document: Document) {
  execFuncOnTextNode(document, (child) => {
    let content = child.textContent ?? ""
    content = content.replaceAll(URL_PATTERN, (url) => {
      return `<span>${url}</span>`
    })
    updateNodeWithHtmlContent(document, child, content)
  })
}

export function wrapTextNode(document: Document) {
  execFuncOnTextNode(document, (child) => {
    let content = child.textContent ?? ""
    content = `<span>${content}</span>`
    updateNodeWithHtmlContent(document, child, content)
  })
}
