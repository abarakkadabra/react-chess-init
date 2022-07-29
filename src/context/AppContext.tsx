import { createContext } from "react"

interface AppContextInterface{
    firstMove: boolean
    gameOver: boolean
}

export const AppContext = createContext<AppContextInterface|null>(null)