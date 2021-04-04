import { createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  mixins: {
    toolbar: {
      minHeight: 48,
      "@media (min-width:0px) and (orientation: landscape)": {
        minHeight: 48,
      },
      "@media (min-width:600px)": {
        minHeight: 48,
      },
    },
  },
})

export default theme
