import {
  Card,
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { urlFor } from "../../lib/client";
import Star from "@mui/icons-material/Star";

// Responsible for rendering for each tvShow items
export default function TVShowItem(props) {
  const {
    tvShow: { title, posterImgUrl, posterImage, slug, imdb },
  } = props;

  return (
    <Card sx={{ width: "100%", height: "100%", m: 0, p: 0 }}>
      <CardActionArea
        sx={{ width: "100%", height: "100%" }}
        LinkComponent={Link}
        to={`/tv-shows/${slug?.current}`}
      >
        <CardMedia
          component="img"
          src={posterImgUrl}
          loading="lazy"
          sx={{
            height: { xs: 140, sm: 180, md: 200, lg: 220, xl: 230 },
            lineHeight: 1,
            verticalAlign: "baseline",
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
          <Tooltip title={title}>
            <Typography
              noWrap
              variant="subtitle2"
              fontSize={{ xs: "0.7rem", sm: "1rem" }}
            >
              {title}
            </Typography>
          </Tooltip>
        </CardContent>
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
            fontSize: "0.7rem",
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
      </CardActionArea>
    </Card>
  );
}
