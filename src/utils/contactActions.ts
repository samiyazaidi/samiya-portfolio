import type { MouseEvent } from "react";

export const CONTACT_EMAIL = "samiya20n@gmail.com";

export function getPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function confirmPhoneClick(
  event: MouseEvent<HTMLAnchorElement>,
  phone: string
) {
  const confirmed = window.confirm(
    `Would you like to open your phone app to call ${phone}?`
  );

  if (!confirmed) {
    event.preventDefault();
  }
}