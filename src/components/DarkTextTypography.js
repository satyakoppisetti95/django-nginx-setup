
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const DarkTextTypography = withStyles({
    root: {
      color: "#777"
    }
})(Typography);

export default DarkTextTypography;