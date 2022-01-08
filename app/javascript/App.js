import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import TaskBoard from 'containers/TaskBoard';
import store from 'store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#165788',
      contrastText: '#fff',
    },
    secondary: {
      main: '#DC143C',
      contrastText: '#fff',
    },
  },
});

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <TaskBoard />
    </MuiThemeProvider>
  </Provider>
);

export default App;
