function formateData (params) {
  const array = [];
  for (let key in params) {
    array.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  }
  return array.join('&');
}

let id = 0;

function jsonp ({
  url,
  params = {},
  callback,
}) {
  return new Promise((resolve, reject) => {
    const urlSymbol = url.indexOf('?') === -1 ? '?' : '&';
    const urlParams = formateData({
      ...params,
      callback
    });
    const script = document.createElement('script');
    window[`${callback}_${id++}`] = function (data) {
      resolve(data);
      document.removeChild(script);
    }
    script.src = url + urlSymbol + urlParams;
    document.appendChild(script);
  });
}

export default jsonp;
