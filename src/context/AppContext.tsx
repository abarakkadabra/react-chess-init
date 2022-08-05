import { createContext } from "react"

interface AppContextInterface{
    isfirstMove: boolean
    gameOver: boolean
    check: boolean
}

export const AppContext = createContext<AppContextInterface|null>(null)