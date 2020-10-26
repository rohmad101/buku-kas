import { createAppContainer } from 'react-navigation'
import AuthScreen from '../Containers/AuthScreen'
import MiddlewareScreen from '../Containers/MiddlewareScreen'
import { createStackNavigator } from 'react-navigation-stack';
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  AuthScreen: { screen: AuthScreen },
  MiddlewareScreen: { screen: MiddlewareScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'MiddlewareScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
