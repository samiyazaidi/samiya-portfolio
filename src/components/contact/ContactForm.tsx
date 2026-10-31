
import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  MessageSquareText,
  Send,
  UserRound,
} from "lucide-react";
import { useRobot } from "../robot/RobotController";

const fieldClass =
  "min-w-0 w-full rounded-lg border border-on-dark/25 bg-on-dark/[0.04] px-3 py-2.5 text-[11px] text-on-dark placeholder:text-on-dark-muted/80 transition focus:border-accent-soft focus:bg-on-dark/[0.07] focus:outline-2 focus:outline-offset-2 focus:outline-accent-soft";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [statusMessage, setStatusMessage] = useState("");
  const robot = useRobot();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "sending") return;

    const form = event.currentTarget;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setStatusMessage(
        "The contact form is temporarily unavailable. Please try again later."
      );
      return;
    }

    const formData = new FormData(form);

    const from_name = String(formData.get("from_name") || "").trim();
    const from_email = String(formData.get("from_email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!from_name || !from_email || !subject || message.length < 5) {
      setStatus("error");
      setStatusMessage("Please complete all fields correctly.");
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name,
          from_email,
          subject,
          message,
        },
        {
          publicKey: PUBLIC_KEY,
        }
      );

      form.reset();

      setStatus("success");
      setStatusMessage(
        "Thank you! Your message has been sent successfully."
      );

      robot({
        state: "celebrate",
        target: form,
        duration: 1400,
      });
    } catch (error) {
      console.error("EmailJS contact form error:", error);

      setStatus("error");
      setStatusMessage(
        "Your message couldn't be sent. Please try again shortly."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={(event) =>
        robot({
          state: "guide-contact",
          target: event.currentTarget,
        })
      }
      className="mt-4 space-y-2.5"
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <label className="relative block">
          <span className="sr-only">Your name</span>
          <UserRound
            aria-hidden
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted"
          />
          <input
            name="from_name"
            autoComplete="name"
            required
            maxLength={120}
            className={`${fieldClass} pl-8`}
            placeholder="Your name"
          />
        </label>

        <label className="relative block">
          <span className="sr-only">Your email</span>
          <Mail
            aria-hidden
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted"
          />
          <input
            name="from_email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            className={`${fieldClass} pl-8`}
            placeholder="Your email"
          />
        </label>
      </div>

      <label className="relative block">
        <span className="sr-only">Subject</span>
        <MessageSquareText
          aria-hidden
          size={14}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted"
        />
        <input
          name="subject"
          required
          maxLength={180}
          className={`${fieldClass} pl-8`}
          placeholder="Subject"
        />
      </label>

      <label className="block">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          required
          minLength={5}
          maxLength={5000}
          rows={3}
          className={`${fieldClass} resize-y`}
          placeholder="Tell me a little about your idea…"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3 pt-0.5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-10 items-center gap-3 rounded-full bg-accent px-4 py-2 text-[11px] font-semibold text-on-dark transition hover:bg-accent-strong disabled:cursor-wait disabled:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-dark"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <Send size={13} />
        </button>

        <p
          role="status"
          aria-live="polite"
          className={`text-[10px] leading-relaxed ${
            status === "error"
              ? "text-accent-soft"
              : "text-on-dark-muted"
          }`}
        >
          {statusMessage}
        </p>
      </div>
    </form>
  );
}
