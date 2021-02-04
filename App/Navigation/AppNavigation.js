import React from 'react'
import { createAppContainer } from 'react-navigation'
import DetailLaporanScreen from '../Containers/DetailLaporanScreen'
import DetailCatatanScreen from '../Containers/DetailCatatanScreen'
import {DashboardDrawer, HomeDrawer, SettingDrawer} from './Drawer'
import AuthScreen from '../Containers/AuthScreen'
import MiddlewareScreen from '../Containers/MiddlewareScreen'

import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'

import LaunchScreen from '../Containers/LaunchScreen'
import UtangPiutang from '../Containers/UtangPiutang'

import styles from './Styles/NavigationStyles'
import { Text, View, Dimensions } from 'react-native'
import { Image } from 'react-native-elements'
import { Transition } from 'react-native-reanimated'

const {width} = Dimensions.get('screen')
const getTabBarIcon = (navigation) => {
  const { routeName } = navigation.state
  if (routeName === 'Home') {
    const x = 10
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Image
          source={{
            uri:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEUAAAD///8wMDDCwsKGhoaWlpa8vLzFxcXAwMDPz8/Hx8fe3t7t7e0LCwuQkJAyMjKenp5ubm5FRUWkpKStra0+Pj5UVFT19fUQEBAiIiLq6upaWlo2NjZ/f3+2trZoaGgkJCRzc3PY2NhYWFhJSUmJiYns5DWxAAAFGUlEQVR4nO3d6VrqMBAG4BQXBMq+VEFEOZ77v8VDBYQuWZpkJpOc+f7H5n2mC63tRGR4yVfz6ViMe/NVjrhVgbal0VzcMh+hbRdNOBHVTLA2jCQsFqKeRYGzaRzhqOE7ZYyzp6IIB23AUwYYG8cQyoA4RAThUAoUYgi/eXihCohBBBf2lUAh+tATgBaqK4hRRWChroIIVYQVmgChiaBCMyAwEVJoCtQSh5PFa33I22G1NZoFoFB/krlFdbpZjmWjdkeDacAJzStY5kH2ZwY91bC9/uc7mLBLBctIqrjUDOtpb6ahhN0qWKa1ik/6cbqjEUjYtYJlWqr4bDDsXbOjwggfLIAtVcyNhu0DCLvvoufULxpz/ZAy6jtpCKEtsE7cGo7aYQvtdtFzKjtq/eGVNMoj0b/QBVglvpsO+kAVugHviaY7qRBfmEL7Y/Ca32PxaDxkjSh0rWCZaxXlD7DqmeIJ3StYpt9V2EMT+qhgmQeqQj8V/CXSE/qq4JVITugT+EOkJvQLLInEhL6BpzOq+fUQQ+gfKMQjJSEEsEPghf4uE0SFgSsILwwOhBaGBwILCQBhhRSAoEISQEghDSCg8CU07RIwIZEKwgmpVBBMSKaCUEI6FQQSEqogjJBSBUGEtIAAQmJA/0JqQO9CUieZn3gWkqugbyG9CnoWEqygXyFJoE8hTaBHIVGgPyFVoDchWaAvIV2gJyFhoB8hZaAXocmLnuHiQUi6gj6EtCvoQUi8gu5C6hV0FpKvoKswAqCbkP4uKtyEMVTQSRhFBV2EcVTQ4R3hSCp4yrOdMJYKlnmxEcZTwTLyKkqFcQEVRJkwNqCcKBHGB5QS24UxAmXEVmGcQAmxTRgrsP2i0SKMF9haxaYwZmAbsSGMG9hCrAtjBzaJIjVggyiSA9aJIj1gjSgSBFaJIkVghSiSBN4TRZrAux9wIlHgrYoXIcU3nVzTvxfaNMyhn8FNaP49alwZXYVmrXxiTH4RNnv8ppLFWWjc6CbCTEphaxfjZDI6CQ+hJwGaQybSPc2ck4tV6CkAZyUMe6JFm7lQtpZMID0hbQ6aSFL3lUndOE7+OJz+B+fS9K+H5t0J40wusl3oOYBmd/rlbd5SK8Ycy/vDfehZAGZ/vsdfh54HWNaXpxjFW+iZAOWzuD5rKzah5wKSTXH3RFjenT/ajJfVp/r5LK2jcT27Noi+++9a/jF7qmQWy/H5Vp/4x916Asp3hKehp24Y+z7Csdx32L/nzUIqYSEL6YeFLKQfFrKQfsIKN/tHVfY+br7DCccTk0WNR86vSgQTzgx458yiFK7NFmA8Z+v0hCGMUL2QVjN/YhN+dwRm2Xdkwu5LwxdxCZXrhEnyEZNwYQF0eIMwgNCmhA5FxBe+apc/bU3eWPSXrHBjBcwy219w+MK/lkLztXNCC1eWQtu3JvCFih4Oytj2qcAXSpeg1sT2qw8WspCFLGQhC1nIQhaykIUsZCELWchCFrKQhSxkIQtZyEIWspCFLGQhC1nIQhaykIUsZCELWchCFrKQhSxkIQtZyEIWVmPfJ8r282Ns4dpaaNufFls4txbafvKILVR+0KkU2vbcxxYqP+hUr8tt+ckjslD9QadaaNmfFll4dBBmXxEIv9R/VCMsrC6JqMKeprmBRmi3RguqUNcgRifMthafkCMKX7UdVLTCrOi+EA2e8KDvv6EXZtmwa9sRLOH30OCPmghPR+Py8Nmh0zCCcPx5WJq0aMqyf/zFZUBYEQNNAAAAAElFTkSuQmCC'
          }}
          style={{ width: 20, height: 20 }} />
        {x > 0 && (
        <View
          style={{
           // /If you're using react-native < 0.57 overflow outside of the parent
           // will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -3,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={{ color: 'white', fontSize: width * 0.035, fontWeight: '' }}>
            {x}
          </Text>
        </View>
     )}
      </View>
    )
    // We want to add badges to home tab icon
    // IconComponent = HomeIconWithBadge;
  } else {
    if (routeName === 'Settings') {
      return <Image
        source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEUAAAD///8wMDDCwsKGhoaWlpa8vLzFxcXAwMDPz8/Hx8fe3t7t7e0LCwuQkJAyMjKenp5ubm5FRUWkpKStra0+Pj5UVFT19fUQEBAiIiLq6upaWlo2NjZ/f3+2trZoaGgkJCRzc3PY2NhYWFhJSUmJiYns5DWxAAAFGUlEQVR4nO3d6VrqMBAG4BQXBMq+VEFEOZ77v8VDBYQuWZpkJpOc+f7H5n2mC63tRGR4yVfz6ViMe/NVjrhVgbal0VzcMh+hbRdNOBHVTLA2jCQsFqKeRYGzaRzhqOE7ZYyzp6IIB23AUwYYG8cQyoA4RAThUAoUYgi/eXihCohBBBf2lUAh+tATgBaqK4hRRWChroIIVYQVmgChiaBCMyAwEVJoCtQSh5PFa33I22G1NZoFoFB/krlFdbpZjmWjdkeDacAJzStY5kH2ZwY91bC9/uc7mLBLBctIqrjUDOtpb6ahhN0qWKa1ik/6cbqjEUjYtYJlWqr4bDDsXbOjwggfLIAtVcyNhu0DCLvvoufULxpz/ZAy6jtpCKEtsE7cGo7aYQvtdtFzKjtq/eGVNMoj0b/QBVglvpsO+kAVugHviaY7qRBfmEL7Y/Ca32PxaDxkjSh0rWCZaxXlD7DqmeIJ3StYpt9V2EMT+qhgmQeqQj8V/CXSE/qq4JVITugT+EOkJvQLLInEhL6BpzOq+fUQQ+gfKMQjJSEEsEPghf4uE0SFgSsILwwOhBaGBwILCQBhhRSAoEISQEghDSCg8CU07RIwIZEKwgmpVBBMSKaCUEI6FQQSEqogjJBSBUGEtIAAQmJA/0JqQO9CUieZn3gWkqugbyG9CnoWEqygXyFJoE8hTaBHIVGgPyFVoDchWaAvIV2gJyFhoB8hZaAXocmLnuHiQUi6gj6EtCvoQUi8gu5C6hV0FpKvoKswAqCbkP4uKtyEMVTQSRhFBV2EcVTQ4R3hSCp4yrOdMJYKlnmxEcZTwTLyKkqFcQEVRJkwNqCcKBHGB5QS24UxAmXEVmGcQAmxTRgrsP2i0SKMF9haxaYwZmAbsSGMG9hCrAtjBzaJIjVggyiSA9aJIj1gjSgSBFaJIkVghSiSBN4TRZrAux9wIlHgrYoXIcU3nVzTvxfaNMyhn8FNaP49alwZXYVmrXxiTH4RNnv8ppLFWWjc6CbCTEphaxfjZDI6CQ+hJwGaQybSPc2ck4tV6CkAZyUMe6JFm7lQtpZMID0hbQ6aSFL3lUndOE7+OJz+B+fS9K+H5t0J40wusl3oOYBmd/rlbd5SK8Ycy/vDfehZAGZ/vsdfh54HWNaXpxjFW+iZAOWzuD5rKzah5wKSTXH3RFjenT/ajJfVp/r5LK2jcT27Noi+++9a/jF7qmQWy/H5Vp/4x916Asp3hKehp24Y+z7Csdx32L/nzUIqYSEL6YeFLKQfFrKQfsIKN/tHVfY+br7DCccTk0WNR86vSgQTzgx458yiFK7NFmA8Z+v0hCGMUL2QVjN/YhN+dwRm2Xdkwu5LwxdxCZXrhEnyEZNwYQF0eIMwgNCmhA5FxBe+apc/bU3eWPSXrHBjBcwy219w+MK/lkLztXNCC1eWQtu3JvCFih4Oytj2qcAXSpeg1sT2qw8WspCFLGQhC1nIQhaykIUsZCELWchCFrKQhSxkIQtZyEIWspCFLGQhC1nIQhaykIUsZCELWchCFrKQhSxkIQtZyEIWVmPfJ8r282Ns4dpaaNufFls4txbafvKILVR+0KkU2vbcxxYqP+hUr8tt+ckjslD9QadaaNmfFll4dBBmXxEIv9R/VCMsrC6JqMKeprmBRmi3RguqUNcgRifMthafkCMKX7UdVLTCrOi+EA2e8KDvv6EXZtmwa9sRLOH30OCPmghPR+Py8Nmh0zCCcPx5WJq0aMqyf/zFZUBYEQNNAAAAAElFTkSuQmCC' }}
        style={{ width: 20, height: 20 }} />
    }
  }
  return <Image
    source={{ uri: 'data:image/png;base64,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' }}
    style={{ width: 25, height: 25 }} />

  // You can return any component that you like here!
}
const TabNavigator = createMaterialTopTabNavigator({
  Dashboard: DashboardDrawer,
  Home: HomeDrawer,
  Settings: SettingDrawer
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
      getTabBarIcon(navigation, focused, tintColor)
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
      showIcon: true,
      style: {
        backgroundColor: 'white', fontSize: width * 0.035
      }
    },
    tabBarPosition: 'bottom'
  })

const PrimaryNav = createStackNavigator({
  DetailLaporanScreen: { screen: DetailLaporanScreen },
  DetailCatatanScreen: { screen: DetailCatatanScreen },
  AuthScreen: { screen: AuthScreen },
  Dashboard: { screen: TabNavigator },
  MiddlewareScreen: { screen: MiddlewareScreen },
  LaunchScreen: { screen: LaunchScreen },
  UtangPiutang: {screen: UtangPiutang}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'AuthScreen',
  navigationOptions: {
    headerStyle: styles.header
  },
  transition: (
    <Transition.Together>
      <Transition.Out
        type='slide-bottom'
        durationMs={400}
        interpolation='easeIn'
      />
      <Transition.In type='fade' durationMs={500} />
    </Transition.Together>
  )
})

export default createAppContainer(PrimaryNav)
