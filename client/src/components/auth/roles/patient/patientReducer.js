export const initialState = {

  bloodGroup: "",

  height: "",

  weight: "",

  medicalHistory: [],

  hasOtherCondition: false,

  otherCondition: ""
};

export function patientReducer(state, action) {

  switch (action.type) {

    case "TOGGLE_CONDITION":

      const exists = state.medicalHistory.includes(
        action.value
      );

      return {

        ...state,

        medicalHistory: exists

          ? state.medicalHistory.filter(
              (item) => item !== action.value
            )

          : [...state.medicalHistory, action.value]
      };

    default:

      return {

        ...state,

        [action.name]: action.value
      };
  }
}