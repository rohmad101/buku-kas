import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, ActivityIndicator, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Avatar, Accessory } from 'react-native-elements';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AuthScreenStyle'

class AuthScreen extends Component {
  ContentHeader(){
    return null
  }
  render () { 
    const { width, heigth } = Dimensions.get('screen')
    return (
      <View style={{flex:1,width:width, heigth:heigth, justifyContent: 'center',padding:12}}>
        <View style={{flexDirection:'row'}}>
          <Avatar
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            }} 
            size={60}
            >
            <Accessory />
          </Avatar>
          <Text numberOfLines={2} style={{width:'50%'}}>Digunakan Oleh 1.000.000 Pemilik Usaha</Text>
        </View>
        <Text style={{fontWeight:'bold', fontSize:24,paddingVertical:8}}> Masuk Ke Aplikasi</Text>
        <Text numberOfLines={2} style={{width:}}>Kami akan mengirimkan kode OTP agar Anda bisa masuk ke Aplikasi</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)
