import { useReducer, useEffect } from "react";

import {
  initialState,
  organizationReducer,
} from "./organizationReducer";

import OrganizationProfessionalSection from "./OrganizationProfessionalSection";
import OrganizationContactSection from "./OrganizationContactSection";
import OrganizationAdministrationSection from "./OrganizationAdministrationSection";
import OrganizationDocumentsSection from "./OrganizationDocumentsSection";

export default function OrganizationFields({ onChange }) {

  const [organizationForm, dispatch] = useReducer(
    organizationReducer,
    initialState
  );

  useEffect(() => {
    if (onChange) {
      onChange(organizationForm);
    }
  }, [organizationForm, onChange]);

  return (
    <>

      <OrganizationProfessionalSection
        organizationForm={organizationForm}
        dispatch={dispatch}
      />

      <OrganizationContactSection
        organizationForm={organizationForm}
        dispatch={dispatch}
      />


      <OrganizationAdministrationSection
        organizationForm={organizationForm}
        dispatch={dispatch}
      />

      <OrganizationDocumentsSection
        organizationForm={organizationForm}
        dispatch={dispatch}
      />

    </>
  );
}