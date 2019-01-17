import React, { Component } from "react";
import { 
    
    StyleSheet,

} from "react-native";

import { Container, Form, Input, Item, Text, Button,H1} from 'native-base';
import { Font, AppLoading } from "expo";

import RightHeaderButtons from '../../../components/RightHeaderButtons';
import firebase from 'firebase';
class AddEmergency extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Add Emergency',
        headerRight: (
            <RightHeaderButtons navigation={navigation}/>
        ),
    });
    constructor(props) {
        super(props)
        this.fetchedDatasRef = firebase.database().ref('emergency');
        this.state = ({
            fetchedDataName: '',
            fetchedDataDes: '',
            fetchedDataLink:'',
            loading: true
        })

    }
    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ 
            loading: false,
          });
    }
    // onChanged(text){ 
    //     var newText = ''; 
    //     var numbers = '0123456789'; 
    //     if(text.length < 1){ 
    //         this.setState({ fetchedDataNum: '' });
    //     } 
    //     for (var i=0; i < text.length; i++) { 
    //         if(numbers.indexOf(text[i]) > -1 ) { 
    //             newText = newText + text[i]; 
    //         } 
    //         else {
    //             // your call back function
    //             alert("Please enter numbers only");
    //         }
    //         this.setState({ fetchedDataNum: newText }); 
    //     } 
    // }
    
    render() {
        if (this.state.loading) {
            return (
                <AppLoading />
            );
        }
        return (
            <Container style={styles1.container}>
                <H1 style={{textAlign: 'center'}}>Add Emergency Data</H1>
                <Form>
                    <Item >
                        <Input
                            placeholder="Emergency Topic"
                            autoCorrect={false}
                            autoCapitalize="words"
                            onChangeText={ (fetchedDataName) => this.setState({fetchedDataName}) }
                            value={this.state.fetchedDataName}
                        />
                    </Item>
                    <Item >
                        <Input
                            placeholder="Emergency Description"
                            autoCorrect={false}
                            onChangeText={ (fetchedDataDes) => this.setState({fetchedDataDes}) }
                            value={this.state.fetchedDataDes}
                        
                            
                        />
                    </Item>
                    <Item >
                        <Input
                            placeholder="Link to Description"
                            autoCorrect={false}
                            onChangeText={ (fetchedDataLink) => this.setState({fetchedDataLink}) }
                            value={this.state.fetchedDataLink}
                        
                            
                        />
                    </Item>
                    
                    <Button style={{ marginTop:40 }}
                            full
                            rounded
                            success
                            onPress={() => this._addData()}>
                            <Text style={{ color:'white' }}>Add Emergency Data</Text>
                    </Button>
                    <Button style={{ marginTop:10 }}
                        full
                        rounded
                        primary
                        onPress = { () => this.props.navigation.navigate('Information')}>
                        <Text style={{ color:'white' }}>Go To Information</Text>
                    </Button>
                 
                </Form>
            </Container>
        );
    }
    _addData() {
        if(this.state.fetchedDataName == '' ){
            alert("Emergency Topic field cannot be empty!");
            return;
        }
        else if(this.state.fetchedDataDes == '' ){
            alert("Emergency Description field cannot be empty!");
            return;
        }
        else if(this.state.fetchedDataLink == '' ){
            alert("Link to Description field cannot be empty!");
            return;
        }
        this.fetchedDatasRef.push({ emergencyName: this.state.fetchedDataName, emergencyDes: this.state.fetchedDataDes, emergencyLink: this.state.fetchedDataLink});
        this.setState({fetchedDataName: ""});
        this.setState({fetchedDataDes: ""});
        this.setState({fetchedDataLink: ""});
        alert("Emergency data added successfully!");
    }

}
export default AddEmergency;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    }
});