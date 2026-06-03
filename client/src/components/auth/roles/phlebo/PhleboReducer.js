export const initialState = {
  phleboType: "",

  qualification: "",
  specialization: "",
  yearsOfExperience: "",
  certificationNumber: "",

  availableDays: [],
  morningStart: "",
  morningEnd: "",
  eveningStart: "",
  eveningEnd: "",
  homeCollection: false,
  emergencyAvailability: false,

  governmentIdType: "",
  aadhaarFront: null,
  phlebotomyCertificate: null,
  
};

export const phleboReducer = (state, action) => {
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