import crypto from "crypto-js";

const lsGet = () => localStorage.getItem("data");

const lsSet = (data: string) => localStorage.setItem("data", data);

const HMAC = (encrypted: string, key: string) =>
  crypto.HmacSHA256(encrypted, crypto.SHA256(key)).toString();

const encrypt = (data: object, key: string) => {
  let encrypted = crypto.AES.encrypt(JSON.stringify(data), key).toString();
  let hmac = HMAC(encrypted, key);
  return hmac + encrypted;
};

const decrypt = (data: string, key: string): object | null => {
  let hmac = data.substring(0, 64);
  let encrypted = data.substring(64);
  let decryptedHmac = HMAC(encrypted, key);
  if (hmac === decryptedHmac) {
    let decrypted = crypto.AES.decrypt(encrypted, key).toString(
      crypto.enc.Utf8
    );
    return JSON.parse(decrypted);
  } else return null;
};

const download = (text: string) => {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", "data.txt");

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export { lsGet, lsSet, encrypt, decrypt, download };
