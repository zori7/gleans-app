import {createContext, Dispatch, SetStateAction} from "react";

export type Details = {
    title: string
    description: string
    emoji: string
    tags: Array<string>
}

interface IState {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    details?: Details
    setDetails: Dispatch<SetStateAction<Details | undefined>>
}

export const CreateGleanContext = createContext<IState>({
    isOpen: false,
    setIsOpen: () => undefined,
    details: undefined,
    setDetails: () => undefined
});
