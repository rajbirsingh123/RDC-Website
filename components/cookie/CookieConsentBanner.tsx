"use client";

import { useEffect, useState } from "react";
import { readLocalStorage, writeLocalStorage } from "@/hooks/useLocalStorage";

const STORAGE_KEY = "rdcCookieConsent";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [personalization, setPersonalization] = useState(true);

  useEffect(() => {
    setVisible(!readLocalStorage(STORAGE_KEY));
  }, []);

  const saveChoice = (choice: { analytics: boolean; personalization: boolean }) => {
    writeLocalStorage(
      STORAGE_KEY,
      JSON.stringify({ ...choice, necessary: true, savedAt: new Date().toISOString() })
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section className="cookie-banner" aria-label="Cookie notice">
      <div className="cookie-copy">
        <strong>Cookie Preferences</strong>
        <p>
          To ensure you have the best possible experience, we use cookies and similar technologies on our site. Some
          are necessary for helping our site run smoothly and securely, while optional cookies help us improve and
          customize your experience.
        </p>
      </div>
      <div className="cookie-actions">
        <button className="btn btn-outline-primary" type="button" onClick={() => setShowSettings((v) => !v)}>
          {showSettings ? "Hide Settings" : "Manage Cookie Settings"}
        </button>
        <button className="btn btn-gold" type="button" onClick={() => saveChoice({ analytics: true, personalization: true })}>
          Accept All Cookies
        </button>
      </div>
      {showSettings && (
        <form className="cookie-settings" onSubmit={(event) => event.preventDefault()}>
          <label>
            <input type="checkbox" checked disabled />
            <span>Necessary cookies</span>
          </label>
          <label>
            <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
            <span>Analytics cookies</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={personalization}
              onChange={(event) => setPersonalization(event.target.checked)}
            />
            <span>Personalization cookies</span>
          </label>
          <div className="cookie-actions">
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={() => saveChoice({ analytics, personalization })}
            >
              Save Settings
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
