// @flow

import React, { useEffect, useState } from 'react'
import { Text, View, Dimensions, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native'
import { Picker } from '@react-native-community/picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DataLocalRedux from '../Redux/DataLocalRedux'
import CurrencyInput from 'react-native-currency-input'
import DateTimePicker from '@react-native-community/datetimepicker'
// I18n
import { CheckBox, Header, Icon } from 'react-native-elements'
import { bindActionCreators } from 'redux'

import ListTypeRedux from '../Redux/ListTypeRedux'

function UtangPiutang (props) {
  const {width, height} = Dimensions.get('screen')
  const [selected, setselected] = useState('berikan')
  const [pelanggan, setPelanggan] = useState('')
  const [value, setValue] = useState('')
  const [catatan, setcatatan] = useState('')
  const [submitted, setsubmitted] = useState(true)
  const [type, setType] = useState()
  const [typeLainnya, settypeLainnya] = useState()
  const [startdate, setstartdate] = useState(new Date())
  const [showStartDate, setShowStartDate] = useState(false)
  const [collection, setCollection] = useState([])

  useEffect(()=>{
    props.listTypeRequest()
  },[])

  useEffect(()=>{
    // console.log(props.listType)
    setCollection(props.listType)
  },[props.listType])
  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || new Date()
    setShowStartDate(false)
    setstartdate(currentDate)
  }

  const Submit = () => {
    setsubmitted(false)
    const {data} = props
    let val = []
    let selectedData = []
    if (pelanggan && value) {
      if (data.length > 0) {
        data.map(dat => {
          val.push(dat)
        })
        data.map((dat, index) => {
          if (dat.nama === pelanggan.trim()) {
            selectedData.push(dat)
            selectedData.push(index)
          }
        })
        if (selectedData.length > 0) {
          let stat = selected
          let nominal = parseInt(selectedData[0].nominal) + parseInt(selectedData[0].jenis === stat ? parseInt(value) : -parseInt(value))
          if (nominal < 0) {
            nominal = nominal * -1
          }

          let stat2 = stat === selectedData[0].jenis
         ? stat
         : parseInt(value) > parseInt(selectedData[0].nominal)
         ? stat
         : stat === 'berikan' ? 'terima' : 'berikan'

          let his = selectedData.length > 0
           ? [
             ...selectedData[0].history,
             {
               'nama': pelanggan.trim(),
               'nominal': value,
               'jenis': stat,
               'catatan': catatan,
               'dateInput': startdate.toLocaleDateString(),
               'type':type==='Lain-lain'?typeLainnya:type
             }
           ]
       : [
         {
           'nama': pelanggan.trim(),
           'nominal': value,
           'jenis': stat,
           'catatan': catatan,
           'dateInput': startdate.toLocaleDateString(),
           'type':type==='Lain-lain'?typeLainnya:type
         }
       ]
          let dataa = {
            'nama': pelanggan.trim(),
            'nominal': nominal,
            'jenis': stat2,
            'history': his,
            'firstUpdata': selectedData.length > 0 ? selectedData[0].firstUpdata : startdate.toLocaleDateString(),
            'lastUpdate': startdate.toLocaleDateString(),
            'type':type==='Lain-lain'?typeLainnya:type

          }
          val[selectedData[1]] = dataa
       // alert(JSON.stringify( selectedData))
          props.dataLocalSuccess(val)
          props.navigation.goBack()
          selectedData.pop()
          selectedData.pop()
        } else {
          props.dataLocalSuccess([
            ...data,
            {
              'nama': pelanggan.trim(),
              'nominal': value,
              'jenis': selected,
              history: [
                {
                  'nama': pelanggan.trim(),
                  'nominal': value,
                  'jenis': selected,
                  'catatan': catatan,
                  'dateInput': startdate.toLocaleDateString(),
                  'type':type==='Lain-lain'?typeLainnya:type
                }
              ],
              firstUpdata: startdate.toLocaleDateString(),
              lastUpdate: startdate.toLocaleDateString()
            }
          ])
          props.navigation.goBack()
        }
      } else {
        props.dataLocalSuccess([
          {
            'nama': pelanggan.trim(),
            'nominal': value,
            'jenis': selected,
            history: [
              {
                'nama': pelanggan.trim(),
                'nominal': value,
                'jenis': selected,
                'catatan': catatan,
                'dateInput': startdate.toLocaleDateString(),
                'type':type==='Lain-lain'?typeLainnya:type
              }
            ],
            firstUpdata: startdate.toLocaleDateString(),
            lastUpdate: startdate.toLocaleDateString()
          }
        ])
        setsubmitted(true)
        props.navigation.goBack()
      }
    } else {
      setsubmitted(true)
      Alert.alert('ERROR', 'Mohon isi form di bawa terlebih dahulu')
    }
  }
  return (
    <KeyboardAwareScrollView extraScrollHeight={height*0.5}>
      <View style={[{height: type==='Lain-lain'?height*1.15:height*1.05, width: width, flexDirection: 'column', alignItems: 'center'}]}>
        <Header
          placement='left'
          leftComponent={<Icon name='arrow-back' color='white' onPress={() => props.navigation.pop()} />}
          centerComponent={{ text: 'Utang Piutang Baru', style: { color: '#fff', fontSize: width * 0.035, fontWeight: '700' } }}

        />

        <ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', width: width, padding: 12}}>
            <TouchableOpacity
              onPress={() => setselected('berikan')}
              style={{width: width * 0.45, alignItems: 'center', flexDirection: 'row', backgroundColor: selected === 'berikan' ? 'red' : 'lightgray', padding: 4, borderRadius: 4}}>
              <CheckBox
                center
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor={selected === 'berikan' ? 'white' : 'white'}
                uncheckedColor='white'
                checked={selected === 'berikan'}
            />
              <Text style={{color: 'white', fontSize: width * 0.035}}>Berikan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setselected('terima')}
              style={{width: width * 0.45, alignItems: 'center', flexDirection: 'row', backgroundColor: selected === 'terima' ? '#7cfc00' : 'lightgray', padding: 4, borderRadius: 4}}>
              <CheckBox
                center
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor={selected === 'terima' ? 'white' : 'white'}
                uncheckedColor='white'
                checked={selected === 'terima'}
            />
              <Text style={{color: 'white', fontSize: width * 0.035}}>Terima</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            width:width*0.94,margin: 12, borderWidth: 1, borderColor: '#3498DB', height: 100, borderRadius: 8, flexDirection: 'row', backgroundColor: '#F7FCFF', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 16}}>
            <Icon name='account-circle' color='blue' size={32} />
            <View style={{flexDirection: 'column'}}>
              <TextInput
                placeholder='Nama Pelanggan'
                onChangeText={text => setPelanggan(text)}
                placeholderTextColor={selected === 'berikan' ? 'red' : 'green'}
                value={pelanggan}
                numberOfLines={1}
                maxLength={40}
                style={{borderBottomWidth: 0.7, width: width * 0.75, height: 48, color: selected === 'berikan' ? 'red' : 'green', fontSize: width * 0.035}}
              />
            </View>
            {/* <Icon name='chevron-right' color='blue' size={30}/> */}
          </View>
          <View style={{
            width: width, flexDirection: 'row', alignItems: 'center'
          }}>
            <Icon name='chevron-right' color={selected === 'berikan' ? 'red' : 'green'} size={30} style={{width: 40}} />
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: width * 0.035}}>{selected === 'berikan' ? 'Memberikan' : 'Menerima'}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: width * 0.035, color: selected === 'berikan' ? 'red' : 'green'}}>Rp. </Text>
                {/* <TextInput
              placeholder='0'
              onChangeText={text => onChangeText(parseInt(text))}
              keyboardType='numeric'
              placeholderTextColor={selected === 'berikan' ? 'red' : 'green'}
              value={value}
              numberOfLines={1}
              maxLength={12}
              style={{borderBottomWidth: 0.7, width: width * 0.75, height: 48, color: selected === 'berikan' ? 'red' : 'green', fontSize: 24}}
              />   */}
                <CurrencyInput
                  value={value}
                  onChangeValue={setValue}
              // unit="Rp. "
                  delimiter=','
                  separator='.'
                  precision={2}
                  onChangeText={(formattedValue) => {
                    console.log(formattedValue) // $2,310.46
                  }}
                  style={{borderBottomWidth: 0.7, width: width * 0.75, height: 48, color: selected === 'berikan' ? 'red' : 'green', fontSize: width * 0.035, marginBottom: -12}}
            />
              </View>

            </View>
          </View>
          <View style={{
            width: width*0.9, alignItems: 'flex-start', marginHorizontal: 20,marginTop: 32, borderWidth:0.7, borderRadius:12
          }}>
            <TouchableOpacity
              onPress={() => setShowStartDate(true)}
              style={{flexDirection: 'row', alignItems: 'center', width: width * 0.35, justifyContent: 'space-between', margin:20,}}>
              <Icon name='date-range' color='blue' />
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: width * 0.035}}>Tanggal Mulai</Text>
                <Text style={{fontSize: width * 0.035}}>{startdate.toLocaleDateString()}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{
            width: width*0.9, flexDirection: 'column', alignItems: 'flex-start', marginHorizontal: 20, borderWidth:0.7, borderRadius:12,marginTop: 24
          }}>
            <Text style={{fontSize: width * 0.035,marginTop: 8, paddingHorizontal:20}}>Type</Text>
            <Picker
                selectedValue={type}
                style={{height: 50, minWidth:200, marginLeft:12}}
                onValueChange={(itemValue, itemIndex) =>
                  setType(itemValue)
                }>
                  {
                    collection.length>0 && collection.map(data =>(
                      <Picker.Item label={data.category} value={data.category} />
                    ))
                  }
                {/* <Picker.Item label="Lainnya" value="Lain-lain" /> */}
            </Picker>
            {
              type ==='Lain-lain' ?
              <TextInput
                placeholder='Type'
                onChangeText={text => settypeLainnya(text)}
                keyboardType='default'
            // placeholderTextColor={selected === 'berikan' ? 'red' : 'green'}
                value={typeLainnya}
                multiline
                style={{borderWidth: 0.7, borderRadius:12 , width: width * 0.84, minHeight: 50, maxHeight: 50, color: 'black', fontSize: width * 0.035, margin:12}}
              />:null
            }
            
          </View>
          <View style={{
            width: width, flexDirection: 'row', alignItems: 'center'
          }}>
            {/* <Icon name='chevron-right' color={selected === 'berikan' ? 'red' : 'green'} size={30} style={{width: 40}} /> */}
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: width * 0.035, marginHorizontal: 40, marginTop: 24}}>Catatan</Text>
              <TextInput
                placeholder='catatan'
                onChangeText={text => setcatatan(text)}
                keyboardType='default'
            // placeholderTextColor={selected === 'berikan' ? 'red' : 'green'}
                value={catatan}
                multiline
                style={{borderWidth: 0.7, width: width * 0.875, minHeight: 150, maxHeight: 400, color: 'black', fontSize: width * 0.035, margin: 20, borderRadius:12}}
            />
            </View>
          </View>
          <View style={{width: width, alignItems: 'center', marginBottom: height*0.1}}>
            <TouchableOpacity
              onPress={() => submitted ? Submit() : null}
              style={{ width: width * 0.9, backgroundColor: '#ffbf00', height: 48, justifyContent: 'center', alignItems: 'center', borderRadius: 8, fontSize: width * 0.035 }}>
              <Text style={{color: 'white', fontWeight: '700'}}>Simpan Utang Piutang</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {showStartDate && (
          <DateTimePicker
            testID='dateTimePicker'
            value={startdate}
            mode={'date'}
            is24Hour
            display='default'
            onChange={onChangeStart}
            style={{fontSize: width * 0.035}}
              />
            )}
    </KeyboardAwareScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.local.payload,
    listType: state.listType.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(DataLocalRedux,ListTypeRedux), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UtangPiutang)
