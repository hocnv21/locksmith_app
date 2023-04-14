import {Platform, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {COLORS, SIZES} from '../../contains';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.violet,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.height,
  },
  top: {
    marginTop: Platform.OS === 'ios' ? 30 : 0,
    width: SIZES.width,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    maxWidth: 360,
    maxHeight: 650,
    alignSelf: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    width: SIZES.width * 0.9,
    height: SIZES.height * 0.7, // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    borderRadius: 30,
  },
  bottom: {},
  logo: {
    width: '30%',
    maxHeight: 200,
    resizeMode: 'contain',
    marginBottom: 20,
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
  h1: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.violet,
  },
  forgotPass: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  welcom: {
    marginBottom: 20,
  },
  login_logo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  codeFieldRoot: {marginTop: 20, borderWidth: 1, padding: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.black,
    borderBottomWidth: 2,
    borderColor: '#000000',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: COLORS.blue,
  },
});
export default styles;
