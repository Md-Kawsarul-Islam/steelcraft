"use client";

import { useState } from "react";

export default function QuoteForm({
  defaultProduct,
}: {
  defaultProduct: string;
}) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (busy) return;
    if (honeypot) return;

    setBusy(true);
    setStatus("Sending...");

    try {
      const form = e.currentTarget;

      const data = Object.fromEntries(new FormData(form));

      // Send quotation to existing backend
      const r = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const j = await r.json();

      if (!r.ok) {
        setStatus(j.message || "Unable to send quotation.");
        return;
      }

      /*
       * WhatsApp message
       */
      const whatsappMessage = `
New Quote Request — Kawsar

Name: ${data.name || ""}
Company: ${data.company || ""}
Phone: ${data.phone || ""}
Email: ${data.email || ""}
Project / Product: ${data.product || ""}

Requirement:
${data.message || ""}
      `.trim();

      const whatsappUrl =
        `https://wa.me/966530950767?text=${encodeURIComponent(
          whatsappMessage
        )}`;

      // Reset form
      form.reset();

      setStatus("Quote submitted. Opening WhatsApp...");

      // Open WhatsApp
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch {
      setStatus(
        "Unable to send right now. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="card"
      style={{
        padding: 28,
        display: "grid",
        gap: 14,
      }}
      aria-label="Request a quotation"
    >
      {/* Honeypot */}
      <div
        className="honeypot"
        aria-hidden="true"
      >
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) =>
              setHoneypot(e.target.value)
            }
          />
        </label>
      </div>

      <input
        name="name"
        required
        maxLength={120}
        placeholder="Name"
        autoComplete="name"
        style={i}
      />

      <input
        name="company"
        maxLength={180}
        placeholder="Company"
        autoComplete="organization"
        style={i}
      />

      <input
        name="phone"
        required
        maxLength={40}
        placeholder="Phone"
        autoComplete="tel"
        style={i}
      />

      <input
        name="email"
        type="email"
        maxLength={254}
        placeholder="Email"
        autoComplete="email"
        style={i}
      />

      <input
        name="product"
        defaultValue={defaultProduct}
        maxLength={180}
        placeholder="Project / Product"
        style={i}
      />

      <textarea
        name="message"
        required
        maxLength={5000}
        placeholder="Requirement"
        rows={6}
        style={i}
      />

      <button
        className="btn btn-primary"
        type="submit"
        disabled={busy}
      >
        {busy ? "Sending…" : "Submit Quote"}
      </button>

      {status && (
        <p
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
      )}
    </form>
  );
}

const i = {
  width: "100%",
  padding: 13,
  border: "1px solid #d1d5db",
  borderRadius: 7,
  background: "#fff",
} as React.CSSProperties;