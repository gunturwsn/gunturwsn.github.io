export function getImagePath(path: string): string {
  const basePath = process.env.NODE_ENV === "production" ? "/gunturwsn.github.io" : "";
  return `${basePath}${path}`;
}
