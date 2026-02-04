"use client";

import moment from 'moment';
const commonBaseUrl = `http://localhost:5000/api/`;

const routes = {


  BIKE_LIST: (params: any) =>
    `${commonBaseUrl}bike?${params?.name !== "" ? `name=${params?.name}&` : ""}${params?.search !== "" ? `search=${params?.search}&` : ""}${!(params?.status == "" || params?.status == " ") ? `status=${params?.status}&` : ""
    }${params?.from !== "" ? `startDate=${moment(params?.from).format('YYYY-MM-DD')}&` : ""}${params?.to !== "" ? `endDate=${moment(params?.to).format('YYYY-MM-DD')}&` : ""}${params?.sorting_param !== "" ? `orderBy=${params?.sorting_param}&` : ""
    }${params?.direction !== "" ? `orderType=${params?.direction}&` : ""
    }offset=${params?.offset}&limit=${params?.limit}`,


  BIKE_ADD: () => `${commonBaseUrl}bike`,

  //   UPDATE_BRAND_CATEGORY: (id :any) => `${commonBaseUrl}category-brand/${id}`,
  //   DELETE_BRAND_CATEGORY: (id: any) => `${commonBaseUrl}category-brand/${id}`,
  //   BRAND_CATEGORY_DETAIL : (id: any) => `${commonBaseUrl}category-brand/${id}`,

  // CATEGORY_DELETE:(id: any) => `${commonBaseUrl}category/${id}`,
  // CATEGORY_UPDATE: (id:any) => `${commonBaseUrl}category/${id}`,
  // CATEGORY_DETAIL: (id: any) => `${commonBaseUrl}other-profile/${id}`,
  // CATEGORY_ADD:() => `${commonBaseUrl}category`,
  // CUSTOMERSERVICE_DELETE:(id: any) => `${commonBaseUrl}category-services/${id}`,
  // CUSTOMERSERVICE_UPDATE: (id:any) => `${commonBaseUrl}category-services/${id}`,
  // CUSTOMERSERVICE_ADD : () => `${commonBaseUrl}category-services`,


};

export default routes;