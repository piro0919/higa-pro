import { OAuthProviders, Products } from "@stytch/vanilla-js";

const stytchConfig = {
  emailMagicLinksOptions: {
    loginExpirationMinutes: 5,
    loginRedirectURL: process.env.NEXT_PUBLIC_REDIRECT_URL || "",
    signupExpirationMinutes: 5,
    signupRedirectURL: process.env.NEXT_PUBLIC_REDIRECT_URL || "",
  },
  oauthOptions: {
    loginRedirectURL: process.env.NEXT_PUBLIC_REDIRECT_URL || "",
    providers: [{ type: OAuthProviders.Google }],
    signupRedirectURL: process.env.NEXT_PUBLIC_REDIRECT_URL || "",
  },
  products: [Products.emailMagicLinks, Products.oauth],
};

export default stytchConfig;
