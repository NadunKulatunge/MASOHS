import Expo from "expo";
import React from "react";
import { Pedometer, Font } from "expo";
import { StyleSheet, Text, View } from "react-native";
import {Button} from 'native-base';
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase';
import Fire from '../Chat/Fire';
export default class PedometerSensor extends React.Component {
    constructor(props) {
        super(props);
        //table that keeps the step count records and need the new record to be uploaded to
        this.fetchedDataRef = firebase.database().ref('stepCount');
        // this.state = { loading: true,fire_loaded1: false, fire_loaded2: false };
        this.state = ({
            isPedometerAvailable: "checking",
            pastStepCount: 0,
            currentStepCount: 0,
            loading: true,
            fire_loaded: false,
            uploadingToFirebase: false
            
          })
      }
    
    async componentWillMount() {
        await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
    this.setState({ loading: false });
    
}

  componentDidMount() {
    this._subscribe();
    
    
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    this.setState({endDate: String(end)});
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };
  uploadStepsToFirebase() {
    username=Fire.shared.displayName;
    userid=Fire.shared.uid;
    console.log(userid);
    this.setState({uploadingToFirebase:true});
    this.fetchedDataRef.push({date: this.state.endDate, userid, username, pastStepCount: this.state.pastStepCount, used:false});
    this.setState({uploadingToFirebase:false});
    alert("Step count data added successfully!");
  }

  render() {

    return (
        
      <View style={styles.container}>


        <Text>
          Pedometer Availability: {this.state.isPedometerAvailable}
        </Text>
        <Text>
          Steps taken in the last 24 hours: {this.state.pastStepCount}
        </Text>
        <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
        
          <Button full rounded style={{ margin:10, marginTop:40 }}
              full
              rounded
              success
              onPress = { () => this.uploadStepsToFirebase()}>
              <Text style={{ color:'white' }}>Submit to Leaderboard</Text>
          </Button>
          <Button style={{ margin:10 }}
                full
                rounded
                info
                onPress = { () => this.props.navigation.navigate('ProWalker')}>
                <Text style={{ color:'white' }}>Check Daily Leaderboard</Text>
            </Button>
                      
               
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  }
});

Expo.registerRootComponent(PedometerSensor);