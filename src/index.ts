import { EventListener } from "./integrations/EventsListener";

console.log("Hello world!");

const providerUrl =
  "https://base-mainnet.g.alchemy.com/v2/_bU-s6Fd16C2--myYAT-tLGjX7UR7QuH";

  new EventListener(
    providerUrl,
    BigInt(8453),
    "0x09aea4b2242abC8bb4BB78D537A67a245A7bEC64"
  );