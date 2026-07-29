"use client";

import { useEffect, useId, useRef, useState } from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  value: string;
}

/**
 * A listbox rather than a native <select>. The native control's popup is drawn
 * by the browser — unstyleable, and on desktop it renders as a small detached
 * menu that does not belong to this design. This keeps full control of the
 * panel while staying keyboard operable and screen-reader legible.
 *
 * The chosen value rides along in a hidden input so FormData still picks it up.
 */
export function SelectField({
  label,
  name,
  onChange,
  options,
  placeholder,
  value,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const labelId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function choose(option: string) {
    onChange(option);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      if (open) {
        event.stopPropagation();
        setOpen(false);
        buttonRef.current?.focus();
      }
      return;
    }
    if (event.key === "Tab") {
      setOpen(false);
      return;
    }
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        setActive(Math.max(options.indexOf(value), 0));
        setOpen(true);
      }
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + options.length) % options.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(options.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(options[active]);
    }
  }

  return (
    <div className="field-select" ref={rootRef}>
      <span className="field-label" id={labelId}>
        {label}
      </span>
      <input name={name} type="hidden" value={value} />
      <button
        aria-controls={open ? listId : undefined}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={`${labelId} ${listId}-value`}
        className={open ? "select-button open" : "select-button"}
        onClick={() => {
          setActive(Math.max(options.indexOf(value), 0));
          setOpen((o) => !o);
        }}
        onKeyDown={handleKeyDown}
        ref={buttonRef}
        type="button"
      >
        <span className={value ? undefined : "placeholder"} id={`${listId}-value`}>
          {value || placeholder}
        </span>
        <i aria-hidden="true" />
      </button>
      {open && (
        <ul
          aria-labelledby={labelId}
          className="select-list"
          id={listId}
          role="listbox"
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li
              aria-selected={option === value}
              className={index === active ? "active" : undefined}
              key={option}
              onClick={() => choose(option)}
              onMouseEnter={() => setActive(index)}
              role="option"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
