import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Navbar.scss";

export default function ButtonAppBar() {
  const images = [
    "https://s.yimg.com/uu/api/res/1.2/6tptIDiKpIIxEsSAHTrwJw--~B/aD0xMTAyO3c9MTk2MDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/da422d6fcb5de1bb7721c4bd56e8367d",
    "https://media.bazaarvoice.com/Shutterstock_1875797686.png",
    "https://img.freepik.com/premium-psd/gadget-promotion-banner-template-design_70055-891.jpg",
  ];
  const { id } = useParams();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Kurkure e-commerce
            </Typography>
            <Link to={`/home/${id}`}>
              {" "}
              <Button className="link" color="inherit">
                Home
              </Button>
            </Link>
            <Link to={`/cart/${id}`}>
              {" "}
              <Button className="link" color="inherit">
                Cart
              </Button>
            </Link>
            <Link to={`/order/${id}`}>
              {" "}
              <Button className="link" color="inherit">
                Orders
              </Button>
            </Link>

            <Button color="inherit">Profile</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ maxWidth: 1400, flexGrow: 1, margin: "auto", mt: 5 }}>
        <Carousel>
          {images.map((image, i) => (
            <Paper key={i} elevation={10}>
              <Box
                component="img"
                sx={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                }}
                src={image}
                alt="image"
              />
            </Paper>
          ))}
        </Carousel>
      </Box>
    </div>
  );
}
