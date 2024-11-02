import React, { useEffect, useState, useRef, memo } from "react";
//import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { Draggable } from '@fullcalendar/interaction';
import "./App.css";
import Calendar from "./Calendar";
//import Sidebar from "./Sidebar";

const ExternalEvent = memo(({ event }) => {
  let elRef = useRef(null);

  useEffect(() => {
    let draggable = new Draggable(elRef.current, {
      eventData: function () {
        return { ...event, create: true };
      }
    });

    // a cleanup function
    return () => draggable.destroy();
  });

  return (
    <div
      ref={elRef}
      className="fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2"
      title={event.title}
      style={{
        backgroundColor: event.color,
        borderColor: event.color,
        cursor: "pointer"
      }}
    >
      <div className="fc-event-main">
        <div>
          <strong>{event.title}</strong>
        </div>
      </div>
    </div>
  );
});

function App() {
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");

    const [state, setState] = useState({
        weekendsVisible: true,
        externalEvents: [
          { title: "Art 1", color: "#0097a7", id: 34432 },
          { title: "Art 2", color: "#f44336", id: 323232 },
          { title: "Art 3", color: "#f57f17", id: 1111 },
          { title: "Art 4", color: "#90a4ae", id: 432432 }
        ],
        calendarEvents: [
          {
            id: 1,
            title: "All-day event",
            color: "#388e3c",
            start: "2020-12-12",
            end: "2020-12-12"
          },
          {
            id: 2,
            title: "Timed event",
            color: "#0097a7",
            start: "2020-12-07",
            end: "2020-12-10"
          }
        ]
      });

      // add external events
      const addEvent = () => {
        let newEvent = {
          id: 3433,
          title: "Timed event",
          color: "#333333",
          start: "2020-12-31",
          end: "2020-12-31",
          custom: "custom stuff"
        };

        setState((state) => {
          return {
            ...state,
            externalEvents: state.externalEvents.concat(newEvent)
          };
        });
      };

      // handle event receive
      const handleEventReceive = (eventInfo) => {
        const newEvent = {
          id: eventInfo.draggedEl.getAttribute("data-id"),
          title: eventInfo.draggedEl.getAttribute("title"),
          color: eventInfo.draggedEl.getAttribute("data-color"),
          start: eventInfo.date,
          end: eventInfo.date,
          custom: eventInfo.draggedEl.getAttribute("data-custom")
        };

        setState((state) => {
          return {
            ...state,
            calendarEvents: state.calendarEvents.concat(newEvent)
          };
        });
      };

    async function greet() {
        setGreetMsg(await invoke("greet", { name }));
    }

    return (
    <main className="container" style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ float: "left", width: "25%", margin: "40px" }}>
            <div style={{ margin: "0 0 20px" }}>
              <input
                type="submit"
                name="name"
                onClick={addEvent}
                value="add external event"
              />
            </div>
            <div id="external-events">
              {state.externalEvents.map((event) => (
                <ExternalEvent key={event.id} event={event} />
              ))}
            </div>
        </div>
        <div style={{ float: "left", width: "75%" }}>
            <Calendar eventReceive={handleEventReceive}/>
        </div>
    </main>
    );
}

export default App;
