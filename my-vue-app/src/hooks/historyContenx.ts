import React from "react"
import { HistoryType } from ".././store/history"

const defaultHistory: HistoryType = {
    undo: () => undefined,
    redo: () => undefined,
}
const HistoryContext = React.createContext(defaultHistory);
export {
    HistoryContext,
}
