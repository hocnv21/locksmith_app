import {Platform, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {COLORS, SIZES} from '../../contains';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SIZES.height,
    padding: 20,
    backgroundColor: COLORS.violet,
  },
  logo: {
    width: '70%',
    maxHeight: 200,
    maxWidth: 300,
  },
  form: {
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    maxWidth: 360,
    // maxHeight: 680,

    alignSelf: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    width: SIZES.width * 0.9,

    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 7,
  },
  button: {
    width: '100%',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderColor: '#e8e8e8',
  },
  login_logo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  h1: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.violet,
  },
  welcom: {
    marginBottom: 20,
  },
  haveAcc: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default styles;
