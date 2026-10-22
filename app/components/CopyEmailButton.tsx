"use client";

import { useState } from "react";

import { Icon } from "./Icon";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (insecure context); the mailto link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-fg transition hover:border-accent hover:text-accent-ink"
    >
      <Icon name={copied ? "check" : "copy"} className="size-3.5" />
      <span aria-live="polite">{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
}
