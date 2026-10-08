import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Navbar, Inventory, Show, Add, Edit } from './components'


function App() {

  return (
    <BrowserRouter>
      <div className='app'>

        <Navbar />
        <Inventory />

        <Routes>
          <Route path='/' element={<Show />} />
          <Route path='/add' element={<Add />} />
          <Route path='/edit' element={<Edit />} />
          {/* <Route path='/delete' element={<Delete />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
