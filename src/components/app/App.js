import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/spinner';

const Page404 = lazy (() => import ('../pages/404'));
const MainPage = lazy (() => import ('../pages/MainPage'));
const ComicsPage = lazy (() => import ('../pages/ComicsPage'));
const SinglePage = lazy (() => import ('../pages/SinglePage'));
const SingleComicLayout = lazy (() => import ('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharLayout = lazy (() => import ('../pages/singleCharLayout/SingleCharLayout'))



const App = () => {
    
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route  path="/" element ={<MainPage/>}></Route>
                            <Route  path="/comics"  element ={<ComicsPage/>}></Route>

                            <Route  path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}></Route>

                            <Route  path="/characters/:id" element={<SinglePage Component={SingleCharLayout} dataType='character'/>}></Route>

                            <Route path='*' element={<Page404/>}></Route>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;