import AuthRoutes from "./routes/AuthRoutes"
import { ToastContainer } from "react-toastify"
// App is the main root component
function App() {
  return (
    <>
      {/* All authentication-related routes will be handled inside AuthRoutes */}
      <AuthRoutes />
       <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
