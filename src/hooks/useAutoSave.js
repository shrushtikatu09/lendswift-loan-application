import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "lendswift_draft";
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

function encode(data) {
  return btoa(
    unescape(encodeURIComponent(JSON.stringify(data)))
  );
}

function decode(data) {
  return JSON.parse(
    decodeURIComponent(escape(atob(data)))
  );
}

export function getSavedDraft() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);

    const savedTime = new Date(parsed.timestamp).getTime();

    const hours =
      (Date.now() - savedTime) / (1000 * 60 * 60);

    if (hours > 72) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return {
      values: decode(parsed.data),
      step: parsed.step,
      timestamp: parsed.timestamp,
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function clearSavedDraft() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function useAutoSave(
  values,
  currentStep
) {
  const timerRef = useRef();
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            data: encode(values),
            step: currentStep,
            timestamp: new Date().toISOString(),
          })
        );

        setLastSaved(new Date());
      } catch (err) {
        console.error(err);
      }
    }, AUTO_SAVE_INTERVAL);

    return () => clearTimeout(timerRef.current);
  }, [values, currentStep]);

  return lastSaved;
}