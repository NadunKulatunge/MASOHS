import React, { Component } from "react";
import {StyleSheet, Dimensions}  from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';
import { Text, View } from 'native-base';
import Leaderboard from 'react-native-leaderboard';
//...
import { Font, AppLoading } from "expo";
import firebase from 'firebase';


class ProWalker extends Component{
    static navigationOptions = ({navigation}) => ({
        title: 'Walking Pro',
        headerRight: (
            <RightHeaderButtons navigation={navigation}/>
        ),
    });
    constructor(props) {
        super(props)
        const end = new Date();
        var a = String(end); 
        var b = a.slice(0,15);
        this.state = { endDate: b, loading: true, fire_loaded: false };
        
    }
    pdata=[]
    resultsToday=[]
    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });

        firebase.database().ref('stepCount/').orderByChild('pastStepCount').once('value', (snapshot) => {
            this.resultsToday=[];
            
            snapshot.forEach((item)=>{
                var c = item.val().date;
                var d = String(c);
                var e = d.slice(0,15);
                if(e==this.state.endDate){this.resultsToday.push(item.val());}
               
               //this.forceUpdate();
            }) 
            
            this.resultsToday = this.resultsToday.reverse();
            this.setState({fire_loaded:true,});
            this.forceUpdate();
      
          });
          
        //   firebase.database().ref('stepCount/').on('value', (snapshot) => {
        //     this.resultsToday = [];
        //     snapshot.forEach((child)=>{
        //         this.resultsToday.push({
        //                   fetchedDataName: child.val().contactName,
        //                   fetchedDataNum: child.val().contactNum,
        //                   _key: child.key
        //                 });
               
        //     }) 
        //     this.setState({fire_loaded:true});
        //     this.forceUpdate();
        //   });
          //this.forceUpdate();
          this.setState({ loading: false });
          //this.forceUpdate();
    }
    // for i in resultToday:
	// if i.used==false:
	// 	user = []
	// 	for j in resultToday:
	// 		if i.userid==j.userid && i.used==false:
	// 			set(j.used:true)
	// 			add j to user array
	// 	get max from user array
	// 	add that element to pdata

   
    
    
    render() {
        if (this.state.loading) {
            return (
                <AppLoading />
            );
          }
          for(var i =0; i<this.resultsToday.length; i++){
            
              if(this.resultsToday[i].used==false){
                  var user=[];
                  for(var j=0; j<this.resultsToday.length; j++){
                      if(this.resultsToday[i].userid==this.resultsToday[j].userid){
                          this.resultsToday[j].used=true;
                          //console.log(this.resultsToday[j]);
                          user.push(this.resultsToday[j]);
                          
                      }
                    }
                    
                    
                    this.pdata.push({name:user[0].username, score:user[0].pastStepCount});
              }
          }
          console.log(this.pdata);
        const props = {
            labelBy: 'name',
            sortBy: 'score',
            data: this.pdata,
                       /*onRowPress: (item, index) => {
                this._alert(item.name + " clicked",
                    item.score + " points, wow!")
            },*/
            evenRowColor: '#edfcf9',
        }
        if(this.pdata.length==0){
            return (
                <View>
                {/* Ghetto Header */}
                <View style={{ paddingTop: 50, backgroundColor: '#50FA80', alignItems: 'center' }}>
                    <Text style={{ fontSize: 50, color: 'white', paddingBottom: 50 }}>
                        Leaderboard
                        {/* {console.log(this.resultsToday)} */}
                        
                    </Text>
                </View>
                
            
                
            </View>
            
            
            );
            
        
        }
        else{
            return (
                <View>
                {/* Ghetto Header */}
                <View style={{ paddingTop: 50, backgroundColor: '#50FA80', alignItems: 'center' }}>
                    <Text style={{ fontSize: 50, color: 'white', paddingBottom: 50 }}>
                        Leaderboard
                        
                    </Text>
                </View>
                <Leaderboard {...props} />
           
                
                </View>
            );
        }
    }
}

export default ProWalker;