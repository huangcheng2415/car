export function setStorage(key: string, value: any): void {
  const jsonVal = JSON.stringify({value: value});
  localStorage.setItem(key, jsonVal);
};

export function getStorage(key: string, defaultVal?: any): any {
  let jsonVal = <string | null>localStorage.getItem(key);
  switch (jsonVal) {
    case null:
      return defaultVal || null;
    default:
      const jsonObj = JSON.parse(jsonVal);
      if (jsonObj.hasOwnProperty('value')) {
        return jsonObj.value;
      } else {
        return defaultVal || jsonObj;
      }
  }
};

