import React, { useState } from "react";

function Floorplan({ rooms }) {
  const [draggedRoom, setDraggedRoom] = useState(null);

  function handleMouseDown(e, room) {
    console.log(room);
    setDraggedRoom(room);
  }

  function handleMouseMove(e, room) {
    console.log(room);
    if (!room) {
      return;
    }
    console.log(e);
    const newX = e.pageX;
    const newY = e.pageY;

    const newVertices = room.vertices.map((vertex) => ({
      x: vertex.x + newX,
      y: vertex.y + newY,
    }));

    const newRoom = {
      ...room,
      vertices: newVertices,
    };

    setDraggedRoom(newRoom);
  }

  function handleMouseUp() {
    setDraggedRoom(null);
  }

  return (
    <svg width="800" height="1000">
      {rooms.map((room) => (
        <polygon
          key={room.name}
          points={room.vertices
            .map((vertex) => `${vertex.x},${vertex.y}`)
            .join(" ")}
          fill="#fff"
          stroke="#000"
          strokeWidth={2}
          onMouseMove={(e) => handleMouseMove(e, room)}
          onMouseUp={(e) => handleMouseUp(e, room)}
          onMouseDown={(e) => handleMouseDown(e, room)}
        />
      ))}
    </svg>
  );
}

export default Floorplan;
