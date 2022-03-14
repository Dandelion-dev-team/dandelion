import "../../styles/App.scss"
import React, { useState, useEffect } from "react"
import { Reorder } from "framer-motion";
import { Item } from "./discreteModalCard";

export default function App(props) {
  const [items, setItems] = useState(props.levelList);

  useEffect(() => {
    // Update the document title using the browser API
    setItems(props.levelList);
  });

  return (
    <Reorder.Group axis="y" onReorder={props.reorderLevels} values={items} as="div" >
      {items ? items.map((item) => (
        <Item key={item} item={item}/>
      )) : null}
    </Reorder.Group>
  );
}
