import React, { useRef, useState } from "react";
import { useEffect } from "react";

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
      {rooms.map(
        (room, index) => {
          return (
            <Polygon
              room={room}
              key={room.name}
              handleMouseMove={handleMouseMove}
            />
          );
        }

        // <polygon
        //   key={room.name}
        //   points={room.vertices
        //     .map((vertex) => `${vertex.x},${vertex.y}`)
        //     .join(" ")}
        //   fill="#fff"
        //   stroke="#000"
        //   strokeWidth={2}
        //   onMouseMove={(e) => handleMouseMove(e, room)}
        //   onMouseUp={(e) => handleMouseUp(e, room)}
        //   onMouseDown={(e) => handleMouseDown(e, room)}
        // />
      )}
    </svg>
  );
}

const Polygon = ({ room }) => {
  const [currRoom, setCurrRoom] = useState(room);
  const isMouseDown = useRef(null);
  const elemRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mouseup", () => {
      isMouseDown.current = false;
    });
  }, []);

  function handleMouseMove(e, room) {
    // return;
    console.log("mouse move");

    console.log(e);

    if (!isMouseDown.current) return;
    console.log(room);
    if (!room) {
      return;
    }
    console.log(e);
    const newX = e.movementX;
    const newY = e.movementY;

    const newVertices = room.vertices.map((vertex) => ({
      x: vertex.x + newX,
      y: vertex.y + newY,
    }));

    const newRoom = {
      ...room,
      vertices: newVertices,
    };
    console.log("saurav room = ", room);
    console.log("saurav newRoom = ", newRoom);
    // setDraggedRoom(newRoom);
    setCurrRoom(newRoom);
  }
  return (
    <polygon
      key={currRoom.name}
      points={currRoom.vertices
        ?.map((vertex) => `${vertex.x},${vertex.y}`)
        .join(" ")}
      fill="#fff"
      stroke="#000"
      draggable={true}
      strokeWidth={2}
      onMouseMove={(e) => handleMouseMove(e, currRoom)}
      onMouseUp={(e) => {
        console.log("mouse up");
        isMouseDown.current = false;
      }}
      onDragEnd={(e) => console.log("drag end")}
      onDragStart={(e) => console.log("drag end")}
      onDrag={(e) => console.log("drag end")}
      onMouseDown={(e) => {
        console.log("mouse down");

        isMouseDown.current = true;
      }}
      // onMouseUp={(e) => handleMouseUp(e, room)}
      // onMouseDown={(e) => handleMouseDown(e, room)}
    />
  );
};

export default Floorplan;
