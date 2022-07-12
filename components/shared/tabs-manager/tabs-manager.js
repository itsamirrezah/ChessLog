import React, { useState } from "react";
import TabContentsList from "./tab-contents-list";
import TabsList from "./tabs-list";

export default function TabsManager(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const children = React.Children.toArray(props.children);
  const tabs = children[0];
  const panels = children[1];

  if (
    tabs.type.name !== TabsList.name ||
    panels.type.name !== TabContentsList.name ||
    children.length > 2 ||
    tabs.props.children.length !== panels.props.children.length
  )
    throw new Error("must have one TabsList and TabContentsList");

  function onTabSelected(index) {
    setSelectedIndex(index);
  }

  return (
    <div>
      <tabs.type
        {...tabs.props}
        onClick={onTabSelected}
        selectedIndex={selectedIndex}
      />
      <panels.type>{panels.props.children[selectedIndex]}</panels.type>
    </div>
  );
}
