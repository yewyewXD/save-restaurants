import React, { useEffect, useState, FC, useCallback } from "react";
import HoverEffect from "../../../globalUI/Site/HoverEffect";
import Scrollspy from "react-scrollspy";
import { ISectionProps } from "../template1.types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDropzone } from "react-dropzone";

// Edit component - start
const HeaderEdit: FC = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log({ acceptedFiles });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [stateQuotes, setStateQuotes] = useState<any>([
    { content: "About Us", id: "nav-about-section" },
    { content: "Menu", id: "nav-menu-section" },
    { content: "Contact", id: "nav-contact-section" },
  ]);

  const QuoteList = ({ quotes }: any) => {
    return quotes.map((quote: any, index: any) => (
      <Draggable draggableId={quote.id} index={index} key={quote.id}>
        {(provided) => (
          <div
            style={{
              width: "200px",
              border: "1px solid grey",
              marginBottom: "8px",
              backgroundColor: "lightblue",
              padding: "8px",
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {quote.content}
          </div>
        )}
      </Draggable>
    ));
  };

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
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <QuoteList quotes={stateQuotes} />
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
            elementName={"Navigation bar"}
            showTextInner={true}
          />
          <Scrollspy
            className="w-full grid grid-cols-5 text-center justify-center  h-16"
            items={navItems.map((navItem) => navItem.link)}
            currentClassName="underline"
          >
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
          </Scrollspy>
        </nav>
      </header>
    </div>
  );
};

export default HeaderSection;
