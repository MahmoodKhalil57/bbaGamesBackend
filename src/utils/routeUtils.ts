import { FormattedCookiesType } from "./routeUtils.types";

export const parseCookies = (cookieHeader: string) => {
  const cookies = {};
  if (!cookieHeader) {
    return null;
  }
  const cookieArray = cookieHeader.split("; ");
  for (let cookie of cookieArray) {
    const [key, value] = cookie.split("=");
    cookies[key] = decodeURIComponent(value);
  }

  return cookies as FormattedCookiesType;
};

export const getUrlParts = (req: Request) => {
  const url = new URL(req.url);

  return url.pathname.split("/").filter((part) => part !== "");
};

export const UUIDRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
