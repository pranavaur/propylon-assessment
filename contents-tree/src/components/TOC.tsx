import { useState } from "react";

import "./TableOfContents.css";

function TableItemRenderer({
  item,
  data,
  level,
  maxLevels,
  setSelectedId,
}: any) {
  // console.log("data");
  // console.log(data);

  const [showChildren, setShowChildren] = useState(false);

  const childItems = data.filter((child: any) => child.parent_id === item.id);
  // console.log("childItems");
  // console.log(childItems);

  const hasChildren = childItems.length > 0;

  const shouldRenderChildren = level < maxLevels && hasChildren;

  console.log(
    `Level: ${level}, hasChildren: ${hasChildren}, showChildren: ${showChildren}`
  );
  const toggleChildren = (id: string) => {
    setSelectedId(id);
    // console.log("id " + id);
    // console.log("item.id " + item.id);
    // console.log(id === item.id);

    if (id === item.id && shouldRenderChildren) {
      setShowChildren(true);
    } else {
      setShowChildren(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        // alignItems: "center",
        paddingLeft: `${level * 5}px`,
        // gap: "0.5rem",
      }}
    >
      {level < 3 && (
        <span className="material-symbols-outlined">{`${
          showChildren ? "expand_more" : "chevron_right"
        }`}</span>
      )}
      <li key={item.id} style={{ listStyle: "none" }}>
        <div onClick={() => toggleChildren(item.id)}>
          {item.name}
          {showChildren && shouldRenderChildren && (
            <ul>
              {childItems.map((child: any) => (
                <TableItemRenderer
                  key={child.id}
                  item={child}
                  data={data}
                  level={level + 1}
                  maxLevels={maxLevels}
                />
              ))}
            </ul>
          )}
        </div>
      </li>
    </div>
  );
}

function TableOfContents({ data, setSelectedId }: any) {
  const topLevelItems = data.filter((item: any) => item.level === 1);

  return (
    <div className="table-of-contents">
      <ul>
        {topLevelItems.map((item: any) => (
          <TableItemRenderer
            key={item.id}
            item={item}
            data={data}
            level={1}
            maxLevels={3}
            setSelectedId={setSelectedId}
          />
        ))}
      </ul>
    </div>
  );
}

export default TableOfContents;
