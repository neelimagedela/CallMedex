import React, { useReducer } from "react";

import {
  initialState,
  phleboReducer,
} from "./phleboReducer";

import PhleboProfessionalSection from "./PhleboProfessionalSection";
import PhleboDocumentsSection from "./PhleboDocumentsSection";
import PhleboAvailabilitySection from "./PhleboAvailabilitySection";

const PhleboFields = () => {

  const [phleboForm, dispatch] = useReducer(
    phleboReducer,
    initialState
  );

  return (

    <div className="role-form-container">

     {/* Phlebo Type Selection */}

<div className="section-card">

  <h2 className="section-title">
    Phlebo Type
  </h2>

  <p className="section-subtitle">
    Select your working category
  </p>

  <div className="pill-group">

    <label className="pill-option">

      <input
        type="radio"
        name="phleboType"
        value="partTime"
        checked={phleboForm.phleboType === "partTime"}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            name: "phleboType",
            value: e.target.value,
          })
        }
      />

      Part Time

    </label>

    <label className="pill-option">

      <input
        type="radio"
        name="phleboType"
        value="fullTime"
        checked={phleboForm.phleboType === "fullTime"}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            name: "phleboType",
            value: e.target.value,
          })
        }
      />

      Full Time

    </label>

  </div>

</div> 

      {/* Common Sections */}

      <PhleboProfessionalSection
        phleboForm={phleboForm}
        dispatch={dispatch}
      />

      {/* Dynamic Workflow */}

      {phleboForm.phleboType === "partTime" && (

        <PhleboAvailabilitySection
          phleboForm={phleboForm}
          dispatch={dispatch}
        />

      )}


      {/* Common Documents */}

      <PhleboDocumentsSection
        phleboForm={phleboForm}
        dispatch={dispatch}
      />

    </div>
  );
};

export default PhleboFields;