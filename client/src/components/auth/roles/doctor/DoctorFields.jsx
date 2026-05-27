import { useReducer } from "react";

import {
  initialState,
  doctorReducer
} from "./doctorReducer";

import DoctorProfessionalSection from "./DoctorProfessionalSection";

import DoctorConsultationSection from "./DoctorConsultationSection";

import DoctorDocumentsSection from "./DoctorDocumentsSection";

export default function DoctorFields() {

  const [doctorForm, dispatch] = useReducer(
    doctorReducer,
    initialState
  );

  return (

    <div>

      <DoctorProfessionalSection
        doctorForm={doctorForm}
        dispatch={dispatch}
      />

      <DoctorConsultationSection
        doctorForm={doctorForm}
        dispatch={dispatch}
      />

      <DoctorDocumentsSection
        doctorForm={doctorForm}
        dispatch={dispatch}
      />

    </div>
  );
}