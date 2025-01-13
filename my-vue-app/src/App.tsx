import styles from './App.module.css'
import { SlidesList } from "./view/SlidesList.tsx";
import { TopPanel } from "./view/topPanel/TopPanel.tsx";
import { Workspace } from "./view/Workspace.tsx";
import { HistoryType } from './store/history.ts';
import { HistoryContext } from './hooks/historyContenx.ts';

type AppProps = {
    history: HistoryType,
}

function App({history}: AppProps) {
    return (
        <HistoryContext.Provider value={history}>
            <TopPanel></TopPanel>
            <div className={styles.container}>
                <SlidesList></SlidesList>
                <Workspace></Workspace>
            </div>
        </HistoryContext.Provider>
    )
}

export default App