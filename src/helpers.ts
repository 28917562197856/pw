import crypto from "crypto-js";

function lsGet() {
  return localStorage.getItem("data");
}

function lsSet(data: string) {
  localStorage.setItem("data", data);
}

function HMAC(encrypted: string, key: string) {
  return crypto.HmacSHA256(encrypted, crypto.SHA256(key)).toString();
}

function encrypt(data: object, key: string) {
  let encrypted = crypto.AES.encrypt(JSON.stringify(data), key).toString();
  let hmac = HMAC(encrypted, key);
  return hmac + encrypted;
}

function decrypt(data: string, key: string): object | null {
  let hmac = data.substring(0, 64);
  let encrypted = data.substring(64);
  let decryptedHmac = HMAC(encrypted, key);
  if (hmac === decryptedHmac) {
    let decrypted = crypto.AES.decrypt(encrypted, key).toString(
      crypto.enc.Utf8
    );
    return JSON.parse(decrypted);
  } else return null;
}

function download(text: string) {
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
}

function range(from: number, to: number) {
  return [...Array(to - from + 1).keys()].map(x => x + from);
}

function generatePassword(length: number, numbers: boolean, symbols: boolean) {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  return range(0, length - 1)
    .map(_ => chars[(Math.random() * chars.length) << 0])
    .join("");
}

export { lsGet, lsSet, encrypt, decrypt, download, generatePassword };
