/* ─────────────────────────────────────────────────────────
   siteData.js  —  All content & config for CallMedex
   Update here; UI picks up changes automatically.
───────────────────────────────────────────────────────── */

export const SITE = {
  name: "callmedex",
  tagline: "Vizag's #1 Healthcare Platform",
  founded: 2022,
  logo: "https://callmedex.com/admin/upload/CM LOGO.jpeg",
  baseUrl: "https://callmedex.com",
  patientPortal: "https://app.myhospitalsoftware.com/patient_login/?org_id=202",
  emergency: { label: "Emergency", tel: "+918074677177", display: "+91 80746 77177" },
  ambulance: { label: "Ambulance", tel: "108", display: "108" },
  bloodBank: { label: "Blood Bank", tel: "+918912220000", display: "+91-891-2220000" },
  copyright: `© 2026 CallMedex. All rights reserved. Developed for healthier lives in Andhra Pradesh.`,
  social: [
    { icon: "📘", href: "https://www.facebook.com/share/17yB7c8Y8b/", label: "Facebook" },
    { icon: "📸", href: "https://www.instagram.com/callmedex229/", label: "Instagram" },
    { icon: "🐦", href: "https://x.com/callmedex229", label: "Twitter" },
    { icon: "💬", href: "https://wa.me/+918074677177", label: "WhatsApp" },
    { icon: "▶️", href: "https://www.youtube.com/channel/UC1XDnH_Pzrr-ArkwOIzaGmQ", label: "YouTube" },
  ],
};

export const NAV = [
  {
    label: "About",
    items: [
      { ico: "ℹ️", text: "About Us",  page: "about" },
      { ico: "🖼️", text: "Gallery", href: "https://callmedex.com/gallery.php" },
    ],
  },
  { label: "Health Packages", scroll: "health-packages", solo: true },
  {
    label: "Diagnostics",
    items: [
       {
  ico: "🏠",
  text: "Home Services",
  page: "homeservices"
},
      { ico: "🩻", text: "Scans / Radiology", page: "bodydiagnostics" },
      { ico: "❤️", text: "Cardiology", page: "cardiology" },
      { ico: "🚶", text: "Walk-in Centers",  page: "diagnostic-walkin-centers"},
    ],
  },
  {
    label: "Consultation",
    items: [
      { ico: "🖥️", text: "Tele Consultation", page: "tele-consultation"},
      {ico: "🚶‍♂️🏥", text: "Walk-in Clinics", page: "walkin-clinic"},
      { ico: "🌏", text: "NRI Tele Consultation", href: "https://callmedex.com/consultation.php?service=nri-teleconsultation" },
      { ico: "🏡", text: "Consultation at Home", page: "consultancy-home" },
    ],
  },
      {
      label: "Pharmacy",
      items: [
        { ico: "🚚", text: "Home Delivery", page: "pharmacy-home-delivery" },
      ],
    },
      { label: "Blog", page: "blog", solo: true },
];

export const LOGINS = [
  { ico: "🤒", bg: "#EEF6FF", label: "Patient Login" },
  { ico: "👨‍⚕️", bg: "#F0FAFB", label: "Doctor Login" },
  { ico: "⚙️", bg: "#EEF6FF", label: "Admin Login" },
  { ico: "🩺", bg: "#FFF8EE", label: "Phlebo Login" },
  { ico: "🔬", bg: "#F5F0FF", label: "Lab Technician" },
  { ico: "💊", bg: "#EEFBF4", label: "Pharmacy Login" },
];

export const HERO_STATS = [
  { num: "10K+", label: "Patients Served" },
  { num: "250+", label: "Doctors" },
  { num: "98%",  label: "Satisfaction" },
  { num: "24/7", label: "Emergency" },
];

export const VITALS = [
  { value: "72 BPM", label: "❤️ Heart Rate", color: "#E63946" },
  { value: "98% SpO₂", label: "🫁 Oxygen",    color: "#00B4D8" },
  { value: "120/80", label: "💉 BP",          color: "#1B6CA8" },
  { value: "36.8°C", label: "🌡️ Temp",       color: "#f59e0b" },
];

