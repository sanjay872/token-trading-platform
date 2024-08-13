import { ethers, Log } from "ethers";
import { BlockchainReader } from "./BlockchainReader";
import AcrossABI from "../abi/across_spoke.json";
import { V3FundsDeposited } from "../types";

export class IntentProcessor {
  private blockchainReader: BlockchainReader;
  private contractAddress: string;
  private iface: ethers.Interface;

  constructor(blockchainReader: BlockchainReader, contractAddress: string) {
    this.iface = new ethers.Interface(AcrossABI.abi);
    this.blockchainReader = blockchainReader;
    this.contractAddress = contractAddress;
  }

  async processEvents(latestBlock: number): Promise<Array<any> | undefined> {
    try {
      const fromBlock = Math.max(0, latestBlock - 12);
      const processedEvents = await this.fetchAndProcessEvents(
        fromBlock,
        latestBlock
      );

      console.log(
        "[TransferEventsProcessor] finished",
        `fromBlock: ${fromBlock}`,
        `latestBlock: ${latestBlock}`,
        `ProcessedEvents: ${processedEvents?.length} \n`
      );

      console.log("Processed events", processedEvents);

      return processedEvents;
    } catch (err) {
      console.error("[processEvents] error fetching events", err);
    }
  }

  async fetchAndProcessEvents(
    fromBlock: number,
    latestBlock: number
  ): Promise<any[]> {
    const topic = this.iface.getEvent("V3FundsDeposited")?.topicHash;

    if (!topic) {
      throw new Error("Topic not found");
    }

    const events: Array<Log> = await this.blockchainReader.getEvents(
      fromBlock,
      latestBlock,
      [topic],
      [this.contractAddress]
    );

    return await this.extractDetails(events);
  }

  async listener(
    onIntentSubmissionProcessingCompletionHandler: (
      newIntents: V3FundsDeposited[]
    ) => void
  ): Promise<void> {
    const topic = this.iface.getEvent("V3FundsDeposited")?.topicHash;

    if (!topic) {
      throw new Error("Topic not found");
    }

    this.blockchainReader.provider.on(
      {
        topics: [topic],
        address: this.contractAddress,
      },
      async (event) => {
        if (event) {
          const submitted = await this.extractDetails([event]);
          onIntentSubmissionProcessingCompletionHandler(submitted);
        }
      }
    );
  }

  async extractDetails(events: ethers.Log[]): Promise<V3FundsDeposited[]> {
    const promises = events.map(async (log) => {
      try {
        const event = this.iface.parseLog({
          topics: log.topics as string[],
          data: log.data,
        });

        if (!event) {
          return null;
        }

        const {
          inputToken,
          outputToken,
          inputAmount,
          outputAmount,
          destinationChainId,
          depositId,
          quoteTimestamp,
          fillDeadline,
          exclusivityDeadline,
          depositor,
          recipient,
          exclusiveRelayer,
          message,
        } = event.args;

        return {
          inputToken: inputToken.toLowerCase(),
          outputToken: outputToken.toLowerCase(),
          inputAmount,
          outputAmount,
          destinationChainId,
          depositId,
          quoteTimestamp,
          fillDeadline,
          exclusivityDeadline,
          depositor,
          recipient,
          exclusiveRelayer,
          message,
        };
      } catch (err) {
        console.error("[extractDetails] error decoding", err);
        return null;
      }
    });

    return await Promise.all(promises).then((results) =>
      results.filter((result) => result != null)
    );
  }
}