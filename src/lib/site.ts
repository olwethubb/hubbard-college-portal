/** Site-wide constants shared across pages. */
export const SITE_NAME = "Hubbard College Modern Portal";
export const SITE_DESCRIPTION =
  "A high-performance, elegant digital hub for Hubbard College designed to elevate student engagement and streamline institutional communication.";
export const SITE_URL = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "");

/** Resolves a file in public/ against the deploy base path (e.g. "/" locally, "/repo/" on GitHub Pages). */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, "");

export const LOGO_SRC = asset("images/site/hca-logo.png");
export const LOGIN_URL = "https://app.hcaonline.org/1596638871/login";
export const ONLINE_TRAINING_URL = "https://app.hcaonline.org/";
export const FACEBOOK_URL = "https://www.facebook.com/HCA.Jhb";

export const CONTACT = {
  phone: "+27 (0) 11 234 5678",
  email: "info@hubbardcollegesa.org",
  location: "Johannesburg, South Africa",
};
