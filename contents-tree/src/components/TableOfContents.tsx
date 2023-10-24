import { useState } from "react";

import { DataType } from "../types/tableOfContents";

import "./TableOfContents.css";

type TOCProps = {
  setSelectedContentIndex?: (id: number) => void;
  tableData: DataType[];
};

// const TableRenderer = (chapter: DataType, key: number = 0) => {
//   return (
//     <p key={key}>
//       {chapter.name}
//       {chapter.parent_id !== "" && (
//         <TableRenderer
//           chapter={chapter.filter((c) => c.parent_id === chapter.parent_id)}
//         />
//       )}
//     </p>
//   );
// };

function TableOfContents({ tableData }: TOCProps) {
  const [selectedLevel1, setSelectedLevel1] = useState<string | null>(null);
  const [showLevel2, setShowLevel2] = useState<boolean>(false);

  const handleLevel1Click = (id: string) => {
    setSelectedLevel1(id);
    if (showLevel2) {
      setShowLevel2(false);
      setSelectedLevel1(null);
    } else {
      setShowLevel2(true);
    }
  };

  return (
    <section className="table-of-contents">
      <div style={{ listStyle: "none" }}>
        {tableData.map((item) => {
          if (item.level === 1) {
            return (
              <div>
                <span className="material-symbols-outlined">{`${
                  showLevel2 && selectedLevel1 === item.id
                    ? "expand_more"
                    : "chevron_right"
                }`}</span>
                <span
                  key={item.id}
                  onClick={() => handleLevel1Click(item.id)}
                  style={{ paddingLeft: `${item.level}em` }}
                >
                  {item.name}
                </span>
              </div>
            );
          }
          return null;
        })}
        {showLevel2 && (
          <div style={{ listStyle: "none" }}>
            {tableData.map((item) => {
              if (item.level === 2 && item.parent_id === selectedLevel1) {
                return (
                  <div>
                    <span className="material-symbols-outlined">
                      {`${showLevel2 ? "expand_more" : "chevron_right"}`}
                    </span>
                    <span
                      key={item.id}
                      style={{ paddingLeft: `${item.level}em` }}
                    >
                      {item.name}
                    </span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default TableOfContents;
