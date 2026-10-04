export interface FieldLike {
  value: string;
  style: { position: string; opacity: string };
  setAttribute(name: string, value: string): void;
  select(): void;
  setSelectionRange(start: number, end: number): void;
}

export interface FallbackDoc {
  activeElement: { focus(options?: { preventScroll?: boolean }): void } | null;
  body: { appendChild(node: FieldLike): unknown; removeChild(node: FieldLike): unknown };
  createElement(tag: 'textarea'): FieldLike;
  execCommand(command: string): boolean;
}

/**
 * Last-resort copy for browsers without (or refusing) the async clipboard API.
 * Selecting the temporary field steals focus, so focus is always put back, and
 * the field is always removed, even if the browser throws.
 */
export function copyViaSelection(text: string, doc: FallbackDoc): boolean {
  const previous = doc.activeElement;
  const field = doc.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  doc.body.appendChild(field);
  try {
    field.select();
    field.setSelectionRange(0, text.length);
    return doc.execCommand('copy');
  } finally {
    doc.body.removeChild(field);
    previous?.focus({ preventScroll: true });
  }
}
