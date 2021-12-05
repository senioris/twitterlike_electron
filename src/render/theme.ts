import { blue } from '@mui/material/colors'
import { createTheme, Theme } from '@mui/material/styles'

declare module '@mui/material/styles/createPalette' {}

const theme:Theme = createTheme({
  palette: {
    primary: {
      main: blue["500"],
    },
    mode: 'dark',
  },
  typography: {
    button: {
      textTransform: "none",
      fontSize: 12,
    }
  },
  components: {
    MuiTextField: {
      defaultProps: { variant: "outlined" }
    },
    MuiButton: {
      defaultProps: { variant: "outlined" }
    },
    MuiCheckbox: {
      defaultProps: { color: "primary" }
    },
    MuiRadio: {
      defaultProps: { color: "primary" }
    },
    MuiSwitch: {
      defaultProps: { color: "primary" }
    },
    MuiList: {
      defaultProps: { dense: true }
    },
    MuiTable: {
      defaultProps: { size: "small" }
    },
  },
  mixins: {
    toolbar: {
      height: 42
    }
  },
})

export default theme
