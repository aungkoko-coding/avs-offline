import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import SelectIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import SelectAllIcon from "@mui/icons-material/DoneAll";
import DocumentHeader from "../components/util/DocumentHeader";

export default function Help(props) {
  return (
    <Paper
      elevation={0}
      sx={{
        flex: "1 1 0",
        my: 1.5,
        py: 1,
      }}
    >
      <DocumentHeader title={`AVS | Help`} />
      <Typography variant="h4">
        How to buy movies, tv series and collections?
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Step 1"
            secondary="Let's assume that a movie or tv series is an item! Click an item whatever you want from the list. You will reach the page that show details about movie, tv series or collection!"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Step 2"
            secondary="If you like it, scroll down util you find the 'Add to Cart' button. (You can also watch trailers from 'Watch Trailer' button)"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Step 3"
            secondary="Click that button. You made it! You added an item to the cart!"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Step 4"
            secondary={
              <React.Fragment>
                Go to the page that show your added items. (To reach that page,
                click <ShoppingCartIcon color="primary" fontSize="small" /> icon
                which is at top-right corner of app screen)
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Step 5"
            secondary="You will see your added items when you reached that page. So that you can buy easily by showing your items in the cart!"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Step 6"
            secondary="Come to me and show your items in the cart. I will give you that items."
          />
        </ListItem>
      </List>

      <Divider sx={{ my: 1 }} />

      <Typography variant="h4">How to delete items in cart?</Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Step 1"
            secondary={
              <React.Fragment>
                First, you will need to enable 'SELECT' mode! Click{" "}
                <SelectIcon fontSize="small" /> or{" "}
                <SelectAllIcon fontSize="small" />
                icon to enable 'SELECT' mode.
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Step 2"
            secondary="When you've enabled 'SELECT' mode, click on any item you want to delete from the cart."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Step 3"
            secondary={
              <React.Fragment>
                Then you can delete by clicking{" "}
                <DeleteIcon
                  color="error"
                  fontSize="small"
                  sx={{ paddingTop: "5px" }}
                />{" "}
                icon. That is it!
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Paper>
  );
}
