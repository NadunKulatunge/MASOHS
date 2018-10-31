import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native'
import * as firebase from 'firebase';


export default class Loading extends React.Component {
    
    componentDidMount() {

        setTimeout(() => {
            firebase.auth().onAuthStateChanged(user => {
                this.props.navigation.navigate(!user || !user.emailVerified ? 'Login' : 'Home')
            })
        
        }, 2000);
        
    }

    render() {
        return (
        <View style={styles.container}>
        <Image
          source={require('../assets/MasLoading.gif')}
        />
            <Text style={{fontWeight: 'bold'}}>Loading..</Text>
            
        </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})