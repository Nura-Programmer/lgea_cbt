"use client";

import { Button } from "../ui/button";

export default function PrintButton() {
  const handlePrint = () => {
    window.print(); // basic print for now
  };

  return (
    <Button variant="secondary" onClick={handlePrint}>
      Print
    </Button>
  );
}
