import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React from 'react';
import ListImageItems from './ListImageItems';
import {SIZES} from '../../contains';
import {useRef} from 'react';
import {useState} from 'react';

export default function ModalOrder({
  setModalVisible,
  modalVisible,
  newOrders,
  onAccept,
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

  const listImage = [
    {
      id: 1,
      uri: 'https://res.cloudinary.com/dpz4urgxn/image/upload/v1678889224/lock-smith-banner1_bt54l9.jpg',
    },
    {
      id: 2,
      uri: 'https://res.cloudinary.com/dpz4urgxn/image/upload/v1679473405/diego-hernandez-MSepzbKFz10-unsplash_z1maxo.jpg',
    },
    {
      id: 3,
      uri: 'https://res.cloudinary.com/dpz4urgxn/image/upload/v1678889231/lock-smith-banner5_saq1vo.jpg',
    },
  ];
  function getType() {
    if (newOrders.type === 'home') {
      return 'Khóa Nhà';
    } else if (newOrders.type === 'vehicle') {
      return 'Khóa Xe';
    } else {
      return 'Khóa Két Sắt';
    }
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTextHeader}>Bạn có một đơn mới !</Text>
          <View style={styles.viewListInformation}>
            <Text style={styles.modalText}>
              <Text style={styles.textBold}>Loại khóa:</Text>
              {getType()}
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.textBold}>Tình trạng:</Text>
              {newOrders.description}
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.textBold}>Địa chỉ:</Text> 12 Nguyễn Văn Bảo ,
              phường 4 , Gò Vấp
            </Text>
          </View>

          <Text style={styles.textBold}>Hình ảnh:</Text>
          <View style={styles.viewList}>
            <FlatList
              ref={slidesRef}
              data={newOrders.listPhotos}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <ListImageItems
                  key={item.id}
                  listImage={newOrders.listPhotos}
                  indexPage={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  value={item}
                  setVisibleImageView={setVisibleImageView}
                  setSelectedImage={setSelectedImage}
                  visibleImageView={visibleImageView}
                  selectedImage={selectedImage}
                />
              )}
              keyExtractor={item => item.id}
              bounces={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],

                {useNativeDriver: false},
              )}
              onMomentumScrollEnd={event => {
                const index = Math.floor(
                  event.nativeEvent.contentOffset.x /
                    event.nativeEvent.layoutMeasurement.width,
                );
                setCurrentIndex(index);
              }}
              viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
              scrollEventThrottle={32}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{}}>Từ Chối</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => onAccept()}>
              <Text style={styles.textWhile}>Chấp Nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // width: SIZES.width * 0.7,
    // height: SIZES.height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '95%',
    height: SIZES.height * 0.9,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  viewListInformation: {alignItems: 'flex-start'},
  modalTextHeader: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 40,
    borderWidth: 1,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textBold: {color: '#000000'},
  textWhile: {
    color: '#ffffff',
  },
  viewList: {
    marginVertical: 10,
    // borderWidth: 1,
    width: '100%',
    height: '60%',
  },
});
