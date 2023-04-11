import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{ height: 60, background: '#4caf50'  }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Where in the world?
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
