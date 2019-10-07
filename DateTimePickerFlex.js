import React, { Component } from "react";
import {StyleSheet, Button, View, Text, TouchableOpacity } from "react-native";
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
    }
  }

 
  render() {
    return (
      <>
      <View>
        <View >
        <Text >{this.state.time}</Text>
        </View>
        <TouchableOpacity title="Velg tidspunkt" onPress={this.showDateTimePicker}>
            <Text>Velg tidspunkt</Text>
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
            <View >
            <TouchableOpacity title="12H" onPress={this.handleFormat.bind(this, "12H")}>
            <Text >12H</Text>
            </TouchableOpacity>
            <TouchableOpacity  title="24H" onPress={this.handleFormat.bind(this, "24H")}>
            <Text >24H</Text>
            </TouchableOpacity>
            </View>

        </View>
      </>
    );
  }
}