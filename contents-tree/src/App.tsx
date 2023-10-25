import { useState, useEffect } from "react";

// import TableOfContents from "./components/TableOfContents";
import TableOfContents from "./components/TOC";
import MainContent from "./components/MainContent";

import { DataType } from "./types/tableOfContents";
import "./App.css";

function App() {
  const [data, setData] = useState<DataType[]>([]);
  const [selectedContentIndex, setSelectedContentIndex] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dataToShow, setDataToShow] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3004/data");
      const response = await res.json();
      setData(response?.content?.document);
      setSelectedId(response?.content?.document[0]?.id);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedId) {
      console.log("selectedId " + selectedId);

      const selectedData = data.filter((d) => d.parent_id === selectedId);
      setDataToShow(selectedData);
    }
  }, [selectedId]);

  return (
    <main>
      {/* <TableOfContents
        tableData={data}
        // selectedContentIndex={selectedContentIndex}
        setSelectedContentIndex={setSelectedContentIndex}
      /> */}
      <TableOfContents data={data} setSelectedId={setSelectedId} />
      <MainContent selectedContent={dataToShow} />
    </main>
  );
}

export default App;
