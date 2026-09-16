"use client";

import { useState } from "react";
import { Sparkles, Gift, Star, Users, ChevronRight, Play } from "lucide-react";

export function HeroPhone() {
  const [interactive, setInteractive] = useState(false);

  return (
    <div className="hero-phone-wrap" aria-label="Nexcore patient app preview">
      <div className="phone-device compact">
        <div className="phone-screen" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
          <div className="phone-notch" />
          {interactive ? (
            <iframe
              src="https://cloud.protopie.io/p/c03b4bd475e6e3ad648e0040?ui=true&scaleToFit=true&enableHotspotHints=true&cursorType=touch&mockup=false&bgColor=%23F5F5F5&bgImage=undefined&playSpeed=1"
              style={{ width: "100%", height: "100%", border: "none", borderRadius: "38px", display: "block" }}
              title="Nexcore App Prototype"
              loading="eager"
            />
          ) : (
            <div className="hero-native-preview" style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fbfafc" }}>
              <div className="phone-status">
                <span>9:41</span>
                <div className="dynamic-island" />
                <span>● ◒</span>
              </div>
              <div className="app-header" style={{ padding: "6px 16px" }}>
                <div>
                  <small style={{ fontSize: "8px", color: "#99949e" }}>Welcome back</small>
                  <strong style={{ fontSize: "13px" }}>Nexcore Clinic</strong>
                </div>
                <div className="header-icon" style={{ width: "28px", height: "28px" }}>
                  <Sparkles size={14} color="var(--pink)" />
                </div>
              </div>
              <div className="app-content" style={{ padding: "8px 14px", flex: 1, overflow: "hidden" }}>
                <div className="app-balance-card" style={{ padding: "14px", borderRadius: "16px" }}>
                  <div><span>Your points</span><strong>1,280</strong></div>
                  <div className="balance-orbit"><Gift size={20} /></div>
                  <div className="progress-track" style={{ margin: "10px 0 6px" }}><span style={{ width: "72%" }} /></div>
                  <small>220 points to your next reward</small>
                </div>
                <div className="app-section-title" style={{ margin: "14px 2px 8px" }}>
                  <strong>Your rewards</strong><span>View all</span>
                </div>
                <div className="reward-ticket" style={{ padding: "10px", borderRadius: "14px" }}>
                  <div className="ticket-icon" style={{ width: "32px", height: "32px" }}><Sparkles size={16} /></div>
                  <div><strong>Hydrafacial reward</strong><span>Unlocked · 3 days left</span></div>
                  <ChevronRight size={14} />
                </div>
                <div className="earn-grid" style={{ marginTop: "10px" }}>
                  <div><Star size={15} /><span>Leave review</span><b>+20</b></div>
                  <div><Users size={15} /><span>Refer friend</span><b>+50</b></div>
                </div>
              </div>
              <div style={{ padding: "8px 12px 14px", display: "flex", justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={() => setInteractive(true)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(17, 17, 20, 0.92)",
                    color: "#fff",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "20px",
                    padding: "6px 14px",
                    fontSize: "10px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                    transition: "transform 0.2s, background 0.2s"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <Play size={10} fill="#fff" /> Live Prototype
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
