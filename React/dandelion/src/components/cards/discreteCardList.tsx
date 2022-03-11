import "../../styles/App.scss"
import React, { useState, useEffect } from "react"
import { Reorder } from "framer-motion";
import { Item } from "./discreteModalCard";

const initialItems = ["Touches", "Humidity", "Temperature"];

export default function App() {
  const [items, setItems] = useState(initialItems);

  return (
    <Reorder.Group axis="y" onReorder={setItems} values={items} as="div">
      {items.map((item) => (
        <Item key={item} item={item} />
      ))}
    </Reorder.Group>
  );
}
