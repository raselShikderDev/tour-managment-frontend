
import { Outlet } from 'react-router'
import './App.css'
import CommonLayout from './components/layout/commonLayout'

function App() {

  return (
    <>
      <CommonLayout>
        <Outlet/>
      </CommonLayout>
    </>
  )
}

export default App
