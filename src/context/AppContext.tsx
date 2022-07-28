import { createContext } from "react"

interface AppContextInterface{
    gameOver: boolean
}

export const AppContext = createContext<AppContextInterface | null>(null)