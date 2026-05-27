import { useReducer } from "react";

import {
  initialState,
  patientReducer
} from "./patientReducer";

import PatientHealthSection from "./PatientHealthSection";

import PatientPhysicalSection from "./PatientPhysicalSection";

export default function PatientFields() {

  const [patientForm, dispatch] = useReducer(
    patientReducer,
    initialState
  );

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