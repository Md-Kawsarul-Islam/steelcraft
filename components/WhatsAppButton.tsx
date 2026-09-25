"use client";

export default function WhatsAppButton() {
  const phoneNumber = "966530950767";

  const message = encodeURIComponent(
    "Hello, I would like to get a quote for your steel work."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-sales"
    >
      <svg
        className="whatsapp-icon"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M16.02 3.2a12.7 12.7 0 0 0-10.9 19.2L3.2 28.8l6.55-1.86a12.7 12.7 0 1 0 6.27-23.74Zm0 23.1a10.4 10.4 0 0 1-5.3-1.45l-.38-.23-3.89 1.1 1.04-3.78-.25-.39a10.4 10.4 0 1 1 8.78 4.75Zm5.72-7.8c-.31-.16-1.84-.91-2.12-1.02-.28-.1-.49-.16-.7.16-.21.31-.8 1.02-.98 1.23-.18.21-.36.24-.67.08-.31-.16-1.31-.48-2.5-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.68-.96-2.3-.25-.6-.5-.52-.7-.53h-.6c-.21 0-.55.08-.83.39-.28.31-1.09 1.07-1.09 2.6 0 1.54 1.12 3.02 1.27 3.23.16.21 2.2 3.36 5.34 4.71.75.32 1.34.51 1.8.65.76.24 1.45.21 2 .13.61-.09 1.84-.75 2.1-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.21-.59-.37Z"
        />
      </svg>

      <span>WhatsApp</span>
    </a>
  );
}