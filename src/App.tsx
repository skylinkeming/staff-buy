import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="tailwind-demo-marker" className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gray-900 text-white">
      <div className="flex items-center gap-4">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight">Vite + React</h1>

      <div className="card">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition"
        >
          count is {count}
        </button>
        <p className="mt-4 text-sm text-gray-300">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs text-sm text-gray-400">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
