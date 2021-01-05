import React, { Component } from 'react'
import { Dimensions, ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles

class MiddlewareScreen extends Component {
  componentDidMount () {
    setTimeout(() => {
      const {getParam} = this.props.navigation
      this.props.navigation.replace(getParam('param') ? getParam('param') : 'AuthScreen')
    }, 1000)
  }
  render () {
    const { width, heigth } = Dimensions.get('screen')
    return (
      <View style={{flex: 1, width: width, heigth: heigth, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={40} color={'blue'} />
      </View>
    )
  }
}

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiddlewareScreen)
