import { toast } from '@/ui/use-toast';
import routes from './routes';
// import { getAccessToken } from '../../api/authToken';
// import errorHandler from './errorHandler';
// import { logoutUser } from "@/lib/slices/authSlice";
// import { useAppDispatch } from "@/lib/hooks";
// import appConstant from "../../public/json/appConstant.json";
// import { useToast } from '@/components/ui/use-toast';
// import { headers } from 'next/headers';

export default function sellBikeApi() {
  // const { toast } = useToast();
  // const dispatch = useAppDispatch();

  // const deleteCategory = async (id:string) =>{
  //  try{
  //     const url = routes.CATEGORY_DELETE(id);
  //     const accessToken = await getAccessToken();
  //     const options = {
  //         method: "DELETE",
  //         headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: 'Bearer ' + accessToken
  //         },
  //     }

  //     const response = await fetch(url,options);
  //     const responseData = await response.json();
  //     if (!response.ok) {
  //         if (response?.status === 401 || response?.status === 403) {
  //             errorHandle(response?.status);
  //         }
  //         await errorHandler(response?.status, "patch", responseData?.errorMessage);
  //     }
  //     return responseData;
  //   }
  //   catch(error:any){
  //     return { error: true, errorMessage: error?.message };
  //   }
  // }


  // const updateCategory = async (data:any,id:any)=>{
  //    try{
  //     const url = routes.CATEGORY_UPDATE(id);
  //     const accessToken = await getAccessToken();
  //       const options = {
  //         method: 'PATCH',
  //         headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: 'Bearer ' + accessToken
  //            },
  //         body: JSON.stringify(data)
  //     };
  //        const response = await fetch(url, options);
  //     const responseData = await response.json();
  //     if (!response.ok) {
  //         if (response?.status === 401 || response?.status === 403) {
  //             errorHandle(response?.status);
  //         }
  //            await errorHandler(response?.status, "patch", responseData?.errorMessage);
  //     }
  //     return responseData;

  //    }
  //    catch(error:any){
  //     return { error: true, errorMessage: error?.message };
  //    }
  // }

  const addBike = async (formData: FormData) => {
    try {
      const url = routes.BIKE_ADD();

      const response = await fetch(url, {
        method: 'POST',
        body: formData,

      });

      if (!response.ok) {
        let errorMessage = 'Failed to create bike listing';

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // cannot parse json → maybe server error page
        }

        // Handle auth errors
        if (response.status === 401 || response.status === 403) {
          errorHandle(response.status);
        }

        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error: any) {
      console.error('addBike failed:', error);
      return {
        error: true,
        errorMessage: error?.message || 'Network error or server is down',
      };
    }
  };


  // const categoryDetail = async (id:string)=>{
  //     try{
  //     const url = routes.CATEGORY_DETAIL(id);
  //     const accessToken = await getAccessToken();
  //     const response : any =  (await fetch(
  //         url, { headers: { Authorization: 'Bearer ' + accessToken } }
  //     ))
  //     const responseData = await response.json(); 
  //     if (!response.ok) {
  //         if (response?.status === 401 || response?.status === 403) {
  //             errorHandle(response?.status);
  //         }
  //         await errorHandler(response?.status, "patch", responseData?.errorMessage);
  //     };
  //     return responseData;
  //     }
  //     catch(error:any){
  //         return { error: true, errorMessage: error?.message };
  //     }
  // }


  const errorHandle = (status: any) => {
    // const tokenLocalStorageKey: any = `${appConstant.NEXT_PUBLIC_TOKEN}`;
    // const userLocalStorageKey: any = `${appConstant.NEXT_PUBLIC_USER_INFO}`;
    // localStorage.removeItem(userLocalStorageKey);
    // localStorage.removeItem(tokenLocalStorageKey);
    // dispatch(logoutUser());
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: status == 401
        ? 'Session expired. Please log in again.'
        : 'You do not have permission to perform this action.',
    });
  }



  const getBikeListings = async () => {
    try {
      const url = routes.BIKE_LIST({
        name: "",
        search: "",
        status: "",
        from: "",
        to: "",
        sorting_param: "",
        direction: "",
        offset: 0,
        limit: 100
      });

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        let errorMessage = 'Failed to fetch bike listings';

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // cannot parse json
        }

        if (response.status === 401 || response.status === 403) {
          errorHandle(response.status);
        }

        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error: any) {
      console.error('getBikeListings failed:', error);
      return {
        error: true,
        errorMessage: error?.message || 'Network error or server is down',
      };
    }
  };


  return { addBike, getBikeListings }
}