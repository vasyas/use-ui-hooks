export type Topic<Data, Params> = {
  subscribe: (consumer: (d: Data) => void, params: Params, options?: CallOptions) => void
  unsubscribe: (consumer: (d: Data) => void, params: Params, options?: CallOptions) => void
}

/** Copied from PushRPC/Next */
export class CallOptions {
  constructor(options: {timeout: number}) {
    this.timeout = options.timeout
  }

  public readonly timeout
  public readonly kind = CallOptions.KIND // to distinguish from other parameters in remote call

  public static KIND = "CallOptions"
}
