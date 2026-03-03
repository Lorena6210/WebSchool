"use client";

import { useState, useEffect } from "react";
import { Toaster } from "../components/ui/sonner";

export default function ClientOnlyToaster() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <Toaster position="top-right" richColors />;
}