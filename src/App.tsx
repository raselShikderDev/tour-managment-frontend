
import { Outlet } from 'react-router'
import './App.css'
import CommonLayout from './components/layout/commonLayout'
import { adminSidebarItems } from './routes/adminSidebarItem';
import { generateRoutes } from './utils/generateRoute';

function App() {
console.log(generateRoutes(adminSidebarItems));

  return (
    <>
      <CommonLayout>
        <Outlet/>
      </CommonLayout>
    </>
  )
}

export default App
