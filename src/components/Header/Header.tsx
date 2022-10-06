import React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../Theme/Theme";

import styles from "./Header.module.css";

function Header() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      className={styles.headerNav}
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
          <Brightness7Icon sx={{ml: 1}}/>
        ) : (
          <Brightness4Icon sx={{ml: 1}}/>
        )}
      </IconButton>
    </Box>
  );
}

export default React.memo(Header);
