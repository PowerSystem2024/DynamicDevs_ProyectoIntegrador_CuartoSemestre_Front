import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './components/common/Menu';
import Footer from './components/common/Footer';

function App() {

  return (
    <>
     <BrowserRouter>
     <Menu></Menu>
     <Routes>
      <Route></Route>
     </Routes>
     <Footer></Footer>
     </BrowserRouter>
    </>
  )
}

export default App
