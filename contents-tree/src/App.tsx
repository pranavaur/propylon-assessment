import { useState, useEffect } from "react";

import TableOfContents from "./components/TableOfContents";
import MainContent from "./components/MainContent";

import { DataType } from "./types/tableOfContents";
import "./App.css";

function App() {
  const [data, setData] = useState<DataType[]>([]);
  const [selectedContentIndex, setSelectedContentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3004/data");
      const response = await res.json();
      setData(response?.content?.document);
    };

    fetchData();
  }, []);

  return (
    <main>
      <TableOfContents
        tableData={data}
        // selectedContentIndex={selectedContentIndex}
        setSelectedContentIndex={setSelectedContentIndex}
      />
      <MainContent selectedContent={data[selectedContentIndex]} />
    </main>
  );
}

export default App;
