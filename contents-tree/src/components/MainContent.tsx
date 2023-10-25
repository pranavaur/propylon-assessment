import { DataType } from "../types/tableOfContents";
import "./MainContent.css";

type MainContentProps = {
  selectedContent: DataType[];
};
const MainContent = ({ selectedContent }: MainContentProps) => {
  // console.log("selectedContent ");
  // console.log(selectedContent);

  return (
    <section className="main-content">
      {selectedContent.map((d) => {
        return (
          <div className="main-content__title">
            <h3>{d?.name}</h3>
            <p>{d?.content}</p>
          </div>
        );
      })}
    </section>
  );
};
export default MainContent;
