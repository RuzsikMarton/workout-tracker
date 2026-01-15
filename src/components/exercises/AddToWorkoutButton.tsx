"use client";

import { Button } from "../ui/button";

const AddToWorkoutButton = ({ text }: { text: string }) => {
  return (
    <Button
      variant="default"
      className="w-full text-sm font-medium text-primary-foreground"
    >
      {text}
    </Button>
  );
};

export default AddToWorkoutButton;