export const SEARCH_TABS = [
  "👨‍⚕️ Doctors", "🏥 Hospitals", "🔬 Tests", "💊 Medicines", "🦠 Diseases", "🩺 Specialists",
];

export const ABOUT_CARDS = [
  { ico: "🏥", num: "Est. 2022", lbl: "Serving Vizag since" },
  { ico: "👨‍⚕️", num: "30+ Yrs",  lbl: "Founder's experience" },
  { ico: "🌍", num: "Underserved", lbl: "Communities focus" },
  { ico: "📋", num: "OP + IP",   lbl: "Complete care system" },
];

export const SPECIALISTS = [
  { ico: "🩺", name: "General Physician", desc: "Primary care" },
  { ico: "❤️", name: "Cardiologist",      desc: "Heart & vascular" },
  { ico: "🧠", name: "Neurologist",       desc: "Brain & nerves" },
  { ico: "🫁", name: "Pulmonologist",     desc: "Lung & respiratory" },
  { ico: "🦴", name: "Orthopedist",       desc: "Bones & joints" },
  { ico: "👶", name: "Gynecologist",      desc: "Women's health" },
  { ico: "🍼", name: "Pediatrician",      desc: "Child healthcare" },
  { ico: "🫀", name: "Nephrologist",      desc: "Kidney specialist" },
  { ico: "👁️", name: "Eye Specialist",   desc: "Vision & eye care" },
  { ico: "🏠", name: "Home Visit",        desc: "Doctor at home" },
  { ico: "📹", name: "Online Consult",    desc: "Video consultation" },
  { ico: "🚑", name: "Emergency Care",    desc: "24/7 emergency" },
  { ico: "🔬", name: "Lab Test",          desc: "Home sample" },
  { ico: "💊", name: "Pharmacy",          desc: "Medicine delivery" },
];

export const PACKAGES = [
  { name: "Basic Screening (Non-Diabetic)",    price: "₹599",   old: "₹1,250", tests: "CBC, FBS, Uric Acid, Creatinine, Total Cholesterol, Total Bilirubin, TSH, CUE" },
  { name: "Basic Screening (Diabetic)",        price: "₹799",   old: "₹1,750", tests: "Basic Screening (Non-Diabetic) + HbA1c" },
  { name: "Full Body Screening (Non-Diabetic)",price: "₹1,099", old: "₹2,100", tests: "CBC, FBS, Uric Acid, Creatinine, Urea, Lipid Profile, LFT, TSH, ECG, CUE" },
  { name: "Full Body Screening (Diabetic)",    price: "₹1,299", old: "₹2,600", tests: "Full Body Screening (Non-Diabetic) + HbA1c" },
  { name: "Anaemia Package",                   price: "₹1,499", old: "₹2,720", tests: "CBP, ESR, Iron, TIBC, Transferrin, % Iron Saturation" },
  { name: "Cardiac Screening Package",         price: "₹1,599", old: "₹2,390", tests: "CBC, Creatinine, ECG, Lipoprotein(a), Apolipoprotein A1/B, CK-MB" },
  { name: "Vitamin Package",                   price: "₹1,300", old: "₹2,600", tests: "Calcium, Vitamin B12 & Vitamin D" },
  { name: "Hormone Package (Female)",          price: "₹2,500", old: "₹4,900", tests: "FSH, Estradiol, TFT, Lipid Profile, Uric Acid, Creatinine, FBS, CBP, Vitamin D & B12" },
  { name: "Hormone Package (Male)",            price: "₹3,425", old: "₹6,850", tests: "FSH, LH, Testosterone, Lipid Profile, CBP, TFT, Creatinine, Uric Acid, FBS, PSA, Vitamin D & B12" },
  { name: "PCOD Panel",                        price: "₹3,800", old: "₹6,890", tests: "Testosterone, Prolactin, TFT, 17-OHP, DHEAS, FBS, Insulin, C Peptide" },
  { name: "Senior Citizen Package (Male)",     price: "₹1,799", old: "₹3,000", tests: "CBP, ESR, FBS, Creatinine, Uric Acid, Electrolytes, Lipid Profile, LFT, PSA, ECG, CUE" },
  { name: "Renal Function Tests (RFT/KFT)",   price: "₹799",   old: "₹1,200", tests: "Complete Blood Count, Serum Creatinine, Blood Urea, BUN, Uric Acid, Calcium, Electrolytes, ECG" },
  { name: "Fever Profile — Basic",             price: "₹899",   old: "₹1,250", tests: "Complete Blood Count, ESR, QBC, Widal, CRP, Urine Routine" },
  { name: "Fever Profile — Complete",          price: "₹1,299", old: "₹2,050", tests: "Complete Blood Count, ESR, QBC, Widal, CRP, Dengue, Urine Routine" },
  { name: "Hepatitis Screening Package",       price: "₹1,600", old: "₹3,510", tests: "HBsAg, Hepatitis A, HCV, Amylase, Lipase" },
];

