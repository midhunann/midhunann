export interface CopyDeps {
  clipboard?: { writeText(text: string): Promise<void> } | null;
  fallback?: (text: string) => boolean;
}

/** Resolves true only if the text really was copied. Never throws. */
export async function copyText(text: string, deps: CopyDeps): Promise<boolean> {
  try {
    if (deps.clipboard) {
      await deps.clipboard.writeText(text);
      return true;
    }
  } catch {
    // permission denied or insecure context: try the fallback
  }
  try {
    return deps.fallback ? deps.fallback(text) : false;
  } catch {
    return false;
  }
}
