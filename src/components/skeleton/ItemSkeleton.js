import { Card, CardContent, CardMedia, Skeleton } from "@mui/material";
import React from "react";

export default function MovieItemSkeleton(props) {
  return (
    <Card sx={{ cursor: "pointer" }}>
      <CardMedia
        component={Skeleton}
        variant="rectangular"
        sx={{ height: { xs: 140, sm: 180, md: 200, lg: 220, xl: 230 } }}
      />
      <CardContent sx={{ pt: 1, paddingBottom: "8px !important" }}>
        <Skeleton variant="text" />
      </CardContent>
    </Card>
  );
}
