import React, { useReducer } from "react";

import {
  pharmacyReducer,
  initialState,
} from "./pharmacyReducer";

import PharmacyProfessionalSection from "./PharmacyProfessionalSection";
import PharmacyLicenseSection from "./PharmacyLicenseSection";
import PharmacyServicesSection from "./PharmacyServicesSection";
import PharmacyDocumentsSection from "./PharmacyDocumentsSection";

const PharmacyFields = () => {
  const [pharmacyForm, dispatch] = useReducer(
    pharmacyReducer,
    initialState
  );

  return (
    <>
      <PharmacyProfessionalSection
        pharmacyForm={pharmacyForm}
        dispatch={dispatch}
      />

      <PharmacyLicenseSection
        pharmacyForm={pharmacyForm}
        dispatch={dispatch}
      />

      <PharmacyServicesSection
        pharmacyForm={pharmacyForm}
        dispatch={dispatch}
      />

      <PharmacyDocumentsSection
        pharmacyForm={pharmacyForm}
        dispatch={dispatch}
      />

      <button className="auth-btn">
        Register Pharmacy
      </button>
    </>
  );
};

export default PharmacyFields;