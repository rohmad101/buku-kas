// @flow

import React, { useState } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DataLocalRedux from '../Redux/DataLocalRedux'

// Styles
import styles from './Styles/UtangPiutangStyle'

// I18n
import I18n from 'react-native-i18n'
import { CheckBox, Header, Icon } from 'react-native-elements'
import { bindActionCreators } from 'redux'
import { set } from 'lodash'

function UtangPiutang(props) {
const {width,height}=Dimensions.get('screen')
const [selected, setselected] = useState('berikan')
const [pelanggan, setPelanggan] = useState('')
const [value, onChangeText] = useState('')

const Submit = ()=>{
  const {data} = props
  let val = []
  let selectedData = []
  if(data.length>0){
     data.map(dat =>{
       val.push(dat)
     })
     data.map((dat,index) =>{
     if(dat.nama === pelanggan ) {
      selectedData.push(dat)
      selectedData.push(index)
     }
    })
    if(selectedData.length>0) {
      let stat = selected ==='berikan'?'utang pelanggan':'utang saya'
      let nominal = parseInt(selectedData[0].nominal) + parseInt(selectedData[0].jenis===stat? value:-value)
      if(nominal<0){
        nominal = nominal *-1
      }
      let stat2= 
        stat===selectedData[0].jenis? 
          stat
        : value>selectedData[0].nominal?
          stat
          :stat ==='berikan'?'utang saya':'utang pelanggan'
          
      let dataa = {'nama':pelanggan,'nominal':nominal,'jenis':stat2}
      val[selectedData[1]]=dataa
      // alert(JSON.stringify( selectedData))
      props.dataLocalSuccess(val)
      props.navigation.goBack()  
      selectedData.pop()  
      selectedData.pop() 
    }else{
      props.dataLocalSuccess([...data,{'nama':pelanggan,'nominal':value,'jenis':selected==='berikan'?'utang pelanggan':'utang saya'}])
      props.navigation.goBack()
    }

  }else{
      props.dataLocalSuccess([{'nama':pelanggan,'nominal':value,'jenis':selected==='berikan'?'utang pelanggan':'utang saya'}])
      props.navigation.goBack()
  }
}
    return (
      <View style={[{height:height,width:width,flexDirection:'column',alignItems:'center'}]}>
         <Header
          placement="left"
          leftComponent={<Icon name='arrow-back' color='white' onPress={()=>props.navigation.pop()}/>}
          centerComponent={{ text: 'Utang Piutang Baru', style: { color: '#fff', fontSize:20, fontWeight:'700' } }}

        />
        <View style={{flexDirection:'row',justifyContent:'space-around',width:width, padding:12}}>
          <TouchableOpacity 
          onPress={()=> setselected('berikan')}
          style={{width:width*0.45,alignItems:'center',flexDirection:'row',backgroundColor:selected==='berikan'?'red':'lightgray',padding:4,borderRadius:4}}>
            <CheckBox
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checkedColor={selected==='berikan'?'white':'white'}
              uncheckedColor='white'
              checked={selected==='berikan'?true:false}
            />
            <Text style={{color:'white'}}>Berikan</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=> setselected('terima')}
          style={{width:width*0.45,alignItems:'center',flexDirection:'row',backgroundColor:selected==='terima'?'#7cfc00':'lightgray',padding:4,borderRadius:4}}>
             <CheckBox
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checkedColor={selected==='terima'?'white':'white'}
              uncheckedColor='white'
              checked={selected==='terima'?true:false}
            />
            <Text style={{color:'white'}}>Terima</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          margin:12, borderWidth:1, borderColor:'#3498DB',height:100,borderRadius:8,flexDirection:'row',backgroundColor:'#F7FCFF',justifyContent:'space-around',alignItems:'center',paddingHorizontal:16}}>
          <Icon name='account-circle' color='blue' size={32}/>
          <View style={{flexDirection:'column'}}>
            <TextInput
                placeholder='Nama Pelanggan'
                onChangeText={text => setPelanggan(text)}
                placeholderTextColor={selected==='berikan'?'red':'green'}
                value={pelanggan}
                editable
                maxLength={40}
                style={{borderBottomWidth:0.7, width:width*0.75,height:48,color:selected==='berikan'?'red':'green',fontSize:24}}
              />
          </View>
          {/* <Icon name='chevron-right' color='blue' size={30}/> */}
        </View>
        <View style={{
          width:width, flexDirection:'row',alignItems:'center'
        }}>
          <Icon name='chevron-right' color={selected==='berikan'?'red':'green'} size={30} style={{width:40}}/>
          <Text style={{fontSize:24,color:selected==='berikan'?'red':'green',borderBottomWidth:0.7,height:48,marginTop:16,fontWeight:'700'}}>Rp</Text>
          <View style={{flexDirection:'column'}}>
            <Text style={{fontSize:12}}>{selected==='berikan'?'Memberikan':'Menerima'}</Text>
            <TextInput
              placeholder='0'
              multiline
              numberOfLines={4}
              onChangeText={text => onChangeText(text)}
              keyboardType='numeric'
              placeholderTextColor={selected==='berikan'?'red':'green'}
              value={value}
              editable
              maxLength={12}
              style={{borderBottomWidth:0.7, width:width*0.75,height:48,color:selected==='berikan'?'red':'green',fontSize:24}}
            />
          </View>
        </View>
        
        <TouchableOpacity 
        onPress={()=> Submit()}
        style={{width:width*0.9, backgroundColor:'#ffbf00', height:40,position:"absolute",bottom:60,justifyContent:'center',alignItems:'center',borderRadius:4 }}>
          <Text style={{color:'white',fontWeight:'700'}}>Simpan Utang Piutang</Text>
        </TouchableOpacity>
      </View>
    )

}

const mapStateToProps = (state) => {
  console.log(state.local.payload.length)
  return {
    data: state.local.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(DataLocalRedux),dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UtangPiutang)
