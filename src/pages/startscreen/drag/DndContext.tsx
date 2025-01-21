import React, {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState,} from 'react';

interface DnDContextType {
    type: string | null;
    setType: Dispatch<SetStateAction<string | null>>;
}

const DnDContext = createContext<DnDContextType | undefined>(undefined);

export const DnDProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [type, setType] = useState<string | null>(null);

    return (
        <DnDContext.Provider value={{type, setType}}>
            {children}
        </DnDContext.Provider>
    );
};

export const useDnD = (): DnDContextType => {
    const context = useContext(DnDContext);
    if (!context) {
        throw new Error('useDnD must be used within a DnDProvider');
    }
    return context;
};

export default DnDContext;
