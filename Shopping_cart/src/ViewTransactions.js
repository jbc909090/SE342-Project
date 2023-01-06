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

export default class ViewTransactions extends React.Component {
  /*componentWillMount() {
    /*let TotalAmount = 0;
    for (let i = 0; i < this.state.transactions.length; i++) {
      TotalAmount =
        TotalAmount +
        this.state.transactions[i].ItemQuantity * this.state.transactions[i].ItemPrice;
    }
    this.setState({ TotalAmount: TotalAmount });
  }*/
  delete = ItemKey => {
    console.log("deleting");
    console.log(ItemKey);
    let transactions = this.state.transactions;
    let totalPoints = -1;
    console.log(totalPoints);
    for (let i = 0; i < transactions.length; i++) {
        console.log("going through transactions");
        console.log(transactions[i].ItemTransactionId);
      if (transactions[i].ItemTransactionId === ItemKey) {
        if(transactions[i].ItemPointsWorth==0){
            Alert.alert("You cannot remove a rewards transaction.");
            break;
        }else{
            totalPoints = transactions[i].ItemPointsWorth;
            //call to remove from db
            this.deleteTransaction(ItemKey,totalPoints);
            //remove from screen
            console.log("you have deleted the item");
            transactions.splice(i, 1);
            break;
        }
      }
    }
    this.setState({ transactions: transactions });
  };
  deleteTransaction=(transactionId,totalPoints)=>{
      console.log("inside delete transaction");
      console.log(transactionId);
      console.log(this.state.userId);
      fetch('http://192.168.217.1:3000/deleteTransaction', {
          method: 'POST', // Here you're saying that you want to make a POST request. Could be any method, like a GET, for example.
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }, // You can specify your requisition headers here. That line is optional.
          body: JSON.stringify({ // Here's the fun part. Put your data here.
          userId: this.state.userId,
          transactionId: transactionId
          })

      })
      .then(response => response.json())
      .then(serverResponse => console.log(serverResponse))
      .then(()=>this.updateTotalPoints(totalPoints))
      .catch((error) => console.warn(error))
  }
  updateTotalPoints=(totalPoints)=>{
      console.log("inside update total points");
      console.log(totalPoints);
      console.log(this.state.userId);
      fetch('http://192.168.217.1:3000/updateTotalPoints', {
          method: 'POST', // Here you're saying that you want to make a POST request. Could be any method, like a GET, for example.
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }, // You can specify your requisition headers here. That line is optional.
          body: JSON.stringify({ // Here's the fun part. Put your data here.
          userId: this.state.userId,
          pointsRemoved: totalPoints
          })

      })
      .then(response => response.json())
      .then(serverResponse => console.log(serverResponse))
      .catch((error) => console.warn(error))
  }
  addUserPoints = ()=>{
      let userPoints = this.state.userPoints;
      this.setState({ userPoints: userPoints });

    }
    addUser = ()=>{
          let user = this.state.user;
          this.setState({ user: user });

        }
  spendPoints=()=>{
    //Alert.alert("Points Spent","You have spent " + `${this.state.TotalAmount}` +" points.");
    Alert.alert("Points Spent","You have spent ");

  }

  addTransaction = (ItemTransactionId, ItemName, ItemPrice, ItemPointsWorth) => {
      let transactions = this.state.transactions;

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
  constructor(props) {
    super(props);
    this.state = {
      transactions: this.props.navigation.getParam("transactions"),
      user: this.props.navigation.getParam("user"),
      userId: this.props.navigation.getParam("userId"),
      userPoints: this.props.navigation.getParam("userPoints"),
      TotalAmount: 0
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
                this.props.navigation.navigate("Home", {
                  transactions: this.state.transactions
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

              Transactions
            </Text>
          </View>
          <MaterialCommunityIcons
            name="format-list-bulleted"
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
            backgroundColor: "#cca300"
          }}
        >
        <View style={{ borderRightWidth: 0.6, width: "18%" }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
                marginTop: 3
              }}
            >
              Id
            </Text>
          </View>
          <View
            style={{
              width: "48%",
              borderRightWidth: 0.6,
              borderLeftWidth: 0.6
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
              Date
            </Text>
          </View>
          <View style={{ borderRightWidth: 0.6, width: "15%" }}>
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

          <View style={{ width: "20%" }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
                marginTop: 3
              }}
            >
              Points
            </Text>
          </View>
        </View>

        {/* Table Contents */}
        <ScrollView>
          {this.state.transactions.map(transactions => {
            return (
              <View
                key={transactions.ItemTransactionId}
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 0.6,
                  flexDirection: "row",
                  height: 30
                }}
              >
              <View style={{ borderRightWidth: 0.6, width: "18%" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 12, marginTop: 3 }}
                  >
                    {transactions.ItemTransactionId}
                  </Text>
                </View>
                <View
                  style={{
                    width: "48%",
                    borderRightWidth: 0.6,
                    borderLeftWidth: 0.6
                  }}
                >
                  <Text
                    style={{ textAlign: "center", fontSize: 12, marginTop: 3 }}
                  >
                    {transactions.ItemName}
                  </Text>

                </View>

                <View style={{ borderRightWidth: 0.6, width: "15%" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 12, marginTop: 3 }}
                  >
                    ${transactions.ItemPrice}
                  </Text>
                </View>
                <View style={{ width: "12%" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 12, marginTop: 3 }}
                  >
                    {transactions.ItemPointsWorth} points
                  </Text>
                </View>
                <MaterialIcons
                  name="delete"
                  size={23}
                  color="black"
                  style={{ marginLeft: 5 }}
                  onPress={() => {
                    this.delete(transactions.ItemTransactionId);
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
            backgroundColor: "#cca300",
            width: "70%",
            height: 30,
            borderRadius: 7,
            paddingTop: 5,
            marginLeft: "16%"
          }}
          onPress={() =>
                      this.props.navigation.navigate("GasInstoreStore", {
                        user: this.state.user,
                        userPoints: this.state.userPoints,
                        userId: this.state.userId
                      })
                    }
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
              Add Transactions
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
            backgroundColor: "#cca300"
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
              {this.state.UserPoints} points
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
