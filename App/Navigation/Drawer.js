
import Dashboard from '../Containers/Dashboard'
import HomeScreen from '../Containers/Home'
import SettingsScreem from '../Containers/Settings'
import { createDrawerNavigator } from 'react-navigation-drawer'
import DrawerDashboard from './Component/DrawerDashboard'

export const DashboardDrawer = createDrawerNavigator({
  Dashboard: {
    screen: Dashboard
  }
}, {
  contentComponent: DrawerDashboard, // Pass here
    // others props
  drawerBackgroundColor: 'rgba(255,255,255,.9)',
  overlayColor: 'rgba(0,0,0,0.5)',
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#6b52ae'
  }
})

export const HomeDrawer = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreen
  }
}, {
  contentComponent: DrawerDashboard, // Pass here
    // others props
  drawerBackgroundColor: 'rgba(255,255,255,.9)',
  overlayColor: 'rgba(0,0,0,0.5)',
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#6b52ae'
  }
})

export const SettingDrawer = createDrawerNavigator({
  SettingsScreem: {
    screen: SettingsScreem
  }
}, {
  contentComponent: DrawerDashboard, // Pass here
    // others props
  drawerBackgroundColor: 'rgba(255,255,255,.9)',
  overlayColor: 'rgba(0,0,0,0.5)',
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#6b52ae'
  }
})
