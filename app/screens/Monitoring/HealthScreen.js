import React, { Component } from 'react';
import { Container, Content, View,  Text, Left, Body, Right, Button, Card,CardItem, H3 } from 'native-base';
import { Font, AppLoading } from "expo";
import {Dimensions} from 'react-native';
import Fire from '../Chat/Fire';
import firebase from 'firebase';
import { withNavigation } from 'react-navigation';
import {LineChart} from 'react-native-chart-kit';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';
import * as appConst from '../../constants/Constants.js';

class HealthScreen extends Component{

  static navigationOptions = ({navigation}) => ({
    title: 'Monitoring',
    headerRight: (
        <RightHeaderButtons navigation={navigation}/>
    )
  });

    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            fire1_loaded:false,
            fire2_loaded:false
        };
    }

    pressure_dates=[0];
    pressure_low=[0];
    pressure_high=[0];
    weight_dates=[0];
    weights=[0];
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
          }) 
          this.setState({fire1_loaded:true});
          this.forceUpdate();
        });
        firebase.database().ref('health/weight').orderByChild('userid').equalTo(this.userid).on('value', (snapshot) => {
          this.weight_dates=[0];
          this.weights=[0];
         snapshot.forEach((item)=>{
           this.weights.push(parseFloat(item.val().weight));
           this.weight_dates.push(item.val().date);
         }) 
         this.setState({fire2_loaded:true});
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
          {this.state.fire1_loaded&&this.state.fire2_loaded?
          <Content>


          <Card>

          <CardItem>
            <View>
              <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                  <H3 note style={{ fontWeight: "bold" }}>Weight Diagram</H3>
              </Body>
              <Text>
                Weight (kg)
              </Text>
              <LineChart
                data={{
                  labels: this.weight_dates,
                  datasets: [{data: this.weights}]
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
                bezier
                 style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </View>
            </CardItem>
            </Card>
            
            <Card>
            <CardItem>
            <View>
              <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}>
                  <H3 note style={{ fontWeight: "bold" }}>Blood Pressure Diagram</H3>
              </Body>
              <Text>
                Blood Pressure (mmHg)
              </Text>
              <LineChart
                data={{
                  labels: this.pressure_dates,
                  datasets: [{data: this.pressure_low},{data:this.pressure_high}]
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
                bezier
                 style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </View>
            </CardItem>
            </Card>

          <Card>
            <CardItem>
                <Body>
                    <Button full rounded style = {{ backgroundColor: appConst.THEME_COLOUR }}  onPress={()=>this.props.navigation.navigate('AddHealth')}>
                    <Text>Add New Data</Text>
                    </Button>
                </Body>
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
