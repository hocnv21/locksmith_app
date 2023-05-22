import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {shadowView} from '../../contains/theme';
import ModalDetails from './ModalDetails';

export default function OrderItems({item}) {
  function convertDateTime(date) {
    const newDate = new Date(date);
    const hour = newDate.getHours();
    const minutes = newDate.getMinutes();
    const string =
      hour + ':' + minutes + ',' + newDate.toLocaleDateString('en-GB');
    return string;
  }
  function getIcon(type) {
    if (type === 'home') {
      return require('../../assets/images/map-home.png');
    } else if (type === 'vehicle') {
      return require('../../assets/images/map-car.png');
    } else {
      return require('../../assets/images/safe.png');
    }
  }
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <ModalDetails
        convertDateTime={convertDateTime}
        orderData={item}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.container}>
        <View style={styles.directionView}>
          <View style={styles.viewImage}>
            <Image style={styles.image} source={getIcon(item.type)} />
          </View>
          <View>
            {item.status === 'canceled' ? (
              <Text style={styles.textCancel}>Đã hủy</Text>
            ) : null}
            <Text>{item._id}</Text>
            <Text>{convertDateTime(item.created_at)}</Text>
          </View>
          <View>
            <Text>{item.total}.000đ</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: [
    {
      padding: 10,
      borderRadius: 5,
      marginVertical: 5,
      backgroundColor: '#ffffff',
    },
    shadowView,
  ],
  directionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCancel: {
    color: 'red',
  },
  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    resizeMode: 'cover',
    width: PixelRatio.getPixelSizeForLayoutSize(12),
    height: PixelRatio.getPixelSizeForLayoutSize(12),
  },
});