export const FEATURES = [
  { ico: "🤒", bg: "#EEF6FF", title: "AI Symptom Checker",      desc: "Describe symptoms and get AI-powered analysis with possible conditions and next steps." },
  { ico: "⏰", bg: "#F0FAFB", title: "Smart Medicine Reminder", desc: "Never miss a dose with intelligent reminders across app, SMS, and voice alerts." },
  { ico: "📊", bg: "#EEF6FF", title: "AI Health Risk Prediction",desc: "Predict potential health risks using your vitals history and lifestyle data patterns." },
  { ico: "🎙️", bg: "#F5F0FF", title: "Voice Health Assistant",  desc: "Hands-free health queries powered by natural language AI understanding." },
  { ico: "📡", bg: "#FFF8EE", title: "Remote Health Monitoring", desc: "Continuous tracking of vitals via connected wearables and IoT medical devices." },
  { ico: "📂", bg: "#EEFBF4", title: "Digital Health Records",   desc: "Secure, organized digital storage of all prescriptions, reports, and history." },
  { ico: "🥗", bg: "#EEF6FF", title: "AI Diet Recommendation",  desc: "Personalized meal plans based on health conditions, allergies, and nutritional goals." },
  { ico: "🔬", bg: "#F0FAFB", title: "Smart Lab Report Analyzer",desc: "AI reads your lab reports, explains results, and flags abnormal values instantly." },
  { ico: "🆘", bg: "#FFF0F0", title: "Emergency SOS Alert",     desc: "One-tap emergency alerts to family, doctors, and ambulance services instantly." },
  { ico: "👨‍👩‍👧‍👦", bg: "#FFF8EE", title: "Family Health Dashboard", desc: "Manage health records and appointments for every member of your family in one place." },
];

export const SERVICES = [
  { ico: "📹", title: "Online Consultation",  desc: "Connect with top doctors from home via video, audio, or chat." },
  { ico: "🔬", title: "Diagnostic Services",  desc: "Book home sample collection for 1500+ lab tests with fast digital reports." },
  { ico: "💊", title: "Pharmacy Management", desc: "Order medicines, track deliveries, and set automatic refill reminders." },
  { ico: "🏠", title: "Home Healthcare",      desc: "Nursing, physiotherapy, and medical equipment at your doorstep, 24/7." },
  { ico: "🚑", title: "Ambulance Booking",    desc: "Book BLS/ALS ambulances instantly with real-time GPS tracking." },
  { ico: "🧪", title: "Lab Management",       desc: "Comprehensive LIMS: sample tracking, results, billing, and reporting." },
  { ico: "🩸", title: "Blood Bank Services",  desc: "Find and request blood donors, manage units, and emergency supply chains." },
  { ico: "🤖", title: "AI Report Analysis",   desc: "Upload any medical report and get an AI-powered plain-language explanation." },
  { ico: "📦", title: "Health Packages",      desc: "Comprehensive preventive health checkup packages for individuals and families." },
  { ico: "🛡️", title: "Insurance Support",   desc: "Cashless claims assistance, policy comparison, and insurance benefit management." },
];

