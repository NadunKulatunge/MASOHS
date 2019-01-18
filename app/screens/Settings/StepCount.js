import Expo from "expo";
import React from "react";
import { Pedometer, Font } from "expo";
import { StyleSheet, Text, View } from "react-native";
import {Button} from 'native-base';
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase';
import Fire from '../Chat/Fire';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';

export default class StepCount extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'StepCount',
    headerRight: (
        <RightHeaderButtons navigation={navigation}/>
    ),
  });
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

    function formatDate(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }

    const end = new Date();
    const start = new Date();
    //start.setDate(end.getDate() - 1);
    start.setHours(0,0,0,0);
    //console.log(formatDate(end)); //Returns now time 1/18/2019  1:23 pm
    //console.log(formatDate(start)); //Returns Todays Midnight 1/18/2019  12:00 am
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

          <Button full rounded style={{ margin:10 }}
                              full
                              rounded
                              primary
                              onPress = { () => this.uploadStepsToFirebase()}>
                              <Text style={{ color:'white' }}>Submit to ProWalker</Text>
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

Expo.registerRootComponent(StepCount);