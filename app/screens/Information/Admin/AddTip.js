import React, { Component } from "react";
import { 
    
    StyleSheet,

} from "react-native";

import { Container, Form, Input, Item, Text, Button,H1} from 'native-base';
import { Font, AppLoading } from "expo";

import RightHeaderButtons from '../../../components/RightHeaderButtons';
import firebase from 'firebase';
class AddTip extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Add Tip',
        headerRight: (
            <RightHeaderButtons navigation={navigation}/>
        ),
    });
    constructor(props) {
        super(props)
        this.fetchedDatasRef = firebase.database().ref('tips');
        this.state = ({
            fetchedDataName: '',
            fetchedDataDes: '',
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
                <H1 style={{textAlign: 'center'}}>Add Tip</H1>
                <Form>
                    <Item >
                        <Input
                            placeholder="Tip Topic/Name"
                            autoCorrect={false}
                            autoCapitalize="words"
                            onChangeText={ (fetchedDataName) => this.setState({fetchedDataName}) }
                            value={this.state.fetchedDataName}
                        />
                    </Item>
                    <Item >
                        <Input
                            placeholder="Tip Description"
                            autoCorrect={false}
                            onChangeText={ (fetchedDataDes) => this.setState({fetchedDataDes}) }
                            value={this.state.fetchedDataDes}
                        
                            
                        />
                    </Item>
                    
                    <Button style={{ marginTop:40 }}
                            full
                            rounded
                            success
                            onPress={() => this._addData()}>
                            <Text style={{ color:'white' }}>Add Tip Data</Text>
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
            alert("Tip Topic/Name field cannot be empty!");
            return;
        }
        else if(this.state.fetchedDataDes == '' ){
            alert("Tip Description field cannot be empty!");
            return;
        }
        
        this.fetchedDatasRef.push({ tipName: this.state.fetchedDataName, tipDes: this.state.fetchedDataDes});
        this.setState({fetchedDataName: ""});
        this.setState({fetchedDataDes: ""});
        alert("Tip data added successfully!");
    }

}
export default AddTip;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    }
});