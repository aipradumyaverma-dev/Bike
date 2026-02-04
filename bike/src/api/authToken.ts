// import {
//   decryptAccessToken,
//   encryptAccessToken
// } from "../service/EncryptionUtil";
// import appConstant from "../../public/json/appConstant.json";

// const tokenLocalStorageKey: any = appConstant.NEXT_PUBLIC_TOKEN;
// const setLocalStorage = (response: any, key: string): any => {
//   let encryptedData: any = encryptAccessToken(response);
//   localStorage.setItem(key, encryptedData);
// };

// export const getAccessToken: any = async () => {
//   try {
//     if(localStorage.getItem(tokenLocalStorageKey)){
//       const data: any = localStorage.getItem(tokenLocalStorageKey);
//       let decryptedData = decryptAccessToken(data)
//       return decryptedData
//     }
//   } catch (error) {
//     return console.log(error);
//   }
// };
