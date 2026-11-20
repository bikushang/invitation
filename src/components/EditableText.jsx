import { useEffect, useRef, useState } from 'react';

/**
 * A contenteditable span whose text is controlled by `value`.
 * - Calls onChange(value) on input.
 * - Stops Enter from creating a newline (single-line fields).
 * - Does not re-render the DOM while focused (prevents caret jumps).
 */
export default function EditableText({
  value,
  onChange,
  multiline = false,
  className = '',
  style,
  as: Tag = 'span',
}) {
  const ref = useRef(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused && ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value, focused]);

  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleInput(e) {
    onChange(e.currentTarget.innerText);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      e.currentTarget.blur();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text');
    document.execCommand('insertText', false, text);
  }

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`editable-text ${className}`}
      style={style}
    />
  );
}
