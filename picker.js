import React from 'react';
import { StyleSheet, Text, View, Image,TextInput, TouchableOpacity, Keyboard } from 'react-native'
import Picker from 'react-native-picker'
import area from './area.json';

class MyDatumBasic extends React.Component {
    static navigationOptions = {
        title: '',     
    };
    constructor(props) {
        super(props);
        this.state={
            userCity:'',
            companyAreaArray:[]
        }
    }

    _createAreaData = () => {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }

    _companyAreaClickAction = () => {
        Keyboard.dismiss();
        this.setState({isShowMengCeng: true})
        Picker.init({
            pickerData: this._createAreaData(),
            selectedValue: this.state.companyAreaArray,
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerConfirmBtnColor: [70,123,237,1],
            pickerCancelBtnColor: [144,144,144,1],
            pickerTitleColor: [51,51,51,1],
            pickerToolBarBg: [255,255,255,1],
            pickerToolBarFontSize: 15,
            pickerBg: [245,245,245,1],
            pickerFontColor: [48,48,48,1],
            pickerFontSize: 17,
            pickerRowHeight: 48,
            pickerTitleText: '选择城市',
            onPickerConfirm: data => {
                this.setState({
                    companyAreaArray: data,
                    userCity: data.join('-'),
                    isShowMengCeng: false,
                })
            },
            onPickerCancel: data => {
                this.setState({isShowMengCeng: false})
            },
        });
        Picker.show();
    }

  onChangedCity(text){
        this.setState({userCity:text})
    }

    render() {
   
        return (
            <View style={styles.container}>
               <View style={{flexDirection:'row',alignItems:'center',width:'98%'}}>
                    <Text style={styles.con_title}>城市</Text>
                    <TextInput placeholder='请输入城市'
                        style={styles.con_input}
                        onChangeText = {(text)=>this.onChangedCity(text)}
                        value={this.state.userCity}
                        underlineColorAndroid="transparent"
                        >
                    </TextInput>
                    <View style={styles.btnyz}>
                        <TouchableOpacity
                            style={{padding:10}}
                            onPress={()=>{this._companyAreaClickAction()}}>
                        <Image style={styles.right_icon} source={require('../../../images/my/right.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}


select = (state) => {
    return state.user
}
export default connect(select)(MyDatumBasic);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        position:'relative'
    },
con_title:{
        lineHeight:50,
        width:'20%',
        flex:2,
        paddingLeft:10,
        fontSize:15,
        color:'#333333',

        width:60
    },
    con_input:{
        paddingLeft:20,
        height:45,
        flex:7
    },
    btnyz:{
        marginRight:10,
        marginTop:15
    },
    right_icon:{
        width:10,
        height:15,
    }
});