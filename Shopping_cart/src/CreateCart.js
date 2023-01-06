import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";

export default class CreateCart extends React.Component {
  componentWillMount() {
    let TotalAmount = 0;
    for (let i = 0; i < this.state.cart.length; i++) {
      TotalAmount =
        TotalAmount +
        this.state.cart[i].ItemQuantity * this.state.cart[i].ItemPrice;
    }
    this.setState({ TotalAmount: TotalAmount });
  }
  delete = ItemKey => {
    let cart = this.state.cart;
    console.log(ItemKey);
    for (let i = 0; i < cart.length; i++) {
        console.log("going through transactions");
        console.log(cart[i].ItemKey);
      if (cart[i].ItemKey === ItemKey) {
        this.setState({
          TotalAmount:
            this.state.TotalAmount -
            this.state.cart[i].ItemQuantity * this.state.cart[i].ItemPrice
        });
        cart.splice(i, 1);
        break;
      }
    }
    this.setState({ cart: cart });
  };
  addUserPoints = ()=>{
      let userPoints = this.state.userPoints;
      this.setState({ userPoints: userPoints });

    }
    addUser = ()=>{
          let user = this.state.user;
          this.setState({ user: user });

        }

postTransaction=()=>{
    console.log("in post transaction");
    //calculate the total price and points of the items in the cart
    let TotalAmount = this.state.TotalAmount;
    let TransactionPoints =0;
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
        .then(()=>this.getLatestTransactionId())
        .then(()=>Alert.alert("Your Transaction has been added."))
        .catch((error) => console.warn(error))
        }
    getLatestTransactionId=()=>{
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
            this.postTransactionItems(this.state.latestTransactionId);
          });
        console.log("after fetch this iwr adfjsdklfjslr");
        //rthis.setState({transactions: transactions.slice()});

      };
    postTransactionItems=(transactionId)=>{
        console.log("inside postTransactionItems, latest id, state id:", transactionId, this.state.latestTransactionId);

        //for each item in the cart
        console.log("go through cart");
        for (let i = 0; i < this.state.cart.length; i++) {
            console.log(this.state.cart[i]);
                //Add item to store receipt items
                console.log("item is a store item");

                console.log(this.state.latestTransactionId);
                console.log(this.state.cart[i].ItemKey);
                fetch('http://192.168.217.1:3000/addRewardTransaction', {
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
                  })

              })
              .then(response => response.json())
              .then(serverResponse => console.log(serverResponse))
              .then(()=>this.updatePointSpent())
              .catch((error) => console.warn(error))


        }
  }
  updatePointSpent=()=>{
    console.log("inside update points spent");
    console.log(this.state.TotalAmount);
    console.log(this.state.userId);
    fetch('http://192.168.217.1:3000/updatePointsSpent', {
        method: 'POST', // Here you're saying that you want to make a POST request. Could be any method, like a GET, for example.
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, // You can specify your requisition headers here. That line is optional.
        body: JSON.stringify({ // Here's the fun part. Put your data here.
        userId: this.state.userId,
        pointsSpent: this.state.TotalAmount
        })

    })
    .then(response => response.json())
    .then(serverResponse => console.log(serverResponse))
    .then(()=>Alert.alert("Your points have been updated"))
    .catch((error) => console.warn(error))
  }
  spendPoints=()=>{
    if(this.state.TotalAmount>this.state.userPoints){
        Alert.alert("You do not have enough points.");
    }else{
        this.postTransaction();
        Alert.alert("Points Spent","You have spent " + `${this.state.TotalAmount}` +" points.");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.navigation.getParam("cart"),
      user: this.props.navigation.getParam("user"),
      userId: this.props.navigation.getParam("userId"),
      userPoints: this.props.navigation.getParam("userPoints"),
      TotalAmount: 0,
      latestTransactionId: 0,

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
            marginTop: "6.5%",
            borderBottomWidth: 0.6,
            borderBottomColor: "black"
          }}
        >
          {
            <Ionicons
              name="md-arrow-back"
              size={30}
              color="#404040"
              style={{ paddingTop: 12, paddingLeft: "9%" }}
              onPress={() =>
                this.props.navigation.navigate("Store", {
                  cart: this.state.cart
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

              Add Rewards
            </Text>
          </View>
          <MaterialCommunityIcons
            name="cart"
            size={30}
            color="black"
            //size={30}
            style={{ paddingTop: 12, paddingLeft: "20%" }}
          />
        </View>

        {/* Table Header */}
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 0.6,
            flexDirection: "row",
            height: 30,
            backgroundColor: "#ADD8E6"
          }}
        >
          <View
            style={{
              width: "48%",
              borderRightWidth: 0.6,
              borderLefttWidth: 0.6
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
                marginTop: 3
              }}
            >
              Item Name
            </Text>
          </View>
          <View style={{ borderRightWidth: 0.6, width: "18%" }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
                marginTop: 3
              }}
            >
              Quantity
            </Text>
          </View>
          <View style={{ borderRightWidth: 0.6, width: "12%" }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
                marginTop: 3
              }}
            >
              Cost
            </Text>
          </View>
          <View style={{ width: "22%" }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
                marginTop: 3
              }}
            >
              Total
            </Text>
          </View>
        </View>

        {/* Table Contents */}
        <ScrollView>
          {this.state.cart.map(cart => {
            return (
              <View
                key={cart.ItemKey}
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 0.6,
                  flexDirection: "row",
                  height: 30
                }}
              >
                <View
                  style={{
                    width: "48%",
                    borderRightWidth: 0.6,
                    borderLefttWidth: 0.6
                  }}
                >
                  <Text
                    style={{ textAlign: "center", fontSize: 12, marginTop: 3 }}
                  >
                    {cart.ItemName}
                  </Text>
                </View>
                <View style={{ borderRightWidth: 0.6, width: "18%" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 12, marginTop: 3 }}
                  >
                    {cart.ItemQuantity}
                  </Text>
                </View>
                <View style={{ borderRightWidth: 0.6, width: "12%" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 12, marginTop: 3 }}
                  >
                    {cart.ItemPrice} points
                  </Text>
                </View>
                <View style={{ width: "12%" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 12, marginTop: 3 }}
                  >
                    {cart.ItemQuantity * cart.ItemPrice} points
                  </Text>
                </View>
                <MaterialIcons
                  name="delete"
                  size={23}
                  color="black"
                  style={{ marginLeft: 5 }}
                  onPress={() => {
                    this.delete(cart.ItemKey);
                  }}
                />
              </View>
            );
          })}
        </ScrollView>

        {/* SPEND POINTS */}

        <TouchableOpacity
          style={{
            borderRightWidth: 0.6,
            borderLeftWidth: 0.6,
            borderTopWidth: 0.6,
            backgroundColor: "#ADD8E6",
            width: "70%",
            height: 30,
            borderRadius: 7,
            paddingTop: 5,
            marginLeft: "16%"
          }}
          onPress={this.spendPoints}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold"
              }}
            >
              Spend Points
            </Text>
            <FontAwesome
              name="arrow-right"
              size={20}
              color="white"
              style={{ marginLeft: 4 }}
            />
          </View>
        </TouchableOpacity>

        {/* Table Footer */}
        <View
          style={{
            borderBottomColor: "black",
            borderTopWidth: 0.6,
            borderBottomWidth: 0.6,
            flexDirection: "row",
            height: 30,
            backgroundColor: "#ADD8E6"
          }}
        >
          <View
            style={{
              width: "48%",
              borderRightWidth: 0.6,
              borderLefttWidth: 0.6
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
                marginTop: 3
              }}
            >
              Total Cost
            </Text>
          </View>
          <View style={{ borderRightWidth: 0.6, width: "52%" }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
                marginTop: 3
              }}
            >
              {this.state.TotalAmount} points
            </Text>
          </View>
        </View>
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
