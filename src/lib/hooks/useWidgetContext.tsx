import React, { createContext, useContext, ReactNode } from "react";
import { FilledWidgetConfig } from "../WidgetConfig"; 
import { MessageHook } from "./useMessages";

type WidgetContextType = FilledWidgetConfig & MessageHook;

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

interface WidgetProviderProps {
    children: ReactNode;
    value: WidgetContextType;
}

export const WidgetProvider: React.FC<WidgetProviderProps> = ({ children, value }) => {
    return (
        <WidgetContext.Provider value={value}>
            {children}
        </WidgetContext.Provider>
    );
};

export function useWidgetContext(): WidgetContextType {
    const context = useContext(WidgetContext);

    if (context === undefined) {
        throw new Error("useWidgetContext must be used within a WidgetProvider");
    }

    return context;
};
