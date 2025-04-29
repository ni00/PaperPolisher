import "./App.css";
import MainPage from "./page/main-page";

function App() {
  // const [greetMsg, setGreetMsg] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name: "jack" }));
  // }

  return (
    <div>
      <MainPage />
    </div>
  );
}

export default App;
