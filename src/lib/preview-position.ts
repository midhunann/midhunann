export interface Point {
  x: number;
  y: number;
}
export interface Size {
  w: number;
  h: number;
}

/** Top-left position for a floating preview that must stay fully on screen. */
export function placePreview(
  cursor: Point,
  box: Size,
  viewport: Size,
  offset = 20,
  margin = 8,
): Point {
  let x = cursor.x + offset;
  let y = cursor.y + offset;
  if (x + box.w > viewport.w - margin) x = cursor.x - offset - box.w;
  if (y + box.h > viewport.h - margin) y = viewport.h - margin - box.h;
  return { x: Math.max(margin, x), y: Math.max(margin, y) };
}
