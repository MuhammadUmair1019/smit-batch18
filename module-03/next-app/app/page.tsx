'use client'

import { useState } from "react";

export default function Home() {
    const [count, setCount] = useState(0)
  
  return (
    <div>

    <h1 className="bg-red-400">Hello, Next.JS</h1>
      <h3>{count}</h3>
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(count - 1)}>-</button>
      </div>
    </div>
  );
}
