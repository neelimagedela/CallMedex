import { STEP_LABELS, REGISTER_PERKS, BLOOD_GROUPS, STATES, SITE } from "../../data/siteData";
import { Field, FieldRow } from "../shared/ui";

function Stepper({ step }) {
  return (
    <div className="stepper">
      {STEP_LABELS.map((lbl, i) => (
        <div key={i} className={`sstep${step === i + 1 ? " active" : step > i + 1 ? " done" : ""}`}>
          <div className="scir">{step > i + 1 ? "✓" : i + 1}</div>
          <div className="slbl">{lbl}</div>
        </div>
      ))}
    </div>
  );
}

function Step1({ onBack, onNext }) {
  return (
    <>
      <FieldRow>
        <Field label="First Name"><input placeholder="Raju" /></Field>
        <Field label="Last Name"><input placeholder="Kumar" /></Field>
      </FieldRow>
      <Field label="Email Address"><input type="email" placeholder="raju@example.com" /></Field>
      <FieldRow>
        <Field label="Phone"><input placeholder="+91 98765 43210" /></Field>
        <Field label="Date of Birth"><input type="date" /></Field>
      </FieldRow>
      <FieldRow>
        <Field label="Gender">
          <select><option>Select</option><option>Male</option><option>Female</option><option>Other</option></select>
        </Field>
        <Field label="Password"><input type="password" placeholder="Min 8 characters" /></Field>
      </FieldRow>
      <div className="form-nav">
        <button className="btn btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </>
  );
}

function Step2({ onBack, onNext }) {
  return (
    <>
      <FieldRow>
        <Field label="Blood Group">
          <select><option>Select</option>{BLOOD_GROUPS.map((b) => <option key={b}>{b}</option>)}</select>
        </Field>
        <Field label="Height (cm)"><input type="number" placeholder="170" /></Field>
      </FieldRow>
      <FieldRow>
        <Field label="Weight (kg)"><input type="number" placeholder="70" /></Field>
        <Field label="Medical Conditions"><input placeholder="Diabetes, BP..." /></Field>
      </FieldRow>
      <Field label="Current Medications"><input placeholder="Metformin 500mg..." /></Field>
      <Field label="Allergies"><input placeholder="Penicillin, peanuts..." /></Field>
      <div className="form-nav">
        <button className="btn btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </>
  );
}

function Step3({ onBack, onNext }) {
  return (
    <>
      <Field label="City"><input placeholder="Visakhapatnam" /></Field>
      <Field label="Full Address"><input placeholder="Flat no, Street, Area" /></Field>
      <FieldRow>
        <Field label="State">
          <select>{STATES.map((s) => <option key={s}>{s}</option>)}</select>
        </Field>
        <Field label="PIN Code"><input placeholder="530001" /></Field>
      </FieldRow>
      <div className="form-nav">
        <button className="btn btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </>
  );
}

function Step4({ onBack, onVerify }) {
  return (
    <>
      <p style={{ textAlign: "center", color: "var(--c8)", marginBottom: ".5rem", fontSize: ".88rem" }}>
        Enter the 4-digit OTP sent to your mobile
      </p>
      <div className="otp-row">
        {[0, 1, 2, 3].map((i) => <input key={i} className="otp-inp" maxLength={1} />)}
      </div>
      <p style={{ textAlign: "center", fontSize: ".78rem", color: "var(--c8)", marginBottom: "1rem" }}>
        Didn't receive?{" "}
        <span style={{ color: "var(--c2)", cursor: "pointer", fontWeight: 700 }}>Resend OTP</span>
      </p>
      <div className="form-nav">
        <button className="btn btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onVerify}>✅ Verify &amp; Create Account</button>
      </div>
    </>
  );
}

export default function RegisterSection({ step, setStep, setPage }) {
  const goHome = () => setPage("home");

  if (step === 0) {
    return (
      <section className="reg-sec">
        <div className="reg-box">
          <div className="success">
            <div className="success-ico">🎉</div>
            <div className="success-h">Welcome to CallMedex!</div>
            <p style={{ color: "var(--c8)", marginBottom: "1.75rem" }}>
              Your account has been created. A confirmation has been sent to your registered mobile number.
            </p>
            <button className="btn btn-primary btn-lg" onClick={goHome}>Go to Dashboard →</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reg-sec">
      <div className="reg-box">
        <div className="sec-head">
          <div className="sec-eyebrow">🔐 Join CallMedex</div>
          <h2 className="sec-title">Create Your Health Account</h2>
          <p className="sec-sub">Set up your complete health profile in under 3 minutes</p>
        </div>
        <div className="reg-grid">
          <div className="reg-left">
            <div style={{ fontSize: "2.8rem", marginBottom: ".75rem" }}>🏥</div>
            <h2>Your Health,<br /><span style={{ color: "var(--c2)" }}>Smarter.</span></h2>
            <p>Join CallMedex and experience the future of personalized, AI-powered healthcare management.</p>
            <div className="reg-perks">
              {REGISTER_PERKS.map(({ ico, text }) => (
                <div className="perk" key={text}><span className="perk-ico">{ico}</span>{text}</div>
              ))}
            </div>
          </div>
          <div className="form-card">
            <Stepper step={step} />
            {step === 1 && <Step1 onBack={goHome}           onNext={() => setStep(2)} />}
            {step === 2 && <Step2 onBack={() => setStep(1)} onNext={() => setStep(3)} />}
            {step === 3 && <Step3 onBack={() => setStep(2)} onNext={() => setStep(4)} />}
            {step === 4 && <Step4 onBack={() => setStep(3)} onVerify={() => setStep(0)} />}
          </div>
        </div>
      </div>
    </section>
  );
}