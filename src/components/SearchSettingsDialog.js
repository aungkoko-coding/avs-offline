import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { forwardRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchSettings from "./SearchSettings";

const Transition = forwardRef((props, ref) => {
  const { fullScreen, ...others } = props;
  return <Slide direction={fullScreen ? "up" : "down"} ref={ref} {...others} />;
});

export default function SearchDialog(props) {
  const { open, onClose, ...others } = props;
  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down("md"));
  const fullScreen = onClose && isMobile;

  // const SearchWrapper = styled("form")(({ theme }) => ({
  //     flexGrow: 1,
  //     display: "flex",
  //     alignItems: "center",
  //     width: "100%",
  //     backgroundColor: alpha(theme.palette.common.black, 0.15),
  //     borderRadius: theme.shape.borderRadius
  // }));

  // const StyledInputBase = styled((props) => <InputBase inputProps={{ type: 'text' }} {...props} />)(({ theme }) => ({
  //     width: "100%",
  //     "& .MuiInputBase-input": {
  //         width: "100%",
  //         padding: theme.spacing(1, 1, 1, 0),
  //         // vertical padding + font size from searchIcon
  //         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     }
  // }));

  // const SearchIconWrapper = styled('div')(({ theme }) => ({
  //     padding: theme.spacing(0, 2),
  //     height: '100%',
  //     position: 'absolute',
  //     pointerEvents: 'none',
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  // }));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      TransitionProps={{ fullScreen }}
      scroll="body"
      {...others}
      sx={{
        "& .MuiPaper-root": {
          ...(!fullScreen && { maxWidth: 800, p: 3 }),
        },
      }}
    >
      {fullScreen /** For mobile */ ? (
        <>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Tooltip title={<Typography>Close</Typography>}>
                <IconButton edge="start" onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <SearchSettings />
        </>
      ) : (
        /** For desktop site */
        <SearchSettings />
      )}
    </Dialog>
  );
}
