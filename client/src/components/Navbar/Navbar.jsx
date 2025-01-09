import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "./Navbar.scss";



  

export default function ButtonAppBar() {
    const images = [
        "https://cdn.pixabay.com/photo/2023/10/02/14/51/flowers-8289321_640.png",
        "https://cdn.pixabay.com/photo/2023/09/10/15/15/flowers-8245210_640.png",
        "https://cdn.pixabay.com/photo/2023/09/04/17/04/saturn-8233220_640.png"
      ];
    const {id}=useParams();
  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kurkure e-commerce
          </Typography>
          <Link to={`/home/${id}`}> <Button className='link' color="inherit">Home</Button></Link>
          <Link to={`/cart/${id}`}> <Button className='link' color="inherit">Cart</Button></Link>
          <Link to={`/order/${id}`}> <Button className='link' color="inherit">Orders</Button></Link>
         
          
          <Button color="inherit">Profile</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Box sx={{ maxWidth: 1400, flexGrow: 1, margin: 'auto', mt: 5 }}>
      <Carousel>
        {images.map((image, i) => (
          <Paper key={i} elevation={10}>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: '500px',
                objectFit: 'cover'
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
