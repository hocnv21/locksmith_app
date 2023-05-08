import {Dimensions, Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
  map: {
    width: '100%',
    height: Dimensions.get('window').height - 80,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 40,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },

  roundButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 30,
    left: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
  },

  balanceButton: {
    position: 'absolute',
    backgroundColor: '#1c1c1c',
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    top: Platform.OS === 'ios' ? 40 : 30,
    left: Dimensions.get('window').width / 2 - 45,
  },
  balanceText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
