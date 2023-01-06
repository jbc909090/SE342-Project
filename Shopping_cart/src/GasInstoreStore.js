import React, {useState,useEffect} from "react";

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import ShoppingStore from "./photos/ShoppingStore.jpg";
import RenderClothes from "./RenderItems";

import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
export default class GasInstoreStore extends React.Component {

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
  addLatestTransactionId=()=>{
        let latestTransactionId = this.state.latestTransactionId;
        this.setState({ latestTransactionId: latestTransactionId });
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
                this.state.userPoints = tempObj.TotalPoints;
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
  addCart = (ItemKey, ItemName, ItemPrice, ItemQuantity,ItemPoints) => {
    let cart = this.state.cart;
    console.log("add cart ItemPoints:",ItemPoints)
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
        ItemQuantity: ItemQuantity,
        ItemPoints: ItemPoints
      });
    }
    this.setState({ cart: cart });
  };

  //Add Transaction Backend
  postTransaction=()=>{
    console.log("in post transaction");
    //calculate the total price and points of the items in the cart
    let TotalAmount = 0;
    let TransactionPoints =0;
    for (let i = 0; i < this.state.cart.length; i++) {
        TotalAmount = TotalAmount + this.state.cart[i].ItemQuantity * this.state.cart[i].ItemPrice,
        TransactionPoints= TransactionPoints + this.state.cart[i].ItemQuantity * this.state.cart[i].ItemPoints;
        console.log("item points:", this.state.cart[i].ItemPoints);
    }
    this.setState({ TotalAmount: TotalAmount });
    this.setState({ TransactionPoints: TransactionPoints });
    console.log(TotalAmount, TransactionPoints);

    //call app.post with userid, and the price and points
    this.postPricePoint(TotalAmount, TransactionPoints);
    //Alert.alert("Your Transaction has been added.");

    //read the transactions and get the latest transaction id
    //this.getLatestTransactionId();
  }

    postPricePoint=(price, points)=>{
            console.log("inside post test");
            fetch('http://192.168.217.1:3000/addTransaction', {
            method: 'POST', // Here you're saying that you want to make a POST request. Could be any method, like a GET, for example.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, // You can specify your requisition headers here. That line is optional.
            body: JSON.stringify({ // Here's the fun part. Put your data here.
                //"username": this.state.name,
                //username: username,
                userId: this.state.userId,
                price: price,
                points: points
          })

        })
        .then(response => response.json())
        .then(serverResponse => console.log(serverResponse))
        .then(()=>this.getLatestTransactionId(points))
        .then(()=>Alert.alert("Your Transaction has been added."))
        .catch((error) => console.warn(error))
        }
    getLatestTransactionId=(points)=>{
        console.log("inside getTransactions");
        //this.state.userPoints = 3;
        /*console.log(typeof inputEmail);
        console.log("");*/
        var value = false;
        var tempResponse = {};
        let tempLatestTransactionId = 0;
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
               if (tempUserId ===this.state.userId){
                    console.log("tempObj.TransactionID",tempObj.TransactionID);
                    console.log("latestTransacrtionId:", this.state.latestTransactionId)
                    if(tempObj.TransactionID >this.state.latestTransactionId){
                        this.setState({ latestTransactionId: tempObj.TransactionID });

                        console.log("latesttransactionid", this.state.latestTransactionId);
                        let tempLatestTransactionId = tempObj.TransactionID;
                    }

               }else{
                console.log("did not match");
               }

            }
            console.log ("THIS IS WHERE TO CALL THE FUNCITON");
            this.postTransactionItems(this.state.latestTransactionId,points);
          });
        console.log("after fetch this iwr adfjsdklfjslr");
        //rthis.setState({transactions: transactions.slice()});

      };
    postTransactionItems=(transactionId,points)=>{
        console.log("inside postTransactionItems, latest id, state id:", transactionId, this.state.latestTransactionId);

        //for each item in the cart
        console.log("go through cart");
        for (let i = 0; i < this.state.cart.length; i++) {
            console.log(this.state.cart[i]);
            if(this.state.cart[i].ItemKey<7){
                //Add item to store receipt items
                console.log("item is a store item");

                console.log(this.state.latestTransactionId);
                console.log(this.state.cart[i].ItemKey);
                console.log(this.state.cart[i].ItemQuantity);
                fetch('http://192.168.217.1:3000/addStoreTransaction', {
                    method: 'POST', // Here you're saying that you want to make a POST request. Could be any method, like a GET, for example.
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }, // You can specify your requisition headers here. That line is optional.
                    body: JSON.stringify({ // Here's the fun part. Put your data here.
                        //"username": this.state.name,
                        //username: username,
                        itemId: this.state.cart[i].ItemKey,
                        transactionId: this.state.latestTransactionId,
                        quantity: this.state.cart[i].ItemQuantity
                  })

              })
              .then(response => response.json())
              .then(serverResponse => console.log(serverResponse))
              .catch((error) => console.warn(error))

            }
            else{
                //add item to gas receipt
                console.log("item is a gas item");
                console.log(this.state.latestTransactionId);
                console.log(this.state.cart[i].ItemPrice);
                console.log(this.state.cart[i].ItemName);
                console.log(this.state.cart[i].ItemQuantity);
                fetch('http://192.168.217.1:3000/addGasTransaction', {
                    method: 'POST', // Here you're saying that you want to make a POST request. Could be any method, like a GET, for example.
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }, // You can specify your requisition headers here. That line is optional.
                    body: JSON.stringify({ // Here's the fun part. Put your data here.
                        //"username": this.state.name,
                        //username: username,
                        transactionId: this.state.latestTransactionId,
                        itemPrice: this.state.cart[i].ItemPrice,
                        itemName: this.state.cart[i].ItemName,
                        quantity: this.state.cart[i].ItemQuantity
                  })

                })
                .then(response => response.json())
                .then(serverResponse => console.log(serverResponse))
                .catch((error) => console.warn(error))
            }
        }
        console.log("ADD TO TOTAL POINTS HERE!!!!!!!!!!");
        this.addToTotalPoints(points);
  }
    addToTotalPoints=(totalPoints)=>{
      console.log("inside update total points");
      console.log(totalPoints);
      console.log(this.state.userId);
      fetch('http://192.168.217.1:3000/addToTotalPoints', {
          method: 'POST', // Here you're saying that you want to make a POST request. Could be any method, like a GET, for example.
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }, // You can specify your requisition headers here. That line is optional.
          body: JSON.stringify({ // Here's the fun part. Put your data here.
          userId: this.state.userId,
          pointsAdded: totalPoints
          })

      })
      .then(response => response.json())
      .then(serverResponse => console.log(serverResponse))
      .catch((error) => console.warn(error))
                    }
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
  onPressAddTransaction=(e)=>{
    console.log("in onPressViewTransactions");
    e.persist();
    this.postTransaction();
    /*this.getTransactions();
    this.props.navigation.navigate("ViewTransactions", {
        user: this.state.user,
        userPoints: this.state.userPoints,
        transactions: this.state.transactions
    });*/

  };
  constructor(props) {
    super(props);
    console.log("inside constructor")
    this.state = {
        //userPoints : 5,
        //this.setState({userPoints: '10' })
        transactions:[],
        userPoints: 0,
        //setState({userPoints: 10}),
        user: this.props.navigation.getParam("user"),
        userId: this.props.navigation.getParam("userId"),
        //userPoints: this.state.userPoints,
        TotalAmount: 0,
        TransactionPoints: 0,
        latestTransactionId: 0,
        //ItemPoints: 0,
      items: [
        {
          ItemKey: 1,
          ItemName: "Donut",
          ItemPrice: 2.56,
          ItemPhoto: require("./photos/shirt1.jpg"),
          ItemPoints: 2
        },
        {
          ItemKey: 2,
          ItemName: "Coffee",
          ItemPrice: 2.65,
          ItemPhoto: require("./photos/shirt2.jpg"),
          ItemPoints: 2

        },
        {
          ItemKey: 4,
          ItemName: "Sandwich",
          ItemPrice: 3.65,
          ItemPhoto: require("./photos/shirt5.jpg"),
          ItemPoints: 2
        },
        {
          ItemKey: 5,
          ItemName: "Bread",
          ItemPrice: 3.56,
          ItemPhoto: require("./photos/shirt3.jpg"),
          ItemPoints: 2

        },
        {
            ItemKey: 6,
            ItemName: "Pop",
            ItemPrice: 12.99,
            ItemPhoto: require("./photos/pop.jpg"),
            ItemPoints: 2

        },
        {
            ItemKey: 7,
            ItemName: "Standard Gas",
            ItemPrice: 2,
            ItemPhoto: require("./photos/shirt4.jpg"),
            ItemPoints: 1

        },
        {
            ItemKey: 8,
            ItemName: "Premium 1 Gas",
            ItemPrice: 2.50,
            ItemPhoto: require("./photos/premium1.jpg"),
            ItemPoints: 1

        },
        {
            ItemKey: 9,
            ItemName: "Premium 2 Gas",
            ItemPrice: 3,
            ItemPhoto: require("./photos/premium2.jpg"),
            ItemPoints: 1

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
                this.props.navigation.navigate("ViewTransactions", {
                })
              }
            />
          }
          <View
            style={{
              borderBottomWidth: 0.8,
              height: 33,
              width: "40%",
              borderTopWidth: 0.8,
              padding: 0,
              marginTop: 12,
              marginLeft: "16%"
            }}
          >
            <Text
              style={{ fontSize: 20, color: "#404040", textAlign: "center" }}
            >
              Add Transaction
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
            backgroundColor: "#cca300",
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
            No. of Items: {this.state.cart.length}  Transaction Points: {this.state.TransactionPoints}
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
                ItemPoints={items.ItemPoints}
                addCart={this.addCart}
              />
            );
          })}
        </ScrollView>

        {/* PROCEED TO CART */}
        <TouchableOpacity
          style={{
            backgroundColor: "#cca300",
            width: "70%",
            height: 30,
            borderRadius: 7,
            paddingTop: 5,
            marginLeft: "16%"
          }}
          onPress={this.onPressAddTransaction}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Add Transaction
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
