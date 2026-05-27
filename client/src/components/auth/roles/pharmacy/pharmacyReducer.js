export const initialState = {
  pharmacyName: "",
  pharmacyType: "",
  ownerName: "",
  pharmacistInCharge: "",
  yearsOfOperation: "",
  operatingHours: "",

  registrationNumber: "",
  drugLicenseNumber: "",
  gstNumber: "",

  homeDeliveryAvailable: false,
  emergencyServiceAvailable: false,
  onlineConsultationSupport: false,
  availability24x7: false,

  drugLicenseDocument: null,
  gstCertificate: null,
  pharmacistCertificate: null,
  pharmacyImages: null,
  ownerIdProof: null,
};

export const pharmacyReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.name]: action.value,
      };

    default:
      return state;
  }
};