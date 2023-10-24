import { useState } from "react";

function TableItemRenderer({
  item,
  data,
  level,
  maxLevels,
  setSelectedId,
}: any) {
  const [showChildren, setShowChildren] = useState(false);

  const toggleChildren = () => {
    setSelectedId(item.id);
    setShowChildren(!showChildren);
  };

  const childItems = data.filter((child: any) => child.parent_id === item.id);
  const hasChildren = childItems.length > 0;
  const shouldRenderChildren = level < maxLevels && hasChildren;

  return (
    <li key={item.id} style={{ listStyle: "none", paddingLeft: `${level}rem` }}>
      <div onClick={toggleChildren}>
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
  );
}

function TableOfContents({ data, setSelectedId }: any) {
  const topLevelItems = data.filter((item: any) => item.level === 1);

  return (
    <div>
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
