function formateData (params) {
  const array = [];
  for (let key in params) {
    array.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  }
  return array.join('&');
}

function ajax ({
  url,
  type = 'GET',
  headers = {},
  params = {},
  data = {},
  useCookie = false,
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const method = (type || 'GET').toUpperCase();
    const urlSymbol = url.indexOf('?') === -1 ? '?' : '&';
    const urlParams = formateData(params);
    const targetUrl = url + urlSymbol + urlParams;
    const dataFormatted = formateData(data);
    xhr.onreadystatechange = function () {
      if (xhr.readyState = 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    }
    if (method === 'POST') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    for (let key in header) {
      xhr.setRequestHeader(key, headers[key]);
    }

    xhr.withCredentials = !!useCookie;

    xhr.open(method, targetUrl, true);
    if (method === 'GET') {
      xhr.send();
    } else {
      xhr.send(dataFormatted);
    }
  });
}

export default ajax;
