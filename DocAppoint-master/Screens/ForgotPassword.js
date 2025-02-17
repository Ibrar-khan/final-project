import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    StatusBar,
    ScrollView,
    ImageBackground,
    Dimensions,
    ToastAndroid,
    Picker,
} from 'react-native';
import firebase from 'react-native-firebase'
export default class ForgotPassword extends Component {
    static navigationOptions = {
        title: 'Forgot Password',
        headerStyle: {
            backgroundColor: '#40E0D0'
        }
    }
    state = {
        question:'WhatIsyourfavoritebook?',
        answer: '',
        uid: 0,
        arr:[],
        email:''
    }
    checking(email){
        var ref = firebase.database().ref();
        ref.child('users').child('Patients').on('value', (datasnapshot) => {
            if ((datasnapshot.exists())) {
                var value = datasnapshot.val();
                var key = Object.keys(value);
                // console.log(key)
                key.forEach(element => {
                    ref.child('users').child('Patients').child(element).on('value', (datasnapshot1) => {
                        if ((datasnapshot1.exists())) {
                            var email1=datasnapshot1.val().email;
                            var stremail=email1.toString();
                           if (stremail==email) {
                              if (this.state.question==datasnapshot1.val().question) {
                                  if (this.state.answer==datasnapshot1.val().answer) {
                                      console.log('fucked')
                                      this.props.navigation.navigate('ResetPassword',{
                                          
                                      })
                                  }
                              }
                           }
                        }
                    })
                });
            }
        })
    }
    componentDidMount() {
       
    }
    render() {
        return (
            <ScrollView>
                <View style={{}}>
                    <StatusBar backgroundColor='#40E0D0' barStyle='dark-content' />
                    <ImageBackground
                        source={require('./images/patlogin.jpg')}
                        imageStyle={{ opacity: .5 }}
                        style={{ height: 200, }}>
                        <View style={{
                            height: 200,
                            width: Dimensions.get('window').width
                        }}>
                            <Text style={{
                                fontSize: 35,
                                paddingLeft: 10,
                                paddingTop: 100
                            }}>Hello there!</Text>
                            <Text style={{
                                fontSize: 20,
                                paddingLeft: 20
                            }}>Reset Password</Text>
                        </View>
                    </ImageBackground>

                    <View style={{
                        paddingLeft: 20,
                        paddingEnd: 20,
                        paddingTop: 20
                    }}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput
                            keyboardType='default'
                            placeholder='Email here'
                            underlineColorAndroid='black'
                            onChangeText={(value) => {
                                this.setState({
                                    email: value
                                })
                            }} />
                        <Text style={styles.text}>Question</Text>
                        <Picker
                                    selectedValue={this.state.city}
                                    style={{ fontWeight: 'bold' }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ question: itemValue })
                                    }>
                                   <Picker.Item label="What Is your favorite book?" value="WhatIsyourfavoritebook?" />
                                <Picker.Item label="What is the name of the road you grew up on?" value="What is the name of the road you grew up on?" />
                                <Picker.Item label="What is your mother's maiden name?" value="What is your mother's maiden name?" />
                                <Picker.Item label="What was the name of your first/current/favorite pet?" value="What was the name of your first/current/favorite pet?" />
                                <Picker.Item label="What was the first company that you worked for?" value="What was the first company that you worked for?" />
                                <Picker.Item label="Where did you meet your spouse?" value="Where did you meet your spouse?" />
                                <Picker.Item label="Where did you go to high school/college?" value="Where did you go to high school/college?" />
                                <Picker.Item label="What is your favorite food?" value="What is your favorite food?" />
                                <Picker.Item label="What city were you born in?" value="What city were you born in?" />
                                <Picker.Item label="Where is your favorite place to vacation?" value="Where is your favorite place to vacation?" />
                                </Picker>
                        <Text style={styles.text}>Answer</Text>
                        <TextInput
                            keyboardType='default'
                            placeholder='Answer here'
                            // secureTextEntry={true}
                            underlineColorAndroid='black'
                            onChangeText={(value) => {
                                this.setState({
                                    answer: value
                                })
                            }} />
                        <TouchableOpacity
                            onPress={() => {
                                if (this.state.email == '') {
                                    return;
                                }
                                // if (this.state.password == '') {
                                //     return;
                                // }
                                this.checking(this.state.email);
                                // firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                                //     .then(() => {
                                //         var curr = firebase.auth().currentUser.uid;
                                //         console.log(curr);
                                //         AsyncStorage.setItem('uid', curr, () => {
                                //             AsyncStorage.setItem('type', 'patient', () => {
                                //                 firebase.database().ref().child('users').child('Patients').child(curr).on('value', (datasnapshot) => {
                                //                     if (!datasnapshot.exists()) {
                                //                         ToastAndroid.showWithGravity(
                                //                             'Please Register First',
                                //                             ToastAndroid.SHORT,
                                //                             ToastAndroid.CENTER,
                                //                           );
                                //                     }
                                //                     else{
                                //                         this.props.navigation.navigate('PatientHome');
                                //                     }
                                //                 })
                                //             })
                                //         })
                                //     })
                                //     .catch(function (error) {
                                //         var errorCode = error.code;
                                //         var errorMessage = error.message;
                                //     })
                            }}
                            style={{
                                backgroundColor: '#40E0D0',
                                width: 250,
                                height: 40,
                                justifyContent: "center",
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginTop: 20,
                                borderRadius: 5
                            }}>
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 17
                            }}>Continue</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                        onPress={()=>{
                            
                        }}
                        >
                        <Text 
                        style={{
                            color:'#40E0D0',
                            paddingTop:5,
                        }}
                        >Forgot Password?</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
    }
})