export function getImagePath(path: string): string {
  const basePath = process.env.NODE_ENV === "production" ? "/my-portfolio" : "";
  return `${basePath}${path}`;
}
