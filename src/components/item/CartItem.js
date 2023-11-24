import React from "react";
import { Link } from "react-router-dom";

import Star from "@mui/icons-material/Star";
import {
  Box,
  Card as MuiCard,
  CardActionArea,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { calculatePrice } from "../../api/Util";

const Card = styled(MuiCard)(({ theme, selected }) => ({
  ...(selected && { backgroundColor: theme.palette.action.selected }),
  // backgroundColor: !selected ? theme.palette.background.paper : theme.palette.action.selected
}));

export default function CartItem({
  data: { _type, title, name, price, imdb, posterImgUrl, slug },
  promotion,
  selected,
  isSelectModeOn,
  onSelect,
}) {
  let pathname = "movies"; //default movies
  if (_type === "movie") {
    pathname = "movies";
  } else if (_type === "season") {
    pathname = "tv-shows";
  } else if (_type === "collection") {
    pathname = "collections";
  }

  return (
    <Card
      sx={{ width: "100%", height: "100%", m: 0, p: 0 }}
      selected={selected && isSelectModeOn}
      onClick={onSelect}
    >
      <CardActionArea
        disabled={isSelectModeOn}
        sx={{ width: "100%", height: "100%" }}
        LinkComponent={Link}
        to={`/${pathname}/${slug?.current}`}
      >
        <CardMedia
          component="img"
          src={posterImgUrl}
          loading="lazy"
          sx={{
            height: { xs: 140, sm: 180, md: 200, lg: 220, xl: 230 },
            lineHeight: 1,
            verticalAlign: "baseline",
            opacity: selected ? 0.8 : 1,
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            py: 1,
            height: "15%",
          }}
        >
          <Tooltip title={title || name}>
            <Typography
              noWrap
              variant="subtitle2"
              fontSize={{ xs: "0.7rem", sm: "1rem" }}
            >
              {title || name}
            </Typography>
          </Tooltip>
        </CardContent>
        {price && (
          <Typography
            variant="caption"
            component={Box}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: (theme) => theme.palette.background.paper,
              py: 0.5,
              px: 0.6,
              border: (theme) =>
                `solid 1px ${theme.palette.warning.dark} !important`,
              fontSize: { xs: "0.5rem", sm: "0.7rem" },
              lineHeight: 1,
              borderColor: (theme) => theme.palette.background.default,
              color: (theme) => theme.palette.warning.dark,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {promotion ? (
              <React.Fragment>
                <i
                  style={{ textDecoration: "line-through", marginRight: "2px" }}
                >
                  {price}
                </i>
                <span style={{ marginRight: "1px" }}>
                  {calculatePrice(promotion, price)}
                </span>
              </React.Fragment>
            ) : (
              price
            )}{" "}
            MMK
          </Typography>
        )}
        {imdb && (
          <Typography
            variant="caption"
            component={Box}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: (theme) => theme.palette.background.paper,
              py: 0.3,
              px: 0.4,
              fontSize: { xs: "0.5rem", sm: "0.7rem" },
              lineHeight: 1,
              border: 1,
              borderColor: (theme) => theme.palette.background.default,
              color: (theme) => theme.palette.warning.dark,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Star color="warning" fontSize="inherit" />
            {imdb}
          </Typography>
        )}
      </CardActionArea>
    </Card>
  );
}
