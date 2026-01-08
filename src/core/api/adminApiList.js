let adminApiList = {


  "login": "/DssNew/webservices/cropDoctorNew.asmx/login",
  "GetOTPFarmerLoginReg": "/DssNew/webservices/cropDoctorNew.asmx/GetOTPFarmerLoginReg",
  "getStudyMaterialDashCount": "/Mobile_App_Services/EKrishiPathshala/MISAdmin_New.asmx/getStudyMaterialDashCount",

  "getDistrictQueryList": "/DssNew/webservices/cropDoctorNew.asmx/getDistrictQueryList",
  "getDistrictList": "/DssNew/webservices/cropDoctorNew.asmx/getDistrictList",
  "getExpertList": "/DssNew/webservices/cropDoctorNew.asmx/getExpertList",



  "getCropGroupList": "/DssNew/webservices/cropDoctorNew.asmx/getCropGroupList",
  "getCropList": "/DssNew/webservices/cropDoctorNew.asmx/getCropList",


  // node js api

  "farmerLoginSendOtp": "/cropdoctorApi/publicapi/get/farmerLoginSendOtp",
  "verifyFarmer": "/cropdoctorApi/publicApi/get/verifyFarmer",
  "getCropDetail": "/cropdoctorApi/master/get/getCropDetail",
  "getProblemDetail": "/cropdoctorApi/master/get/getProblemDetail",
  "cropProblemDetail": "/cropdoctorApi/master/get/cropProblemDetail",


};

export const setApiList = (list) => {
  adminApiList = list;
};

export const setAdminApiList = (list) => {
  adminApiList = list;
};
const getAdminApiList = () => {
  return adminApiList;
};


// Add interceptors if needed (e.g., auth tokens from core/auth)
export default getAdminApiList;