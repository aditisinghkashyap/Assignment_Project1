import { Route, Routes } from "react-router-dom"
import routes  from "./routes"
import ScreenHome from "@/pages/ScreenHome"
import ScreenMessageBox from "@/pages/MessageBox/ScreenMessageBox"

const RouteManager = () => {
  return (
    <Routes>
       <Route path={routes.SCREEN_HOME} element ={<ScreenHome/>}/>
       <Route path={routes.SCREEN_MESSAGES} element={<ScreenMessageBox/>} />
    </Routes>
  )
}

export default RouteManager
