import { useReducer, useEffect } from "react";

import AdminProfessionalSection from "./AdminProfessionalSection";
import AdminSecuritySection from "./AdminSecuritySection";
import AdminPermissionsSection from "./AdminPermissionsSection";
import AdminDocumentsSection from "./AdminDocumentsSection";

import {
  adminReducer,
  initialState,
} from "./adminReducer";

export default function AdminFields({ onChange }) {

  const [state, dispatch] = useReducer(
    adminReducer,
    initialState
  );

  useEffect(() => {
    if (onChange) {
      onChange(state);
    }
  }, [state, onChange]);

  return (
    <>

      <AdminProfessionalSection
        state={state}
        dispatch={dispatch}
      />

      <AdminSecuritySection
        state={state}
        dispatch={dispatch}
      />

      <AdminPermissionsSection
        state={state}
        dispatch={dispatch}
      />

      <AdminDocumentsSection
        state={state}
        dispatch={dispatch}
      />


    </>
  );
}