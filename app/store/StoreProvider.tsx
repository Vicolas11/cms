"use client";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { createStore, StoreType } from "./store";

const StoreProvider = ({children}: { children: ReactNode }) => {
    const storeRef = useRef<StoreType | null>(null);

    if (!storeRef.current) {
        storeRef.current = createStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider;