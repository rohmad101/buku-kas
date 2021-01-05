import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, Dimensions, ActivityIndicator, Alert } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import BackupRedux from '../Redux/BackupRedux'
import DataLocalRedux from '../Redux/DataLocalRedux'

// Styles
import styles from './Styles/SettingsStyle'

// I18n
import { ListItem, Avatar, Accessory, Header, Icon, SocialIcon, Image } from 'react-native-elements'
import { DrawerActions } from 'react-navigation-drawer'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { bindActionCreators } from 'redux'
import AsyncStorage from '@react-native-community/async-storage'

function SettingsScreen (props) {
  const {backupRequest, data, statusBackup} = props
  const { height, width } = Dimensions.get('screen')
  const [phone, setPhone] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('PhoneNumber')
    .then(rr => {
      if (rr !== null) {
        // value previously stored
        // navigation.replace('MiddlewareScreen',{param:'Dashboard'})
        setPhone(rr)
        //  Alert.alertrr)
      }
    })
    .catch(cc => Alert.alert('errr' + cc))
  }, [])

  useEffect(() => {
    if (statusBackup && statusBackup.success && loading) {
      setTimeout(() => {
        Alert.alert(' ', statusBackup.message)
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }, 1000)
    }
  })
  // keyExtractor = (item, index) => index.toString()
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => ActionPressed(item.name)}>
      <ListItem bottomDivider >
        <Avatar title={item.name[0]} source={item.avatar_url && { uri: item.avatar_url }} size={24} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  )
  const ActionPressed = (act) => {
    if (act === 'Backup Data') {
      setLoading(true)
      backupRequest({
        'phone_number': phone,
        'data_user': data
      })
    }
  }
  const list = [
    {
      name: 'Cara Penggunaan',
      avatar_url: 'data:image/png;base64,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'
    },
    {
      name: 'WhatsApp Kami',
      avatar_url: 'https://image.shutterstock.com/image-vector/telephone-icon-whatsapp-logo-phone-260nw-1169104867.jpg'
    },
    {
      name: 'Pengaturan printer',
      avatar_url: 'data:image/png;base64,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'
    },
    {
      name: 'Pengaturan',
      avatar_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEX///8AAAD6+vry8vL4+PjLy8vu7u7AwMDExMT19fXr6+u9vb13d3fv7+/i4uLd3d1iYmI6OjqysrJOTk6hoaHW1tYcHByenp6mpqYzMzMQEBCBgYFycnImJiYtLS2Xl5dUVFSJiYlBQUEfHx+FhYVcXFw2NjaQkJBqamoWFhZISEhQUFBAQEDbmbwjAAALwklEQVR4nO1d6UIqOwwGBGRHEATZQT3ikfd/vgueK5I0aZq2syHf3+lM22mbPU2pdMMNN9xwww3ZoTs6lO346NSyHmQIJsL0/uGxlfU4vbFwmuAR46xH6om56wTLs2KuYs15guXyW9aD9cKbYoblftaj9UBdM8HyOuvhekCzScvlv1kP1wNunOKMrIfrAXdK+oUCUtO/uhkWULLRTbA8zHq8anSVM5xnPWA1GsoZPmY9YDWmYPyrUgWj1IYtKlmPWIsOGH+HaNGDi9hLfYiB+AOGPyJa1D9Ak8LpF3CBGlQTyE+maY8wEGgL1qk2e9CkaMQUkVKSjKxBk6IpUJCU0qwA/oVlNeUhBgIaMChSWiqN4TrfpTzEQEAqMiHbVGegUbGIaXMJBs+I1SvQqFjEtAU3IMPNH0CjbbpDDEN7A4kIc8SgkjxbF0WsqUGBrcxL1W3ccDDqpjpUH3RHAzzscnnBNO6ZTcuLfKvCvcWMGDQplX6Balw+5FcZ7j+QI7ZYKJZ0+xn7SzJFn7cAs+Ze1rExm+ZOXWwZ5OUC7Ftr/p1Vzvbq1jK/8jP7mkFML7HLkZBzT9KXMzhSaggGxovNFCdhQYsjMN/gxbGm8GZaNsaqVeofSqMs3/MvE8wT4sHWdyWKOjLunMwpmyFD25qiD23wbtlrjb30Ovt/xq9Px6e7UHm9+bMDOzVikoKDaTBviL95PN3Yj3GH6Lc1eRZ/gRNaL5ddPb9j0dhC7Y/rPnGVpOuNjm2SA/SdahuefFr7dELFOCZ/L3dr1bJDn5yn9/+3GjZ61b5oOZ4/4cf+q/hO9XYWjXv8f9/7sLLm5IX94LeLuDsi2/gKQJTof8LLlyLHHsGZsZmdcf/IffTEU5ttbp19LZGWffM5ZJnEJIiE1z6Zz27Gc0ZOP8Hvn475D/LYBoshtT9yLwYevLp6lj+MsSBt21oM+fPIgnQbCJjKn0U4xFLPqySJs4KX7lk0DZosIWZIzFgU5zD0ss1W2QNmy6FQL6PWKcBxCg7xjZ1j5WmkPQc8NvInL+Fz0CU0ZakcQCdl6EK2nhMK99GFVW1U316ht9dzi2i8T2R6J9h+9J8hZmdt+YNnjNC7u+OeGXIb9z2xCZZKfUaOWW77ZkDLi/t3u3jB/m3x3oQSApK1bbYoCWff+Ec4sW7jzq9w0N2PKWlsGA2TtqQYGtzz9CwY9vFgXL0exotAFoO7VbP3/VC51De+ducP8FK4UgSswmAdurc+/9fkJ3iU4c7qxr6BFMEKXgs3uRGbaZdEm/E8tQke57E79XWYEnsQC89OocYVTL4Ybt7epDTBI3blV0YoxKfUhSxg6xIfNBhFVXICb6UwOKZs0DAM7TnPE8CGCFlAxg6vvAdjGSqCpONg08Us93E8WzRiyaCxQ+3zH+Si5BjYgrZKaZghwGMe2BpXMafId2DE/8B5DzaOgX+Hn5GORbVbbx1Rv4vrpMcc48PSFmvV8Wwvrdpk8fmtdc4OD/NhRC6E1QHLp9EmHUT61701lUCzWsSSibA6y3/XIEuzCIvYnFqs8YsY0Qiv+KuWg2jaSIPcj0e0pASvXehCEj4+yycJX0yQnbdu/F4ChyBDXY+wO1jOId7QJwTQU1fHwJu/rY60VVna31HtB5799xSWeV/RiVoSu+WI/OsfXuRAjkK5xJuXV44MNRMyqOhYOg9zky3OjcJS/xvvaG+qRP9p2qB1S1SVXoETtGS7Txqpn2QGR+8u3S668/HjKncKHfW3cXFBjcl/s1LQm6aFx8eaIh3K46iv12n/trOeYYbhuMKd+9NRFO4kmaY3rvZ7SyDR7GW5tDmXHclNi14DDbGi/VpuTkhGjvl4GNV6J5tIpTVuz7Et4RtORpMaeY4OOiGaOccOygb95h6H8PXeybV0SXimk6gftG7uPjUAB6MGmaXeIcnU8INo6iAHk9Tew81eJfipw2eIQ7hhtw91GOTDRMmWfi4wU/GRtQDi/9oIVM9UjXfywIxD/OSrZhpSqviG4fQoz4TOTelOXo4temPgny2FdBP59xrb7kXs3GTd2mHxuQAOgGRZDMY1zCBcXt4ljCmKfBddXxRih0BuGlGqwdvazc6Dz7t8gQT04b66dMIAbQeR42AO4yjoYcohCm/wn4RYdeGaiA5WzIpdbTyYh26kF+5B82VATCu0EItCGzIou0dEYh6j9JAFJJ7C/S4RmjoSFxVOD8QWpZ5QnnuA+RyK8NKI0SbVXAOBDrzVfXQCjErzj+lpwV8l7R3EvFV+K3QJqHSyoHrob9OFoUMfQmRCBZouDqqu0EmUWByMr/X3xMMDLflpUKqdLt4NyQqSiA9/iD+7gAdro2qtPf6QDkuMCbILB2Gdge5PQfvzk7KvqertcVBfP4ASo8QOt6C1VhxGUSOCZQ+1VvbFjVk6G9AIrPVEILVW0LnQmVf29QNoU5JoMuRRWoG/AvmFxGoizRAKuNKqqBbBBGRxkjUh0gwhC9fNUO0fh8RUUi9gZ95XTMEZSrIR7FTtdFwEdOYdmhayhuoZwjWUjnGkNUz1HEIzZEqUJoSWakMssqGlW/AZiR/CRSgGP9TJNHDFtalC2cg0RZFLFelACNevW+j0Q3SSdHc5IP1QyhaLpR/qdHxkiUhRx/c3CWdnp5Gs3rHsNOnZ2tCrqdnalPbSLvLp+ttLJRtPPHup0uaNQkD8bd6SUBvP5p2S3wJnIm2kF5DfIuB+3pR8TzjCKEXfk9Z/iMM93fyH2NGdpv8w2Ae8ctBNjfsh0vQBR/Dji1M0JjjTDivAjx8jFkPSg8wQuhRjMXziaYiYL9um65uF5xxSeSPF08SLiXpk6Q0VJJpaTJRvXBsZ7r+gWHgl27i26LGJ9zmLTQyJL92S7/7El1Zb43aHK/zoRDMixJeGxQhb4vRnL8sXam9+I6UY4dA4b6zsuSOlOO/wWH0j2dYRKcXqR8m38IrWTynfIk7OTIW94pFHSjkz0fKelKXzIuY92TX+q89di5t/yOVUEIiaf2hT8iLnkJL9E3jzvwdGm0MaOw/4zuU07tLMA04gl1vKdX4M7UGVy51MPv7Qwv87aefjJ3SnQn/yl+Bdq07o8n3D/U6FhO/F2JzvxdjtX9sJ3othGXbSd5vcfd1t0o18bxGmpzb36vXfT3P9dwz9gnuifsFdX8W/r02Uoot+557DjbgFvzfR5WtXf/dloe8vdazunbc7aM/2V/kOWkdBvrj3CDt7Eq/+LuhfcJ/39d/J/gvu1c9JbQRrSTADG93HlTdZxbJHXCLZ+ha/oEZJaauc4iCyhJ54nZlfUCtI6Vk5IV69p626b496T141u/aFqtmVWd01jz/ra/b0q523DqudxzmPk6idx1brleofbr1N5e2U6x8G1LD0oTkZ1LAkAmNAHdKKrQ7pOmYd0kuRKWod0lILbH1lLdnPWLVkcTgXriUbpL9dyIa5rQccWvOtP7fXdJaKch9XPpmazv3X05F8jOJ2SLAutxgBl0JdbhlXUFtdRMN+kHgLGMdxv18MFpDiYWsbKC8V09F3/2MXI4ohHlq2+7vZtyzcZpWXDfqDPs//WeWYjhM8YjaNW8YkEvocyWFlOGzSO88vzWGr0FuQNIcVOsj5HfK3Py/RnRL2B46YUuauRQHCP2oG0eF8XgYpHYwC0kFTRRtSHS6BDToPZkp1JFsgVs4MHVKmJP0f8YFqBzBnC5LS/BJQEjASi45LRjnn+RJhREBeTlvckTEv97FJEDCEgCam0P8XknOeBZD3kpTBoFQaOdIzcSBmTtrCoX6f9/AyA3CGpC0FUqOCkdJSCUYYUJJpHSYiFoyU4thripiijVwkgeYLkJiuShUMJJXKV0XkDXQ6Mo/PrAesBlmNxYLCkVJGu+WRb7WXBFV61IICKL4YyiTShIKOkgR9aQGLrIfrAV3gmMONJrlDXZ7WBWIG46QGi4fYRM5zHmhotqnmfr4cwZ2azgpISb/AuiUwCqdXnOFW8vixqCt4wt1IunbgqVNAaeaGG2644YarxH/NsK0jwh+6PgAAAABJRU5ErkJggg=='
    },
    {
      name: 'Kartu Nama',
      avatar_url: 'data:image/png;base64,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'
    },
    {
      name: 'Stiker WhatsApp',
      avatar_url: 'data:image/png;base64,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'
    },
    {
      name: 'Bagikan Aplikasi',
      avatar_url: 'data:image/png;base64,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'
    },
    {
      name: 'Backup Data',
      avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2xqJ_bSoSJ-GGb8_CQiuIP9ycsAPCQ3XTRQ&usqp=CAU'
    }
  ]

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size={40} color={'#3498DB'} />
        <Text>Backup Data</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Header
        placement='left'
        leftComponent={<Icon name='menu' color='white' onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} />}
        centerComponent={{ text: 'Settings', style: { color: '#fff' } }}
        />
      <ScrollView style={{padding: 12, height: height}}>
        {/* content user */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: width * 0.9
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar
              rounded
              source={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
              }}
              size='large'
                  >
              <Accessory />
            </Avatar>
            <View>
              <Text>Usaha Saya</Text>
              <Text>+62 {phone}</Text>
            </View>
          </View>

          <Text style={{
            backgroundColor: '#2E86C1', padding: 8, paddingHorizontal: 12, color: 'white', borderRadius: 8
          }}>
                Atur Profil
              </Text>
        </View>
        {/* content bar */}
        <View style={{
          width: width * 0.9,
          minHeight: 100,
          margin: 4,
          marginTop: 12,
          backgroundColor: '#3498DB',
          borderRadius: 8
        }}>
          <View style={{flexDirection: 'row', padding: 12}}>
            <Text style={{color: 'white', fontWeight: '700'}}>Pembayaran Digital</Text>
            <Text style={{backgroundColor: '#F4D03F', paddingHorizontal: 4, borderRadius: 12, marginLeft: 8, fontWeight: '700'}}>Gratis</Text>
          </View>
          <View style={{flexDirection: 'row', padding: 12, justifyContent: 'space-around'}}>
            <View style={{flexDirection: 'column', padding: 12}}>
              <Image
                source={{ uri: 'https://icon-library.com/images/cash-icon-png/cash-icon-png-27.jpg' }}
                style={{ width: 40, height: 40 }}
                PlaceholderContent={<ActivityIndicator />}
                containerStyle={{backgroundColor: 'white', borderRadius: 24, padding: 2}}
                    />
              <Text style={{color: 'white', fontWeight: '700'}}>Bayar</Text>
            </View>
            <View style={{flexDirection: 'column', padding: 12}}>
              <Image
                source={{ uri: 'https://image.flaticon.com/icons/png/512/69/69881.png' }}
                style={{ width: 40, height: 40 }}
                PlaceholderContent={<ActivityIndicator />}
                containerStyle={{backgroundColor: 'white', borderRadius: 24, padding: 2}}
                      />
              <Text style={{color: 'white', fontWeight: '700'}}>Tagih</Text>
            </View>
          </View>
        </View>
        <FlatList
                // keyExtractor={this.keyExtractor}
          data={list}
          renderItem={renderItem}
              />
        <Text style={{
          paddingHorizontal: 12,
          paddingTop: 24,
          fontWeight: '700'
        }}>Media Sosial BukuKas</Text>
        <View style={{
          flexDirection: 'row', width: width, alignItems: 'center', paddingBottom: 8
        }}>
          <SocialIcon

            light
            type='instagram'
                />
          <Text>@Bukukas</Text>
          <SocialIcon
            light
            type='facebook'
                />
          <Text>@Bukukas</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    statusBackup: state.backup.payload,
    errorBackup: state.backup.error,
    data: state.local.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(BackupRedux, DataLocalRedux), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
