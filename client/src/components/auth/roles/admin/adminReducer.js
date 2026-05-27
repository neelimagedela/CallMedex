export const initialState = {
  accessLevel: "",
  officeLocation: "",
  joiningDate: "",


  officialEmail: "",
  alternatePhone: "",

  securityQuestion: "",
  securityAnswer: "",

  twoFAEnabled: false,

  permissions: [],

  aadhaarUpload: null,
  governmentIdProof: null,

};

export function adminReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    default:
      return state;
  }
}