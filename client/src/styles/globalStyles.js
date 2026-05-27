/* globalStyles.js — inject once via <style>{GLOBAL_CSS}</style> in App root */

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,400&display=swap');

:root {
  --c1:#0A2540;--c2:#1B6CA8;--c3:#00B4D8;--c4:#E63946;--c5:#F8FAFC;
  --c6:#F1F5F9;--c7:#E2E8F0;--c8:#94A3B8;--c9:#334155;--white:#fff;
  --font:'Plus Jakarta Sans',sans-serif;--serif:'Fraunces',serif;
  --r:14px;--r2:20px;--r3:32px;
  --sh:0 4px 24px rgba(10,37,64,.08);--sh2:0 12px 48px rgba(10,37,64,.14);
  --sh3:0 2px 8px rgba(10,37,64,.06);
  --tr:.22s cubic-bezier(.4,0,.2,1);
}

*{box-sizing:border-box;margin:0;padding:0;}
html,body{width:100%;max-width:100%;overflow-x:hidden;scroll-behavior:smooth;font-size:16px;}
body{font-family:var(--font);background:var(--c5);color:var(--c1);-webkit-font-smoothing:antialiased;}
#root{width:100%;max-width:100%;margin:0;padding:0;}

::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-thumb{background:var(--c3);border-radius:3px;}

/* ── TOPBAR ── */
.topbar{width:100%;background:var(--c1);color:rgba(255,255,255,.82);font-size:.78rem;padding:9px 4rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;}
.topbar a{color:var(--c3);text-decoration:none;font-weight:600;}
.topbar-left{display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;}
.topbar-right{display:flex;align-items:center;gap:1rem;}
.topbar-pill{display:inline-flex;align-items:center;gap:6px;background:rgba(0,180,216,.18);border:1px solid rgba(0,180,216,.3);color:var(--c3);padding:3px 10px;border-radius:100px;font-size:.72rem;font-weight:700;}

