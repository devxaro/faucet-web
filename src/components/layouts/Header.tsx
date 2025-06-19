import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Connect from "@components/Connect";

const Header = () => {
  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <Container maxWidth="md">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Connect />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
