import React, { useState } from "react";
import { usePhlebo } from "../../context/PhleboContext";
import { 
  MapPin, 
  Phone, 
  CheckCircle, 
  Navigation, 
  FlaskConical, 
  Camera, 
  Lock, 
  Building2, 
  Upload, 
  X 
} from "lucide-react";

const ActiveTask = () => {
  // Extracting navigation controls and shared operational state handlers from Context
 const {
  setPage,
  setActiveOrder,
  completedTasks,
  setCompletedTasks
} = usePhlebo();

  // Workflow pipeline tracking steps 
  const [currentStep, setCurrentStep] = useState(1); 

  // Image Upload Tracking States
  const [sampleImage, setSampleImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Patient OTP Verification States (6-digit split matrix array)
  const [patientOtp, setPatientOtp] = useState(["", "", "", "", "", ""]);

  // Mock active patient order details payload
  const [orderDetails] = useState({
    id: "JOB-9921",
    patientName: "K. Satish Narayana",
    phone: "+91 98480 22334",
    address: "Flat 402, Sri Sai Towers, Lawsons Bay Colony, Visakhapatnam",
    prescribedTests: ["Complete Blood Count (CBC)", "HbA1c (Glycated Haemoglobin)"],
    sampleType: "EDTA Whole Blood (Purple Top) & Fluoride Plasma (Grey Top)",
    diagnosticCenter: "CallMedex Central Diagnostics Hub, Vizag"
  });

  // Local file processing handler simulation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSampleImage(URL.createObjectURL(file));
    }
  };

  // OTP field entry validation and focus management matrix shifts
  const handleOtpChange = (value, index) => {
    const cleanValue = value.replace(/\D/g, "");
    const newOtp = [...patientOtp];
    newOtp[index] = cleanValue.substring(cleanValue.length - 1);
    setPatientOtp(newOtp);

    if (cleanValue && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !patientOtp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleNextStep = () => {
    // Step 2 Guard: Validate patient OTP confirmation before expanding collection panels
    if (currentStep === 2) {
      const compiledOtp = patientOtp.join("");
      if (compiledOtp.length !== 6) {
        alert("Please enter the complete 6-digit confirmation code provided by the patient upon arrival.");
        return;
      }
    }

    // Step 4 Guard: Force sample image attachment verification before lab route
    if (currentStep === 4 && !sampleImage) {
      alert("Please upload or capture an image of the collected samples to proceed.");
      return;
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
  const completedJob = {
    id: orderDetails.id,
    patientName: orderDetails.patientName,
    date: new Date().toLocaleDateString(),
    amount: 50,
    status: "Completed",
    tests: orderDetails.prescribedTests
  };

  setCompletedTasks((prev) => [...prev, completedJob]);

  alert(
    "All diagnostic samples delivered successfully to the diagnostic center."
  );

  if (setActiveOrder) {
    setActiveOrder(null);
  }

  setPage("phlebo-completed");
}
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "inherit" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ color: "#1e293b", margin: 0, fontWeight: "700" }}>Active Collection Run</h2>
        <span style={{ background: "#eff6ff", color: "#1d4ed8", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>
          ID: {orderDetails.id}
        </span>
      </div>

      {/* STEP PROGRESS MONITOR BAR */}
      <div style={{ display: "flex", background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between" }}>
          
          {/* Step 1 */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: currentStep >= 1 ? "#2563eb" : "#94a3b8", fontWeight: "600", fontSize: "12px" }}>
            <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: currentStep >= 1 ? "#2563eb" : "#cbd5e1", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>1</span>
            En-Route
          </div>
          <div style={{ width: "25px", height: "2px", background: currentStep >= 2 ? "#2563eb" : "#cbd5e1" }}></div>
          
          {/* Step 2 */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: currentStep >= 2 ? "#2563eb" : "#94a3b8", fontWeight: "600", fontSize: "12px" }}>
            <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: currentStep >= 2 ? "#2563eb" : "#cbd5e1", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>2</span>
            Verify OTP
          </div>
          <div style={{ width: "25px", height: "2px", background: currentStep >= 3 ? "#2563eb" : "#cbd5e1" }}></div>
          
          {/* Step 3 */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: currentStep >= 3 ? "#2563eb" : "#94a3b8", fontWeight: "600", fontSize: "12px" }}>
            <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: currentStep >= 3 ? "#2563eb" : "#cbd5e1", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>3</span>
            Collection
          </div>
          <div style={{ width: "25px", height: "2px", background: currentStep >= 4 ? "#2563eb" : "#cbd5e1" }}></div>

          {/* Step 4 */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: currentStep >= 4 ? "#2563eb" : "#94a3b8", fontWeight: "600", fontSize: "12px" }}>
            <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: currentStep >= 4 ? "#2563eb" : "#cbd5e1", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>4</span>
            Upload Proof
          </div>
          <div style={{ width: "25px", height: "2px", background: currentStep >= 5 ? "#2563eb" : "#cbd5e1" }}></div>

          {/* Step 5 */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: currentStep >= 5 ? "#2563eb" : "#94a3b8", fontWeight: "600", fontSize: "12px" }}>
            <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: currentStep >= 5 ? "#2563eb" : "#cbd5e1", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>5</span>
            Lab Delivery
          </div>

        </div>
      </div>

      {/* CORE WORKFLOW ACTION BOX */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", marginBottom: "24px" }}>
        
        {/* STEP 1 CONTEXT: NAVIGATION ROUTING */}
        {currentStep === 1 && (
          <div>
            <h4 style={{ margin: "0 0 16px 0", color: "#334155", display: "flex", alignItems: "center", gap: "8px" }}>
              <Navigation size={18} style={{ color: "#2563eb" }} /> Transit Phase: Patient Coordination
            </h4>
            <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
              <p style={{ margin: "0 0 10px 0", fontSize: "15px", fontWeight: "600" }}>{orderDetails.patientName}</p>
              <p style={{ margin: "0 0 12px 0", color: "#475569", fontSize: "14px", display: "flex", alignItems: "start", gap: "6px" }}>
                <MapPin size={16} style={{ marginTop: "2px", flexShrink: 0, color: "#64748b" }} />
                {orderDetails.address}
              </p>
             <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "15px"
  }}
>
  <a
    href={`tel:${orderDetails.phone}`}
    style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      background: "#2563eb",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600"
    }}
  >
    <Phone size={16} />
    Call Patient
  </a>

  <button
    onClick={() =>
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(orderDetails.address)}`,
        "_blank"
      )
    }
    style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      background: "#059669",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600"
    }}
  >
    <Navigation size={16} />
    Navigate
  </button>
</div>
            </div>
          </div>
        )}

        {/* STEP 2 CONTEXT: PATIENT ARRIVAL OTP VALIDATION SECURE BLOCK */}
        {currentStep === 2 && (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px auto" }}>
              <Lock size={20} />
            </div>
            <h4 style={{ margin: "0 0 6px 0", color: "#1e293b", fontSize: "16px", fontWeight: "600" }}>Patient Identity Arrival Verification</h4>
            <p style={{ fontSize: "13px", color: "#64748b", maxWidth: "440px", margin: "0 auto 20px auto", lineHeight: "1.4" }}>
              Ask the patient for the 6-digit code sent to <strong style={{ color: "#334155" }}>{orderDetails.phone}</strong> to verify entry and check identity before extracting details.
            </p>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
              {patientOtp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  style={{
                    width: "45px",
                    height: "45px",
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: "700",
                    border: "2px solid #cbd5e1",
                    borderRadius: "8px",
                    color: "#1e293b"
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 CONTEXT: BLOOD DRAW & TESTING SELECTION */}
        {currentStep === 3 && (
          <div>
            <h4 style={{ margin: "0 0 16px 0", color: "#334155", display: "flex", alignItems: "center", gap: "8px" }}>
              <FlaskConical size={18} style={{ color: "#d97706" }} /> Collection Phase: Phlebotomy Process
            </h4>
            <div style={{ background: "#fff", padding: "16px", border: "1px dashed #cbd5e1", borderRadius: "8px", marginBottom: "20px" }}>
              <p style={{ margin: "0 0 8px 0", fontSize: "13px", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Required Diagnostic Tests</p>
              <ul style={{ margin: "0 0 16px 0", paddingLeft: "20px", color: "#334155", fontSize: "14px" }}>
                {orderDetails.prescribedTests.map((test, index) => <li key={index} style={{ marginBottom: "6px" }}>{test}</li>)}
              </ul>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
                <strong>Vial Matrix Setup:</strong> {orderDetails.sampleType}
              </p>
            </div>
          </div>
        )}

        {/* STEP 4 CONTEXT: SAMPLE IMAGE UPLOADER */}
        {currentStep === 4 && (
          <div>
            <h4 style={{ margin: "0 0 4px 0", color: "#334155", display: "flex", alignItems: "center", gap: "8px" }}>
              <Camera size={18} style={{ color: "#7c3aed" }} /> Security Upload: Sample Chain-of-Custody Proof
            </h4>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0" }}>Take or attach a clear picture showing barcode tags clearly placed on the filled tubes.</p>
            
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if(file) setSampleImage(URL.createObjectURL(file)); }}
              style={{
                border: isDragging ? "2px dashed #7c3aed" : "2px dashed #cbd5e1",
                background: isDragging ? "#f5f3ff" : "#f8fafc",
                borderRadius: "10px",
                padding: "26px",
                textAlign: "center",
                cursor: "pointer",
                position: "relative",
                marginBottom: "20px",
                transition: "all 0.2s"
              }}
            >
              {!sampleImage ? (
                <label style={{ cursor: "pointer", display: "block", margin: 0 }}>
                  <Upload size={28} style={{ color: "#94a3b8", margin: "0 auto 10px auto" }} />
                  <span style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "2px" }}>Click or drag to attach sample photo</span>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>Accepts PNG, JPG formats</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                </label>
              ) : (
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img src={sampleImage} alt="Vial Collection Sheet" style={{ maxHeight: "160px", borderRadius: "6px" }} />
                  <button 
                    onClick={() => setSampleImage(null)}
                    style={{ position: "absolute", top: "-8px", right: "-8px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 5 CONTEXT: DIAGNOSTIC LOGISTICS DELIVERY HUB */}
        {currentStep === 5 && (
          <div>
            <h4 style={{ margin: "0 0 16px 0", color: "#334155", display: "flex", alignItems: "center", gap: "8px" }}>
              <Building2 size={18} style={{ color: "#059669" }} /> Logistics Phase: Diagnostic Lab Gateway Dropoff
            </h4>
            <div style={{ background: "#f0fdf4", padding: "16px", borderRadius: "8px", border: "1px solid #bbf7d0", marginBottom: "20px" }}>
              <span style={{ display: "inline-block", padding: "2px 6px", background: "#dcfce7", color: "#15803d", borderRadius: "4px", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", marginBottom: "8px" }}>Target Lab Branch</span>
              <p style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: "700", color: "#166534" }}>{orderDetails.diagnosticCenter}</p>
              <p style={{ margin: 0, fontSize: "13px", color: "#166534", opacity: 0.9 }}>
                Deliver items safely to the secure inventory intake receiving room and confirm cold-chain integrity protocols.
              </p>
              <div
  style={{
    marginTop: "15px",
    display: "flex",
    gap: "10px"
  }}
>
  <button
    onClick={() =>
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(orderDetails.diagnosticCenter)}`,
        "_blank"
      )
    }
    style={{
      padding: "10px 16px",
      background: "#059669",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    }}
  >
    <Navigation size={16} />
    Navigate to Lab
  </button>
</div>
            </div>
          </div>
        )}

        {/* CONTROLLER ACTION INTERFACES MAIN ACTION BUTTON */}
        <button
          onClick={handleNextStep}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "8px",
            background: currentStep === 5 ? "#059669" : "#2563eb",
            color: "#fff",
            fontWeight: "700",
            fontSize: "15px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
        >
          <CheckCircle size={18} />
          {currentStep === 1 && "Arrived at Patient House"}
          {currentStep === 2 && "Verify Patient Arrival OTP"}
          {currentStep === 3 && "Samples Barcoded & Sealed"}
          {currentStep === 4 && "Verify & Confirm Image Upload"}
          {currentStep === 5 && "Mark Delivered at Diagnostic Center"}
        </button>
      </div>
    </div>
  );
};

export default ActiveTask;