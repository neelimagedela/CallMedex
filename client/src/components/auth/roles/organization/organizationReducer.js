export const initialState = {
  institutionName: "",
  institutionType: "",
  registrationNumber: "",
  licenseNumber: "",
  establishmentYear: "",
  ownershipType: "",

  altPhone: "",
  emergencyPhone: "",

  headOfInstitution: "",
  totalDepartments: "",
  totalStaff: "",
  totalBranches: "",
  operatingHours: "",
  status: "Active",

  registrationCertificate: null,
  governmentLicense: null,
  authorizedPersonIdProof: null,
};

export function organizationReducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}