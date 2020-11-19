import React, { useState,useEffect } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { Header, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DetailCatatanScreenStyle'

function DetailCatatanScreen (props) {
  const [data, setdata ] = useState('')
  useEffect(()=>{
    console.log('test',props.navigation.getParam('params'))
    setdata(props.navigation.getParam('params'))
  },[])
    return (
      <View style={[styles.container,{alignItems:'center'}]}>
        <Header
          placement="left"
          leftComponent={<Icon name='arrow-back' color='white' onPress={()=>props.navigation.pop()}/>}
          centerComponent={{ text: 'Detail '+data.nama, style: { color: '#fff', fontSize:20, fontWeight:'700' } }}

        />
          <Text>{JSON.stringify(data)}</Text>
          {/* <Text>test</Text> */}
      </View>
    )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailCatatanScreen)
