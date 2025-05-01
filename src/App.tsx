import './App.css'
import MainPage from './page/main-page'
import { Toaster } from "@/components/ui/sonner"
import { UpdateNotification } from './components/paper-polisher/UpdateNotification'

const currentVersion = "2.0.1";

function App() {
  return (
    <>
      <MainPage />
      <Toaster richColors position="top-center" />
      <UpdateNotification currentVersion={currentVersion} />
    </>
  )
}

export default App
