import { createStytchUIClient } from "@stytch/nextjs/dist/index.ui";

const stytch = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || "",
);

export default stytch;
