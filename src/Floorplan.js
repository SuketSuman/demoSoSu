import React, { useRef, useState } from "react";
import { useEffect } from "react";

function Floorplan({ rooms }) {
  return (
    <svg width="800" height="1000">
      {rooms.map((room, index) => {
        return <Polygon room={room} key={room.name} sidRoom={rooms[41]} />;
      })}
    </svg>
  );
}

const Polygon = ({ room, sidRoom }) => {
  const [currRoom, setCurrRoom] = useState(room);
  const [sideRoom, setSideRoom] = useState(sidRoom);

  const isMouseDown = useRef(null);
  const elemRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mouseup", () => {
      isMouseDown.current = false;
    });
  }, []);

  function handleMouseMove(e, room, sideRoom) {
    // return;
    // console.log("mouse move");

    if (!isMouseDown.current) return;
    // console.log(room);
    // if (!room) {
    //   return;
    // }
    console.log("olde side Room = ", sideRoom);

    const newX = e.movementX;
    const newY = e.movementY;
    console.log("x movement", newX);
    let newVertices = room.vertices;
    let newSideRoomVertices = sideRoom.vertices;

    if (room?.name == "room43") {
      newVertices = room.vertices.map((vertex, index) => {
        return {
          x: index === 2 || index === 3 ? newX + vertex.x : vertex.x,
          y: vertex.y,
        };
      });
      newSideRoomVertices = sideRoom.vertices.map((vertex, index) => {
        return {
          x: index === 1 || index === 2 ? newX + vertex.x : vertex.x,
          y: vertex.y,
        };
      });
    }

    const newRoom = {
      ...room,
      vertices: newVertices,
    };
    const newSideRoom = {
      ...sideRoom,
      vertices: newSideRoomVertices,
    };
    // console.log("room = ", room);
    // console.log("newRoom = ", newRoom);
    // setDraggedRoom(newRoom);
    console.log("sideRoom =", newSideRoom);
    setCurrRoom(newRoom);
    // setCurrRoom(newSideRoom);
    setSideRoom(newSideRoom);
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
      onMouseMove={(e) => handleMouseMove(e, currRoom, sideRoom)}
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
