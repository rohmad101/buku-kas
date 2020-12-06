import { Picker } from '@react-native-community/picker'
import React, { useState,useEffect } from 'react'
import {  Dimensions, Text, TouchableOpacity, View,ScrollView } from 'react-native'
import { Button, ButtonGroup, Header, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DateTimePicker from '@react-native-community/datetimepicker';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DataLocalRedux from '../Redux/DataLocalRedux'

// Styles
import styles from './Styles/DetailLaporanScreenStyle'

function DetailLaporanScreen (props) {
  const [pemasukan,setpemasukan]=useState(0)
  const [pengeluaran,setpengeluaran]=useState(0)
  const {width,height}=Dimensions.get('screen')
  const [selectedValue, setSelectedValue] = useState("Semua");
  const [sum, setsum] = useState(0)
  const [startdate, setstartdate] = useState(new Date());
  const [enddate, setenddate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setshowEndDate] = useState(false);
  const [selectedIndex,setselectedIndex] = useState(0)
  const { data }= props

  useEffect(()=>{
    setpemasukan(0)
    setpengeluaran(0)
  },[])
  useEffect(()=>{
    let masuk =0
    let keluar = 0
    let sums = []
    let sumMins=0
    let sumIncs=0
       data.map((data,index) =>{
        data.history.map(dat =>{
          if(selectedValue==='Semua'){
              if(dat.jenis ==="terima") {
                // setpemasukan(pemasukan+dat.nominal)
                masuk += parseInt(dat.nominal)
                sumIncs +=parseInt(dat.nominal)
              }else{
                keluar += parseInt(dat.nominal)
                sumMins +=parseInt(dat.nominal)
            }
          }
          if(selectedValue==='Tanggal'){
            if(enddate.toLocaleDateString()>=dat.dateInput && dat.dateInput>=startdate.toLocaleDateString()){
              if(dat.jenis ==="terima") {
                // setpemasukan(pemasukan+dat.nominal)
                masuk += parseInt(dat.nominal)
                sumIncs +=parseInt(dat.nominal)
              }else{
                keluar += parseInt(dat.nominal)
                sumMins +=parseInt(dat.nominal)
              }
            }
          }
          if(selectedValue==='Bulan'){
            if((startdate.getMonth() + 1<=new Date(dat.dateInput).getMonth() + 1) 
                && (enddate.getMonth() + 1>=new Date(dat.dateInput).getMonth() + 1)
                && (startdate.getFullYear()<=new Date(dat.dateInput).getFullYear())
                && (enddate.getFullYear()>=new Date(dat.dateInput).getFullYear())
                ){
              if(dat.jenis ==="terima") {
                // setpemasukan(pemasukan+dat.nominal)
                masuk += parseInt(dat.nominal)
                sumIncs +=parseInt(dat.nominal)
              }else{
                keluar += parseInt(dat.nominal)
                sumMins +=parseInt(dat.nominal)
              }
            }
          }
          if(selectedValue==='Tahun'){
            if((startdate.getFullYear()<=new Date(dat.dateInput).getFullYear())
            && (enddate.getFullYear()>=new Date(dat.dateInput).getFullYear())){
              if(dat.jenis ==="terima") {
                // setpemasukan(pemasukan+dat.nominal)
                masuk += parseInt(dat.nominal)
                sumIncs +=parseInt(dat.nominal)
              }else{
                keluar += parseInt(dat.nominal)
                sumMins +=parseInt(dat.nominal)
              }
            }
          }
         
        })
        sums.push(sumIncs-sumMins)
        sumIncs = 0
        sumMins=0
      })
      setsum(sums)
      setpemasukan(masuk)
      setpengeluaran(keluar)
  },[data,selectedValue,startdate,enddate])



  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowStartDate(false);
    setstartdate(currentDate);
  };
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setshowEndDate(false);
    setenddate(currentDate);
  };
  const updateIndex= (selectedIndex)=> {
    setselectedIndex(selectedIndex)
  }
  const component1 = () => (
    <TouchableOpacity
      onPress={()=>setShowStartDate(true)}
      style={{flexDirection:'row',alignItems:'center',width:width*0.35, justifyContent:'space-between'}}>
      <Icon name='date-range' color='blue' />
      <View style={{flexDirection:'column'}}>
        <Text>Tanggal Mulai</Text>
        <Text>{startdate.toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  )
  // <Button onPress={showDatepicker} title="Show date picker!"/>
  const component2 = () => (
    <TouchableOpacity 
    onPress={()=> setshowEndDate(true)}
    style={{flexDirection:'row',alignItems:'center',width:width*0.35, justifyContent:'space-between'}}>
      <Icon name='date-range' color='blue' />
      <View style={{flexDirection:'column'}}>
        <Text>Tanggal Akhir</Text>
        <Text>{enddate.toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  )
  // <Button onPress={showTimepicker} title="Show time picker!" />
  const buttons = [{ element: component1 }, { element: component2 }]

    return (
      <View style={[styles.container,{alignItems:'center', backgroundColor:'whitesmoke'}]}>
        <Header
          placement="left"
          leftComponent={<Icon name='arrow-back' color='white' onPress={()=>props.navigation.pop()}/>}
          centerComponent={{ text: 'Detail Laporan Catatan', style: { color: '#fff', fontSize:20, fontWeight:'700' } }}

        />
        {showStartDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={startdate}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChangeStart}
          />
        )}
        {showEndDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={enddate}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChangeEnd}
          />
        )}
        <View style={{borderWidth:0.5,borderRadius:8,width:width*0.95,height:200, marginTop:12, borderColor:'gray',alignItems:'center',justifyContent:'space-around',padding:12,marginBottom:20}}>
          <View style={{flexDirection:'row',width:width*0.9,alignItems:'center',padding:12}}>
            <View style={{width:width*0.45,alignItems:'center',justifyContent:'space-around'}}>
              <Text style={{color:'#3bff9d', fontWeight:'700'}}>Rp. {pemasukan}</Text>
              <Text style={{color:'#3bff9d',fontSize:10,fontWeight:'700'}}>Pemasukan</Text>
            </View>
            <View style={{width:width*0.45,alignItems:'center'}}>
              <Text style={{color:'red', fontWeight:'700'}}>Rp. {pengeluaran}</Text>
              <Text style={{color:'red',fontSize:10,fontWeight:'700'}}>Pengeluaran</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',width:width*0.895,alignItems:'center',justifyContent:'space-around',padding:12, paddingHorizontal:100,backgroundColor:'#eefff7'}}>
              <Text style={{color:pemasukan-pengeluaran<0?'red':'#3bff9d', fontWeight:'700'}}>Untung</Text>
              <Text style={{color:pemasukan-pengeluaran<0?'red':'#3bff9d', fontWeight:'700'}}>Rp. {pemasukan-pengeluaran}</Text>
          </View>
        </View>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{width:width*0.5, textAlign:'center'}}>Pilih Tanggal Laporan</Text>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 50, width: width*0.5 }}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              
            >
              <Picker.Item label="Semua" value="Semua" />
              <Picker.Item label="Tanggal" value="Tanggal" />
              <Picker.Item label="Bulan" value="Bulan" />
              <Picker.Item label="Tahun" value="Tahun" />
            </Picker>
        </View>
        {selectedValue!=='Semua'?
          <View style={{flexDirection:'row'}}>
            <ButtonGroup
              onPress={updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{height: 50,width:width*0.9}}
              selectedButtonStyle={{backgroundColor:'white'}}
              />
          </View>
        :null}
       
            <View style={{flexDirection:'row',width:width,alignItems:'center'}}>
              <Text style={{width:width*0.3,textAlign:'center',color:'black',paddingVertical:12,fontWeight:'700'}}>Catatan</Text>
              <Text style={{width:width*0.4,textAlign:'center',paddingVertical:12, backgroundColor:'#deffee',color:'#3bff9d',fontWeight:'700'}}>Pemasukan</Text>
              <Text style={{width:width*0.3,textAlign:'center',paddingVertical:12,color:'red',fontWeight:'700'}}>Pengeluaran</Text>
            </View>
       
          <View style={{width:width, height:height*0.35,flexDirection:'column',width:width}}>
          <ScrollView>
              {
                data.map((data,ix) =>{
                  return data.history.map((dat,index) =>{ 
                    if(selectedValue==='Semua'){
                        return(
                          <View style={{flexDirection:'row',width:width,alignItems:'center',justifyContent:'center'}}>
                            <View style={{width:width*0.3,alignItems:'center'}}>
                              <Text style={{fontWeight:'700'}}>{dat.nama}</Text>
                              <Text style={{fontSize:10}}>{dat.dateInput}</Text>
                            </View>
                            <View style={{width:width*0.4,alignItems:'center',backgroundColor:'#deffee', paddingVertical:24}}>
                              <Text style={{color:'#3bff9d',fontWeight:'bold'}}>{dat.jenis==='terima'? dat.nominal:'-'}</Text>
                            </View>
                            <View style={{width:width*0.3,alignItems:'center'}}>
                              <Text style={{color:'red',fontWeight:'bold'}}>{dat.jenis==='berikan'? dat.nominal:'-'}</Text>
                            </View>
                          </View>
                        )
                    }   
                    if(selectedValue==='Tanggal'){
                      if(enddate.toLocaleDateString()>=dat.dateInput && dat.dateInput>=startdate.toLocaleDateString()){
                        return(
                          <View style={{flexDirection:'row',width:width,alignItems:'center',justifyContent:'center'}}>
                            <View style={{width:width*0.3,alignItems:'center'}}>
                              <Text style={{fontWeight:'700'}}>{dat.nama}</Text>
                              <Text style={{fontSize:10}}>{dat.dateInput}</Text>
                            </View>
                            <View style={{width:width*0.4,alignItems:'center',backgroundColor:'#deffee', paddingVertical:24}}>
                              <Text style={{color:'#3bff9d',fontWeight:'bold'}}>{dat.jenis==='terima'? dat.nominal:'-'}</Text>
                            </View>
                            <View style={{width:width*0.3,alignItems:'center'}}>
                              <Text style={{color:'red',fontWeight:'bold'}}>{dat.jenis==='berikan'? dat.nominal:'-'}</Text>
                            </View>
                          </View>
                        )
                      }
                    }
                    if(selectedValue==='Bulan'){
                      
                      if(startdate <=new Date(dat.dateInput).getFullYear()<=enddate.getFullYear()){
                        if(
                          (startdate.getMonth() + 1<=new Date(dat.dateInput).getMonth() + 1) 
                          && (enddate.getMonth() + 1>=new Date(dat.dateInput).getMonth() + 1)
                          && (startdate.getFullYear() <=new Date(dat.dateInput).getFullYear() )
                          && (enddate.getFullYear() >=new Date(dat.dateInput).getFullYear())
                          ){
                          return(
                            <View style={{flexDirection:'row',width:width,alignItems:'center',justifyContent:'center'}}>
                              <View style={{width:width*0.3,alignItems:'center'}}>
                                <Text style={{fontWeight:'700'}}>{dat.nama}</Text>
                                <Text style={{fontSize:10}}>{dat.dateInput}</Text>
                              </View>
                              <View style={{width:width*0.4,alignItems:'center',backgroundColor:'#deffee', paddingVertical:24}}>
                                <Text style={{color:'#3bff9d',fontWeight:'bold'}}>{dat.jenis==='terima'? dat.nominal:'-'}</Text>
                              </View>
                              <View style={{width:width*0.3,alignItems:'center'}}>
                                <Text style={{color:'red',fontWeight:'bold'}}>{dat.jenis==='berikan'? dat.nominal:'-'}</Text>
                              </View>
                            </View>
                          )
                        }
                      }
                    }
                    if(selectedValue==='Tahun'){
                      if(startdate.getFullYear() <=new Date(dat.dateInput).getFullYear() && new Date(dat.dateInput).getFullYear()<=enddate.getFullYear()){
                        return(
                          <View style={{flexDirection:'row',width:width,alignItems:'center',justifyContent:'center'}}>
                            <View style={{width:width*0.3,alignItems:'center'}}>
                              <Text style={{fontWeight:'700'}}>{dat.nama}</Text>
                              <Text style={{fontSize:10}}>{dat.dateInput}</Text>
                            </View>
                            <View style={{width:width*0.4,alignItems:'center',backgroundColor:'#deffee', paddingVertical:24}}>
                              <Text style={{color:'#3bff9d',fontWeight:'bold'}}>{dat.jenis==='terima'? dat.nominal:'-'}</Text>
                            </View>
                            <View style={{width:width*0.3,alignItems:'center'}}>
                              <Text style={{color:'red',fontWeight:'bold'}}>{dat.jenis==='berikan'? dat.nominal:'-'}</Text>
                            </View>
                          </View>
                        )
                      }
                    } 
                    
                  
                  })
                })
              }
              
        </ScrollView>
          </View>
      </View>
    )
}

const mapStateToProps = (state) => {
  // console.log(state.local.payload[0].history)
  return {
    data: state.local.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(DataLocalRedux),dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(DetailLaporanScreen)
