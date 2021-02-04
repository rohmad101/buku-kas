import { Picker } from '@react-native-community/picker'
import React, { useState, useEffect } from 'react'
import { Dimensions, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { ButtonGroup, Header, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DateTimePicker from '@react-native-community/datetimepicker'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DataLocalRedux from '../Redux/DataLocalRedux'

// Styles
import styles from './Styles/DetailLaporanScreenStyle'
import RNFetchBlob from 'rn-fetch-blob'
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions'
import Pdf from 'react-native-pdf'
import { currencyFormat } from '../Transforms/currency'

function DetailLaporanScreen (props) {
  const [pemasukan, setpemasukan] = useState(0)
  const [pengeluaran, setpengeluaran] = useState(0)
  const {width, height} = Dimensions.get('screen')
  const [selectedValue, setSelectedValue] = useState('Semua')
  const [startdate, setstartdate] = useState(new Date())
  const [enddate, setenddate] = useState(new Date())
  const [showStartDate, setShowStartDate] = useState(false)
  const [showEndDate, setshowEndDate] = useState(false)
  const [selectedIndex, setselectedIndex] = useState(0)
  const [totalTransaksi, settotalTransaksi] = useState(0)
  const [totalTransaksiTerima, settotalTransaksiTerima] = useState(0)
  const [totalTransaksiPengeluaran, settotalTransaksiPengeluaran] = useState(0)
  const [dataForDownload, setdataForDownload] = useState([])
  const [uriPDF, setPDF] = useState('')
  const { data } = props
  const dateFormat = require('dateformat')

  const downloadPDF = async() => {
    await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(() => {
          // …
    })
    await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log('This feature is not available (on this device / in this context)')
              break
            case RESULTS.DENIED:
              console.log('The permission has not been requested / is denied but requestable')
              break
            case RESULTS.LIMITED:
              console.log('The permission is limited: some actions are possible')
              break
            case RESULTS.GRANTED:
              console.log('The permission is granted')

              config({
                // add this option that makes response data to be stored as a file,
                // this is much more performant.
                fileCache: true,
                path: downloads + '/laporanbukukas.pdf',
                overwrite: true,
                indicator: true,
                addAndroidDownloads: {
                  // Show notification when response data transmitted
                  notification: true,
                  // Title of download notification
                  title: 'Laporan Dokumen BukuKas Berhasil!',
                  // File description (not notification description)
                  description: downloads + '/laporanbukukas.pdf',
                  // Make the file scannable  by media scanner
                  mediaScannable: false

                }
              })
              .fetch('POST', URL + 'mt/dynamic_pdf/pdf', {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              JSON.stringify({
                'range_tanggal': startdate.toLocaleDateString() + ' - ' + enddate.toLocaleDateString(),
                'data': dataForDownload
              })
              ).then((res) => {
                // the temp file path
                setPDF(res.path())
                // console.log('The file saved to ', res.path())
                // Alert.alert(
                //   "Unduh Laporan berhasil",
                //   "Apakah ingin membuka laporan ?",
                //   [
                //     {
                //       text: "Cancel",
                //       onPress: () => console.log("Cancel Pressed"),
                //       style: "cancel"
                //     },
                //     { text: "OK", onPress: () => RNFS.readFile(res.path()) }
                //   ],
                //   { cancelable: false }
                // )
              })
              break
            case RESULTS.BLOCKED:
              console.log('The permission is denied and not requestable anymore')
              break
          }
        })
        .catch(() => {
          // …
        })
  }
  useEffect(() => {
    setpemasukan(0)
    setpengeluaran(0)
  }, [])
  useEffect(() => {
    let masuk = 0
    let keluar = 0
    let totalTransaksi = 0
    let totalTerima = 0
    let totalPengeluaran = 0
    // let sumMins = 0
    // let sumIncs = 0
    let dataDownload = []
    data.map((data) => {
      data.history.map(dat => {
        if (selectedValue === 'Semua') {
          if (dat.jenis === 'terima') {
            masuk += parseInt(dat.nominal)
            totalTerima += 1
            totalTransaksi += 1
            dataDownload.push({
              'no': dataDownload.length + 1,
              'tanggal_transaksi': dat.dateInput,
              'nama_pelanggan': dat.nama,
              'catatan': dat.catatan ? dat.catatan : '',
              'terima': dat.jenis === 'berikan' ? 0 : dat.nominal,
              'berikan': dat.jenis === 'berikan' ? dat.nominal : 0
            })
          } else {
            keluar += parseInt(dat.nominal)
            totalPengeluaran += 1
            totalTransaksi += 1
            dataDownload.push({
              'no': dataDownload.length + 1,
              'tanggal_transaksi': dat.dateInput,
              'nama_pelanggan': dat.nama,
              'catatan': dat.catatan ? dat.catatan : '',
              'terima': dat.jenis === 'berikan' ? 0 : dat.nominal,
              'berikan': dat.jenis === 'berikan' ? dat.nominal : 0
            })
          }
        }
        if (selectedValue === 'Tanggal') {
          if (dateFormat(enddate, 'yyyy-mm-dd') >= dateFormat(dat.dateInput, 'yyyy-mm-dd') && dateFormat(dat.dateInput, 'yyyy-mm-dd') >= dateFormat(startdate, 'yyyy-mm-dd')) {
            if (dat.jenis === 'terima') {
              masuk += parseInt(dat.nominal)
              totalTerima += 1
              totalTransaksi += 1
              dataDownload.push({
                'no': dataDownload.length + 1,
                'tanggal_transaksi': dat.dateInput,
                'nama_pelanggan': dat.nama,
                'catatan': dat.catatan ? dat.catatan : '',
                'terima': dat.jenis === 'berikan' ? 0 : dat.nominal,
                'berikan': dat.jenis === 'berikan' ? dat.nominal : 0
              })
            } else {
              keluar += parseInt(dat.nominal)
              totalPengeluaran += 1
              totalTransaksi += 1
              dataDownload.push({
                'no': dataDownload.length + 1,
                'tanggal_transaksi': dat.dateInput,
                'nama_pelanggan': dat.nama,
                'catatan': dat.catatan ? dat.catatan : '',
                'terima': dat.jenis === 'berikan' ? 0 : dat.nominal,
                'berikan': dat.jenis === 'berikan' ? dat.nominal : 0
              })
            }
          }
        }
        if (selectedValue === 'Bulan') {
          if (dateFormat(enddate, 'yyyy-mm') >= dateFormat(dat.dateInput, 'yyyy-mm') && dateFormat(dat.dateInput, 'yyyy-mm') >= dateFormat(startdate, 'yyyy-mm')) {
            if (dat.jenis === 'terima') {
              masuk += parseInt(dat.nominal)
              totalTerima += 1
              totalTransaksi += 1
              dataDownload.push({
                'no': dataDownload.length + 1,
                'tanggal_transaksi': dat.dateInput,
                'nama_pelanggan': dat.nama,
                'catatan': dat.catatan ? dat.catatan : '',
                'terima': dat.jenis === 'berikan' ? 0 : dat.nominal,
                'berikan': dat.jenis === 'berikan' ? dat.nominal : 0
              })
            } else {
              keluar += parseInt(dat.nominal)
              totalPengeluaran += 1
              totalTransaksi += 1
              dataDownload.push({
                'no': dataDownload.length + 1,
                'tanggal_transaksi': dat.dateInput,
                'nama_pelanggan': dat.nama,
                'catatan': dat.catatan ? dat.catatan : '',
                'terima': dat.jenis === 'berikan' ? 0 : dat.nominal,
                'berikan': dat.jenis === 'berikan' ? dat.nominal : 0
              })
            }
          }
        }
        if (selectedValue === 'Tahun') {
          if (dateFormat(enddate, 'yyyy') >= dateFormat(dat.dateInput, 'yyyy') && dateFormat(dat.dateInput, 'yyyy') >= dateFormat(startdate, 'yyyy')) {
            if (dat.jenis === 'terima') {
              masuk += parseInt(dat.nominal)
              totalTerima += 1
              totalTransaksi += 1
              dataDownload.push({
                'no': dataDownload.length + 1,
                'tanggal_transaksi': dat.dateInput,
                'nama_pelanggan': dat.nama,
                'catatan': dat.catatan ? dat.catatan : '',
                'terima': dat.jenis === 'berikan' ? 0 : dat.nominal,
                'berikan': dat.jenis === 'berikan' ? dat.nominal : 0
              })
            } else {
              keluar += parseInt(dat.nominal)
              totalPengeluaran += 1
              totalTransaksi += 1
              dataDownload.push({
                'no': dataDownload.length + 1,
                'tanggal_transaksi': dat.dateInput,
                'nama_pelanggan': dat.nama,
                'catatan': dat.catatan ? dat.catatan : '',
                'terima': dat.jenis === 'berikan' ? 0 : dat.nominal,
                'berikan': dat.jenis === 'berikan' ? dat.nominal : 0
              })
            }
          }
        }
      })
    })
    setpemasukan(masuk)
    setpengeluaran(keluar)
    settotalTransaksi(totalTransaksi)
    settotalTransaksiTerima(totalTerima)
    settotalTransaksiPengeluaran(totalPengeluaran)
    setdataForDownload(dataDownload)
    console.log('dataDownload', dataDownload)
  }, [data, selectedValue, startdate, enddate])

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || new Date()
    setShowStartDate(false)
    if (currentDate > enddate) {
      setenddate(currentDate)
    }
    setstartdate(currentDate)
  }
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || new Date()
    setshowEndDate(false)
    if (currentDate < startdate) {
      setstartdate(currentDate)
    }
    setenddate(currentDate)
  }
  const updateIndex = (selectedIndex) => {
    setselectedIndex(selectedIndex)
  }
  const component1 = () => (
    <TouchableOpacity
      onPress={() => setShowStartDate(true)}
      style={{flexDirection: 'row', alignItems: 'center', width: width * 0.35, justifyContent: 'space-between'}}>
      <Icon name='date-range' color='blue' />
      <View style={{flexDirection: 'column'}}>
        <Text style={{fontSize: width * 0.035}}>Tanggal Mulai</Text>
        <Text style={{fontSize: width * 0.035}}>{startdate.toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  )
  // <Button onPress={showDatepicker} title="Show date picker!"/>
  const component2 = () => (
    <TouchableOpacity
      onPress={() => setshowEndDate(true)}
      style={{flexDirection: 'row', alignItems: 'center', width: width * 0.35, justifyContent: 'space-between'}}>
      <Icon name='date-range' color='blue' />
      <View style={{flexDirection: 'column'}}>
        <Text style={{fontSize: width * 0.035}}>Tanggal Akhir</Text>
        <Text style={{fontSize: width * 0.035}}>{enddate.toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  )
  // <Button onPress={showTimepicker} title="Show time picker!" />
  const buttons = [{ element: component1 }, { element: component2 }]

  const { config, fs } = RNFetchBlob
  const downloads = fs.dirs.DownloadDir
  const URL = 'https://hercules.aturtoko.id/mytoko/public/'

  if (uriPDF) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25
      }}>
        <Pdf
          source={{uri: uriPDF}}
          onLoadComplete={(numberOfPages) => {
            console.log(`number of pages: ${numberOfPages}`)
          }}
          onPageChanged={(page) => {
            console.log(`current page: ${page}`)
          }}
          onError={(error) => {
            console.log(error)
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`)
          }}
          style={{
            flex: 1,
            width: width,
            height: height,
            fontSize: width * 0.035
          }} />
      </View>
    )
  }
  return (
    <View style={[styles.container, {alignItems: 'center', backgroundColor: 'whitesmoke'}]}>
      <Header
        placement='left'
        leftComponent={<Icon name='arrow-back' color='white' onPress={() => props.navigation.pop()} />}
        centerComponent={{ text: 'Detail Laporan Catatan', style: { color: '#fff', fontSize: width * 0.035, fontWeight: '700' } }}

        />
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
      {showEndDate && (
      <DateTimePicker
        testID='dateTimePicker'
        value={enddate}
        mode={'date'}
        is24Hour
        display='default'
        onChange={onChangeEnd}
        style={{fontSize: width * 0.035}}
          />
        )}

      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <View style={{borderWidth: 0.5, borderRadius: 8, width: width * 0.95, height: height * 0.275, marginTop: 12, borderColor: 'gray', alignItems: 'center', justifyContent: 'space-around'}}>
            <View style={{flexDirection: 'row', width: width, alignItems: 'center', padding: 12}}>
              <View style={{width: width * 0.45, alignItems: 'center', justifyContent: 'space-around'}}>
                <Text style={{color: 'green', fontWeight: '700', fontSize: width * 0.035}}> {currencyFormat(parseInt(pemasukan))}</Text>
                <Text style={{color: 'green', fontSize: width * 0.035, fontWeight: '700'}}>Pemasukan</Text>
              </View>
              <View style={{width: width * 0.45, alignItems: 'center'}}>
                <Text style={{color: 'red', fontWeight: '700', fontSize: width * 0.035}}> {currencyFormat(parseInt(pengeluaran))}</Text>
                <Text style={{color: 'red', fontSize: width * 0.035, fontWeight: '700'}}>Pengeluaran</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center', padding: 12, backgroundColor: '#deffee'}}>
              <Text style={{color: pemasukan - pengeluaran < 0 ? 'red' : 'green', fontWeight: '700', fontSize: width * 0.035}}>Untung</Text>
              <View style={{width: width * 0.05}} />
              <Text style={{color: pemasukan - pengeluaran < 0 ? 'red' : 'green', fontWeight: '700', fontSize: width * 0.035}}> {currencyFormat(parseInt(pemasukan - pengeluaran))}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{width: width * 0.5, textAlign: 'center', fontSize: width * 0.035}}>Pilih Tanggal Laporan</Text>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 50, width: width * 0.5 }}
              itemStyle={{ fontSize: width * 0.02 }}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}

              >
              <Picker.Item label='Semua' value='Semua' />
              <Picker.Item label='Tanggal' value='Tanggal' />
              <Picker.Item label='Bulan' value='Bulan' />
              <Picker.Item label='Tahun' value='Tahun' />
            </Picker>
          </View>
        </View>
        {selectedValue !== 'Semua'
          ? <View style={{flexDirection: 'row'}}>
            <ButtonGroup
              onPress={updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{height: 50, width: width * 0.9}}
              selectedButtonStyle={{backgroundColor: 'white'}}
              />
          </View>
        : null}

        <View style={{flexDirection: 'row', width: width, alignItems: 'center'}}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{width: width * 0.3, textAlign: 'center', color: 'black', paddingVertical: 12, fontWeight: '700', fontSize: width * 0.035}}>Catatan</Text>
            <Text style={{color: 'grey', fontSize: width * 0.035}}>{totalTransaksi} Transaksi</Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center', backgroundColor: '#deffee'}}>
            <Text style={{width: width * 0.4, textAlign: 'center', paddingVertical: 12, backgroundColor: '#deffee', color: 'green', fontWeight: '700', fontSize: width * 0.035}}>Pemasukan</Text>
            <Text style={{color: 'grey', fontSize: width * 0.035}}>{totalTransaksiTerima} Transaksi</Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{width: width * 0.3, textAlign: 'center', paddingVertical: 12, color: 'red', fontWeight: '700', fontSize: width * 0.035}}>Pengeluaran</Text>
            <Text style={{color: 'grey', fontSize: width * 0.035}}>{totalTransaksiPengeluaran} Transaksi</Text>
          </View>
        </View>
        <View style={{width: width, height: selectedValue === 'Semua' ? height * 0.45 + 50 : height * 0.5, flexDirection: 'column'}}>
          {
                data.map((data) => {
                  return data.history.map((dat) => {
                    if (selectedValue === 'Semua') {
                      return (
                        <View style={{flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center'}}>
                          <View style={{width: width * 0.3, alignItems: 'center'}}>
                            <Text style={{ fontWeight: '700', fontSize: width * 0.035 }}>{dat.nama}</Text>
                            <Text style={{ fontSize: width * 0.035 }}>{dat.dateInput}</Text>
                          </View>
                          <View style={{ width: width * 0.4, alignItems: 'center', backgroundColor: '#deffee', paddingVertical: 24 }}>
                            <Text style={{ color: 'green', fontWeight: 'bold', fontSize: width * 0.035 }}>{dat.jenis === 'terima' ? currencyFormat(parseInt(dat.nominal)) : '-'}</Text>
                          </View>
                          <View style={{ width: width * 0.3, alignItems: 'center' }}>
                            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: width * 0.035 }}>{dat.jenis === 'berikan' ? currencyFormat(parseInt(dat.nominal)) : '-'}</Text>
                          </View>
                        </View>
                      )
                    }
                    if (selectedValue === 'Tanggal') {
                      if (dateFormat(enddate, 'yyyy-mm-dd') >= dateFormat(dat.dateInput, 'yyyy-mm-dd') && dateFormat(dat.dateInput, 'yyyy-mm-dd') >= dateFormat(startdate, 'yyyy-mm-dd')) {
                        return (
                          <View style={{flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{width: width * 0.3, alignItems: 'center'}}>
                              <Text style={{ fontWeight: '700', fontSize: width * 0.035 }}>{dat.nama}</Text>
                              <Text style={{ fontSize: width * 0.035 }}>{dat.dateInput}</Text>
                            </View>
                            <View style={{ width: width * 0.4, alignItems: 'center', backgroundColor: '#deffee', paddingVertical: 24 }}>
                              <Text style={{ color: 'green', fontWeight: 'bold', fontSize: width * 0.035 }}>{dat.jenis === 'terima' ? currencyFormat(parseInt(dat.nominal)) : '-'}</Text>
                            </View>
                            <View style={{width: width * 0.3, alignItems: 'center'}}>
                              <Text style={{ color: 'red', fontWeight: 'bold', fontSize: width * 0.035 }}>{dat.jenis === 'berikan' ? currencyFormat(parseInt(dat.nominal)) : '-'}</Text>
                            </View>
                          </View>
                        )
                      }
                    }
                    if (selectedValue === 'Bulan') {
                      if (dateFormat(enddate, 'yyyy-mm') >= dateFormat(dat.dateInput, 'yyyy-mm') && dateFormat(dat.dateInput, 'yyyy-mm') >= dateFormat(startdate, 'yyyy-mm')) {
                        return (
                          <View style={{ flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: width * 0.3, alignItems: 'center' }}>
                              <Text style={{ fontWeight: '700', fontSize: width * 0.035 }}>{dat.nama}</Text>
                              <Text style={{ fontSize: width * 0.035 }}>{dat.dateInput}</Text>
                            </View>
                            <View style={{ width: width * 0.4, alignItems: 'center', backgroundColor: '#deffee', paddingVertical: 24 }}>
                              <Text style={{ color: 'green', fontWeight: 'bold', fontSize: width * 0.035 }}>{dat.jenis === 'terima' ? currencyFormat(parseInt(dat.nominal)) : '-'}</Text>
                            </View>
                            <View style={{width: width * 0.3, alignItems: 'center'}}>
                              <Text style={{ color: 'red', fontWeight: 'bold', fontSize: width * 0.035 }}>{dat.jenis === 'berikan' ? currencyFormat(parseInt(dat.nominal)) : '-'}</Text>
                            </View>
                          </View>
                        )
                      }
                    }
                    if (selectedValue === 'Tahun') {
                      if (dateFormat(enddate, 'yyyy') >= dateFormat(dat.dateInput, 'yyyy') && dateFormat(dat.dateInput, 'yyyy') >= dateFormat(startdate, 'yyyy')) {
                        return (
                          <View style={{flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{width: width * 0.3, alignItems: 'center'}}>
                              <Text style={{ fontWeight: '700' }}>{dat.nama}</Text>
                              <Text style={{ fontSize: width * 0.035 }}>{dat.dateInput}</Text>
                            </View>
                            <View style={{width: width * 0.4, alignItems: 'center', backgroundColor: '#deffee', paddingVertical: 24}}>
                              <Text style={{ color: 'green', fontWeight: 'bold', fontSize: width * 0.035 }}>{dat.jenis === 'terima' ? currencyFormat(parseInt(dat.nominal)) : '-'}</Text>
                            </View>
                            <View style={{width: width * 0.3, alignItems: 'center'}}>
                              <Text style={{ color: 'red', fontWeight: 'bold', fontSize: width * 0.035 }}>{dat.jenis === 'berikan' ? currencyFormat(parseInt(dat.nominal)) : '-'}</Text>
                            </View>
                          </View>
                        )
                      }
                    }
                  })
                })
              }
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => downloadPDF()}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 5,
          width: width * 0.5,
          height: 50,
          backgroundColor: '#FBB117',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text
          style={{
            color: 'white', fontSize: width * 0.035, fontWeight: '600'
          }}>
                Unduh Laporan
              </Text>
      </TouchableOpacity>

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
  return bindActionCreators(Object.assign(DataLocalRedux), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailLaporanScreen)
