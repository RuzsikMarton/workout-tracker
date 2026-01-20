"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className = "",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const filteredOptions = options.filter(
    (option) =>
      !selected.includes(option) &&
      option.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleSelect = (option: string) => {
    onChange([...selected, option]);
    setInputValue("");
  };

  const handleRemove = (option: string) => {
    onChange(selected.filter((item) => item !== option));
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px] bg-background">
        {selected.map((item) => (
          <Badge key={item} variant="secondary" className="gap-1">
            {item}
            <button
              type="button"
              onClick={() => handleRemove(item)}
              className="ml-1 hover:bg-muted rounded-full"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={selected.length === 0 ? placeholder : ""}
          className="flex-1 outline-none bg-transparent min-w-[120px]"
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-md max-h-60 overflow-auto">
          {filteredOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className="w-full text-left px-3 py-2 hover:bg-accent cursor-pointer text-sm"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
