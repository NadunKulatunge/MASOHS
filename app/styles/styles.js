import {StyleSheet} from 'react-native';

export const FormStyle = StyleSheet.create({
    loading:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    alertBox: {
      backgroundColor: '#1C97F7',
    },
    alertText: {
      fontSize:12,
      color: '#ffffff',
    },
    conCard: {
      marginLeft: 25,
      marginRight: 25,
      marginTop: 20,
    },
    conCardItem: {
      marginLeft: 5,
      marginTop:5,
    },
    conDetails: {
      fontSize: 15,
      color: 'black',
      marginLeft: 5,
    },
    postCard: {
      marginLeft: 25,
      marginRight: 25,
      marginTop: 20,
      marginBottom: 20,     
    }
  });