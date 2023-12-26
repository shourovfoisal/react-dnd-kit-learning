// import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./components";

function App() {
  const [languages, setLanguages] = useState<string[]>([
    "Python",
    "Ruby",
    "Javascript",
  ]);

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;

    const activeId = active?.id as string;
    const overId = over?.id as string;

    if (active?.id !== over?.id) {
      setLanguages((items) => {
        const activeIndex = items?.indexOf(activeId);
        const overIndex = items?.indexOf(overId);

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Container
        className="p-5 text-center"
        style={{
          width: "50%",
          height: "100vh",
        }}
      >
        <h3>The best programming languages!</h3>
        <div style={{ width: "50%" }} className="mx-auto mt-5">
          <SortableContext
            items={languages}
            strategy={verticalListSortingStrategy}
          >
            {languages?.map((language) => (
              <SortableItem key={language} id={language} />
            ))}
          </SortableContext>
        </div>
      </Container>
    </DndContext>
  );
}

export default App;
