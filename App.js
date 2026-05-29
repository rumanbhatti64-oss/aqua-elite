import { useState, useEffect, useRef } from "react";

const cities = ["Lahore", "Karachi", "Islamabad"];

const services = [
  { id: 1, name: "Classic Exterior", price: 800, duration: "30 min", icon: "✦", desc: "Full exterior hand wash, rinse & dry" },
  { id: 2, name: "Interior Detail", price: 1200, duration: "45 min", icon: "◈", desc: "Vacuum, wipe-down & leather condition" },
  { id: 3, name: "Premium Full", price: 2500, duration: "90 min", icon: "◉", desc: "Complete exterior + interior detailing" },
  { id: 4, name: "Engine Bay", price: 1800, duration: "60 min", icon: "⬡", desc: "Degreasing & engine compartment clean" },
  { id: 5, name: "Ceramic Coat", price: 8500, duration: "3 hrs", icon: "◆", desc: "Nano-ceramic paint protection layer" },
  { id: 6, name: "Steam Clean", price: 3200, duration: "2 hrs", icon: "◎", desc: "Full steam sanitization inside & out" },
];

const subscriptions = [
  { id: "weekly", label: "Weekly", washes: 4, price: 3200, saving: "Save 20%", badge: "POPULAR" },
  { id: "monthly", label: "Monthly", washes: 8, price: 5500, saving: "Save 35%", badge: "BEST VALUE" },
  { id: "anytime", label: "Anytime", washes: "∞", price: 9999, saving: "Unlimited", badge: "ELITE" },
];

const washers = [
  { id: 1, name: "Zain Ahmed", rating: 4.9, jobs: 312, city: "Lahore", avatar: "ZA", status: "Available" },
  { id: 2, name: "Hamza Rauf", rating: 4.8, jobs: 245, city: "Karachi", avatar: "HR", status: "Available" },
  { id: 3, name: "Bilal Shah", rating: 5.0, jobs: 189, city: "Islamabad", avatar: "BS", status: "Busy" },
];

// Particle component for background
function Particles() {
  return (
    <div className="particles">
      {[...Array(18)].map((_, i) => (
        <div key={i} className={`particle particle-${i}`} />
      ))}
    </div>
  );
}

// Animated gold divider
function GoldDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "8px 0" }}>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
      <span style={{ color: "#C9A84C", fontSize: "10px" }}>✦</span>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
    </div>
  );
}

