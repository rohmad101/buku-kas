// @flow

import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Dimensions, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeStyle'

// I18n
import I18n from 'react-native-i18n'
import { Header, Icon, Image } from 'react-native-elements'
import { DrawerActions } from 'react-navigation-drawer'
import { View } from 'react-native-animatable'

class HomeScreen extends React.Component {

  render () {
    const {width,height}=Dimensions.get('screen')
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
        <View style={{
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
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
