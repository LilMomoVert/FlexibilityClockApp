import React, { Component } from "react";
import {StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { white, bold } from "ansi-colors";

export default class DateTimePickerFlex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      time: moment(new Date()).format("HH:mm"),
      format: "24H"
    };
  }


  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
 
  handleDatePicked = date => {
    this.setState({
      isDateTimePickerVisible: false,
      time: this.formatTime(date)
    })
  };

  handleFormat = format => {
    let time = this.state.time;

    if(this.state.format === "24H"){
      time = moment(time, "HH:mm")
    }else if(this.state.format ==="12H"){
      time = moment(time, "HH:mm a");
    }
    
    if(format === "12H"){
      this.setState({ format: format, time: moment(time).format("hh:mm A") })

    }else if(format ==="24H"){
      this.setState({format: format, time: moment(time).format("HH:mm")})

  
    }    
  }
  formatTime = timePicked => {
    const format = this.state.format;
    if(format === "24H"){
      return moment(timePicked).format("HH:mm")
    }else if(format === "12H"){
      return moment(timePicked).format("hh:mm A")
      //this.setState({time: moment(timePicked).format("hh:mm a") })
    }
  }

 
  render() {
    return (
      <>
      <View style={styles.container}>
        <View style={styles.containerLayout}>
            <Text style={styles.titleText}>{this.state.time}</Text>
        </View>
        <TouchableOpacity style={styles.timeButton} title="Velg tidspunkt" onPress={this.showDateTimePicker}>
            <Text style={styles.buttonTxt}>Velg tidspunkt</Text>
        </TouchableOpacity>
            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
                mode="time"
                confirmTextIOS="Bekreft"
                cancelTextIOS="Avbryt"
                titleIOS="Velg et klokkeslett"
            />
            <View style={styles.containerLayout}>
                <TouchableOpacity style={styles.formatButton} title="12H" onPress={this.handleFormat.bind(this, "12H")}>
                    <Text style={styles.buttonTxt}>12H</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.formatButton} title="24H" onPress={this.handleFormat.bind(this, "24H")}>
                    <Text style={styles.buttonTxt}>24H</Text>
                </TouchableOpacity>
            </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    width: 400,
    textAlign: "center",
    fontSize: 80,
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: '#DDDDDD',
    padding: 10
  },

  formatButton: {
    width: 150,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#2089dc',
    color: 'white',
    padding: 28,
    marginLeft: 20,
    marginRight: 20
  },

  timeButton: {
    width: 400,
    marginTop: 100,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#2089dc',
    color: 'white',
    padding: 28
  },

  buttonTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },

  container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: "stretch",
      justifyContent: 'center'
  },

  containerLayout: {
  flexDirection: 'row', 
  alignSelf: 'center'
}
});
