export enum MessageType {
  GET_WORD_COUNT = 'GET_WORD_COUNT',
  TOGGLE_HIGHLIGHT = 'TOGGLE_HIGHLIGHT',
  WORD_COUNT_UPDATED = 'WORD_COUNT_UPDATED',
}

export interface GetWordCountMessage {
  type: MessageType.GET_WORD_COUNT;
}

export interface ToggleHighlightMessage {
  type: MessageType.TOGGLE_HIGHLIGHT;
}

export interface WordCountUpdatedMessage {
  type: MessageType.WORD_COUNT_UPDATED;
  wordCount: number;
}

// Define a union type for all messages
export type Message = GetWordCountMessage | ToggleHighlightMessage | WordCountUpdatedMessage;
