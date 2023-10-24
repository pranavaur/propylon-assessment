import { DataType } from "../types/tableOfContents";
import "./MainContent.css";

type MainContentProps = {
  selectedContent: DataType;
};
const MainContent = ({ selectedContent }: MainContentProps) => {
  console.log("selectedContent ");
  console.log(selectedContent);

  return (
    <section className="main-content">
      <div className="main-content__title">
        <h3>{selectedContent?.name}</h3>
        <p>{selectedContent?.content}</p>
      </div>
    </section>
  );
};
export default MainContent;
