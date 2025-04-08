import React from "react";
import { Button } from "../atoms/button";

const ThemeSwitcher = () => {
  return (
    <Button variant="ghost" className="h-10 w-10 p-0" aria-label="Toggle theme">
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeSwitcher;
