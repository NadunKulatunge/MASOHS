import React, { Component } from 'react';
import { Container, Content, View,  Text, Left, Body, Right, Button, Card,CardItem } from 'native-base';
import { Font, AppLoading } from "expo";
import {Dimensions} from 'react-native';
import Fire from '../Chat/Fire';
import firebase from 'firebase';
import { withNavigation } from 'react-navigation';
import {LineChart} from 'react-native-chart-kit';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';

class HealthScreen extends Component{

  static navigationOptions = ({navigation}) => ({
    title: 'Health Monitoring',
    headerRight: (
        <RightHeaderButtons navigation={navigation}/>
    )
  });

    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            fire1_loaded:false,
        };
    }

    pressure_dates=[0];
    pressure_low=[0];
    pressure_high=[0];
    userid=Fire.shared.uid;

    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });

         firebase.database().ref('health/pressure').orderByChild('userid').equalTo(this.userid).on('value', (snapshot) => {
           this.pressure_low=[0];
           this.pressure_high=[0];
           this.pressure_dates=[0];
          snapshot.forEach((item)=>{
            this.pressure_low.push(parseFloat(item.val().bPresLow));
            this.pressure_high.push(parseFloat(item.val().bPresHigh));
            this.pressure_dates.push(item.val().date);
            console.log(this.pressure_high);
            console.log(this.pressure_low);
            console.log(this.pressure_dates);
          }) 
          this.setState({fire1_loaded:true});
          this.forceUpdate();
        });
        
        this.setState({ loading: false });
    }
    render() {

        if (this.state.loading) {
            return (
                <AppLoading />
            );
          
        }
        
        return (
          <Container>
          {this.state.fire1_loaded?
          <Content>
          <Card>
            <CardItem>
            <View>
              <Text>
                Blood Pressure (mg/h)
              </Text>
              <LineChart
                data={{
                  labels: this.pressure_dates,
                  datasets: [{data: this.pressure_low},{data: this.pressure_high},]
                }}
                  width={Dimensions.get('window').width} // from react-native
                  height={220}
                  chartConfig={{
                    backgroundColor: '#aed581',
                    backgroundGradientFrom: '#e1ffb8',
                    backgroundGradientTo: '#e1ffb8',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                }}
                bezier style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </View>
            </CardItem>
            <CardItem>
              <Right>
              <Button transparent onPress={()=>this.props.navigation.navigate('AddHealth')}>
                  <Text>Add</Text>
                </Button>
              </Right>
              </CardItem>
            </Card>
          </Content>
          :
          <Content>
          <Text>Loading information. If this is taking too long please check your internet connection</Text>
          </Content>
          }
          </Container>
        );
  }  
}

export default withNavigation(HealthScreen);