export const METRICS = [
  { ico: "🏥", num: "10,000+", lbl: "Patients Served" },
  { ico: "👨‍⚕️", num: "250+",    lbl: "Expert Doctors" },
  { ico: "🌟", num: "98%",     lbl: "Satisfaction Rate" },
  { ico: "🕐", num: "24/7",    lbl: "Emergency Support" },
  { ico: "📋", num: "15,000+", lbl: "Reports Managed" },
];

export const APPT_STEPS = [
  "Search for your required service",
  "Choose a convenient date & time",
  "Confirm your booking & receive reminder",
];

export const APPOINTMENT_SERVICES = [
  "Select a service",
  "Lab Test / Diagnostics",
  "Doctor Consultation",
  "Home Healthcare",
  "Pharmacy",
  "Health Package",
];

export const BRANCHES = [
  { name: "Akkayapalem Branch", hours: "Mon–Sat: 8 AM – 9 PM",   phone: "+91-891-2225001", services: "Lab · Pharmacy · OPD · Radiology" },
  { name: "KGH Branch",          hours: "Mon–Sun: 24 Hours",       phone: "+91-891-2225002", services: "Emergency · ICU · Blood Bank · Lab" },
  { name: "Madurawada Branch",   hours: "Mon–Sat: 9 AM – 8 PM",   phone: "+91-891-2225003", services: "Diagnostics · Pharmacy · OPD" },
];

export const TESTIMONIALS = [
  {
    stars: 5,
    text: "The AI symptom checker accurately identified my condition before I even visited the doctor. Remote monitoring helped my family track my recovery in real-time. Absolutely brilliant platform!",
    name: "Srinivasa Rao", role: "Heart Patient, Visakhapatnam",
    initials: "SR", bg: "#EEF6FF", color: "#1B6CA8",
  },
  {
    stars: 5,
    text: "Booking lab tests at home was so convenient. The digital reports arrived within hours and the AI explained every value clearly. I no longer dread medical checkups!",
    name: "Padmavathi Lakshmi", role: "Diabetic Care Patient",
    initials: "PL", bg: "#F0FAFB", color: "#00B4D8",
  },
  {
    stars: 5,
    text: "As a working professional, I can consult top doctors during my lunch break via video call. Medicine delivery and reminders have kept me consistent. CallMedex changed my health habits!",
    name: "Kiran Reddy", role: "Software Engineer, Hyderabad",
    initials: "KR", bg: "#F5F0FF", color: "#7C3AED",
  },
];

export const FOOTER_LINKS = {
  Services: ["Online Consultation", "Lab Tests", "Pharmacy", "Home Care", "Ambulance", "AI Reports"],
  "Quick Links": ["Find Doctors", "Book Appointment", "Health Packages", "Insurance", "Blood Bank", "Emergency"],
  Company: [
    { label: "About Us",        href: "https://callmedex.com/about.php" },
    { label: "Gallery",         href: "https://callmedex.com/gallery.php" },
    { label: "Blog",            href: "https://callmedex.com/blog.php" },
    { label: "Privacy Policy",  href: "#" },
    { label: "Terms of Service",href: "#" },
    { label: "Contact Us",      href: "#" },
  ],
};

export const REGISTER_PERKS = [
  { ico: "🤖", text: "AI symptom checking & health prediction" },
  { ico: "📊", text: "Real-time monitoring & digital records" },
  { ico: "👨‍⚕️", text: "Connect with 250+ verified doctors" },
  { ico: "💊", text: "Smart medicine reminders & delivery" },
  { ico: "🔒", text: "256-bit encrypted health data storage" },
  { ico: "👨‍👩‍👧‍👦", text: "Manage records for your entire family" },
];

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const STATES = ["Andhra Pradesh", "Telangana", "Tamil Nadu", "Karnataka"];

export const STEP_LABELS = ["Personal Info", "Health Profile", "Location", "Verify OTP"];