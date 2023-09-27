import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "../context/AppContextProvider";
import { client } from "../lib/client";
import { queryPopular } from "../lib/queries";
import PopularItem from "../components/item/PopularItem";
import GridItem from "../components/util/GridItem";
import PopularItemSkeleton from "../components/skeleton/ItemSkeleton";
import { Box, IconButton, Portal } from "@mui/material";
import GridSlider from "./util/GridSlider";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function Popular({ containerForNavButton }) {
  const [popularItems, setPopularItems] = useState(undefined);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [itemWidth, setItemWidth] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const { openNetworkError, itemsPerPage } = useContext(AppContext);
  const containerRef = useRef();

  useEffect(() => {
    if (containerWidth) {
      for (let i = 0; i < itemsPerPage; i++) {
        if (i * 3 === itemsPerPage) {
          setSlidesToShow(i);
          setItemWidth((containerWidth / 100) * (100 / i));
          break;
        }
      }
    }
  }, []);

  // useEffect(() => {
  //     if(containerRef && containerRef.current) {
  //         for (let i = 0; i < itemsPerPage; i++) {
  //             if (i * 3 === itemsPerPage) {
  //                 const containerWidth = containerRef.current.clientWidth;
  //                 setSlidesToShow(i);
  //                 setItemWidth((containerWidth / 100) * (100 / i));
  //                 setContainerWidth(containerWidth);
  //                 break;
  //             }
  //         }
  //     }
  // },[itemsPerPage]);

  useEffect(() => {
    if (!popularItems) {
      client
        .fetch(queryPopular())
        .then((res) => setPopularItems(res))
        .catch(openNetworkError);
    }
  }, [popularItems]);

  const popularItemSkeletons = useMemo(
    () =>
      new Array(itemsPerPage).fill(undefined).map((i, index) => (
        <GridItem key={index}>
          <PopularItemSkeleton />
        </GridItem>
      )),
    [itemsPerPage]
  );

  return (
    <GridSlider
      slidesToShow={slidesToShow}
      speed={1800}
      navButtonContainerRef={containerForNavButton}
      renderNavButtons={(next, prev, isPaused, togglePause) => {
        return (
          <Portal
            container={containerForNavButton.current}
            children={
              <Box>
                <IconButton onClick={prev}>
                  {" "}
                  <SkipPreviousIcon />
                </IconButton>
                <IconButton onClick={togglePause}>
                  {" "}
                  {isPaused ? <PlayArrowIcon /> : <PauseIcon />}{" "}
                </IconButton>
                <IconButton onClick={next}>
                  {" "}
                  <SkipNextIcon />{" "}
                </IconButton>
              </Box>
            }
          />
        );
      }}
    >
      {popularItems &&
        popularItems.length > 0 &&
        popularItems.map((item, index) => (
          <GridItem key={index}>
            <PopularItem data={{ ...item, _type: item.type }} />
          </GridItem>
        ))}
      {!popularItems && popularItemSkeletons}
    </GridSlider>
  );
}

//  <Box
//     px={{ xs: 0, sm: 3, md: 5, lg: 7 }}
// sx={{
//     '& .slick-dots li button:before': {
//         color: '#ff4081'
//     },
//     '& .slick-dots li.slick-active button:before': {
//         color: theme.palette.primary.main
//     },
//     '& .slick-track': {
//         margin: 0
//     }
// }}
// >
//     {/* <Slider {...settings}>
//         {
//             popularItems && popularItems.length > 0 && (
//                 popularItems.concat(popularItems).concat(popularItems).concat(popularItems).map((item, index) => (
//                     <Box sx={{ width: '150px !important', marginLeft: '5px', height: '300px' }} key={index}>
//                         <PopularItem data={{ ...item, _type: item.type }} />
//                     </Box>
//                 ))
//             )
//         }
//         {
//             !popularItems && popularItemSkeletons
//         }
//     </Slider> */}

// </Box>
