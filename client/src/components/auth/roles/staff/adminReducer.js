export const initialState = {
  organizationName: "",
  staffRole: "",
  department: "",
  experience: "",

  alternatePhone: "",

  aadhaarUpload: null,
  medicalDegreeUpload: null,
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