/** Shared directory marketing styles (server-safe — do not import from `use client` modules). */

const directoryBtnPrimary =
  "rounded-2xl bg-[#cf0f47] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#a30c39]";
const directoryBtnOutline =
  "rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-[#fff5f5]";

export function directoryPageButtonClasses() {
  return { primary: directoryBtnPrimary, outline: directoryBtnOutline };
}
