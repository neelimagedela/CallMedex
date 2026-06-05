export function openReceipt({
  receiptId = "",
  title = "Consultation Receipt",
  serviceType = "Consultation",
  patientName = "",
  patientEmail = "",
  patientPhone = "",
  patientAddress = "",
  patientId = "",
  serviceName = "",
  appointmentDate = "",
  timeSlot = "",
  amount = 0,
  extraFieldLabel = "",
  extraFieldValue = "",
}) {
  const issued = new Date().toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>${title}</title>

<style>

body{
  font-family:'Segoe UI',sans-serif;
  background:#f5f7fb;
  color:#0A2540;
  margin:0;
  padding:40px;
}

.receipt{
  max-width:760px;
  margin:auto;
  background:white;
  border-radius:24px;
  padding:40px;
  box-shadow:0 10px 35px rgba(0,0,0,.08);
}

.header{
  display:flex;
  align-items:center;
  gap:14px;
}

.logo{
  width:52px;
  height:52px;
  border-radius:12px;
  background:#e63946;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:24px;
  font-weight:700;
}

.brand{
  font-size:28px;
  font-weight:700;
}

.type{
  color:#64748b;
  margin-top:3px;
}

.badge{
  display:inline-block;
  margin-top:18px;
  background:#e8faf2;
  color:#00a86b;
  padding:8px 14px;
  border-radius:999px;
  font-weight:700;
  font-size:13px;
}

.title{
  margin-top:20px;
  font-size:34px;
  font-weight:700;
}

.sub{
  margin-top:8px;
  color:#64748b;
}

.section{
  margin-top:30px;
  border-top:1px solid #e5e7eb;
  padding-top:20px;
}

.sectionTitle{
  color:#94a3b8;
  font-size:12px;
  font-weight:700;
  letter-spacing:1px;
  margin-bottom:15px;
}

.row{
  display:flex;
  justify-content:space-between;
  padding:8px 0;
}

.label{
  color:#64748b;
}

.value{
  font-weight:700;
}

.serviceRow{
  display:flex;
  justify-content:space-between;
  padding:12px 0;
}

.total{
  display:flex;
  justify-content:space-between;
  font-size:26px;
  font-weight:700;
  margin-top:15px;
}

.note{
  background:#f8fafc;
  border-radius:14px;
  padding:16px;
  margin-top:25px;
  color:#64748b;
  line-height:1.7;
}

.phone{
  color:#e63946;
  font-weight:700;
}

.printBtn{
  margin-top:25px;
  width:100%;
  border:none;
  background:#0ea5e9;
  color:white;
  padding:14px;
  border-radius:12px;
  font-weight:700;
  cursor:pointer;
}

@media print{
  .printBtn{
    display:none;
  }
}

</style>
</head>

<body>

<div class="receipt">

<div class="header">

<div class="logo">C</div>

<div>
<div class="brand">CallMeDex</div>
<div class="type">${serviceType}</div>
</div>

</div>

<div class="badge">
✓ BOOKING CONFIRMED
</div>

<div class="title">
Booking Receipt
</div>

<div class="sub">
Receipt #${receiptId || "N/A"} · Issued: ${issued}
</div>

<div class="section">

<div class="sectionTitle">
PATIENT DETAILS
</div>

${
  patientId
    ? `
<div class="row">
<div class="label">Patient ID</div>
<div class="value">${patientId}</div>
</div>
`
    : ""
}

<div class="row">
<div class="label">Name</div>
<div class="value">${patientName}</div>
</div>

<div class="row">
<div class="label">Phone</div>
<div class="value">${patientPhone}</div>
</div>

<div class="row">
<div class="label">Email</div>
<div class="value">${patientEmail}</div>
</div>

${
  patientAddress
    ? `
<div class="row">
<div class="label">Address</div>
<div class="value">${patientAddress}</div>
</div>
`
    : ""
}

</div>

<div class="section">

<div class="sectionTitle">
APPOINTMENT
</div>

<div class="row">
<div class="label">Date</div>
<div class="value">${appointmentDate}</div>
</div>

<div class="row">
<div class="label">Time Slot</div>
<div class="value">${timeSlot}</div>
</div>

${
  extraFieldLabel
    ? `
<div class="row">
<div class="label">${extraFieldLabel}</div>
<div class="value">${extraFieldValue}</div>
</div>
`
    : ""
}

</div>

<div class="section">

<div class="sectionTitle">
SERVICE BOOKED
</div>

<div class="serviceRow">
<div>
${serviceName || serviceType}
</div>

<div class="value">
₹${amount}
</div>
</div>

<div class="total">
<div>Total Amount</div>
<div>₹${amount}</div>
</div>

</div>

<div class="note">

Our healthcare professional will assist you based on the selected appointment.

<br/>

For queries, call
<span class="phone">
+91 80746 77177
</span>

</div>

<button
class="printBtn"
onclick="window.print()"
>
Download / Print Receipt
</button>

</div>

<script>
window.onload=function(){
window.print();
}
</script>

</body>
</html>
`;

  const blob = new Blob(
    [html],
    { type: "text/html" }
  );

  const url =
    URL.createObjectURL(blob);

  window.open(url, "_blank");
}