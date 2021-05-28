// const API = "../";//正式打包用
export const API = 'api/';
// export const API = 'http://47.108.199.44:8081';

//车牌类型颜色
export const colorList = [
  '蓝色', '绿色', '白色', '黑色', '黄色', '其他',
];

//自定义格式日期转换     eg: dateFormat("YYYY-mm-dd ", new Date());
export function dateFormat(fmt: string, date: Date): string {
  let ret;
  const opt: any = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1],
        (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length,
          '0')));
    }
  }
  return fmt;
}

//年月日
export function formatDatePicker(value: any,isHMS=false): string {
  if (value != '' && value != undefined && value) {
    let date = new Date(value);
    let str = ''
    if(isHMS){
      str = date.getFullYear() + '-' + pad((date.getMonth() + 1), 2) + '-' + pad(date.getDate(), 2)
        +' '+ pad(date.getHours(), 2) +':'+pad(date.getMinutes(),2)+':'+pad(date.getSeconds(),2)
      ;
    }else{
      str = date.getFullYear() + '-' + pad((date.getMonth() + 1), 2) + '-' + pad(date.getDate(), 2);
    }
    return str
  } else {
    return '';
  }
}

//年月日时分秒
export function formatDatetimePicker(value: any): string {
  if (value != '' && value != undefined && value) {
    let date = new Date(value);
    return date.getFullYear() + '-' + pad((date.getMonth() + 1), 2) + '-'
      + pad(date.getDate(), 2) + ' ' + pad(date.getHours(), 2) + ':' +
      pad(date.getMinutes(), 2)
      + ':' + pad(date.getSeconds(), 2);
  } else {
    return '';
  }
}

//多位添加0
export function pad(num: any, n: number): string {
  let len = num.toString().length;
  while (len < n) {
    num = '0' + num;
    len++;
  }
  return num;
}

export function formatYearMonthPicker(value: any): string {
  if (value != '' && value != undefined && value) {
    let date = new Date(value);
    return date.getFullYear() + '-' + pad((date.getMonth() + 1), 2);
  } else {
    return '';
  }
}

//
export function encode64(input: any) {
  let keyStr = 'ABCDEFGHIJKLMNOP' + 'QRSTUVWXYZabcdef' + 'ghijklmnopqrstuv'
    + 'wxyz0123456789+/' + '=';
  let output = '';
  let chr1: any, chr2: any, chr3: any = '';
  let enc1: any, enc2: any, enc3: any, enc4: any = '';
  let i = 0;
  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
      + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = '';
    enc1 = enc2 = enc3 = enc4 = '';
  } while (i < input.length);
  return output;
}

// 验证电话、手机号码
export function isPhone(val: string): boolean {
  let reg = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
  return reg.test(val.replace(/\s/g, ''));
}

// 验证数字
export function isNum(value: string | number): boolean {
  let reg = /^[+]{0,1}(\d+)$/;
  return reg.test(value.toString().replace(/\s/g, ''));
}

// 周数字转对应汉字
export function numToCN(num: number): string {
  const numArr = ['日', '一', '二', '三', '四', '五', '六'];
  return numArr[num];
}

// 验证身份证
export function isId(ID: string): boolean {
  if (typeof ID !== 'string') return false;
  const city: any = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外',
  };

  const birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' +
    Number(ID.substr(12, 2));
  const d = new Date(birthday);
  const newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' +
    Number(d.getDate());
  const currentTime = new Date().getTime();
  const time = d.getTime();
  const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  let sum = 0, residue;

  if (!/^\d{17}(\d|x)$/i.test(ID)) return false;
  if (city[ID.substr(0, 2)] === undefined) return false;
  if (time >= currentTime || birthday !== newBirthday) return false;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(ID.substr(i, 1)) * arrInt[i];
  }
  residue = arrCh[sum % 11];

  return residue === ID.substr(17, 1);
}

// 变量是否为空
export function isEmpty(val: any): boolean {
  // null or undefined
  if (val == null) return true;

  if (typeof val === 'boolean') return false;

  if (typeof val === 'number') return false;

  if (val instanceof Error) return val.message === '';

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size;
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length;
    }
  }

  return false;
}

// 判断是否是微信浏览器的函数
export function isWeiXin(): boolean {
  // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  const ua: string = window.navigator.userAgent.toLowerCase();
  return ua.includes('micromessenger');
}

// 从wx浏览器地址栏获取code等参数
export function getQueryString(name: string): any {
  let obj: any = {};
  window.location.search.substr(1).split('&').map((i: any) => {
    obj[i.split('=')[0]] = i.split('=')[1];
    return obj;
  });
  if (obj[name]) {
    return unescape(obj[name]);
  }
  return null;
}

//金额格式化
export function moneyFormat(
  val: any, c: number = 2, d: string = '.', t: string = ','): string {
  if (!val) val = 0;
  let n = val,
    s = n < 0 ? '-' : '',
    i: any = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j: number = i.length;
  j = j > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}
