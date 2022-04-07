// import React, { useState, useEffect } from "react"
// import "../../styles/App.scss"
// import MenuIcon from "@mui/icons-material/Menu"
// import { useMotionValue, Reorder, useDragControls } from "framer-motion"

// interface Props {
//   item: string
// }

// export const Item = ({ item }: Props) => {
//   const y = useMotionValue(0)
//   const controls = useDragControls()

//   return (
//     <Reorder.Item
//       value={item}
//       id={item}
//       dragListener={false}
//       dragControls={controls}
//     >
//       <div className="discrete-card">
//         <div className="card-content">
//           <div className="title">
//             <h3>{item}</h3>
//           </div>
//           <div className="drag-icon">
//             <MenuIcon
//               className="card-icon"
//               onPointerDown={e => controls.start(e)}
//             />
//           </div>
//         </div>
//       </div>
//     </Reorder.Item>
//   )
// }
