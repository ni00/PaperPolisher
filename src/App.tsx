import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "./components/ui/button";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name: "jack" }));
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100">
      <h1>Welcome to Tauri + React + Tailwind + Shadui!</h1>
      <Button onClick={greet}>Greet</Button>
      <p>{greetMsg}</p>
      <p className="mt-4 text-gray-600">This is a simple Tauri application.</p>
    </div>
  );
}

export default App;
