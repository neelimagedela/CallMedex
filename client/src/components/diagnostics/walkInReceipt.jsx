export function downloadWalkInReceipt({
  booking,
  patient,
  branch,
  selectedTests,
  date,
  slot,
  total,
}) {
  const issuedDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const visitDate = new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const testRows = selectedTests
    .map(
      (test) => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #f0f4f8">${test.name}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #f0f4f8;text-align:right;font-weight:700">
          &#8377;${Number(test.price || 0).toFixed(2)}
        </td>
      </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Walk-in Receipt - ${booking.receiptId}</title>
<style>
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none !important; }
    @page { margin: 18mm; size: A4; }
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    padding: 32px;
    font-family: 'Segoe UI', sans-serif;
    background: #f4f8fb;
    color: #0A2540;
  }

  .card {
    max-width: 620px;
    margin: 0 auto;
    background: white;
    border-radius: 22px;
    padding: 36px;
    box-shadow: 0 4px 24px rgba(0,0,0,.08);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .logo {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    background: #e63946;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: 900;
  }

  .brand h2 {
    margin: 0;
    font-size: 1.15rem;
  }

  .brand p {
    margin: 2px 0 0;
    color: #64748b;
    font-size: .8rem;
  }

  .tag {
    display: inline-block;
    background: #ecfdf5;
    color: #059669;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: .78rem;
    font-weight: 900;
    margin-bottom: 16px;
  }

  h1 {
    margin: 0 0 4px;
    font-size: 1.45rem;
  }

  .sub {
    margin: 0 0 20px;
    color: #64748b;
    font-size: .86rem;
  }

  hr {
    border: 0;
    border-top: 1.5px solid #f0f4f8;
    margin: 18px 0;
  }

  .row {
    display: flex;
    justify-content: space-between;
    gap: 18px;
    padding: 7px 0;
    font-size: .9rem;
  }

  .row span:first-child {
    color: #64748b;
  }

  .row strong {
    text-align: right;
    color: #0A2540;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: .9rem;
  }

  th {
    text-align: left;
    background: #f8fafc;
    color: #64748b;
    padding: 9px 10px;
    font-size: .75rem;
    text-transform: uppercase;
  }

  .total {
    display: flex;
    justify-content: space-between;
    padding-top: 14px;
    font-size: 1.05rem;
    font-weight: 900;
  }

  .note {
    background: #f8fafc;
    color: #64748b;
    border-radius: 14px;
    padding: 14px 16px;
    line-height: 1.6;
    font-size: .82rem;
    margin-top: 22px;
  }

  .print-btn {
    width: 100%;
    margin-top: 22px;
    padding: 13px;
    border: 0;
    border-radius: 14px;
    background: #10b981;
    color: white;
    font-size: 1rem;
    font-weight: 900;
    cursor: pointer;
  }
</style>
</head>

<body>
  <div class="card">
    <div class="brand">
      <div class="logo">C</div>
      <div>
        <h2>CallMeDex</h2>
        <p>Diagnostic Walk-in Center</p>
      </div>
    </div>

    <div class="tag">&#10003; WALK-IN BOOKING CONFIRMED</div>

    <h1>Booking Receipt</h1>
    <p class="sub">Receipt #${booking.receiptId} &nbsp;&middot;&nbsp; Issued: ${issuedDate}</p>

    <hr />

    <div class="row"><span>Patient Name</span><strong>${patient.name}</strong></div>
    <div class="row"><span>Age / Gender</span><strong>${patient.age} yrs / ${patient.sex}</strong></div>
    <div class="row"><span>Mobile</span><strong>${patient.mobile}</strong></div>
    <div class="row"><span>Email</span><strong>${patient.email}</strong></div>
    <div class="row"><span>Address</span><strong>${patient.address}</strong></div>

    <hr />

    <div class="row"><span>Branch</span><strong>${branch}</strong></div>
    <div class="row"><span>Walk-in Date</span><strong>${visitDate}</strong></div>
    <div class="row"><span>Time Slot</span><strong>${slot}</strong></div>

    <hr />

    <table>
      <thead>
        <tr>
          <th>Test</th>
          <th style="text-align:right">Price</th>
        </tr>
      </thead>
      <tbody>${testRows}</tbody>
    </table>

    <div class="total">
      <span>Total Amount</span>
      <span>&#8377;${Number(total || 0).toFixed(2)}</span>
    </div>

    <div class="note">
      Please visit the selected branch during your chosen slot. Carry this receipt ID
      and a valid photo ID for faster processing.
    </div>

    <button class="print-btn no-print" onclick="window.print()">
      Download / Save as PDF
    </button>
  </div>

  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");

  if (!win) {
    const a = document.createElement("a");
    a.href = url;
    a.download = `WalkIn_Receipt_${booking.receiptId}.html`;
    a.click();
  }
}