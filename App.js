import React from 'react';
import { View, ToastAndroid, Text, Image } from 'react-native';
import { Button } from '@ant-design/react-native';
import { flyPost } from './common/js/fetch'
import Alipay from 'react-native-yunpeng-alipay';
import BlurImage from 'react-native-blur-image'

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

  render() {
    return (
      <View>
        <Button onPress={() => {this.pay()}} type="primary">支付</Button>
        <Text>{this.state.msg}</Text>
        {/*<BlurImage*/}
          {/*source={{uri:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1577759731,3108671782&fm=27&gp=0.jpg'}}*/}
          {/*style={{width: 147, height: 77 }}*/}
          {/*blurRadius={100}*/}
        {/*/>*/}
      </View>
    );
  }
}
