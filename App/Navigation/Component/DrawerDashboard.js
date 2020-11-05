// @flow

import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { Divider, Image } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import styles from '../Styles/DrawerDashboardStyle'

class DrawerDashboard extends React.Component {

  render () {
    return (
      <ScrollView style={styles.container,{ marginTop:24}}>
        <KeyboardAvoidingView behavior='position'>
          <View style={{padding:12,flexDirection:'row', height:75}}>
            <Image  
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
              style={{width:40,height:40}}
            />
            <View style={{paddingHorizontal:12}}>
              <Text style={{fontWeight:'bold'}}>BukuKas Container</Text>
              <Text style={{fontSize:10}}>Version 0.0.0</Text>
            </View>
          </View>      
          <Divider style={{ backgroundColor: '#A9A9A9',height:1 }} />
          <View style={{padding:12,flexDirection:'row',justifyContent:'space-between', width:'65%'}}>
            <Image  
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
              style={{width:20,height:20}}
            />
              <Text style={{fontWeight:'600'}}>BukuKas Container</Text>
          </View>  
          <Divider style={{ backgroundColor: '#A9A9A9',height:1 }} />
          <TouchableOpacity style={{width:'80%', marginHorizontal:'10%',height:50, backgroundColor:'blue',borderRadius:4, alignItems:'center', justifyContent:'center',marginTop:12}}>
              <Text style={{color:'white', fontWeight:'700'}}>Tambah Usaha Baru</Text>
          </TouchableOpacity>
 
        </KeyboardAvoidingView>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawerDashboard)
