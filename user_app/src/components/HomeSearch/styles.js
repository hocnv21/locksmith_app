import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#d9d9d9',
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  inputText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#535353',
  },
  timeContainer: {
    flexDirection: 'row',
    width: 120,
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 40,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 0.6,
    borderColor: 'eeeeee',
  },
  iconContainer: {
    backgroundColor: '#b3b3b3',
    padding: 8,
    borderRadius: 25,
    marginLeft: 10,
  },
  destinationText: {
    marginLeft: 10,
    fontWeight: '500',
    fontSize: 16,
  },
});

export default styles;
