import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import appConstant from "../../../public/json/appConstant.json";
import {
  decryptAccessToken,
  encryptAccessToken
} from "@/service/EncryptionUtil";
import { setUser, logoutUser } from "@/lib/slices/authSlice";
import { useAppDispatch } from "@/lib/hooks";
// import { sendPasswordResetEmail } from "firebase/auth";
import Profile from "../profile";
import { useToast } from "@/components/ui/use-toast";
import routes from "../../../apii/routes";
import { getAccessToken } from "../../../apii/authToken";


const AuthService = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [userLocalInfo, setUserInfoStorageState]: any = useState({});

  const tokenLocalStorageKey: any = `${appConstant.NEXT_PUBLIC_TOKEN}`;
  const userLocalStorageKey: any = `${appConstant.NEXT_PUBLIC_USER_INFO}`;
  const route = useRouter();
  const { getProfileDetail } = Profile();

  const login = async (data: any) => {
    if (data) {
      try {
        const url: any = routes.ADMIN_LOGIN();
        const body = { username: data.email, password: data.password, deviceDetails: "", deviceType: "web" };
        const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
        const response: any = await fetch(url, options);
        const user: any = await response.json();
        const token: any = user?.token;
        if (response?.status == 200) {
          localStorage.setItem('theme', "light");
          setLocalStorage(token, tokenLocalStorageKey);
          const res: any = await getProfileDetail();
          setLocalStorage(res?.responseData?.result, userLocalStorageKey);
          dispatch(setUser(res?.responseData?.result));
          route.push("/dashboard");
        }
        return user;
      } catch (error) {
        return { error: true, errorMessage: "fail" };
      }
    }
  };

  const logout = async () => {
    try {
      const url = routes.ADMIN_LOGOUT();
      const accessToken = await getAccessToken();
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken
        },
        body: JSON.stringify({ deviceId: "342432", deviceType: "web" }),
      };
      const res: any = await fetch(url, options);
      localStorage.removeItem(userLocalStorageKey);
      localStorage.removeItem(tokenLocalStorageKey);
      localStorage.removeItem("theme");
      dispatch(logoutUser());
      route.push("/");
      toast({ title: "Logout successfully!" });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error
      });
    }
  }

  const forgotPassword = async (data: any) => {
    try {
      const url = routes.FORGOT_PASSWORD();
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      };
      const res: any = await fetch(url, options);
      const responseData = await res.json();
      return responseData;
    } catch (error: any) {
      return { error: true, errorMessage: error?.message };
    }
  };

  const confirmPassword = async (data: any) => {
    try {
      const url: string = routes.CONFIRM_PASSWORD();
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      };
      const res: any = await fetch(url, options);
      const responseData = res.json();
      responseData.status = res.status;
      return responseData
    } catch (error: any) {
      return { error: true, errorMessage: error?.message };
    }
  };

  const setLocalStorage = async (response: any, key: string): Promise<any> => {
    let encryptedData = encryptAccessToken(response);
    encryptedData ? localStorage.setItem(key, encryptedData) : "";
  };

  return { login, logout, forgotPassword, confirmPassword };
};

export default AuthService;
