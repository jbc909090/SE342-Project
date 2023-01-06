import React, {useState,useEffect} from "react";

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import ShoppingStore from "./photos/ShoppingStore.jpg";
import RenderClothes from "./RenderClothes";

import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
export default class Store extends React.Component {

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
    console.log("inside constructor")
    this.state = {
        //userPoints : 5,
        //this.setState({userPoints: '10' })
        transactions:[],
        userPoints: this.props.navigation.getParam("userPoints"),
        //setState({userPoints: 10}),
        user: this.props.navigation.getParam("user"),
        //userPoints: this.state.userPoints,

      items: [
        {
          ItemKey: 1,
          ItemName: "Donut",
          ItemPrice: 5,
          ItemPhoto: require("./photos/shirt1.jpg")
        },
        {
          ItemKey: 2,
          ItemName: "Coffee",
          ItemPrice: 10,
          ItemPhoto: require("./photos/shirt2.jpg")
        },
        {
          ItemKey: 3,
          ItemName: "Sandwich",
          ItemPrice: 15,
          ItemPhoto: require("./photos/shirt5.jpg")
        },
        {
          ItemKey: 4,
          ItemName: "Bread",
          ItemPrice: 5,
          ItemPhoto: require("./photos/shirt3.jpg")
        },
        {
          ItemKey: 5,
          ItemName: "Gas",
          ItemPrice: 20,
          ItemPhoto: require("./photos/shirt4.jpg")
        },

      ],
      cart: []
    };
    console.log("after set state");
    //this.state.getTest = this.state.getTest(this);
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
                this.props.navigation.navigate("Home", {
                    userPoints: this.props.navigation.getParam("userPoints"),
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
              Rewards
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

        {/* NO OF USER POINTS */}
        <View
          style={{
            backgroundColor: "#ADD8E6",
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
            {this.state.user} User Points: {this.state.userPoints}
          </Text>
        </View>

        {/* RENDERING ITEMS USING MAP FUNCTION */}
        <ScrollView style={{ height: "70%", marginBottom: 10 }}>
          {this.state.items.map(items => {
            return (
              <RenderClothes
                key={items.ItemKey}
                ItemKey={items.ItemKey}
                ItemName={items.ItemName}
                ItemPrice={items.ItemPrice}
                ItemPhoto={items.ItemPhoto}
                ItemSale={items.ItemSale}
                addCart={this.addCart}
              />
            );
          })}
        </ScrollView>

        {/* PROCEED TO CART */}
        <TouchableOpacity
          style={{
            backgroundColor: "#ADD8E6",
            width: "70%",
            height: 30,
            borderRadius: 7,
            paddingTop: 5,
            marginLeft: "16%"
          }}
          onPress={() =>
            this.props.navigation.navigate("CreateCart", {
              cart: this.state.cart,
              user: this.state.user,
              userPoints: this.state.userPoints,
              userId: this.state.userId

            })
          }
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Rewards Cart
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
