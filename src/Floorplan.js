import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import _debounce from "lodash/debounce";

function Floorplan({ rooms }) {
  const [roomsData, setRoomsData] = useState(rooms);

  // //console.log("roomsData = ", roomsData);

  const updateRoomsData = (mainRoom, dx, direction) => {
    // const mainRoomIndex = mainRoom.index;
    // const sideRoomIndex = 41;
    const roomsNewData = [...roomsData];
    console.log("old side room", roomsNewData[41]);
    roomsNewData[42] = mainRoom.data;
    // const dx = roomsNewData[42].vertices[0].x - roomsData[42].vertices[0].x;
    // const dy = roomsNewData[42].vertices[0].x - roomsData[42].vertices[0].x;
    console.log("x movement", dx);
    console.log("direction", direction);
    roomsNewData[41] = {
      ...roomsNewData[41],
      vertices: [
        {
          x: roomsNewData[41].vertices[0].x + dx,
          y: roomsNewData[41].vertices[0].y,
        },
        {
          x: roomsNewData[41].vertices[1].x,
          y: roomsNewData[41].vertices[1].y,
        },
        {
          x: roomsNewData[41].vertices[2].x,
          y: roomsNewData[41].vertices[2].y,
        },
        {
          x: roomsNewData[41].vertices[3].x + dx,
          y: roomsNewData[41].vertices[3].y,
        },
      ],
      // x: roomsNewData[41].vertices[0].x - dx,
      // },
    };

    console.log("sideRomData", roomsNewData[41]);
    // //console.log({
    //   i: roomsNewData[41],
    //   f: roomsData[41],
    // });
    // //console.log("initial = ", {
    //   mainRoom: roomsData[mainRoomIndex],
    //   // sideRoom: roomsData[sideRoomIndex],
    // });
    setRoomsData(roomsNewData);
  };

  return (
    <svg width="800" height="1000">
      {roomsData.map((room, index) => {
        return (
          <Polygon
            room={room}
            key={room.name}
            sideRoom={rooms[41]}
            updateRoomsData={updateRoomsData}
          />
        );
      })}
    </svg>
  );
}

const Polygon = ({ room, sideRoom, updateRoomsData }) => {
  const currCoord = useRef(room.vertices);

  const isMouseDown = useRef(false);
  const elemRef = useRef(null);
  const roomRef = useRef(null);

  function handleMouseMove(e, key) {
    console.log(isMouseDown.current);
    // console.log(e);
    // if(key==="room43") {

    // }
    if (!isMouseDown.current) return;

    if (key === "room43") {
      isMouseDown.current = true;
    }
    console.log(e);
    console.log(key);
    const dx = e.movementX;
    // console.log("dx return = ", dx);

    let newVertices = [...room.vertices];
    if (room?.name == "room43") {
      newVertices = newVertices.map((vertex, index) => {
        return {
          x: index === 2 || index === 3 ? dx + vertex.x : vertex.x,
          y: vertex.y,
        };
      });
    }

    const newRoom = {
      ...room,
      vertices: newVertices,
    };
    // console.log("newroom = ", room);
    updateRoomsData(
      {
        index: 42,
        data: newRoom,
      },
      dx,
      dx < 0 ? "left" : "right"
    );
  }

  // useEffect(() => {}, []);

  // const a = (e, room, sideRoom) => {
  //   //console.log("called");
  // };

  return (
    <polygon
      ref={roomRef}
      key={room.name}
      points={room.vertices
        ?.map((vertex) => `${vertex.x},${vertex.y}`)
        .join(" ")}
      fill="#fff"
      stroke="#000"
      draggable={true}
      strokeWidth={2}
      onMouseMove={(e) => handleMouseMove(e, room.name)}
      onMouseUp={(e) => {
        // console.log("mouse e", e);
        // handleMouseMove(e, room, sideRoom);
        // handleMouseUp(e);

        isMouseDown.current = false;
        // console.log("setting to false", isMouseDown.current);
      }}
      onDragEnd={(e) => alert("drag end")}
      onDragStart={(e) => alert("drag end")}
      onDrag={(e) => alert("drag end")}
      onMouseDown={(e) => {
        //console.log("mouse down");

        isMouseDown.current = true;
        // console.log("setting to true", isMouseDown.current);
      }}
      // onMouseUp={(e) => handleMouseUp(e, room)}
      // onMouseDown={(e) => handleMouseDown(e, room)}
    />
  );
};

export default Floorplan;