export default function AquaElite() {
  const [screen, setScreen] = useState("splash");
  const [role, setRole] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [city, setCity] = useState("Lahore");
  const [tab, setTab] = useState("home");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [bookingStep, setBookingStep] = useState(0);
  const [address, setAddress] = useState("");
  const [scheduled, setScheduled] = useState(false);
  const [animIn, setAnimIn] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [locationPulsing, setLocationPulsing] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimIn(true), 100);
    setTimeout(() => setScreen("onboard"), 2800);
  }, []);

  useEffect(() => {
    if (tab === "map") {
      setLocationPulsing(true);
      const t = setTimeout(() => setLocationPulsing(false), 3000);
      return () => clearTimeout(t);
    }
  }, [tab]);

  const navigate = (s) => {
    setAnimIn(false);
    setTimeout(() => { setScreen(s); setAnimIn(true); }, 200);
  };

  // ─── SPLASH ───────────────────────────────────────────────────────────────
  if (screen === "splash") return (
    <div className="app splash">
      <Particles />
      <div className={`splash-content ${animIn ? "fade-in" : ""}`}>
        <div className="crest">
          <div className="crest-ring outer" />
          <div className="crest-ring inner" />
          <div className="crest-icon">◈</div>
        </div>
        <h1 className="brand">AQUA ÉLITE</h1>
        <p className="brand-sub">Mobile Car Care · Est. 2024</p>
        <GoldDivider />
        <p className="brand-tagline">Where Excellence Meets Your Driveway</p>
        <div className="splash-cities">
          {cities.map(c => <span key={c} className="city-badge">{c}</span>)}
        </div>
      </div>
      <div className="splash-bar" />
    </div>
  );

  // ─── ONBOARD ──────────────────────────────────────────────────────────────
  if (screen === "onboard") return (
    <div className="app onboard">
      <Particles />
      <div className={`onboard-content ${animIn ? "slide-up" : ""}`}>
        <div className="onboard-logo">◈</div>
        <h2 className="onboard-title">Premium Car Care<br />At Your Location</h2>
        <p className="onboard-desc">Professional washers dispatched directly to you — wherever you are in Pakistan's finest cities.</p>
        <GoldDivider />
        <p className="onboard-q">I am a…</p>
        <div className="role-cards">
          <button className="role-card" onClick={() => { setRole("customer"); navigate("auth"); }}>
            <span className="role-icon">◉</span>
            <span className="role-label">Car Owner</span>
            <span className="role-desc">Book a wash</span>
          </button>
          <button className="role-card" onClick={() => { setRole("washer"); navigate("auth"); }}>
            <span className="role-icon">◆</span>
            <span className="role-label">Washer</span>
            <span className="role-desc">Earn money</span>
          </button>
        </div>
        <button className="ghost-btn" onClick={() => { setRole("customer"); navigate("main"); }}>
          Continue as Guest
        </button>
      </div>
    </div>
  );

  // ─── AUTH ─────────────────────────────────────────────────────────────────
  if (screen === "auth") return (
    <div className="app auth-screen">
      <Particles />
      <div className={`auth-content ${animIn ? "slide-up" : ""}`}>
        <button className="back-btn" onClick={() => navigate("onboard")}>← Back</button>
        <div className="auth-header">
          <span className="auth-logo">◈</span>
          <h2 className="auth-title">AQUA ÉLITE</h2>
          <p className="auth-role">{role === "washer" ? "Washer Portal" : "Client Portal"}</p>
        </div>
        <GoldDivider />
        <div className="auth-tabs">
          <button className={`auth-tab ${authMode === "login" ? "active" : ""}`} onClick={() => setAuthMode("login")}>Sign In</button>
          <button className={`auth-tab ${authMode === "register" ? "active" : ""}`} onClick={() => setAuthMode("register")}>Register</button>
        </div>
        <div className="auth-form">
          {authMode === "register" && (
            <div className="input-group">
              <label>Full Name</label>
              <input placeholder="Muhammad Ali" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
          )}
          <div className="input-group">
            <label>Email Address</label>
            <input placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          {authMode === "register" && (
            <div className="input-group">
              <label>Phone Number</label>
              <input placeholder="+92 300 0000000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
          )}
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          {authMode === "register" && role === "washer" && (
            <div className="input-group">
              <label>City of Operation</label>
              <select value={city} onChange={e => setCity(e.target.value)}>
                {cities.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          )}
          <button className="primary-btn" onClick={() => navigate("main")}>
            {authMode === "login" ? "Sign In" : "Create Account"}
          </button>
          <p className="auth-alt">
            {authMode === "login" ? "New here? " : "Already have an account? "}
            <span onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}>
              {authMode === "login" ? "Register" : "Sign In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );

  // ─── MAIN APP ─────────────────────────────────────────────────────────────
  if (screen === "main") {
    const renderHome = () => (
      <div className="tab-content fade-in">
        {/* Hero */}
        <div className="home-hero">
          <Particles />
          <div className="hero-inner">
            <p className="hero-greeting">Good afternoon,</p>
            <h2 className="hero-name">{form.name || "Distinguished Guest"}</h2>
            <div className="city-selector">
              {cities.map(c => (
                <button key={c} className={`city-pill ${city === c ? "active" : ""}`} onClick={() => setCity(c)}>{c}</button>
              ))}
            </div>
            <div className="hero-cta" onClick={() => { setTab("book"); setBookingStep(0); }}>
              <span className="cta-icon">◈</span>
              <div>
                <p className="cta-title">Book a Wash</p>
                <p className="cta-sub">Washers near you in {city}</p>
              </div>
              <span className="cta-arrow">→</span>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="stats-strip">
          <div className="stat"><span className="stat-n">2.4k+</span><span className="stat-l">Washes Done</span></div>
          <div className="stat-div" />
          <div className="stat"><span className="stat-n">4.9★</span><span className="stat-l">Avg Rating</span></div>
          <div className="stat-div" />
          <div className="stat"><span className="stat-n">3</span><span className="stat-l">Cities</span></div>
        </div>

        {/* Services preview */}
        <div className="section">
          <div className="section-head">
            <h3>Our Services</h3>
            <button className="see-all" onClick={() => setTab("services")}>View All →</button>
          </div>
          <div className="services-scroll">
            {services.slice(0, 4).map(s => (
              <div key={s.id} className="service-mini" onClick={() => { setSelectedService(s); setTab("book"); setBookingStep(0); }}>
                <span className="service-mini-icon">{s.icon}</span>
                <p className="service-mini-name">{s.name}</p>
                <p className="service-mini-price">Rs {s.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Washers */}
        <div className="section">
          <div className="section-head">
            <h3>Nearby Washers</h3>
          </div>
          {washers.filter(w => w.city === city || true).slice(0, 2).map(w => (
            <div key={w.id} className="washer-card">
              <div className="washer-avatar">{w.avatar}</div>
              <div className="washer-info">
                <p className="washer-name">{w.name}</p>
                <p className="washer-meta">★ {w.rating} · {w.jobs} washes · {w.city}</p>
              </div>
              <span className={`washer-status ${w.status === "Available" ? "avail" : "busy"}`}>{w.status}</span>
            </div>
          ))}
        </div>
      </div>
    );

    const renderServices = () => (
      <div className="tab-content fade-in">
        <div className="page-header">
          <h2>Our Services</h2>
          <p>Premium care tailored to your vehicle</p>
          <GoldDivider />
        </div>
        <div className="services-grid">
          {services.map(s => (
            <div key={s.id} className={`service-card ${selectedService?.id === s.id ? "selected" : ""}`}
              onClick={() => { setSelectedService(s); setTab("book"); setBookingStep(0); }}>
              <span className="service-card-icon">{s.icon}</span>
              <h4>{s.name}</h4>
              <p className="service-card-desc">{s.desc}</p>
              <div className="service-card-footer">
                <span className="service-price">Rs {s.price.toLocaleString()}</span>
                <span className="service-dur">{s.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    const renderBook = () => (
      <div className="tab-content fade-in">
        <div className="page-header">
          <h2>Book a Wash</h2>
          <p>Schedule your premium experience</p>
          <GoldDivider />
        </div>

        {/* Step indicator */}
        <div className="steps">
          {["Service", "Location", "Confirm"].map((s, i) => (
            <div key={s} className="step-item">
              <div className={`step-dot ${bookingStep >= i ? "done" : ""}`}>{i + 1}</div>
              <span className={`step-label ${bookingStep === i ? "active" : ""}`}>{s}</span>
              {i < 2 && <div className={`step-line ${bookingStep > i ? "done" : ""}`} />}
            </div>
          ))}
        </div>

        {bookingStep === 0 && (
          <div className="step-panel fade-in">
            <h3 className="step-title">Choose Your Service</h3>
            <div className="services-grid">
              {services.map(s => (
                <div key={s.id} className={`service-card ${selectedService?.id === s.id ? "selected" : ""}`}
                  onClick={() => setSelectedService(s)}>
                  <span className="service-card-icon">{s.icon}</span>
                  <h4>{s.name}</h4>
                  <p className="service-card-desc">{s.desc}</p>
                  <div className="service-card-footer">
                    <span className="service-price">Rs {s.price.toLocaleString()}</span>
                    <span className="service-dur">{s.duration}</span>
                  </div>
                </div>
              ))}
            </div>
            {selectedService && (
              <button className="primary-btn" onClick={() => setBookingStep(1)}>Continue →</button>
            )}
          </div>
        )}

        {bookingStep === 1 && (
          <div className="step-panel fade-in">
            <h3 className="step-title">Set Your Location</h3>
            <div className="map-preview">
              <div className={`map-pulse ${locationPulsing ? "pulsing" : ""}`}>
                <div className="map-pin">◉</div>
                <div className="map-ring r1" />
                <div className="map-ring r2" />
                <div className="map-grid">
                  {[...Array(16)].map((_, i) => <div key={i} className="map-cell" />)}
                </div>
              </div>
              <button className="map-locate" onClick={() => { setAddress("Current Location · " + city); setLocationPulsing(true); }}>
                ⊕ Use Current Location
              </button>
            </div>
            <div className="input-group" style={{ marginTop: 16 }}>
              <label>Or Enter Address</label>
              <input placeholder={`Street, Sector — ${city}`} value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            <div className="btn-row">
              <button className="ghost-btn" onClick={() => setBookingStep(0)}>← Back</button>
              {address && <button className="primary-btn" onClick={() => setBookingStep(2)}>Continue →</button>}
            </div>
          </div>
        )}

        {bookingStep === 2 && !scheduled && (
          <div className="step-panel fade-in">
            <h3 className="step-title">Confirm Booking</h3>
            <div className="confirm-card">
              <div className="confirm-row"><span>Service</span><strong>{selectedService?.name}</strong></div>
              <div className="confirm-row"><span>Location</span><strong>{address}</strong></div>
              <div className="confirm-row"><span>City</span><strong>{city}</strong></div>
              <div className="confirm-row"><span>Duration</span><strong>{selectedService?.duration}</strong></div>
              <GoldDivider />
              <div className="confirm-row total"><span>Total</span><strong className="gold">Rs {selectedService?.price.toLocaleString()}</strong></div>
            </div>
            <div className="btn-row">
              <button className="ghost-btn" onClick={() => setBookingStep(1)}>← Back</button>
              <button className="primary-btn" onClick={() => setScheduled(true)}>Confirm Booking</button>
            </div>
          </div>
        )}

        {scheduled && (
          <div className="step-panel fade-in success-panel">
            <div className="success-icon">◉</div>
            <h3 className="success-title">Booking Confirmed!</h3>
            <p className="success-msg">Your washer is on the way. ETA 15–25 minutes.</p>
            <div className="tracking-card">
              <p className="track-label">Live Tracking</p>
              <div className="track-dots">
                <span className="td active" />
                <span className="td" />
                <span className="td" />
                <span className="td" />
              </div>
              <p className="track-step">Washer Dispatched</p>
            </div>
            <button className="primary-btn" onClick={() => { setScheduled(false); setBookingStep(0); setSelectedService(null); setAddress(""); setTab("home"); }}>
              Back to Home
            </button>
          </div>
        )}
      </div>
    );

    const renderSubscriptions = () => (
      <div className="tab-content fade-in">
        <div className="page-header">
          <h2>Memberships</h2>
          <p>Exclusive plans for the discerning owner</p>
          <GoldDivider />
        </div>
        <div className="sub-cards">
          {subscriptions.map(s => (
            <div key={s.id} className={`sub-card ${selectedSub === s.id ? "selected" : ""} ${s.id === "anytime" ? "elite" : ""}`}
              onClick={() => setSelectedSub(s.id)}>
              {s.badge && <span className="sub-badge">{s.badge}</span>}
              <h3 className="sub-label">{s.label}</h3>
              <p className="sub-washes">{s.washes} {s.washes === "∞" ? "Unlimited" : "Washes / month"}</p>
              <div className="sub-price">
                <span className="sub-amount">Rs {s.price.toLocaleString()}</span>
                <span className="sub-period">/ month</span>
              </div>
              <span className="sub-saving">{s.saving}</span>
              <ul className="sub-features">
                <li>✦ All service types included</li>
                <li>✦ Priority washer dispatch</li>
                <li>✦ Free cancellation</li>
                {s.id !== "weekly" && <li>✦ Multi-vehicle support</li>}
                {s.id === "anytime" && <li>✦ Dedicated account manager</li>}
              </ul>
            </div>
          ))}
        </div>
        {selectedSub && (
          <button className="primary-btn" style={{ margin: "0 20px 20px" }} onClick={() => navigate("auth")}>
            Subscribe Now
          </button>
        )}
      </div>
    );

    const renderMap = () => (
      <div className="tab-content fade-in">
        <div className="page-header">
          <h2>Live Map</h2>
          <p>Washers near you right now</p>
          <GoldDivider />
        </div>
        <div className="city-selector" style={{ padding: "0 20px 12px" }}>
          {cities.map(c => (
            <button key={c} className={`city-pill ${city === c ? "active" : ""}`} onClick={() => setCity(c)}>{c}</button>
          ))}
        </div>
        <div className="live-map">
          <div className="lm-grid">
            {[...Array(25)].map((_, i) => <div key={i} className="lm-cell" />)}
          </div>
          {/* User location */}
          <div className="lm-user">
            <div className="lm-user-dot" />
            <div className="lm-user-ring" />
            <div className="lm-user-ring r2" />
            <span className="lm-user-label">You</span>
          </div>
          {/* Washers on map */}
          <div className="lm-washer" style={{ top: "30%", left: "45%" }}>
            <span className="lm-w-icon">◈</span>
            <span className="lm-w-label">Zain · 1.2km</span>
          </div>
          <div className="lm-washer" style={{ top: "60%", left: "65%" }}>
            <span className="lm-w-icon">◈</span>
            <span className="lm-w-label">Hamza · 2.4km</span>
          </div>
          <div className="lm-washer lm-w-busy" style={{ top: "20%", left: "70%" }}>
            <span className="lm-w-icon">◈</span>
            <span className="lm-w-label">Bilal · Busy</span>
          </div>
          <div className="lm-overlay">
            <span className="lm-city">{city}</span>
            <span className="lm-count">3 washers nearby</span>
          </div>
        </div>
        <div className="section" style={{ marginTop: 0 }}>
          <h3 style={{ padding: "0 20px", color: "#C9A84C", marginBottom: 12 }}>Available Now</h3>
          {washers.map(w => (
            <div key={w.id} className="washer-card">
              <div className="washer-avatar">{w.avatar}</div>
              <div className="washer-info">
                <p className="washer-name">{w.name}</p>
                <p className="washer-meta">★ {w.rating} · {w.jobs} washes · {w.city}</p>
              </div>
              <button className={`washer-hire ${w.status !== "Available" ? "disabled" : ""}`}
                onClick={() => w.status === "Available" && setTab("book")}>
                {w.status === "Available" ? "Hire" : "Busy"}
              </button>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="app main-app">
        <div className="main-content">
          {tab === "home" && renderHome()}
          {tab === "services" && renderServices()}
          {tab === "book" && renderBook()}
          {tab === "sub" && renderSubscriptions()}
          {tab === "map" && renderMap()}
        </div>
        <nav className="bottom-nav">
          {[
            { id: "home", icon: "⬡", label: "Home" },
            { id: "services", icon: "◆", label: "Services" },
            { id: "map", icon: "◎", label: "Map" },
            { id: "book", icon: "◉", label: "Book" },
            { id: "sub", icon: "✦", label: "Plans" },
          ].map(n => (
            <button key={n.id} className={`nav-item ${tab === n.id ? "active" : ""}`} onClick={() => setTab(n.id)}>
              <span className="nav-icon">{n.icon}</span>
              <span className="nav-label">{n.label}</span>
            </button>
          ))}
        </nav>
      </div>
    );
  }

  return null;
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500;600&family=Jost:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #C9A84C;
    --gold-lt: #E2C97E;
    --gold-dk: #9A7A30;
    --dark: #0A0A0A;
    --deep: #111108;
    --surface: #141410;
    --card: #1A1A15;
    --card2: #1F1F19;
    --border: rgba(201,168,76,0.18);
    --text: #F0EAD6;
    --text-muted: rgba(240,234,214,0.5);
    --accent: #C9A84C;
    --radius: 16px;
  }

  html, body, #root { height: 100%; background: var(--dark); }

  .app {
    width: 100%;
    max-width: 420px;
    min-height: 100vh;
    margin: 0 auto;
    background: var(--deep);
    position: relative;
    overflow: hidden;
    font-family: 'Jost', sans-serif;
    color: var(--text);
  }

  /* PARTICLES */
  .particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
  .particle {
    position: absolute;
    width: 2px; height: 2px;
    border-radius: 50%;
    background: var(--gold);
    opacity: 0;
    animation: floatP 8s infinite;
  }
  ${[...Array(18)].map((_, i) => `.particle-${i} { left: ${Math.random()*100}%; top: ${Math.random()*100}%; animation-delay: ${Math.random()*8}s; animation-duration: ${6+Math.random()*6}s; }`).join("\n")}
  @keyframes floatP {
    0% { opacity: 0; transform: translateY(0) scale(1); }
    20% { opacity: 0.4; }
    80% { opacity: 0.2; }
    100% { opacity: 0; transform: translateY(-80px) scale(0.5); }
  }

  /* SPLASH */
  .splash {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: radial-gradient(ellipse at 50% 30%, #1A1608 0%, #0A0A08 60%, #060604 100%);
    min-height: 100vh;
  }
  .splash-content { text-align: center; z-index: 1; opacity: 0; transform: translateY(20px); transition: all 1s ease; }
  .splash-content.fade-in { opacity: 1; transform: translateY(0); }
  .crest { position: relative; width: 80px; height: 80px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; }
  .crest-ring {
    position: absolute; border-radius: 50%; border: 1px solid var(--gold);
    animation: rotateCrest 8s linear infinite;
  }
  .crest-ring.outer { width: 80px; height: 80px; opacity: 0.4; }
  .crest-ring.inner { width: 56px; height: 56px; opacity: 0.7; animation-direction: reverse; animation-duration: 5s; }
  .crest-icon { font-size: 28px; color: var(--gold); z-index: 1; }
  @keyframes rotateCrest { to { transform: rotate(360deg); } }

  .brand { font-family: 'Cinzel', serif; font-size: 32px; font-weight: 600; letter-spacing: 8px; color: var(--gold); }
  .brand-sub { font-family: 'Cormorant Garamond', serif; font-size: 14px; color: var(--text-muted); letter-spacing: 3px; margin-top: 4px; font-style: italic; }
  .brand-tagline { font-family: 'Cormorant Garamond', serif; font-size: 16px; color: var(--text-muted); font-style: italic; margin-top: 8px; }
  .splash-cities { display: flex; gap: 8px; justify-content: center; margin-top: 20px; }
  .city-badge {
    font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 2px; color: var(--gold);
    border: 1px solid var(--border); padding: 4px 10px; border-radius: 20px;
    background: rgba(201,168,76,0.05);
  }
  .splash-bar {
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    animation: shimmer 2s ease-in-out infinite;
  }
  @keyframes shimmer { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }

  /* ONBOARD */
  .onboard {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    min-height: 100vh;
    background: radial-gradient(ellipse at 50% 20%, #1A1608 0%, #0A0A08 70%);
    padding: 40px 24px;
  }
  .onboard-content { z-index: 1; text-align: center; width: 100%; opacity: 0; transform: translateY(30px); transition: all 0.8s ease; }
  .onboard-content.slide-up { opacity: 1; transform: translateY(0); }
  .onboard-logo { font-size: 48px; color: var(--gold); margin-bottom: 24px; animation: pulseLogo 3s ease-in-out infinite; }
  @keyframes pulseLogo { 0%,100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
  .onboard-title { font-family: 'Cinzel', serif; font-size: 28px; font-weight: 500; color: var(--text); line-height: 1.3; margin-bottom: 16px; }
  .onboard-desc { font-size: 14px; color: var(--text-muted); line-height: 1.7; margin-bottom: 20px; }
  .onboard-q { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--gold-lt); margin: 20px 0 16px; font-style: italic; }
  .role-cards { display: flex; gap: 16px; margin-bottom: 24px; }
  .role-card {
    flex: 1; background: var(--card); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 24px 16px;
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    cursor: pointer; transition: all 0.3s ease; color: var(--text);
  }
  .role-card:hover { border-color: var(--gold); background: rgba(201,168,76,0.08); transform: translateY(-2px); }
  .role-icon { font-size: 28px; color: var(--gold); }
  .role-label { font-family: 'Cinzel', serif; font-size: 14px; font-weight: 600; }
  .role-desc { font-size: 11px; color: var(--text-muted); }

  /* AUTH */
  .auth-screen {
    min-height: 100vh; padding: 0;
    background: radial-gradient(ellipse at 50% 0%, #1A1608 0%, #0A0A08 60%);
    overflow-y: auto;
  }
  .auth-content { z-index: 1; padding: 24px 24px 40px; opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
  .auth-content.slide-up { opacity: 1; transform: translateY(0); }
  .back-btn { background: none; border: none; color: var(--gold); font-family: 'Jost', sans-serif; font-size: 14px; cursor: pointer; padding: 0; margin-bottom: 20px; }
  .auth-header { text-align: center; margin-bottom: 20px; }
  .auth-logo { font-size: 36px; color: var(--gold); display: block; margin-bottom: 12px; }
  .auth-title { font-family: 'Cinzel', serif; font-size: 24px; color: var(--gold); letter-spacing: 4px; }
  .auth-role { font-family: 'Cormorant Garamond', serif; font-size: 14px; color: var(--text-muted); font-style: italic; margin-top: 4px; }
  .auth-tabs { display: flex; gap: 0; background: var(--card); border-radius: 12px; padding: 4px; margin-bottom: 24px; }
  .auth-tab { flex: 1; padding: 10px; background: none; border: none; color: var(--text-muted); font-family: 'Jost', sans-serif; font-size: 14px; cursor: pointer; border-radius: 10px; transition: all 0.3s; }
  .auth-tab.active { background: var(--gold); color: var(--dark); font-weight: 500; }
  .auth-form { display: flex; flex-direction: column; gap: 16px; }
  .input-group { display: flex; flex-direction: column; gap: 6px; }
  .input-group label { font-size: 11px; letter-spacing: 1.5px; color: var(--gold); font-family: 'Cinzel', serif; }
  .input-group input, .input-group select {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 10px; padding: 12px 16px; color: var(--text);
    font-family: 'Jost', sans-serif; font-size: 14px; outline: none;
    transition: border-color 0.3s;
  }
  .input-group input::placeholder { color: var(--text-muted); }
  .input-group input:focus, .input-group select:focus { border-color: var(--gold); }
  .input-group select option { background: var(--card); }
  .auth-alt { text-align: center; font-size: 13px; color: var(--text-muted); }
  .auth-alt span { color: var(--gold); cursor: pointer; }

  /* BUTTONS */
  .primary-btn {
    width: 100%; padding: 16px; background: linear-gradient(135deg, var(--gold), var(--gold-dk));
    border: none; border-radius: 12px; color: var(--dark);
    font-family: 'Cinzel', serif; font-size: 14px; font-weight: 600; letter-spacing: 2px;
    cursor: pointer; transition: all 0.3s ease; position: relative; overflow: hidden;
  }
  .primary-btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .primary-btn:hover::after { opacity: 1; }
  .primary-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201,168,76,0.3); }
  .ghost-btn {
    width: 100%; padding: 14px; background: transparent;
    border: 1px solid var(--border); border-radius: 12px; color: var(--text-muted);
    font-family: 'Jost', sans-serif; font-size: 14px; cursor: pointer; transition: all 0.3s;
  }
  .ghost-btn:hover { border-color: var(--gold); color: var(--gold); }

  /* MAIN APP */
  .main-app { display: flex; flex-direction: column; height: 100vh; }
  .main-content { flex: 1; overflow-y: auto; padding-bottom: 80px; }
  .main-content::-webkit-scrollbar { display: none; }

  /* HOME */
  .home-hero {
    background: linear-gradient(160deg, #1A1608 0%, #0E0D09 100%);
    padding: 40px 20px 28px; position: relative; overflow: hidden;
  }
  .home-hero::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .hero-inner { position: relative; z-index: 1; }
  .hero-greeting { font-size: 13px; color: var(--text-muted); font-style: italic; font-family: 'Cormorant Garamond', serif; }
  .hero-name { font-family: 'Cinzel', serif; font-size: 22px; color: var(--text); margin-bottom: 16px; }
  .city-selector { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
  .city-pill {
    padding: 6px 16px; border-radius: 20px; border: 1px solid var(--border);
    background: transparent; color: var(--text-muted); font-size: 12px; cursor: pointer;
    font-family: 'Jost', sans-serif; transition: all 0.3s;
  }
  .city-pill.active { border-color: var(--gold); color: var(--gold); background: rgba(201,168,76,0.1); }
  .hero-cta {
    display: flex; align-items: center; gap: 16px;
    background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 16px 20px; cursor: pointer; transition: all 0.3s;
  }
  .hero-cta:hover { border-color: var(--gold); background: rgba(201,168,76,0.06); }
  .cta-icon { font-size: 24px; color: var(--gold); }
  .cta-title { font-family: 'Cinzel', serif; font-size: 14px; }
  .cta-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .cta-arrow { margin-left: auto; color: var(--gold); font-size: 18px; }

  .stats-strip {
    display: flex; align-items: center; justify-content: center;
    padding: 16px 20px; gap: 0;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
  }
  .stat { flex: 1; text-align: center; }
  .stat-n { display: block; font-family: 'Cinzel', serif; font-size: 18px; color: var(--gold); }
  .stat-l { display: block; font-size: 10px; color: var(--text-muted); margin-top: 2px; letter-spacing: 1px; }
  .stat-div { width: 1px; height: 30px; background: var(--border); }

  .section { padding: 20px 20px 0; }
  .section-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .section-head h3 { font-family: 'Cinzel', serif; font-size: 16px; color: var(--gold-lt); }
  .see-all { background: none; border: none; color: var(--gold); font-size: 12px; cursor: pointer; font-family: 'Jost', sans-serif; }
  .services-scroll { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px; }
  .services-scroll::-webkit-scrollbar { display: none; }
  .service-mini {
    min-width: 120px; background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; padding: 16px 12px; cursor: pointer; transition: all 0.3s; flex-shrink: 0;
  }
  .service-mini:hover { border-color: var(--gold); }
  .service-mini-icon { font-size: 22px; color: var(--gold); display: block; margin-bottom: 8px; }
  .service-mini-name { font-size: 12px; font-family: 'Cinzel', serif; margin-bottom: 4px; }
  .service-mini-price { font-size: 11px; color: var(--gold); }

  .washer-card {
    display: flex; align-items: center; gap: 14px;
    background: var(--card); border: 1px solid var(--border); border-radius: 14px;
    padding: 14px 16px; margin-bottom: 10px; transition: all 0.3s;
  }
  .washer-card:hover { border-color: var(--gold-dk); }
  .washer-avatar {
    width: 44px; height: 44px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--gold-dk));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cinzel', serif; font-size: 13px; color: var(--dark); font-weight: 600; flex-shrink: 0;
  }
  .washer-name { font-size: 14px; font-weight: 500; margin-bottom: 3px; }
  .washer-meta { font-size: 11px; color: var(--text-muted); }
  .washer-status {
    margin-left: auto; padding: 4px 10px; border-radius: 20px; font-size: 11px; flex-shrink: 0;
  }
  .washer-status.avail { background: rgba(34,197,94,0.15); color: #4ade80; border: 1px solid rgba(74,222,128,0.3); }
  .washer-status.busy { background: rgba(239,68,68,0.1); color: #f87171; border: 1px solid rgba(248,113,113,0.3); }
  .washer-hire {
    margin-left: auto; padding: 8px 16px; background: linear-gradient(135deg, var(--gold), var(--gold-dk));
    border: none; border-radius: 8px; color: var(--dark); font-family: 'Cinzel', serif; font-size: 11px;
    cursor: pointer; flex-shrink: 0; transition: all 0.3s;
  }
  .washer-hire.disabled { background: var(--card2); color: var(--text-muted); cursor: default; }

  /* SERVICES GRID */
  .page-header { padding: 32px 20px 16px; background: var(--surface); border-bottom: 1px solid var(--border); }
  .page-header h2 { font-family: 'Cinzel', serif; font-size: 24px; color: var(--gold); }
  .page-header p { font-size: 13px; color: var(--text-muted); margin-top: 4px; font-family: 'Cormorant Garamond', serif; font-style: italic; }
  .services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 16px 20px; }
  .service-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 16px;
    padding: 18px 14px; cursor: pointer; transition: all 0.3s; position: relative;
  }
  .service-card.selected { border-color: var(--gold); background: rgba(201,168,76,0.07); }
  .service-card:hover { transform: translateY(-2px); border-color: var(--gold-dk); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
  .service-card-icon { font-size: 26px; color: var(--gold); display: block; margin-bottom: 10px; }
  .service-card h4 { font-family: 'Cinzel', serif; font-size: 12px; margin-bottom: 6px; }
  .service-card-desc { font-size: 11px; color: var(--text-muted); line-height: 1.5; margin-bottom: 10px; }
  .service-card-footer { display: flex; align-items: center; justify-content: space-between; }
  .service-price { color: var(--gold); font-size: 13px; font-weight: 500; }
  .service-dur { font-size: 10px; color: var(--text-muted); }

  /* BOOKING */
  .steps { display: flex; align-items: center; justify-content: center; padding: 20px 20px 4px; gap: 0; }
  .step-item { display: flex; align-items: center; gap: 6px; }
  .step-dot {
    width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; color: var(--text-muted); transition: all 0.4s; flex-shrink: 0;
  }
  .step-dot.done { border-color: var(--gold); background: var(--gold); color: var(--dark); }
  .step-label { font-size: 11px; color: var(--text-muted); }
  .step-label.active { color: var(--gold); }
  .step-line { flex: 1; height: 1px; background: var(--border); width: 30px; margin: 0 4px; transition: background 0.4s; }
  .step-line.done { background: var(--gold); }
  .step-panel { padding: 16px 20px; }
  .step-title { font-family: 'Cinzel', serif; font-size: 16px; color: var(--gold-lt); margin-bottom: 16px; }

  .map-preview {
    background: var(--card); border: 1px solid var(--border); border-radius: 20px;
    height: 200px; position: relative; overflow: hidden; display: flex;
    align-items: center; justify-content: center;
  }
  .map-pulse { position: relative; display: flex; align-items: center; justify-content: center; }
  .map-grid {
    position: absolute; inset: -60px; display: grid; grid-template-columns: repeat(4, 1fr);
    opacity: 0.07;
  }
  .map-cell { border: 1px solid var(--gold); }
  .map-pin { font-size: 32px; color: var(--gold); z-index: 2; animation: pinBounce 2s ease-in-out infinite; }
  @keyframes pinBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  .map-ring {
    position: absolute; border-radius: 50%; border: 1.5px solid var(--gold); opacity: 0.3;
    animation: ringExpand 2s ease-out infinite;
  }
  .map-ring.r1 { width: 60px; height: 60px; animation-delay: 0s; }
  .map-ring.r2 { width: 100px; height: 100px; animation-delay: 0.5s; }
  @keyframes ringExpand { 0% { transform: scale(0.5); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }
  .map-pulse.pulsing .map-ring { animation-play-state: running; }
  .map-locate {
    position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%);
    background: var(--gold); border: none; border-radius: 20px; padding: 8px 20px;
    color: var(--dark); font-family: 'Jost', sans-serif; font-size: 12px; cursor: pointer;
    white-space: nowrap; z-index: 3;
  }

  .btn-row { display: flex; gap: 12px; margin-top: 16px; }
  .btn-row .ghost-btn, .btn-row .primary-btn { flex: 1; }

  .confirm-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; margin-bottom: 16px; }
  .confirm-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
  .confirm-row span { color: var(--text-muted); }
  .confirm-row.total { padding-top: 12px; }
  .gold { color: var(--gold) !important; font-family: 'Cinzel', serif; font-size: 18px; }

  .success-panel { text-align: center; padding: 40px 20px; }
  .success-icon { font-size: 64px; color: var(--gold); margin-bottom: 20px; animation: spinSuccess 1s ease-out; }
  @keyframes spinSuccess { from { transform: scale(0) rotate(-180deg); opacity: 0; } to { transform: scale(1) rotate(0deg); opacity: 1; } }
  .success-title { font-family: 'Cinzel', serif; font-size: 22px; color: var(--gold); margin-bottom: 12px; }
  .success-msg { color: var(--text-muted); font-size: 14px; margin-bottom: 24px; line-height: 1.6; }
  .tracking-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; margin-bottom: 24px; }
  .track-label { font-size: 11px; letter-spacing: 2px; color: var(--text-muted); margin-bottom: 12px; font-family: 'Cinzel', serif; }
  .track-dots { display: flex; gap: 8px; justify-content: center; margin-bottom: 12px; }
  .td { width: 12px; height: 12px; border-radius: 50%; background: var(--border); }
  .td.active { background: var(--gold); animation: tdPulse 1.5s ease-in-out infinite; }
  @keyframes tdPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  .track-step { font-size: 13px; color: var(--text-muted); font-style: italic; font-family: 'Cormorant Garamond', serif; }

  /* SUBSCRIPTIONS */
  .sub-cards { display: flex; flex-direction: column; gap: 16px; padding: 16px 20px; }
  .sub-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 20px;
    padding: 24px; position: relative; cursor: pointer; transition: all 0.3s overflow: hidden;
  }
  .sub-card.selected { border-color: var(--gold); background: rgba(201,168,76,0.06); }
  .sub-card.elite { background: linear-gradient(135deg, #1A1608, #120F06); border-color: var(--gold-dk); }
  .sub-card.elite.selected { border-color: var(--gold); }
  .sub-badge {
    position: absolute; top: 16px; right: 16px; font-family: 'Cinzel', serif; font-size: 9px;
    letter-spacing: 2px; color: var(--dark); background: var(--gold); padding: 4px 10px; border-radius: 20px;
  }
  .sub-label { font-family: 'Cinzel', serif; font-size: 20px; color: var(--text); margin-bottom: 6px; }
  .sub-washes { font-size: 13px; color: var(--text-muted); margin-bottom: 14px; }
  .sub-price { display: flex; align-items: baseline; gap: 4px; margin-bottom: 6px; }
  .sub-amount { font-family: 'Cormorant Garamond', serif; font-size: 32px; color: var(--gold); }
  .sub-period { font-size: 13px; color: var(--text-muted); }
  .sub-saving { font-size: 11px; color: #4ade80; letter-spacing: 1px; display: block; margin-bottom: 16px; }
  .sub-features { list-style: none; display: flex; flex-direction: column; gap: 6px; }
  .sub-features li { font-size: 12px; color: var(--text-muted); font-family: 'Cormorant Garamond', serif; font-size: 14px; }

  /* MAP */
  .live-map {
    margin: 0 20px; height: 260px; background: var(--card); border: 1px solid var(--border);
    border-radius: 20px; position: relative; overflow: hidden;
  }
  .lm-grid { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(5, 1fr); opacity: 0.05; }
  .lm-cell { border: 1px solid var(--gold); }
  .lm-user {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    display: flex; align-items: center; justify-content: center;
  }
  .lm-user-dot { width: 14px; height: 14px; border-radius: 50%; background: #60a5fa; z-index: 2; }
  .lm-user-ring {
    position: absolute; border-radius: 50%; border: 2px solid rgba(96,165,250,0.4);
    animation: lmRing 2s ease-out infinite;
  }
  .lm-user-ring { width: 40px; height: 40px; }
  .lm-user-ring.r2 { width: 70px; height: 70px; animation-delay: 0.5s; }
  @keyframes lmRing { 0% { transform: scale(0.5); opacity: 0.8; } 100% { transform: scale(1.5); opacity: 0; } }
  .lm-user-label { position: absolute; top: -20px; font-size: 10px; color: #60a5fa; white-space: nowrap; }
  .lm-washer {
    position: absolute; transform: translate(-50%, -50%);
    display: flex; flex-direction: column; align-items: center; cursor: pointer;
    animation: washerFloat 3s ease-in-out infinite;
  }
  @keyframes washerFloat { 0%,100% { transform: translate(-50%, -50%); } 50% { transform: translate(-50%, calc(-50% - 4px)); } }
  .lm-w-icon { font-size: 20px; color: var(--gold); }
  .lm-w-label { font-size: 9px; color: var(--gold); background: rgba(10,10,8,0.8); padding: 2px 6px; border-radius: 8px; white-space: nowrap; margin-top: 2px; }
  .lm-washer.lm-w-busy .lm-w-icon { color: #f87171; }
  .lm-washer.lm-w-busy .lm-w-label { color: #f87171; }
  .lm-overlay {
    position: absolute; bottom: 12px; left: 12px; right: 12px;
    background: rgba(10,10,8,0.85); border: 1px solid var(--border); border-radius: 12px;
    padding: 10px 16px; display: flex; justify-content: space-between; align-items: center;
  }
  .lm-city { font-family: 'Cinzel', serif; font-size: 14px; color: var(--gold); }
  .lm-count { font-size: 11px; color: var(--text-muted); }

  /* NAV */
  .bottom-nav {
    position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 100%; max-width: 420px;
    display: flex; background: rgba(14,13,9,0.95);
    border-top: 1px solid var(--border); padding: 8px 0 12px;
    backdrop-filter: blur(20px); z-index: 100;
  }
  .nav-item {
    flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
    background: none; border: none; cursor: pointer; padding: 6px 0; transition: all 0.3s;
    color: var(--text-muted);
  }
  .nav-item.active { color: var(--gold); }
  .nav-icon { font-size: 18px; transition: transform 0.3s; }
  .nav-item.active .nav-icon { transform: scale(1.2); }
  .nav-label { font-size: 9px; letter-spacing: 1px; font-family: 'Cinzel', serif; }

  .tab-content { animation: fadeIn 0.4s ease; }
  .fade-in { animation: fadeIn 0.4s ease forwards; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .slide-up { animation: slideUp 0.6s ease forwards; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
`;

// Inject styles
if (typeof document !== "undefined") {
  const existing = document.getElementById("aqua-elite-styles");
  if (!existing) {
    const styleEl = document.createElement("style");
    styleEl.id = "aqua-elite-styles";
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }
}
