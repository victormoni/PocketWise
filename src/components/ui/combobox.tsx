"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IData {
  value: string;
  label: string;
}

interface ComboboxDemoProps {
  data: IData[];
  placeholder: string;
  setDefault: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function ComboboxDemo({ data, placeholder, setDefault, onChange, className }: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);
    onChange?.(selectedValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
        >
          {value
            ? data.find((item) => item.value === value)?.label
            : data.find((item) => item.value === setDefault)?.label }
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", className)}>
        <Command>
          <CommandInput
            placeholder={`Selecione ${placeholder}...`}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>{placeholder} não encontrado</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label.toLowerCase()}
                  onSelect={() => handleSelect(item.value)}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
