import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View } from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { Container, Content, List, ListItem, Icon, Left, Body, Right, Switch, Button, Label, Thumbnail, Item, Input, Card, CardItem, Form } from 'native-base';

//Initialize firebase
import * as firebase from 'firebase';

export default class PedometerSensor extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    uploadingToFirebase: false
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  uploadStepsToFirebase = (stepCount) => {
        
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

  render() {
    return (
        <Container>
            <Content>
                <View style={{flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}>
                    <Ionicons style={{color: 'rgba(0,0,0,0.5)'}} name='md-walk' size={responsiveFontSize(30)}/>
                </View>
                <Card transparent>
                    <CardItem>
                        <Body>
                            <Item >
                                <Label>Name</Label>
                                <Input 
                                    value={firebase.auth().currentUser.displayName}
                                    disabled
                                />
                            </Item>
                        </Body>
                    </CardItem>
                    {this.state.isPedometerAvailable==true? (
                        <CardItem>
                            <Body>
                                <Item >
                                    <Label>Pedometer Available</Label>
                                    <Ionicons style={{color: 'rgba(0,0,0,0.5)'}} name='md-checkbox-outline' size={30}/>
                                    <Input 
                                        disabled
                                    />
                                    
                                </Item>
                            </Body>
                        </CardItem>
                    ) : (
                        <CardItem>
                            <Body>
                                <Item >
                                    <Label>Pedometer Available</Label>
                                    <Ionicons style={{color: 'rgba(0,0,0,0.5)'}} name='md-close-circle' size={30}/>
                                    <Input 
                                        disabled
                                    />
                                    
                                </Item>
                            </Body>
                        </CardItem>
                    )}
                    <CardItem>
                        <Body>
                            <Item >
                                <Label>Today's Steps</Label>
                                <Input 
                                    value={this.state.pastStepCount.toString()}
                                    disabled
                                />
                            </Item>
                        </Body>
                    </CardItem>
                    <CardItem>
                    { this.state.uploadingToFirebase === true ? 
                        <Button style={{ marginTop:40 }}
                            full
                            rounded
                            success>
                            <View><Spinner color='white' /></View>
                            <Text style={{ color:'white' }}>Submit</Text>
                        </Button>
                        :
                        <Button style={{ marginTop:40 }}
                            full
                            rounded
                            success
                            onPress = { () => this.uploadStepsToFirebase(this.state.pastStepCount)}>
                            <Text style={{ color:'white' }}>Submit</Text>
                        </Button>
                    }
                    </CardItem>
                    }
                </Card>
            </Content>
        </Container>
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
