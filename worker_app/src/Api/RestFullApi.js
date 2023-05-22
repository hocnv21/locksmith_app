import {useState} from 'react';
import {baseUrl} from '../contains/url';
import axios from 'axios';

export async function getOrder(id, setData, type) {
  const url = `${baseUrl}/order/getOrderTo${type}ByLockSmithId/${id}`;

  const result = await axios
    .get(url)
    .then(response => {
      if (response.status === 404) {
        return;
      } else if (response.status === 200) {
        setData(response.data.data);
      }
    })
    .catch(e => {
      console.log('err get icome:' + e);
    });
  return result;
}

export async function getIncome(id, setData, type) {
  const url = `${baseUrl}/order/getTotalLockSmithTo${type}/${id}`;

  const result = await axios
    .get(url)
    .then(response => {
      if (response.status === 404) {
        return;
      } else if (response.status === 200) {
        setData(response.data.data);
      }
    })
    .catch(e => {
      console.log('err get icome:' + e);
    });
  return result;
}

export async function getExitsUser(phone) {
  const url = `${baseUrl}/locksmith/phoneNumber/${phone}`;
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
export async function getLocksmith(uid, setData) {
  const source = axios.CancelToken.source();

  const url = `${baseUrl}/locksmith/${uid}`;
  // console.log('waiting  get customer !!!!!!!!!');

  await axios
    .get(url)
    .then(value => {
      setData(value.data.data);
      return;
    })
    .catch(e => {
      console.log('err get ' + e);
      // console.log(customer);
    });
}
