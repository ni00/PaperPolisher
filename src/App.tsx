import './App.css'
import MainPage from './page/main-page'
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <>
      <MainPage />
      <Toaster richColors position="top-center" />
    </>
  )
}

export default App
