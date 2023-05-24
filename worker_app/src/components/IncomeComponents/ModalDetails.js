import {
  Animated,
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SIZES} from '../../contains';
import {shadowView} from '../../contains/theme';
import AppBarModal from '../Appbar/AppBarModal';
import ListImageItems from '../HomeComponents/ListImageItems';
import {useRef} from 'react';
import {useState} from 'react';
import ImageItems from './ImageItems';

export default function ModalDetails({
  modalVisible,
  setModalVisible,
  orderData,
  convertDateTime,
  customer,
}) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState('');

  const [visibleImageView, setVisibleImageView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const viewabilityConfigCallbackPairs = useRef([
    {viewConfig, viewableItemsChanged},
  ]).current;

  function onPress() {
    setModalVisible(!modalVisible);
  }

  //   console.log(orderData);
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.container}>
        <AppBarModal onPress={onPress} centerText={'Chi tiết hóa đơn'} />
        <ScrollView>
          <View style={styles.centralView}>
            {/* Information */}
            <View style={styles.informationCustomer}>
              <Image
                style={styles.avatar}
                source={require('../../assets/images/user.png')}
                //   source={{uri: customer.image}}
              />
              <Text style={{fontSize: 20, fontWeight: '700'}}>
                {orderData.customer_name}
              </Text>
            </View>
            {/* Location */}
            <View style={styles.viewLocation}>
              <Text style={styles.textTong}>Địa chỉ:</Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Image
                  style={{
                    resizeMode: 'contain',
                    height: 20,
                    width: 20,
                    margin: 5,
                  }}
                  source={require('../../assets/images/placeholder.png')}
                />
                <Text style={{fontSize: 16, fontWeight: '700'}}>
                  {orderData.titleAddress
                    ? orderData.titleAddress
                    : '12 Nguyễn Văn Bảo'}
                </Text>
              </View>
            </View>
            {/* Detail  */}
            <View style={styles.viewInformationOrder}>
              <Text style={styles.textTong}>Thông tin hóa đơn:</Text>
              <Text>Mã Hóa Đơn: {orderData._id}</Text>
              <Text>
                Thời gian đặt: {convertDateTime(orderData.created_at)}
              </Text>
              <Text>Hoàn thành: {convertDateTime(orderData.updated_at)}</Text>
            </View>
            <View style={styles.viewLocation}>
              <Text style={styles.textTong}>Hình ảnh:</Text>
              <View style={styles.viewList}>
                {orderData.listPhotos.map((value, index) => (
                  <ImageItems
                    key={index}
                    value={value}
                    index={index}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    visibleImageView={visibleImageView}
                    setVisibleImageView={setVisibleImageView}
                  />
                ))}
              </View>
            </View>
            <View style={styles.viewTotal}>
              <Text style={styles.textTong}>Tổng Tiền :</Text>
              <Text style={styles.textCost}>
                +
                {new Intl.NumberFormat({
                  style: 'currency',
                  currency: 'VND',
                }).format(orderData.total)}
                .000đ
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Button */}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    width: SIZES.width,

    backgroundColor: ' blue',
  },
  centralView: {
    height: SIZES.height,
    padding: 20,
  },
  informationCustomer: [
    {
      width: '100%',
      height: SIZES.height * 0.1,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
    },
    shadowView,
  ],
  viewLocation: [
    {
      marginVertical: 20,
      backgroundColor: '#ffffff',
      padding: 20,
      borderRadius: 10,
    },
    shadowView,
  ],
  viewInformationOrder: [
    {
      backgroundColor: '#ffffff',
      padding: 20,
      borderRadius: 10,
    },
    shadowView,
  ],
  avatar: {
    resizeMode: 'contain',
    height: 70,
    width: 70,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 40,
  },
  viewTotal: [
    {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 20,
      backgroundColor: '#ffffff',
      padding: 20,
      borderRadius: 10,
    },
    shadowView,
  ],
  textTong: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '900',
  },
  textCost: {
    fontWeight: '800',
    color: 'green',
  },
  viewList: {
    marginVertical: 10,
    flexDirection: 'row',
    width: '100%',
  },
});