/* ── NAVBAR ── */
.nav-outer{width:100%;position:sticky;top:0;z-index:999;background:rgba(255,255,255,.97);backdrop-filter:blur(18px);border-bottom:1px solid #e8edf3;transition:.3s ease;}
.nav-outer.scrolled{box-shadow:0 8px 30px rgba(0,0,0,0.06);}
.nav-inner{width:100%;max-width:1600px;margin:auto;height:92px;padding:0 20px 0 28px;display:flex;align-items:center;justify-content:space-between;gap:10px;}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none !important;}
.nav-logo img{width:54px;height:54px;border-radius:14px;object-fit:cover;}
.nav-logo-text{font-size:2rem;font-weight:800;color:#102542;letter-spacing:-1px;font-family:'Fraunces',serif;text-decoration:none !important;}
.nav-logo-text span{color:#e63946;}
.nav-menu{display:flex;align-items:center;gap:2px;flex:1;justify-content:flex-start;margin-left:30px;}
.nav-item{position:relative;}
.nav-link{border:none;background:none;padding:11px 16px;border-radius:10px;display:flex;align-items:center;gap:6px;font-size:.95rem;font-weight:600;color:#243b53;cursor:pointer;transition:.25s ease;}
.nav-link:hover{background:#f1f5f9;color:#1b6ca8;}
.nav-drop{position:absolute;top:120%;left:50%;transform:translateX(-50%);min-width:240px;background:white;border-radius:18px;border:1px solid #e2e8f0;padding:10px;box-shadow:0 15px 40px rgba(0,0,0,0.08);opacity:0;pointer-events:none;transition:.25s ease;}
.nav-item:hover .nav-drop{opacity:1;pointer-events:auto;top:108%;}
.drop-item{width:100%;border:none;background:white;display:flex;align-items:center;gap:12px;padding:12px;border-radius:12px;text-decoration:none;color:#102542;font-weight:500;font-size:.92rem;transition:.2s ease;cursor:pointer;text-align:left;}
.drop-item:hover{background:#f8fafc;color:#1b6ca8;}
.drop-icon{width:38px;height:38px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:#eef6ff;}
.nav-cta{display:flex;align-items:center;gap:14px;flex-shrink:0;}

/* ── BUTTONS ── */
.btn{border:none;cursor:pointer;transition:.25s ease;font-weight:700;display:inline-flex;align-items:center;gap:8px;text-decoration:none;}
.btn-primary{background:#1b6ca8;color:white;padding:13px 24px;border-radius:14px;}
.btn-primary:hover{background:#15598b;transform:translateY(-2px);}
.btn-outline{background:white;color:#1b6ca8;border:2px solid #1b6ca8;padding:13px 24px;border-radius:14px;}
.btn-outline:hover{background:#1b6ca8;color:white;}
.btn-ghost{background:#eef6ff;color:#1b6ca8;padding:13px 24px;border-radius:14px;}
.btn-ghost:hover{background:#dbeafe;}
.btn-red{background:#e63946;color:white;padding:12px 18px;border-radius:12px;}
.btn-red:hover{background:#c92f3c;}
.btn-xl{padding:15px 28px;font-size:.95rem;}
.btn-lg{padding:14px 26px;}
.btn-login{display:inline-flex;align-items:center;gap:7px;padding:9px 16px;border-radius:10px;border:1.5px solid #e2e8f0;background:#fff;color:#374151;font-size:.875rem;font-weight:600;cursor:pointer;transition:.2s;font-family:var(--font);white-space:nowrap;}
.btn-login:hover{border-color:#1b6ca8;color:#1b6ca8;background:#eef6ff;}
.btn-signup{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:10px;border:none;background:#1b6ca8;color:#fff;font-size:.875rem;font-weight:700;cursor:pointer;transition:.2s;font-family:var(--font);}
.btn-signup:hover{background:#15598b;transform:translateY(-1px);}
.btn-book{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:10px;background:#e63946;color:#fff;font-size:.875rem;font-weight:700;cursor:pointer;transition:.2s;font-family:var(--font);text-decoration:none;}
.btn-book:hover{background:#c92f3c;transform:translateY(-1px);}

/* ── LOGIN DROPDOWN ── */
.login-wrap{position:relative;}
.login-drop{position:absolute;top:calc(100% + 10px);right:0;min-width:230px;background:var(--white);border:1px solid var(--c7);border-radius:var(--r2);padding:.6rem;box-shadow:var(--sh2);opacity:0;pointer-events:none;transition:all .2s;z-index:100;transform:translateY(6px);}
.login-wrap:hover .login-drop{opacity:1;pointer-events:all;transform:translateY(0);}
.login-role{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;font-size:.84rem;font-weight:600;cursor:pointer;color:var(--c1);transition:all .15s;}
.login-role:hover{background:rgba(27,108,168,.07);color:var(--c2);}
.login-role-icon{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}

/* ── HERO ── */
.hero{width:100%;min-height:90vh;display:flex;align-items:center;padding:5rem 4rem 4rem;position:relative;overflow:hidden;background:linear-gradient(135deg,#EEF6FF 0%,#F0FAFB 60%,#F8FAFC 100%);}
.hero::before{content:'';position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(0,180,216,.08) 0%,transparent 70%);top:-150px;right:-100px;pointer-events:none;}
.hero::after{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(27,108,168,.06) 0%,transparent 70%);bottom:-100px;left:100px;pointer-events:none;}
.hero-grid{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;width:100%;position:relative;z-index:1;}
.hero-tag{display:inline-flex;align-items:center;gap:8px;background:rgba(0,180,216,.12);border:1px solid rgba(0,180,216,.28);color:#0369a1;padding:5px 14px;border-radius:100px;font-size:.76rem;font-weight:700;margin-bottom:1.25rem;letter-spacing:.04em;text-transform:uppercase;}
.hero-pulse{width:7px;height:7px;border-radius:50%;background:var(--c3);animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.8);}}
.hero-h1{font-family:var(--serif);font-size:3.4rem;font-weight:700;line-height:1.12;margin-bottom:1.25rem;color:var(--c1);letter-spacing:-.02em;}
.hero-h1 em{font-style:italic;color:var(--c2);}
.hero-h1 mark{background:none;color:var(--c4);}
.hero-sub{font-size:1.05rem;color:var(--c8);line-height:1.8;max-width:500px;margin-bottom:2rem;}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:2.5rem;}
.hero-stats{display:flex;gap:2.5rem;border-top:1px solid var(--c7);padding-top:1.75rem;}
.hs-num{font-family:var(--serif);font-size:1.7rem;font-weight:700;color:var(--c1);}
.hs-num span{color:var(--c4);}
.hs-lbl{font-size:.76rem;color:var(--c8);margin-top:2px;font-weight:500;}
.hero-visual{position:relative;}
.hv-main{background:var(--white);border-radius:28px;padding:1.75rem;box-shadow:var(--sh2);border:1px solid var(--c7);animation:float 7s ease-in-out infinite;}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}
.hv-header{display:flex;align-items:center;gap:12px;margin-bottom:1.25rem;}
.hv-avatar{width:46px;height:46px;border-radius:14px;background:linear-gradient(135deg,var(--c2),var(--c3));display:flex;align-items:center;justify-content:center;font-size:1.4rem;}
.hv-live{margin-left:auto;background:#dcfce7;color:#15803d;font-size:.68rem;font-weight:700;padding:4px 10px;border-radius:100px;border:1px solid #86efac;}
.ecg-wrap{height:56px;overflow:hidden;margin:0 0 1.25rem;}
.ecg-wrap svg{width:100%;height:100%;}
.ecg-p{stroke-dasharray:900;stroke-dashoffset:900;animation:draw 2.8s linear infinite;}
@keyframes draw{to{stroke-dashoffset:-900;}}
.vitals-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.vital{background:var(--c6);border-radius:12px;padding:12px 14px;border:1px solid var(--c7);}
.vital-val{font-family:var(--serif);font-size:1.15rem;font-weight:700;margin-bottom:2px;}
.vital-lbl{font-size:.68rem;color:var(--c8);font-weight:500;}

/* ── SEARCH ── */
.search-sec{width:100%;background:var(--white);padding:2.5rem 4rem;border-bottom:1px solid var(--c7);}
.search-inner{max-width:1000px;margin:0 auto;}
.search-tabs{display:flex;gap:8px;margin-bottom:1.25rem;flex-wrap:wrap;}
.stab{padding:7px 16px;border-radius:100px;font-size:.8rem;font-weight:600;cursor:pointer;border:1.5px solid var(--c7);background:transparent;color:var(--c8);transition:all .18s;font-family:var(--font);}
.stab.on{border-color:var(--c2);background:var(--c2);color:#fff;}
.stab:hover:not(.on){border-color:var(--c2);color:var(--c2);}
.sbar{display:flex;border-radius:16px;overflow:hidden;box-shadow:var(--sh2);border:1.5px solid var(--c7);background:var(--white);}
.sloc{display:flex;align-items:center;gap:7px;padding:0 1.1rem;border-right:1.5px solid var(--c7);font-size:.83rem;color:var(--c9);cursor:pointer;white-space:nowrap;min-width:150px;font-weight:600;}
.sinput{flex:1;padding:14px 1rem;border:none;outline:none;font-size:.94rem;color:var(--c1);background:transparent;font-family:var(--font);}
.sinput::placeholder{color:var(--c8);}
.sactions{display:flex;align-items:center;gap:7px;padding-right:8px;}
.siconbtn{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--c6);border:1px solid var(--c7);cursor:pointer;font-size:1rem;transition:all .18s;}
.siconbtn:hover{background:rgba(27,108,168,.1);}

/* ── SECTIONS ── */
.sec{width:100%;padding:5rem 4rem;}
.sec-alt{background:var(--white);}
.wrap{max-width:1400px;margin:0 auto;width:100%;}
.sec-head{text-align:center;margin-bottom:3rem;}
.sec-eyebrow{display:inline-flex;align-items:center;gap:6px;font-size:.74rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--c2);margin-bottom:.7rem;background:rgba(27,108,168,.08);padding:5px 13px;border-radius:100px;}
.sec-title{font-family:var(--serif);font-size:2.3rem;font-weight:700;color:var(--c1);margin-bottom:.7rem;letter-spacing:-.02em;}
.sec-sub{color:var(--c8);max-width:580px;margin:0 auto;line-height:1.75;font-size:.95rem;}

/* ── SPECIALISTS ── */
.spec-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(145px,1fr));gap:14px;}
.spec-card{background:var(--white);border-radius:18px;padding:1.25rem 1rem;text-align:center;border:1.5px solid var(--c7);cursor:pointer;transition:all .28s;position:relative;overflow:hidden;}
.spec-card::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(27,108,168,.06),rgba(0,180,216,.06));opacity:0;transition:opacity .28s;}
.spec-card:hover{transform:translateY(-5px);box-shadow:var(--sh2);border-color:var(--c3);}
.spec-card:hover::after{opacity:1;}
.spec-ico{font-size:2rem;margin-bottom:.5rem;}
.spec-name{font-size:.78rem;font-weight:700;color:var(--c1);}
.spec-desc{font-size:.67rem;color:var(--c8);margin-top:3px;}

/* ── PACKAGES ── */
.pkg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:20px;}
.pkg-card{background:var(--white);border-radius:20px;padding:1.5rem;border:1.5px solid var(--c7);transition:all .28s;cursor:pointer;position:relative;overflow:hidden;}
.pkg-card:hover{transform:translateY(-5px);box-shadow:var(--sh2);border-color:var(--c2);}
.pkg-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--c2),var(--c3));transform:scaleX(0);transform-origin:left;transition:transform .28s;}
.pkg-card:hover::before{transform:scaleX(1);}
.pkg-name{font-weight:700;font-size:.92rem;color:var(--c1);margin-bottom:.6rem;line-height:1.4;}
.pkg-price-row{display:flex;align-items:baseline;gap:8px;margin-bottom:.75rem;}
.pkg-price{font-family:var(--serif);font-size:1.6rem;font-weight:700;color:var(--c2);}
.pkg-price-old{font-size:.88rem;color:var(--c8);text-decoration:line-through;}
.pkg-save{font-size:.7rem;font-weight:700;background:rgba(0,180,216,.12);color:#0369a1;padding:3px 8px;border-radius:100px;border:1px solid rgba(0,180,216,.25);}
.pkg-tests{font-size:.74rem;color:var(--c8);line-height:1.6;margin-bottom:1rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
.pkg-tests strong{font-weight:600;color:var(--c9);}

/* ── FEATURES ── */
.feat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:18px;}
.feat-card{background:var(--c6);border-radius:20px;padding:1.6rem;border:1.5px solid var(--c7);transition:all .28s;cursor:pointer;}
.feat-card:hover{transform:translateY(-6px);box-shadow:var(--sh2);background:var(--white);}
.feat-ico{width:50px;height:50px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:1rem;}
.feat-title{font-weight:700;font-size:.94rem;margin-bottom:.45rem;color:var(--c1);}
.feat-desc{font-size:.82rem;color:var(--c8);line-height:1.65;}

/* ── SERVICES ── */
.svc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:18px;}
.svc-card{background:var(--white);border-radius:18px;padding:1.6rem;border:1.5px solid var(--c7);transition:all .28s;cursor:pointer;}
.svc-card:hover{transform:translateY(-4px);box-shadow:var(--sh2);border-color:var(--c3);}
.svc-ico{font-size:2.4rem;display:block;margin-bottom:.85rem;}
.svc-title{font-weight:700;font-size:.94rem;margin-bottom:.4rem;color:var(--c1);}
.svc-desc{font-size:.82rem;color:var(--c8);line-height:1.65;margin-bottom:.85rem;}
.svc-link{font-size:.8rem;font-weight:700;color:var(--c3);text-decoration:none;display:inline-flex;align-items:center;gap:4px;}

/* ── METRICS STRIP ── */
.metrics{width:100%;padding:4rem;background:var(--c1);}
.metrics-inner{max-width:1400px;margin:0 auto;}
.met-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:20px;text-align:center;}
.met-card{padding:1.5rem;background:rgba(255,255,255,.06);border-radius:18px;border:1px solid rgba(255,255,255,.1);}
.met-ico{font-size:1.8rem;display:block;margin-bottom:.5rem;}
.met-num{font-family:var(--serif);font-size:2rem;font-weight:700;color:#fff;}
.met-lbl{font-size:.8rem;color:rgba(255,255,255,.65);margin-top:4px;}

/* ── APPOINTMENT ── */
.appt-sec{width:100%;padding:5rem 4rem;background:linear-gradient(135deg,#EEF6FF,#F0FAFB);}
.appt-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.appt-left h2{font-family:var(--serif);font-size:2.2rem;font-weight:700;color:var(--c1);margin-bottom:1rem;letter-spacing:-.02em;}
.appt-left p{color:var(--c8);line-height:1.8;margin-bottom:1.5rem;}
.appt-steps{display:flex;flex-direction:column;gap:14px;margin-bottom:2rem;}
.astep{display:flex;align-items:center;gap:14px;background:var(--white);padding:14px 16px;border-radius:14px;border:1px solid var(--c7);box-shadow:var(--sh3);}
.astep-num{width:34px;height:34px;border-radius:50%;background:var(--c2);color:#fff;font-weight:700;font-size:.85rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.astep-text{font-size:.85rem;font-weight:600;color:var(--c1);}
.appt-right{background:var(--white);border-radius:24px;padding:2rem;box-shadow:var(--sh2);border:1px solid var(--c7);}
.appt-right h3{font-family:var(--serif);font-size:1.3rem;font-weight:700;margin-bottom:1.25rem;color:var(--c1);}
.field{margin-bottom:14px;}
.field label{display:block;font-size:.75rem;font-weight:700;color:var(--c9);margin-bottom:5px;letter-spacing:.04em;text-transform:uppercase;}
.field input,.field select{width:100%;padding:11px 14px;border-radius:10px;border:1.5px solid var(--c7);background:var(--c6);color:var(--c1);font-size:.88rem;outline:none;font-family:var(--font);transition:border-color .18s;}
.field input:focus,.field select:focus{border-color:var(--c2);background:#fff;}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

/* ── BRANCHES ── */
.branch-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.bc{background:var(--white);border-radius:20px;overflow:hidden;border:1px solid var(--c7);transition:all .28s;}
.bc:hover{box-shadow:var(--sh2);transform:translateY(-4px);}
.bc-map{height:150px;background:linear-gradient(135deg,rgba(27,108,168,.1),rgba(0,180,216,.1));display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
.bc-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(0,180,216,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,.12) 1px,transparent 1px);background-size:22px 22px;}
.bc-pin{position:relative;z-index:1;font-size:2.8rem;animation:bounce 2.2s ease-in-out infinite;}
@keyframes bounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-9px);}}
.bc-body{padding:1.4rem;}
.bc-name{font-family:var(--serif);font-size:1.1rem;font-weight:700;margin-bottom:.3rem;color:var(--c1);}
.bc-open{display:inline-flex;align-items:center;gap:5px;font-size:.72rem;font-weight:700;color:#16a34a;background:#dcfce7;padding:3px 9px;border-radius:100px;margin-bottom:.85rem;}
.bc-open span{width:5px;height:5px;border-radius:50%;background:#22c55e;animation:pulse 2s infinite;}
.bc-row{font-size:.8rem;color:var(--c8);margin-bottom:.35rem;display:flex;align-items:center;gap:6px;}

/* ── TESTIMONIALS ── */
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.tc{background:var(--white);border-radius:24px;padding:1.75rem;border:1px solid var(--c7);transition:all .28s;position:relative;}
.tc::before{content:'"';position:absolute;top:.8rem;right:1.2rem;font-size:5rem;color:rgba(27,108,168,.08);font-family:Georgia;line-height:1;}
.tc:hover{box-shadow:var(--sh2);transform:translateY(-4px);}
.tc-stars{color:#FBBF24;font-size:.95rem;margin-bottom:.7rem;}
.tc-text{font-size:.86rem;color:var(--c8);line-height:1.75;margin-bottom:1.1rem;font-style:italic;}
.tc-author{display:flex;align-items:center;gap:11px;}
.tc-av{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.88rem;flex-shrink:0;}
.tc-name{font-weight:700;font-size:.88rem;color:var(--c1);}
.tc-role{font-size:.73rem;color:var(--c8);}

/* ── CTA SECTION ── */
.cta-sec{width:100%;padding:5rem 4rem;background:linear-gradient(135deg,var(--c1) 0%,#0d3a5c 100%);text-align:center;}
.cta-sec h2{font-family:var(--serif);font-size:2.6rem;font-weight:700;color:#fff;margin-bottom:1rem;letter-spacing:-.02em;}
.cta-sec p{color:rgba(255,255,255,.72);font-size:1.02rem;max-width:560px;margin:0 auto 2rem;line-height:1.75;}
.cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}

/* ── FOOTER ── */
.footer{width:100%;background:#060f1c;color:rgba(255,255,255,.65);padding:4rem 4rem 1.5rem;}
.footer-inner{max-width:1400px;margin:0 auto;}
.footer-grid{display:grid;grid-template-columns:2.2fr 1fr 1fr 1fr 1.4fr;gap:3rem;padding-bottom:3rem;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:1.75rem;}
.footer-col h5{font-weight:700;font-size:.85rem;color:#fff;margin-bottom:1rem;letter-spacing:.04em;}
.fl{display:block;color:rgba(255,255,255,.55);text-decoration:none;font-size:.8rem;margin-bottom:.5rem;transition:color .18s;}
.fl:hover{color:var(--c3);}
.footer-desc{font-size:.82rem;margin-top:.75rem;line-height:1.75;max-width:280px;}
.fnl{display:flex;border-radius:9px;overflow:hidden;margin-top:.6rem;}
.fnl input{flex:1;padding:10px 13px;border:none;outline:none;background:rgba(255,255,255,.08);color:#fff;font-size:.8rem;font-family:var(--font);}
.fnl input::placeholder{color:rgba(255,255,255,.35);}
.fnl button{background:var(--c2);color:#fff;border:none;padding:10px 15px;cursor:pointer;font-size:.8rem;font-weight:700;}
.footer-bot{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem;}
.footer-copy{font-size:.78rem;}
.footer-soc{display:flex;gap:9px;}
.fsoc{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:.95rem;cursor:pointer;transition:all .18s;text-decoration:none;color:#fff;}
.fsoc:hover{background:var(--c3);border-color:var(--c3);}

/* ── FLOATING BUTTONS ── */
.fab-wrap{position:fixed;bottom:1.75rem;right:1.75rem;display:flex;flex-direction:column;gap:10px;z-index:999;}
.fab{width:50px;height:50px;border-radius:50%;border:none;cursor:pointer;font-size:1.3rem;display:flex;align-items:center;justify-content:center;box-shadow:var(--sh2);transition:all .2s;}
.fab:hover{transform:scale(1.12);}
.fab-chat{background:var(--c3);}
.fab-appt{background:var(--c2);}

/* ── REGISTER ── */
.reg-sec{width:100%;padding:5rem 4rem;background:var(--c6);}
.reg-box{max-width:1300px;margin:0 auto;}
.reg-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:start;}
.reg-left{position:sticky;top:90px;}
.reg-left h2{font-family:var(--serif);font-size:2rem;font-weight:700;margin-bottom:.7rem;color:var(--c1);letter-spacing:-.02em;}
.reg-left p{color:var(--c8);margin-bottom:1.75rem;line-height:1.8;}
.reg-perks{display:flex;flex-direction:column;gap:11px;}
.perk{display:flex;align-items:center;gap:12px;background:var(--white);padding:12px 15px;border-radius:12px;border:1px solid var(--c7);font-size:.83rem;font-weight:600;color:var(--c1);}
.perk-ico{font-size:1.1rem;}
.stepper{display:flex;margin-bottom:2rem;}
.sstep{flex:1;display:flex;flex-direction:column;align-items:center;position:relative;}
.sstep::after{content:'';position:absolute;top:15px;left:50%;width:100%;height:2px;background:var(--c7);}
.sstep:last-child::after{display:none;}
.sstep.done::after{background:var(--c3);}
.scir{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;z-index:1;background:var(--c7);color:var(--c8);transition:all .25s;}
.sstep.done .scir{background:var(--c3);color:#fff;}
.sstep.active .scir{background:var(--c2);color:#fff;box-shadow:0 0 0 4px rgba(27,108,168,.18);}
.slbl{font-size:.62rem;font-weight:700;color:var(--c8);margin-top:5px;text-align:center;white-space:nowrap;}
.sstep.active .slbl{color:var(--c2);}
.sstep.done .slbl{color:var(--c3);}
.form-card{background:var(--white);border-radius:22px;padding:2rem;border:1px solid var(--c7);box-shadow:var(--sh);}
.form-nav{display:flex;gap:11px;margin-top:1.5rem;}
.form-nav .btn{flex:1;justify-content:center;}
.otp-row{display:flex;gap:12px;justify-content:center;margin:1.5rem 0;}
.otp-inp{width:58px;height:58px;text-align:center;font-size:1.4rem;font-weight:700;border-radius:12px;border:2px solid var(--c7);background:var(--c6);color:var(--c1);outline:none;font-family:var(--serif);}
.otp-inp:focus{border-color:var(--c2);}
.success{text-align:center;padding:2.5rem;}
.success-ico{font-size:4.5rem;animation:pop .5s cubic-bezier(.175,.885,.32,1.275);}
@keyframes pop{0%{transform:scale(0);}100%{transform:scale(1);}}
.success-h{font-family:var(--serif);font-size:1.9rem;font-weight:700;margin:1rem 0 .5rem;color:var(--c1);}

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .hero-grid,.reg-grid{grid-template-columns:1fr;}
  .hero-visual{display:none;}
  .branch-grid,.testi-grid{grid-template-columns:1fr;}
  .footer-grid{grid-template-columns:1fr 1fr;}
  .appt-grid{grid-template-columns:1fr;}
}
@media(max-width:768px){
  .nav-menu{display:none;}
  .nav-inner{padding:0 1.5rem;}
  .topbar{padding:9px 1.5rem;}
  .hero{padding:4rem 1.5rem;}
  .hero-h1{font-size:2.1rem;}
  .sec{padding:3.5rem 1.5rem;}
  .search-sec{padding:2rem 1.5rem;}
  .metrics{padding:3rem 1.5rem;}
  .appt-sec{padding:3.5rem 1.5rem;}
  .cta-sec{padding:3.5rem 1.5rem;}
  .reg-sec{padding:3.5rem 1.5rem;}
  .footer{padding:3rem 1.5rem 1.5rem;}
  .spec-grid{grid-template-columns:repeat(auto-fill,minmax(120px,1fr));}
  .footer-grid{grid-template-columns:1fr;}
  .field-row{grid-template-columns:1fr;}
}
`;

export default GLOBAL_CSS;