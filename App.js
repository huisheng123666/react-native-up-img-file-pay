import React from 'react';
import { View, ToastAndroid, Text, Image } from 'react-native';
import { Button } from '@ant-design/react-native';
import { flyPost } from './common/js/fetch'
import Alipay from 'react-native-yunpeng-alipay';
import RNFileSelector from 'react-native-file-selector';
import ImagePicker from 'react-native-image-crop-picker';

export default class PopupExample extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = value => {
      this.setState({ value });
    };
    this.state = {
      value: undefined,
      msg: ''
    };
  }

  async pay () {
    let that = this
    const res = await flyPost('http://mk.hooook.com/api/v1/pay/recharge', {payment_method_id: 1, money: '5000.00'})
    Alipay.pay(res.data.data).then((data) => {
      that.setState({
        msg: JSON.stringify(data)
      })
    }, function (err) {
      that.setState({
        msg: JSON.stringify(err)
      })
    });
  }

  upLoadFile () {
    RNFileSelector.Show(
      {
        title: 'Select File',
        onDone: (path) => {
          console.log('file selected: ' + path)
        },
        onCancel: () => {
          console.log('cancelled')
        }
      }
    )
  }

  upLoadImg () {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });
  }

  render() {
    return (
      <View>
        <Button onPress={() => {this.pay()}} type="primary">支付宝支付</Button>
        <Button onPress={() => {this.upLoadFile()}}>上传文件</Button>
        <Button onPress={() => {this.upLoadImg()}}>上传图片</Button>
        <Text>{this.state.msg}</Text>
      </View>
    );
  }
}
