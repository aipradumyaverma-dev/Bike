// import { useToast } from "@/components/ui/use-toast";
// import appConstant from "../../public/json/appConstant.json";
// import AuthService from "../api/api/auth/AuthService";

// const errorHandler = async (status: any, methodType: string, message: any) => {
//     // const { logout } = AuthService()
//     // const { toast } = useToast();
//     const tokenLocalStorageKey: any = `${appConstant.NEXT_PUBLIC_TOKEN}`;

//     if (status != 404 || methodType != "get") {
//         // message ? toast({ variant: "destructive", title: message }) : ''
//     }
//     if (status === 403 || status === 401) {
//         localStorage.getItem(tokenLocalStorageKey) ? 'logout()' : null;
//     }
// };

// export default errorHandler
