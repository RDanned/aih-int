import { useState, useEffect } from 'react'
import { WordCountResponse, HighlightResponse} from '@/types/extension.ts';

export default function App() {
  const [wordCount, setWordCount] = useState(0)
  const [highlighted, setHighlighted] = useState(false)

  async function fetchWordCount() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          { type: 'GET_WORD_COUNT' },
          (response: WordCountResponse) => {
            if (response?.wordCount != null) {
              setWordCount(response.wordCount)
            }
          }
        )
      }
    } catch (err) {
      console.error('Error fetching word count:', err)
    }
  }

  async function toggleHighlight() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          { type: 'TOGGLE_HIGHLIGHT' },
          (response: HighlightResponse) => {
            if (response) {
              setHighlighted(response.highlighted)
            }
          }
        )
      }
    } catch (err) {
      console.error('Error toggling highlight:', err)
    }
  }

  useEffect(() => {
    console.log('AIH mounted')
    fetchWordCount()
  }, [])

  return (
    <div style={{ minWidth: '200px', padding: '1rem' }}>
      <h2>Links & Words</h2>
      <p>
        <strong>Word Count:</strong> {wordCount}
      </p>
      <div style={{ marginBottom: '0.5rem' }}>
        <button onClick={fetchWordCount}>Refresh Count</button>
      </div>
      <button onClick={toggleHighlight}>
        {highlighted ? 'Unhighlight Links' : 'Highlight Links'}
      </button>
    </div>
  )
}
