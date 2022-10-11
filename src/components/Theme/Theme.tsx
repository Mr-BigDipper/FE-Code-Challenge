import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import App from "../../App";

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        console.log("first")
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light") ? {
            pageBackground: "hsl(0, 0%, 98%)",
            background: {
              default: "hsl(0, 0%, 100%)"
            }
          } : {
            pageBackground: "hsl(207, 26%, 17%)",
            background: {
              default: "hsl(209, 23%, 22%)"
            }
          }
        },
      }),
    [mode],
  );
  return (
    <ColorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleColorMode;