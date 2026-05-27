export const initialState = {

  medicalLicenseNumber: "",

  specialization: "",

  qualification: "",

  yearsOfExperience: "",

  hospitalOrClinicName: "",

  consultationFee: "",

  availableTimings: "",

  consultationMode: "",

  availableForOnlineConsultation: false,

  languagesKnown: [],

  medicalCertificate: null,

  medicalLicense: null,

  idProof: null,

  
};

export function doctorReducer(state, action) {

  return {

    ...state,

    [action.name]: action.value
  };
}