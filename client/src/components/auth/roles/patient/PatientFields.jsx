import { useReducer, useEffect } from "react";

import {
  initialState,
  patientReducer
} from "./patientReducer";

import PatientHealthSection from "./PatientHealthSection";

import PatientPhysicalSection from "./PatientPhysicalSection";

export default function PatientFields({ onChange }) {

  const [patientForm, dispatch] = useReducer(
    patientReducer,
    initialState
  );

  useEffect(() => {
    if (onChange) {
      onChange(patientForm);
    }
  }, [patientForm, onChange]);

  return (

    <div>

      <PatientHealthSection
        patientForm={patientForm}
        dispatch={dispatch}
      />

      <PatientPhysicalSection
        patientForm={patientForm}
        dispatch={dispatch}
      />

    </div>
  );
}