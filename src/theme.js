import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e48826',
    },
    secondary: {
      main: '#00bcd4',
    },
    danger: {
      main: red.A400,
    },
    success: {
      main: '#66bb6a',
    },
    background: {
      default: '#e1f5fe',
    },
  },
  // typography:{
  //   h1:{
  //     fontSize:48
  //   },
  //   h2:{
  //     fontSize:32
  //   },
  //   h3:{
  //     fontSize: 28
  //   },
  //   h4:{
  //     fontSize: 24
  //   },
  //   h5:{
  //     fontSize: 20
  //   },
  //   h6:{
  //     fontSize: 16
  //   },
  // }
  
});

export default theme;