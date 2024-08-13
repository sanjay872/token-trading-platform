export interface V3FundsDeposited {
    inputToken: string;
    outputToken: string;
    inputAmount: bigint;
    outputAmount: bigint;
    destinationChainId: bigint;
    depositId: bigint;
    quoteTimestamp: bigint;
    fillDeadline: bigint;
    exclusivityDeadline: bigint;
    depositor: string;
    recipient: string;
    exclusiveRelayer: string;
    message: string;
  }