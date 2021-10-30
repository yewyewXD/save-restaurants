import React, { useEffect, useState, FC } from "react";
import HoverEffect from "../../../globalUI/Site/HoverEffect";
import { ISectionProps } from "../template1.types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ImageUploader from "../../../globalUI/ImageUploader";

// Edit component - start
const HeaderEdit: FC = () => {
  const [stateQuotes, setStateQuotes] = useState<any>([
    { content: "About Us", id: "nav-about-section" },
    { content: "Menu", id: "nav-menu-section" },
    { content: "Contact", id: "nav-contact-section" },
  ]);

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result: any): void {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      stateQuotes,
      result.source.index,
      result.destination.index
    );

    setStateQuotes(quotes);
  }

  return (
    <>
      <h1 className="mb-6 text-2xl">Header Section</h1>

      <div className="mb-8">
        <div className="mb-2 font-bold">Logo</div>
        <ImageUploader />
      </div>

      <div className="mb-2 font-bold">Navigation</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {stateQuotes.map((quote: any, index: number) => (
                <Draggable draggableId={quote.id} index={index} key={quote.id}>
                  {(provided, snapshot) => (
                    <div
                      className={`flex justify-between items-center my-2 bg-gray-${
                        snapshot.isDragging ? "400" : "200"
                      } rounded px-3`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <input
                        type="text"
                        value={quote.content}
                        className="appearance-none py-2 leading-tight focus:shadow-outline w-5/6 outline-none bg-transparent"
                      />

                      <i className="icon-inno icon-inno_move-vertical" />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
// Edit component - end

const HeaderSection: FC<ISectionProps> = ({ handleOpenMenu }) => {
  const [navBg, setNavBg] = useState("bg-white");
  useEffect(() => {
    function scrollListener(): void {
      const navBgClass = window.scrollY < 1 ? "bg-white" : "bg-primary z-30";
      setNavBg(navBgClass);
    }

    document.addEventListener("scroll", scrollListener);
    return () => {
      document.removeEventListener("scroll", scrollListener);
    };
  }, [navBg]);

  const navItems = [
    { name: "logo", link: "home-section", isLogo: true },
    { name: "About Us", link: "about-section" },
    { name: "Menu", link: "menu-section" },
    { name: "Contact", link: "contact-section" },
  ];

  return (
    <div className="relative h-16">
      <header
        className={`fixed flex justify-center items-center h-16 w-full top-0 ${navBg}`}
      >
        <nav className="borderOnHover w-full">
          <HoverEffect
            onClick={() => {
              handleOpenMenu(<HeaderEdit />);
            }}
            elementName={"Header Section"}
            showTextInner={true}
          />
          <div className="w-full grid grid-cols-5 text-center justify-center h-16">
            {navItems.map((navItem) => (
              <li
                key={`navItem-${navItem.link}`}
                className="flex justify-center items-center h-16"
              >
                <a className="py-6" href={`#${navItem.link}`}>
                  {navItem.isLogo ? (
                    <img
                      src="/images/netlify.png"
                      alt=""
                      style={{ maxWidth: "40px" }}
                    />
                  ) : (
                    navItem.name
                  )}
                </a>
              </li>
            ))}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderSection;
