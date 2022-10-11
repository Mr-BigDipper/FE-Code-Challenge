import React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, Theme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../Theme/Theme";

function Header() {
  const theme: Theme = useTheme();
  const colorMode: any = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        bgcolor: "background.default",
        color: "text.primary",
        boxSizing: "border-box",
        p: 3,
        zIndex: 1,
        borderRadius: "none",
        position: "fixed",
        top: 0,
        left: 0,
        height: "80px",
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%),0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      }}
    >
      <p>Where in the world ?</p>
      <IconButton
        sx={{ ml: 1, fontSize: 16 }}
        color="inherit"
        onClick={colorMode.toggleColorMode}
      >
        {theme.palette.mode} mode
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon sx={{ ml: 1 }} />
        ) : (
          <Brightness4Icon sx={{ ml: 1 }} />
        )}
      </IconButton>
    </Box>
  );
}

export default React.memo(Header);
