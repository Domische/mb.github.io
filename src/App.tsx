import { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import { Provider } from 'react-redux';
import store from './store';

interface PageProps {
  page: number;
  setPage: (n: number) => void;
}

export const PageContext = createContext<PageProps>({ page: 0, setPage: () => { } });

function App() {
  let [page, setPage] = useState(0);
  return (
    <Provider store={store}>
      <div className="wrapper">
        <PageContext.Provider value={{ page, setPage }}>
          <Header />
          <Main />
          <Footer />
        </PageContext.Provider>
      </div>
    </Provider>
  );
}

export default App;


