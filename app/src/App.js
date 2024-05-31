import logo from './logo.svg';
import './App.css';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import DefaultLayout from './Layout/DefaultLayout';
function App() {
  return (

     <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
