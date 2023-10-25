import { useState, useEffect } from "react";

// import TableOfContents from "./components/TableOfContents";
import TableOfContents from "./components/TOC";
import MainContent from "./components/MainContent";

import { DataType } from "./types/tableOfContents";

import "./components/TableOfContents.css";
import "./components/MainContent.css";

import { buildNestedJSON } from "./helper/buildTree";
import "./App.css";

const App = () => {
  const [data, setData] = useState<any>([]);
  const [nestedData, setNestedData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3004/data");
      const response = await res.json();
      setData(response?.content?.document);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const returnedData = buildNestedJSON(data);
      setNestedData(returnedData);
    }
  }, [data]);

  const Entry = ({ id, name, content, children, level }: any) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    // const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
      <div
        style={{
          display: "flex",
        }}
      >
        {level < 3 && (
          <span className="material-symbols-outlined">
            {isExpanded ? "expand_more" : "chevron_right"}
          </span>
        )}
        <p
          onClick={() => {
            setIsExpanded(!isExpanded);
            // setSelectedId(id);
          }}
        >
          {name}
        </p>
        {isExpanded && (
          <div
            style={{
              // paddingLeft: `${level}%`,
              marginTop: `${level * 5}%`,
            }}
          >
            {children?.map((e: any) => (
              <Entry {...e} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderContentView = () => {
    return (
      <div className="main-content">
        <h2>Content View</h2>
        {/* {selectedComponent && <h3>{selectedComponent.name}</h3>} */}
        {/* Render content of the selected component here */}
      </div>
    );
  };

  return (
    <main className="app">
      <div className="table-of-contents">
        {nestedData.map((d: any) => (
          <Entry {...d} />
        ))}
      </div>
      {renderContentView()}
    </main>
  );
};

export default App;
