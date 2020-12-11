import React, { useEffect, useState } from 'react'
import { Text, View, Dimensions, Alert } from 'react-native'
import { connect } from 'react-redux'
import {Picker} from '@react-native-community/picker';
import { Avatar, Accessory, Input } from 'react-native-elements';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AuthScreenStyle'
import AsyncStorage from '@react-native-community/async-storage';
import RegisterRedux from '../Redux/RegisterRedux';
import DataLocalRedux from '../Redux/DataLocalRedux'
import { bindActionCreators } from 'redux';

function AuthScreen (props) {
  const [selectedValue, setselectedValue]=useState('Indonesia')
  const [phone, setphone]=useState('')
  const { navigation,data,registerRequest } =props

  useEffect(()=>{
    AsyncStorage.getItem('PhoneNumber')
    .then(rr=>{
      if(rr !== null) {
        // value previously stored
        navigation.replace('MiddlewareScreen',{param:'Dashboard'})
        // alert(value)
      }
    })
    .catch(cc=> alert('errr'+cc))
      
  },[])

  useEffect(()=>{
    if(data && data.success){
      AsyncStorage.setItem('PhoneNumber',phone)
      props.dataLocalSuccess(data.data)
      navigation.replace('MiddlewareScreen',{param:'Dashboard'})
    }
  },[data])
    ContentHeader=()=>{
    return (
      <View>
        <View style={{flexDirection:'row'}}>
          <Avatar
            source={{
              uri:
                'https://i.pinimg.com/originals/46/da/e5/46dae512e375bee2664a025507da8795.jpg',
            }} 
            size={60}
            >
            <Accessory />
          </Avatar>
          <Text numberOfLines={2} style={{width:'50%'}}>Digunakan Oleh 1.000.000 Pemilik Usaha</Text>
        </View>
        <Text style={{fontWeight:'bold', fontSize:24,paddingVertical:8}}> Masuk Ke Aplikasi</Text>
        <Text numberOfLines={2} style={{width:"80%", color:'grey'}}>Kami akan mengirimkan kode OTP agar Anda bisa masuk ke Aplikasi</Text>
      </View>
    )
  }

  Submit= ()=>{
    
    registerRequest({
      "phone_number": phone
    })

  }

    const { width, heigth } = Dimensions.get('screen')
    return (
      <View style={{flex:1,width:width, heigth:heigth, justifyContent: 'center',padding:12}}>
        {ContentHeader()}
        <View style={{flexDirection:'row', paddingTop:12}}>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 100 }}
            mode={'dropdown'}
            prompt='Pilih Negara'
            onValueChange={(itemValue, itemIndex) => setselectedValue(itemValue)}
          >
            <Picker.Item label="+62" value="Indonesia" />
            <Picker.Item label="+65" value="Singapore" />
            </Picker>
            <Input
              value={phone}
              keyboardType='number-pad'
              placeholder=''
              containerStyle={{width:"70%"}}
              onChangeText={(text)=>setphone(text)}
            />
          </View>  
        <View style={{width:width,justifyContent:'center',alignItems:'center',flexDirection:'row',paddingBottom:20}}>
          <Text>Kirim Kode ke</Text>
        </View>    
        <View style={{width:width,justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
          <Text 
            style={{width:width*0.4, color:phone.length>5?'blue':'white', backgroundColor:phone.length>5?'white':'grey',textAlign:'center',padding:12, borderRadius:8 , borderColor:phone.length>5?'blue':'white', borderWidth:1}}
            onPress={()=>phone.length>5?Submit():Alert.alert('please fill phone number first')}
          >SMS</Text>
          <Text 
            style={{width:width*0.4, color:'white', backgroundColor:phone.length>5?'blue':'grey',textAlign:'center',padding:12, borderRadius:8}}
            onPress={()=>phone.length>5?Submit():Alert.alert('please fill phone number first')}
          >WhatsApp</Text>
        </View>
      </View>
    )
}

const mapStateToProps = (state) => {
  return {
    data: state.register.payload,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(RegisterRedux,DataLocalRedux),dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)
