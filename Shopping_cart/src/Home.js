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

export default class Home extends React.Component {

  addUserPoints = ()=>{
    let userPoints = this.state.userPoints;
    this.setState({ userPoints: userPoints });
  }
  addUser = ()=>{
        let user = this.state.user;
        this.setState({ user: user });
  }
  addUserId = ()=>{
          let userId = this.state.userId;
          this.setState({ userId: userId });
  }
  getTest=()=>{
      console.log("inside getTest");
      //this.state.userPoints = 3;
      /*console.log(typeof inputEmail);
      console.log("");*/
      var value = false;
      var tempResponse = {};
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
                console.log(tempGmail);
                console.log(this.state.user);
                if(tempGmail===this.state.user){
                    console.log("it matches");
                    this.state.userId = tempObj.UserID;
                    console.log(this.state.userId);
                    //not happy path!!!!!!!!
                    break;
                }
            }
      });
      fetch('http://192.168.217.1:3000/readPoints')
        .then(response => response.json())
        //.then(users => console.log())
        .then(users => {
          //var x =
          var count = 0;
          //for (var key of Object.keys(users)){
          console.log("inside points fetch");
          for ( var xObject in users){
            count++;
            var tempObj =users[xObject];
            //var tempObj =users[xObject];

            console.log(tempObj);

            //compare userId to the userId from db
            var tempUserId = tempObj.UserID;
             console.log(tempUserId);
             console.log(this.state.userId);
             if(tempUserId===this.state.userId){
                console.log("it matches");
                this.state.userPoints = tempObj.TotalPoints -tempObj.PointsSpent;
                console.log(this.state.userPoints);
                break;
              }
          }
        });



      //console.log(tempResponse);
      //var test= verifyUser("hello");
      //console.log(test);
      //value=test;


      //return value;*/

    };
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

  //View transactions backend
  getTransactions=()=>{
        console.log("inside getTransactions");
        //this.state.userPoints = 3;
        /*console.log(typeof inputEmail);
        console.log("");*/
        var value = false;
        var tempResponse = {};

        fetch('http://192.168.217.1:3000/readTransactionIds')
          .then(response => response.json())
          //.then(users => console.log())
          .then(users => {
            //var x =
            var count = 0;
            //for (var key of Object.keys(users)){
            console.log("inside points fetch");
            for ( var xObject in users){
              count++;
              var tempObj =users[xObject];
              //var tempObj =users[xObject];

              console.log(tempObj);

              //compare userId to the userId from db
              var tempUserId = tempObj.UserID;
               console.log(tempUserId);
               console.log(this.state.userId);
               if(tempUserId===this.state.userId){
                  console.log("it matches");
                  //create transaction items and add to list with dummy values
                  console.log("transactionId:", tempObj.TransactionID);
                  console.log("date:", tempObj.Date);
                  this.addTransaction(tempObj.TransactionID, tempObj.Date, tempObj.Price, tempObj.Points);
                  console.log("transactions:",this.state.transactions);
                  //this.setState({ transactions: transactions });
                }
            }
          });
        console.log("after fetch");
        //rthis.setState({transactions: transactions.slice()});

      };
  addTransaction = (ItemTransactionId, ItemName, ItemPrice, ItemPointsWorth) => {
      let transactions = this.state.transactions;
        console.log("in addTransaction");
      for (var i = 0; i < transactions.length; i++) {
        if (transactions[i].ItemTransactionId === ItemTransactionId) {
          transactions.splice(i, 1);
        }
      }

        transactions.push({
          ItemTransactionId: ItemTransactionId,
          ItemName: ItemName,
          ItemPrice: ItemPrice,
          ItemPointsWorth: ItemPointsWorth
        });

      this.setState({ transactions: transactions });
    };
  onPressViewTransactions=(e)=>{
    console.log("in onPressViewTransactions");
    e.persist();
    this.getTransactions();
    this.props.navigation.navigate("ViewTransactions", {
        user: this.state.user,
        userId: this.state.userId,
        userPoints: this.state.userPoints,
        transactions: this.state.transactions
    });

  };
  constructor(props) {

    super(props);
    this.state = {
        user: this.props.navigation.getParam("user"),
        cart: [],
        transactions:[],
        userPoints: this.props.navigation.getParam("userPoints"),
        //setState({userPoints: 10}),
    };
    this.getTest();

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
                this.props.navigation.navigate("Login", {
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
              Home
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
            Welcome {this.state.user}!  Points: {this.state.userPoints}
          </Text>
        </View>


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
                this.props.navigation.navigate("Store", {
                    cart: this.state.cart,
                    user: this.state.user,
                    userPoints: this.state.userPoints,
                })
            }
            >
                <Text
                    style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
                >
                    Rewards
                </Text>
        </TouchableOpacity>
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
            onPress={this.onPressViewTransactions}
            >
                <Text
                    style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
                >
                    Transactions
                </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  }
});
