import { blue } from '@material-ui/core/colors'
import { createTheme, Theme } from '@material-ui/core/styles'

declare module '@material-ui/core/styles/createPalette' {}

const theme:Theme = createTheme({
  palette: {
    primary: {
      main: blue["500"],
    },
    type: 'dark',
  },
  typography: {
    button: {
      textTransform: "none",
      fontSize: 12,
    }
  },
  props: {
    MuiTextField: {
      variant: "outlined"
    },
    MuiButton: {
      variant: "outlined"
    },
    MuiCheckbox: {
      color: "primary"
    },
    MuiRadio: {
      color: "primary"
    },
    MuiSwitch: {
      color: "primary"
    },
    MuiList: {
      dense: true
    },
    MuiTable: {
      size: "small"
    },
  },
  mixins: {
    toolbar: {
      minHeight: 42
    }
  },
})

export default theme
