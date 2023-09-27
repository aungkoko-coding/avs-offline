import { Box, Grid, Slider, useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useState, useEffect, useMemo } from "react";
import { useRef } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { useSwipeable } from "react-swipeable";

export default function GridSlider({ children, speed, renderNavButtons }) {
  const containerRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(undefined);
  const [childWidth, setChildWidth] = useState(undefined);
  const [totalIndexesLength, setTotalIndexesLength] = useState(0);
  const [totalChildren, setTotalChildren] = useState(0);
  // const [totalIndexes, setTotalIndexes] = useState([]);
  // const [touchPosition, setTouchPosition] = useState(0);
  // const [firstTouchPosition, setFirstTouchPosition] = useState(0);
  // const [lastTouchPosition, setLastTouchPosition] = useState(0);
  const [paused, setPaused] = useState(false);
  let { itemsPerPage: totalItemsPerPage } = useContext(AppContext);

  const theme = useTheme();
  const belowSm = useMediaQuery(theme.breakpoints.down("sm"));

  // if (!itemsPerPage) {
  //     // getting first row since itemsPerPage was for 3 rows
  //     for (let i = 0; i < totalItemsPerPage; i++) {
  //         if (i * 3 === totalItemsPerPage) {
  //             setItemsPerPage(i);
  //         }
  //     }
  // }

  useEffect(() => {
    for (let i = 0; i < totalItemsPerPage; i++) {
      // for one row
      // 4 * 3 = 12, so we need to set 4 items per page or row
      if (i * 3 === totalItemsPerPage) {
        setItemsPerPage(i);
        break;
      }
    }
  }, [totalItemsPerPage]);

  // useEffect(() => {

  //     if(itemsPerPage && containerRef.current && containerRef.current.children && childWidth) {
  //         const container = containerRef.current;
  //         const totalChildren = container.children.length;
  //         const totalIndexesLength = totalChildren - itemsPerPage;
  //         setTotalIndexes(() => {
  //             return new Array(totalIndexesLength)
  //                         .fill(undefined)
  //                         .map((v, i) => -(i * childWidth));
  //         });
  //     }

  // }, [itemsPerPage, childWidth]);

  // useEffect(() => {

  //     if(totalIndexes.length > 0) {
  //         setFirstTouchPosition(totalIndexes[0]);
  //         setLastTouchPosition(totalIndexes[totalIndexes.length - 2]);
  //     }

  // }, [totalIndexes]);

  useEffect(() => {
    if (
      containerRef.current &&
      containerRef.current.children &&
      containerRef.current.children.length > 0
    ) {
      setChildWidth(
        containerRef.current.children[0].getBoundingClientRect().width
      );
    }
  });

  const updateIndex = (newIndex) => {
    const container = containerRef.current;
    const totalChildren = container.children.length;
    const totalIndexesLength = totalChildren - itemsPerPage; // get the total index length of per page (12 - 4 = 8)
    setTotalChildren(totalChildren);
    setTotalIndexesLength(totalIndexesLength);

    if (newIndex > totalIndexesLength) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = totalIndexesLength;
    }

    // containerRef.current.style.transform = `translateX(${totalIndexes[newIndex]}px)`;
    setActiveIndex(newIndex);
  };

  const next = () => {
    updateIndex(activeIndex + 1);
  };

  const prev = () => {
    updateIndex(activeIndex - 1);
  };

  const pause = (e) => {
    e.stopPropagation();
    if (e.type !== "click") {
      setPaused(true);
    }
  };

  const resume = (e) => {
    setPaused(false);
  };

  const togglePause = (e) => {
    setPaused((paused) => !paused);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, speed);

    return () => {
      clearInterval(interval);
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      updateIndex(activeIndex + 1);
    },
    onSwipedRight: () => {
      updateIndex(activeIndex - 1);
    },

    // Shit codes
    // onSwiping: (e) => {
    //     setPaused(true);
    //     const container = containerRef.current;
    //     const computedTranslatePosition =  window.getComputedStyle(container).transform.split(',')[4];
    //     const prevPosition = parseFloat(computedTranslatePosition);
    //     let newPosition = 0;
    //     //console.log(e);
    //     if(e.dir === 'Left'){
    //         //newPosition =( prevPosition - e.absX) * activeIndex;
    //         newPosition = prevPosition - e.absX;

    //     }else if(e.dir === 'Right') {
    //         //newPosition =( prevPosition + e.absX) * activeIndex;
    //         newPosition = prevPosition + e.absX;

    //     }

    //     console.log(newPosition);
    //     if(e.deltaX > (childWidth * 2)) {
    //         updateIndex(activeIndex + 3);
    //         return;
    //     }else if(e.deltaX < -(childWidth * 2)) {
    //         updateIndex(activeIndex - 3);
    //         return;
    //     }

    //     container.style.transform = `translateX(${(newPosition)}px)`;
    //     setTouchPosition(newPosition);

    // },
    // onTouchEndOrOnMouseUp: () => {
    //     let newIndex = 0;
    //     const container = containerRef.current;
    //     const computedTranslatePosition =  window.getComputedStyle(container).transform.split(',')[4];
    //     const prevPosition = parseFloat(computedTranslatePosition);
    //     if(totalIndexes.includes(prevPosition)) {
    //         newIndex = totalIndexes.findIndex(v => v === prevPosition);
    //     }else {
    //         totalIndexes.forEach((v, index) => {
    //             if(prevPosition < v) {
    //                 newIndex = index;
    //             }
    //         })
    //     }
    //     // containerRef.current.style.transform =  `translateX(${totalIndexes[newIndex]}px)`;
    //     setActiveIndex(newIndex);
    //     setPaused(false);
    // }
  });

  return (
    <Box mx={{ xs: 0, sm: 3, md: 5, lg: 7 }}>
      {typeof renderNavButtons === "function" &&
        renderNavButtons(next, prev, paused, togglePause)}
      <Box
        {...handlers}
        position="relative"
        onMouseEnter={pause}
        onMouseLeave={resume}
        sx={{
          overflowX: "hidden",
        }}
      >
        <Grid
          id="grid-slider"
          ref={containerRef}
          spacing={{ xs: 0.5, sm: 1 }}
          container
          columns={{ xs: 16, sm: 20, md: 18, lg: 16 }}
          flexWrap="nowrap"
          whiteSpace="nowrap"
          sx={{
            transform: `translateX(-${activeIndex * childWidth}px)`,
            // transform: `translateX(-${ activeIndex * 100 / itemsPerPage}%)`,
            transition: "transform 0.6s ease",
          }}
        >
          {children}
        </Grid>
      </Box>

      {totalIndexesLength > 0 && totalChildren > totalIndexesLength && (
        <Box mx="30px" mt={1}>
          <Slider
            size={belowSm ? "small" : "medium"}
            marks
            value={activeIndex}
            min={0}
            max={totalIndexesLength}
            onChange={(event, newValue) => setActiveIndex(newValue)}
            valueLabelDisplay="auto"
            sx={{
              "& .MuiSlider-mark": {
                backgroundColor: "#ff4081",
                height: belowSm ? "5px" : "10px",
                width: belowSm ? "5px" : "10px",
              },
              "& .MuiSlider-rail": {
                color: "#f990d0",
              },
              "& .MuiSlider-track": {
                color: "#486b87",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}

// useEffect(() => {
//     const container = containerRef.current;
//     let interval;
//     let timeout;
//     let scrollLen = 0;

//     if (container) {
//         const childrenOfContainer = container.children;
//         if (childrenOfContainer.length > 0) {
//             interval = setInterval(scroll, speed);
//         }

//         container.addEventListener('mouseover', (e) => {
//             clearTimeout(timeout);
//             clearInterval(interval);
//             scrollLen = container.scrollLeft;
//         });

//         container.addEventListener('mouseleave', () => {
//             scrollLen = container.scrollLeft;
//             timeout = setTimeout(() => {
//                 interval = setInterval(scroll, speed);
//             }, 4000);
//         })

//         container.addEventListener('pointerdown', (e) => {
//             clearTimeout(timeout);
//             clearInterval(interval);
//             scrollLen = container.scrollLeft;
//         });

//         container.addEventListener('pointerleave', () => {
//             scrollLen = container.scrollLeft;
//             timeout = setTimeout(() => {
//                 interval = setInterval(scroll, speed);
//             }, 4000);
//         })

//         function scroll() {
//             if (scrollLen >= container.scrollWidth) {
//                 clearInterval(interval);
//                 scrollLen = 0;
//                 console.log('reset')
//                 timeout = setTimeout(() => {
//                     interval = setInterval(scroll, speed);
//                 }, 4000);
//             } else {
//                 container.scrollLeft = scrollLen;
//                 scrollLen += 300;
//             }
//         }
//     }

//     return () => {
//         clearInterval(interval);
//         clearTimeout(timeout);
//     }
// }, [children]);
