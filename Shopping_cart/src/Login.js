import React, {useState,useEffect} from "react";
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
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

export default class Login extends React.Component {
  validateUserInfo = (gmail, password) => {
    console.log("Success!",gmail,password);
    //check that info not already taken
    console.log("check that info not already taken")
    var value = true;
    var tempUser = "";
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
            var tempPassword = tempObj.Password;
            console.log(tempGmail);
            console.log(tempPassword);
            if(tempGmail===gmail){
                console.log('Email matches');
                if(tempPassword===password){
                    console.log("password matches");
                    value = true;
                    tempUser = tempGmail;
                    console.log(value);
                    console.log(tempUser);
                    break;
                }else{
                    console.log("password does not match");
                    value = false;
                    break;
                }
            }else{
                console.log('Email does not match');
                value = false;
                console.log(value);
            }
        }
        //if not insert the information into the DB
        if (value===true){
            this.props.navigation.navigate("Home", {
                cart: this.state.cart,
                user: tempUser,
                userPoints: 0
            })
        }else{
            alert("The email and password you entered do not match. Please try again.");
        }
    })
  }
  addUser = ()=>{
      let user = this.state.user;
      this.setState({ user: user });

    }
  addCart = (ItemKey, ItemName, ItemPrice, ItemQuantity) => {
    let cart = this.state.cart;

    for (var i = 0; i < cart.length; i++) {
      if (cart[i].ItemKey === ItemKey) {
        cart.splice(i, 1);
      }
    }
    if (ItemQuantity !== 0) {
      cart.push({
        ItemKey: ItemKey,
        ItemName: ItemName,
        ItemPrice: ItemPrice,
        ItemQuantity: ItemQuantity
      });
    }
    this.setState({ cart: cart });
  };
  constructor(props) {

    super(props);
    this.state = {
       user: 'Test@gmail.com'

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
              Login
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

        {/*Login*/}
        <Formik
            validationSchema={loginValidationSchema}
            initialValues={{email: '', password: '',}}
            onSubmit={(values) => this.validateUserInfo(values.email,values.password)}
        >
          {({  handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, }) => (
            <>
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
                title="Login"
                disabled={!isValid}
              />
              </TouchableOpacity>



            </>
          )}
        </Formik>

        {/* Register */}
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
                this.props.navigation.navigate("Register", {
                })
            }
            >
                <Text
                    style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
                >
                    Register
                </Text>
        </TouchableOpacity>

      </View>
    );
  }
}
const loginValidationSchema = yup.object().shape({
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
        .matches(/\S*[!@#$%^&*()_-]\S*/,  "Password must have a special character:!@#$%^&*()_-")

  })
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  }
});
