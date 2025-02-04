import { createContext } from "react";
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Main from "../Main/Main"
import { useState } from "react";

interface PageProps {
    page: number;
    setPage: (n: number) => void;
}

export const PageContext = createContext<PageProps>({ page: 0, setPage: () => { } });

const Home: React.FC = () => {
    let [page, setPage] = useState(0);
    return (
        <PageContext.Provider value={{ page, setPage }}>
            <Header />
            <Main />
            <Footer />
        </PageContext.Provider>
    )
}

export default Home