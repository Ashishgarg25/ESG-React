import Get from "./internalAxiosInstance";

function hitAPI(url, method, inputData, object, loader, setLoader, callback) {
  console.log(inputData);
  if (!object.loaded) {
    object.loaded = 1;
    setLoader(true);
    let data = {
      method: method,
      url: url,
      [method == "GET" ? "params" : "data"]: inputData,
    };
    Get(data)
      .then((data) => {
        if (data.data.code == 200) {
          object.response = data.data.data;
          if (callback) callback(data.data.data);
        } else if (callback) callback(false);
        object.loaded = 2;
        setLoader(false);
      })
      .catch((error) => {
        object.loaded = {};
        setLoader(false);
        if (callback) callback(false);
      });
  } else if (object.loaded == 1 && !loader) setLoader(true);
}

export default hitAPI;
