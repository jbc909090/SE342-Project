import React, {useState,useEffect} from "react";

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  Statusbar,
  Button,

} from "react-native";

import {
    AntDesign,
    Feather,
    Ionicons,
    MaterialIcons,
    MaterialCommunityIcons,
    FontAwesome
} from "@expo/vector-icons";
import ShoppingStore from "./photos/ShoppingStore.jpg";
import RenderClothes from "./RenderClothes";
import { Formik, Field } from 'formik'
import * as yup from 'yup'

export default class Login extends React.Component {
    validateUserInfo = (gmail, password,address,fullName) => {
        console.log("Success");
        console.log(gmail, password,address,fullName);
        //check that info not already taken
        console.log("check that info not already taken")
        var value = true;
        fetch('http://192.168.217.1:3000/readUsers')
            .then(response => response.json())
            //.then(users => console.log())
            .then(users => {
                //var x =
                var count = 0;
                //for (var key of Object.keys(users)){
                console.log("inside users fetch");
                for ( var xObject in users){
                    count++;
                    var tempObj =users[xObject];
                    //var tempObj =users[xObject];

                    console.log(tempObj);

                    //compare inputUser to the gmail
                    var tempGmail = tempObj.Gmail;
                    var tempPassword = tempObj.Password;
                    console.log(tempGmail);
                    console.log(tempPassword);

                    if(tempGmail===gmail){
                        console.log('Email already exists');
                        value = true;
                        console.log(value);
                        break;

                    }else if(tempPassword===password){
                        console.log('Password already exists');
                        value = true;
                        console.log(value);
                        break;
                    }else{
                        console.log('Email and password does not exist already');
                        value = false;
                        console.log(value);
                    }

                }
                //if not insert the information into the DB
                if (value===false){
                    this.postUserInfo(gmail, password,address,fullName);
                    //navigation.navigate("SignIn");
                    console.log("writing to the db!")
                    this.props.navigation.navigate("Login", {})
                }else{
                    alert("The email or password you entered is already being used.");
                }
            })



    }
    postUserInfo=(gmail, password,address,fullName)=>{
        console.log("inside post test");
        fetch('http://192.168.217.1:3000/newUser', {
        method: 'POST', // Here you're saying that you want to make a POST request. Could be any method, like a GET, for example.
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, // You can specify your requisition headers here. That line is optional.
        body: JSON.stringify({ // Here's the fun part. Put your data here.
            //"username": this.state.name,
            //username: username,
            gmail: gmail,
            password: password,
            address: address,
            fullName: fullName
      })

    })
    .then(response => response.json())
    .then(serverResponse => console.log(serverResponse))
    .then(()=>this.getNewUserId(gmail))
    .catch((error) => console.warn(error))
    }
  getNewUserId=(gmail)=>{
    //read for UserId of new account using gmail
    var value = false;
    let UserId = 0;
    fetch('http://192.168.217.1:3000/readUsers')
        .then(response => response.json())
        .then(users => {
            var count = 0;
            console.log("inside users fetch");
            for ( var xObject in users){
                count++;
                var tempObj =users[xObject];
                console.log(tempObj);

                //compare inputUser to the gmail
                var tempGmail = tempObj.Gmail;
                console.log(tempGmail);

                if(tempGmail===gmail){
                    console.log('Email matches');
                    value = true;
                    UserId = tempObj.UserID
                    break;
                }

            }
            //create account with userID, and 0s for other columns
            if (value===true){
                this.createNewUserPointsAccount(UserId);
                //navigation.navigate("SignIn");
                console.log("writing to the db!")
            }else{
                alert("Error: Your account has not been created.");
            }
        })
  }
  createNewUserPointsAccount=(userId)=>{
    console.log("creating new user points account")
    console.log(userId);
    fetch('http://192.168.217.1:3000/newUserPointsAccount', {
    method: 'POST', // Here you're saying that you want to make a POST request. Could be any method, like a GET, for example.
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, // You can specify your requisition headers here. That line is optional.
        body: JSON.stringify({ // Here's the fun part. Put your data here.
            userId: userId,
            totalPoints: 0,
            pointsSpent: 0,
        })

    })
    .then(response => response.json())
    .then(serverResponse => console.log(serverResponse))
    .catch((error) => console.warn(error))
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: 60,
            flexDirection: "row",
            marginTop: "6.5%"
          }}
        >
        {
            <Ionicons
              name="md-arrow-back"
              size={30}
              color="#404040"
              style={{ paddingTop: 12, paddingLeft: "9%" }}
              onPress={() =>
                this.props.navigation.navigate("Landing", {
                })
              }
            />
        }
          <View
            style={{
              borderBottomWidth: 0.8,
              height: 33,
              width: "33%",
              borderTopWidth: 0.8,
              padding: 0,
              marginTop: 12,
              marginLeft: "16%"
            }}
          >
            <Text
              style={{ fontSize: 20, color: "#404040", textAlign: "center" }}
            >
              Register
            </Text>
          </View>
          <AntDesign
            name="filter"
            size={30}
            color="black"
           // size={30}
            style={{ paddingTop: 12, paddingLeft: "20%" }}
          />
        </View>

        {/* BACKGROUND IMAGE */}
        <View style={{ width: "100%", height: 90, backgroundColor: "#0044cc" }}>
          <Image
            source={ShoppingStore}
            resizeMode="cover"
            style={{ width: "100%", height: 90 }}
          ></Image>
        </View>

        {/* NO OF ITEMS */}
        <View
          style={{
            backgroundColor: "#8B4000",
            height: 30,
            alignItems: "flex-start",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              marginRight: 6,
              marginLeft: 6
            }}
          >
          </Text>
        </View>

        {/*registration*/}
        <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{fullName: '', email: '', password: '',confirmPassword: '',address: '',}}
            //onSubmit={values => console.log(values)}
            //onSubmit={() => navigation.navigate("SignIn")}
            onSubmit={(values) => this.validateUserInfo(values.email,values.password,values.address,values.fullName)}


        >
          {({  handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, }) => (
            <>

              <TextInput
                //component={CustomInput}
                name="fullName"
                placeholder="Full Name"
                style={styles.textInput}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
                //keyboardType="email-address"
              />
              {(errors.fullName && touched.fullName) &&
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                }
              <TextInput
                  name="email"
                  placeholder="Email Address"
                  style={styles.textInput}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {(errors.email && touched.email) &&
                  <Text style={styles.errorText}>{errors.email}</Text>
                }


                <TextInput
                  name="password"
                  placeholder="Password"
                  style={styles.textInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  type="password"
                  value={values.password}
                  secureTextEntry
                />
                {(errors.password && touched.password) &&
                  <Text style={styles.errorText}>{errors.password}</Text>
                }

                <TextInput
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  style={styles.textInput}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  type="password"
                  value={values.confirmPassword}
                  secureTextEntry
                />
                {(errors.confirmPassword && touched.confirmPassword) &&
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                }
              <TextInput
                  name="address"
                  placeholder="Address"
                  style={styles.textInput}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                />
                {(errors.address && touched.address) &&
                  <Text style={styles.errorText}>{errors.address}</Text>
                }
              <TouchableOpacity
                style={{
                    backgroundColor: "#8B4000",
                    width: "70%",
                    height: 50,
                    borderRadius: 7,
                    paddingTop: 5,
                    marginLeft: "16%",
                }}
              >
              <Button
                color="#8B4000"
                onPress={handleSubmit}
                title="Register"
                disabled={!isValid}
              />
              </TouchableOpacity>



            </>
          )}
        </Formik>

        {/* Google Login */}
        <TouchableOpacity
            style={{
                backgroundColor: "#8B4000",
                width: "70%",
                height: 30,
                borderRadius: 7,
                paddingTop: 5,
                marginLeft: "16%"
            }}
            onPress={() =>
                this.props.navigation.navigate("Login", {
                })
            }
            >
                <Text
                    style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
                >
                    Login
                </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const signUpValidationSchema = yup.object().shape({
    fullName: yup
      .string()
      .matches(/(\w.+\s).+/, 'Enter at least 2 names')
      .required('Full name is required'),
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email is required'),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required')
        .matches(/\S*[A-Z]\S*/,  "Password must have a capital letter")
        .matches(/\S*[a-z]\S*/,  "Password must have a lowercase letter")
        .matches(/\S*[0-9]\S*/,  "Password must have a number letter")
        .matches(/\S*[!@#$%^&*()_-]\S*/,  "Password must have a special character:!@#$%^&*()_-"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")],"Both passwords must be the same"),
        //.equals('password', 'Password does not match'),
    address: yup
      .string()
      .matches(/\w*[a-z]\w*/i,  "Address must have a letter")
      .matches(/\d/, "Address must have a number")
      .matches(/(?:[\w,]+\s.+){5,}/g, 'Enter at a complete address (ex: 1 Example St, City, State 12345)')
      .required('Address is required'),
  })
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  }
});
