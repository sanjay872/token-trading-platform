import { BlockchainReader } from "./BlockchainReader";
import { IntentProcessor } from "./IntentProcessor";

export class EventListener {
  private blockchainReader: BlockchainReader;
  private chainId: bigint;
  private processor: IntentProcessor;

  constructor(providerUrl: string, chainId: bigint, contractAddress: string) {
    this.blockchainReader = new BlockchainReader(providerUrl);
    this.chainId = chainId;
    this.processor = new IntentProcessor(
      this.blockchainReader,
      contractAddress
    );

    this.listenToEvents();
  }

  async listenToEvents(): Promise<void> {
    console.log(`Starting to listen for blocks for ${this.chainId} chain`);
    this.blockchainReader.listenToBlockHeaders(async (blockNumber: number) => {
      this.processor.processEvents(blockNumber);
      console.log(`Received block with number: ${blockNumber}`);
    });
  }
}