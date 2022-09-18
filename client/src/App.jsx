import NavBar from './assets/components/NavBar'
import Balance from './assets/components/Balance'
import Home from './assets/components/Home'
import Logout from './assets/components/LogOut'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/authContext'
import PrivateRoutes from './assets/components/router/privateRoutes'
import PublicRoutes from './assets/components/router/publicRoutes'
function App() {

  return (
    <div>
      <AuthContextProvider>
      <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PublicRoutes />}>
              <Route index element={<Home />} />
            </Route>
            <Route path='/private' element={<PrivateRoutes />}>
              <Route index element={<Balance />} />
              <Route path='/private/logout' element={<Logout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>

    </div>

  )
}

export default App
