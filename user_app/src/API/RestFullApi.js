import {baseUrl} from '../contains/url';
import axios from 'axios';

export async function getAllOrderByCustomerId(customerId, setArrayOrder) {
  setArrayOrder(null);
  const url = `${baseUrl}/order/allOrderByCustomer/${customerId}`;
  await axios.get(url).then(response => {
    if (response.status === 404) {
      return 'error found order';
    }
    if (response.status === 200) {
      setArrayOrder(response.data.data);
    }
  });
}
export async function getExitsUser(phone) {
  const url = `${baseUrl}/customer/phoneNumber/${phone}`;
  // console.log('waiting get order !!!!!!!!!');
  const result = await axios
    .get(url)
    .then(response => {
      if (response.status === 404) {
        return false;
      } else {
        return true;
      }
    })
    .catch(e => {
      console.log('err get ' + e);
    });

  return result;
}
export async function getCustomer(uid, setData) {
  const source = axios.CancelToken.source();

  const url = `${baseUrl}/customer/${uid}`;
  // console.log('waiting  get customer !!!!!!!!!');

  await axios
    .get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36 Edg/115.0.0.0',
      },
    })
    .then(value => {
      setData(value.data.data);
      return;
    })
    .catch(e => {
      console.log('err get ' + e);
      // console.log(customer);
    });
}
