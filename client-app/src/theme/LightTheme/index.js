import { createMuiTheme } from "@material-ui/core"

import palette from "./palette"
import typography from "./typography"
import overrides from "./overrides"

const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
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
