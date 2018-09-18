/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { nameSpaces, stateMapper, actionsMapper } from './src/handlers';
import { BackgroundView } from './src/components/Core/Containers';
import Home from './src/screens/HomeScreen';
import { themes } from './src/themes';

class App extends React.Component {
  getStatusBarTheme = () => {
    const { $state } = this.props;
    let statusBarTheme = {
      background: null,
      content: 'dark',
    };

    if ($state.theme === 'dark') {
      statusBarTheme.content = 'light';
    }

    // force black status bar on Android
    if (Platform.OS === 'android') {
      statusBarTheme.background = 'black';
      statusBarTheme.content = 'light';
    }

    return statusBarTheme;
  }

  getStatusBarBackground = () => {
    const { $state } = this.props;
    let background = null;

    if (Platform.OS === 'android') {
      background = 'black';
    }

    return background;
  }

  render = () => {
    const { $state } = this.props;

    const statusBarTheme = this.getStatusBarTheme();

    return (
      <ThemeProvider theme={themes[$state.theme]}>
        <BackgroundView>
          <StatusBar
            backgroundColor={statusBarTheme.background}
            barStyle={`${statusBarTheme.content}-content`}
          />
          <Home />
        </BackgroundView>
      </ThemeProvider>
    );
  }
}

export default connect(
  // variables from the store -> maps to this.props.$state
  stateMapper({
    theme: [nameSpaces.APP],
  }),

  // actions -> maps to this.props.$actions.{SHADOW_NAME}
  actionsMapper([
    nameSpaces.APP,
  ]),
)(App);
