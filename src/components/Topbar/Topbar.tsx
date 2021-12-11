import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Topbar = () => {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" style={{backgroundColor: 'green'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Apra Tube
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Topbar;
