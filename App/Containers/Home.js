// @flow

import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DataLocalRedux from '../Redux/DataLocalRedux'

// Styles
import styles from './Styles/HomeStyle'

// I18n
import I18n from 'react-native-i18n'
import { Header, Icon, Image } from 'react-native-elements'
import { DrawerActions } from 'react-navigation-drawer'
import { View } from 'react-native-animatable'
import { bindActionCreators } from 'redux'

function HomeScreen (props) {
  const [pemasukan,setpemasukan]=useState(0)
  const [pengeluaran,setpengeluaran]=useState(0)
  const {width,height}=Dimensions.get('screen')
  const [sum, setsum] = useState([])
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
          if(dat.jenis ==="terima") {
            // setpemasukan(pemasukan+dat.nominal)
            masuk += parseInt(dat.nominal)
            sumIncs +=parseInt(dat.nominal)
          }else{
            keluar += parseInt(dat.nominal)
            sumMins +=parseInt(dat.nominal)
          }
        })
        sums.push(sumIncs-sumMins)
        sumIncs = 0
        sumMins=0
      })
      setsum(sums)
      setpemasukan(masuk)
      setpengeluaran(keluar)
  },[data])
  const HistoryData =()=>{
   
    return(
      <View style={[styles.container,{alignItems:'center'}]}>
        <Header
          placement="left"
          leftComponent={<Icon name='menu' color='white' onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}/>}
          centerComponent={{ text: 'Home', style: { color: '#fff' } }}
        />
        <View style={{borderWidth:0.5,borderRadius:8,width:width*0.9,height:200, marginTop:24, borderColor:'gray',alignItems:'center',justifyContent:'space-around',padding:12}}>
          <View style={{flexDirection:'row',width:width*0.9,alignItems:'center',padding:12}}>
            <View style={{width:width*0.45,alignItems:'center',justifyContent:'space-around'}}>
              <Text style={{fontSize:10}}>Pemasukan</Text>
              <Text style={{color:'#3bff9d', fontWeight:'700'}}>Rp. {pemasukan}</Text>
            </View>
            <View style={{width:width*0.45,alignItems:'center'}}>
              <Text style={{fontSize:10}}>Pengeluaran</Text>
              <Text style={{color:'red', fontWeight:'700'}}>Rp. {pengeluaran}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',width:width*0.895,alignItems:'center',justifyContent:'space-between',padding:12,backgroundColor:'#eefff7'}}>
              <Text style={{color:pemasukan-pengeluaran<0?'red':'#3bff9d', fontWeight:'700'}}>Untung</Text>
              <Text style={{color:pemasukan-pengeluaran<0?'red':'#3bff9d', fontWeight:'700'}}>Rp. {pemasukan-pengeluaran}</Text>
          </View>
          <View style={{flexDirection:'row',width:width*0.9,alignItems:'center',justifyContent:'space-between',padding:12}}>
              <View style={{flexDirection:'row'}}>
                <Icon name='menu' color='black' style={{paddingHorizontal:12}}/>
                <Text style={{fontSize:12}}>Lihat Laporan Keuangan</Text>
              </View>
              <Text>{'>'}</Text>
          </View>
        </View>
        <ScrollView>
          <View style={{width:width, height:height*0.7}}>
            {
              data.map((data,ix) =>{
                let current = data.history[0].dateInput
                return data.history.map((dat,index) =>{      
                  return(
                  <View style={{flexDirection:'column',width:width,paddingTop:12}}>
                    {index===0 && current === dat.dateInput?
                    <View style={{flexDirection:'row',width:width,alignItems:'center',justifyContent:'space-between',backgroundColor:'whitesmoke',height:40}}>
                      <Text style={{width:width*0.3,textAlign:'center',color:'grey'}}>{dat.dateInput}</Text>
                      <Text style={{width:width*0.5,textAlign:'center',color:sum[ix]<0?'red':'#3bff9d'}}>Untung Rp. {sum[ix]}</Text>
                    </View>:null
                    }
                    {index===0?
                    <View style={{flexDirection:'row',width:width,alignItems:'center',paddingVertical:12}}>
                      <Text style={{width:width*0.3,textAlign:'center',color:'grey'}}>Catatan</Text>
                      <Text style={{width:width*0.4,textAlign:'center',color:'grey'}}>Pemasukan</Text>
                      <Text style={{width:width*0.3,textAlign:'center',color:'grey'}}>Pengeluaran</Text>
                    </View>:null
                    }
                    
                    <View style={{flexDirection:'row',width:width,alignItems:'center',justifyContent:'center'}}>
                      <View style={{width:width*0.3,alignItems:'center'}}>
                        <Text>{dat.nama}</Text>
                      </View>
                      <View style={{width:width*0.4,alignItems:'center'}}>
                        <Text style={{color:'#3bff9d'}}>{dat.jenis==='terima'? dat.nominal:'-'}</Text>
                      </View>
                      <View style={{width:width*0.3,alignItems:'center'}}>
                        <Text style={{color:'red'}}>{dat.jenis==='berikan'? dat.nominal:'-'}</Text>
                      </View>
                    </View>
                    
                  </View>
                  )
                 
                })
              })
            }
            {/* <Text>{history}</Text> */}
          </View>
          </ScrollView>
         {/* floating button at bottom */}
         <TouchableOpacity
          onPress={()=> props.navigation.navigate('UtangPiutang')}
          style={{
            position:'absolute',bottom:10,right:5,
            width:200,height:50,backgroundColor:'#FBB117',
            borderRadius:20,justifyContent:'center',alignItems:'center'
            }}>
              <Text
                style={{
                  color:"white", fontSize:16, fontWeight:'600'
                }}>
              +  UTANG PIUTANG
              </Text>
        </TouchableOpacity>
      </View>
    )
  }

    if(data.length>0){
      return HistoryData(data)
    }
    return (
      <View style={styles.container}>
        <Header
          placement="left"
          leftComponent={<Icon name='menu' color='white' onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}/>}
          center
          Component={{ text: 'Home', style: { color: '#fff' } }}
        />
        {/* content */}
        <View style={{
          width:width,height:height*0.8,
          justifyContent:'center',alignItems:'center'
        }}>
          <Image
            source={{ uri: 'https://www.jetorbit.com/blog/wp-content/uploads/2019/08/Cara-Menghapus-File-atau-Folder-yang-Tidak-Dapat-Dihapus-di-Komputer-atau-Laptop.png' }}
            style={{ width: 200, height: 200,marginBottom:20 }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View style={{
            flexDirection:'row',
            width:width,
            justifyContent:'center',
            alignItems:'center',
          }}>
            <Text>
              Ketuk{' '}
            </Text>
            <Text style={{color:'#FBB117'}}>
              + Tambah Transaksi 
            </Text>
            <Text>
            {' '} untuk membuat
            </Text>
          </View>
            <Text>Transaksi pertamamu</Text>
        </View>


        {/* floating content at top  */}
        <View style={{
          marign:24,position:'absolute',top:80,
          justifyContent:'center',alignItems:'center',
          width:width
        }}>
          <View style={{
            width:width*0.9,height:60,
            backgroundColor:'gray',paddingHorizontal:24,marginTop:24,borderRadius:8,
            flexDirection:'row',justifyContent:'space-between',alignItems:'center'
          }}>
            <Text style={{color:'white'}}>Lihat Tutorial Membuat Transaksi</Text>
            <Text style={{color:'#FBB117'}}>Lihat</Text>
          </View>
          
        </View>
        {/* floating button at bottom */}
        <TouchableOpacity
          onPress={()=> props.navigation.navigate('UtangPiutang')}
          style={{
            position:'absolute',bottom:10,right:5,
            width:200,height:50,backgroundColor:'#FBB117',
            borderRadius:20,justifyContent:'center',alignItems:'center'
            }}>
              <Text
                style={{
                  color:"white", fontSize:16, fontWeight:'600'
                }}>
              +  UTANG PIUTANG
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
  return bindActionCreators(Object.assign(DataLocalRedux),dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
