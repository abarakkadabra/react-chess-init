import { createContext } from "react"

interface AppContextInterface{
    isfirstMove: boolean
    gameOver: boolean
}

export const AppContext = createContext<AppContextInterface|null>(null)