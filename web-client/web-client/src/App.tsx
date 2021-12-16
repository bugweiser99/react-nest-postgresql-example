import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchText = async () => {
      const response = await fetch("/api/app");
      setText(await response.text());
    };

    fetchText();
  }, []);

  return <div className="text-blue-500">{text}</div>;
}

export default App;
