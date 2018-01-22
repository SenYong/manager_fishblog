import { baseUrl } from './env'

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + '?' + url
  var sendData = ''
  if (type == 'GET') {
    var dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += '/' + key + '/' + data[key] ;
    })
    url = url + dataStr
  }else{
    Object.keys(data).forEach(key => {
      sendData += key + '=' + data[key] + '&';
    })
    sendData = sendData.substr(0, sendData.lastIndexOf('&'));
  }
  return new Promise((resolve, reject) => {
    var requestObj = null;
    window.XMLHttpRequest ? requestObj = new XMLHttpRequest() : requestObj = new ActiveXObject;
    requestObj.open(type, url, true);
    requestObj.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    requestObj.send(sendData);
    requestObj.onreadystatechange = () => {
      if (requestObj.readyState == 4) {
        if (requestObj.status == 200) {
          let obj = requestObj.response
          resolve(obj)
        } else {
          reject(requestObj)
        }
      }
    }
  })
}
