import { DataType } from "../types/tableOfContents";

import "./TableOfContents.css";

type TOCProps = {
  setSelectedContentIndex: (id: number) => void;
  tableData: DataType[];
};

const TableOfContents = ({ setSelectedContentIndex, tableData }: TOCProps) => {
  return (
    <section className="table-of-contents">
      <div>
        {tableData.map(({ name }: DataType, index) => (
          <p key={index} onClick={() => setSelectedContentIndex(index)}>
            {name}
          </p>
        ))}
      </div>
    </section>
  );
};

export default TableOfContents;
