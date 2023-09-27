import CloseIcon from "@mui/icons-material/Close";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {
  alpha,
  Box,
  Button,
  Fade,
  Paper,
  Popper,
  CircularProgress,
} from "@mui/material";
import React, { useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";

export default function WatchTrailerButton({ trailerUrlIDs }) {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const btnRef = useRef();

  const toggleTrailer = () => {
    setOpen((open) => !open);
  };

  return (
    <>
      <Button
        ref={btnRef}
        color="warning"
        onClick={toggleTrailer}
        disabled={!trailerUrlIDs || trailerUrlIDs.length < 1}
        variant="outlined"
        startIcon={open ? <CloseIcon /> : <PlayCircleIcon />}
        sx={{
          textTransform: "none",
          boxShadow: (theme) =>
            open ? `2px 2px 15px ${theme.palette.warning.main}` : "none",
        }}
      >
        {open ? "Close" : "Watch"} Trailer
      </Button>
      <Popper
        sx={{ zIndex: 1 }}
        open={trailerUrlIDs?.length > 0 && open}
        anchorEl={btnRef.current}
        placement="top-end"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper
              sx={{
                display: "flex",
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Carousel
                  sx={{
                    width: { xs: "300px", sm: "450px" },
                  }}
                  fullHeightHover={false}
                  navButtonsAlwaysVisible={trailerUrlIDs?.length > 1}
                  animation="slide"
                  autoPlay={false}
                  navButtonsProps={{
                    style: {
                      color: "#fff",
                      backgroundColor: alpha("#ff4081", 0.7),
                    },
                  }}
                  indicatorContainerProps={{
                    style: {
                      marginTop: 0,
                    },
                  }}
                  activeIndicatorIconButtonProps={{
                    style: {
                      color: "#ff4081",
                    },
                  }}
                >
                  {trailerUrlIDs?.map((trailerUrlID, index) => (
                    <Box
                      key={index}
                      component="iframe"
                      sx={{
                        width: "100%",
                        aspectRatio: "16/9",
                      }}
                      src={`https://www.youtube.com/embed/${trailerUrlID}?cc_load_policy=1&cc_lang_pref=en`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      onLoad={() => setLoaded(true)}
                    />
                  ))}
                </Carousel>
              </Box>
              {!loaded && <LoadingIndicator />}
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}

function LoadingIndicator() {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      sx={{ transform: "translate(-50%, -50%)" }}
    >
      <CircularProgress />
    </Box>
  );
}
