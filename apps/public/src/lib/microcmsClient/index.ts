import { createClient } from "microcms-js-sdk";

const microcmsClient = createClient({
  apiKey: process.env.API_KEY || "",
  serviceDomain: process.env.SERVICE_DOMAIN || "",
});

export default microcmsClient;
