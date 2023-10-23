import { DataType } from "../types/tableOfContents";
import "./MainContent.css";

type MainContentProps = {
  selectedContent: DataType;
};
const MainContent = ({
  selectedContent: { name, content },
}: MainContentProps) => {
  return (
    <section className="main-content">
      <div className="main-content__title">
        <h3>{name}</h3>
        <p>{content}</p>
      </div>
    </section>
  );
};
export default MainContent;
