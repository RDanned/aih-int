let linksHighlighted = false

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_WORD_COUNT') {
    const wordCount = getWordCount()
    sendResponse({ wordCount })
  }

  if (message.type === 'TOGGLE_HIGHLIGHT') {
    linksHighlighted = !linksHighlighted
    toggleLinks(linksHighlighted)
    sendResponse({ highlighted: linksHighlighted })
  }
  return true
})

function getWordCount(): number {
  const text = document.body.innerText ?? ''
  const words = text.match(/\b\w+\b/g)
  return words ? words.length : 0
}

function toggleLinks(enable: boolean) {
  const links = document.querySelectorAll('a')

  if (enable) {
    links.forEach(link => {
      (link as HTMLElement).dataset.originalColor = link.style.color
      link.style.color = 'blue'
    })
  } else {
    links.forEach(link => {
      const originalColor = (link as HTMLElement).dataset.originalColor
      link.style.color = originalColor || ''
      delete (link as HTMLElement).dataset.originalColor
    })
  }
}

