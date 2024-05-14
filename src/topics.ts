export type Topic<Data, Params> = ((params: Params) => Promise<Data>) & {
  subscribe: (consumer: (d: Data) => void, params: Params, options?: CallOptions) => Promise<void>
  unsubscribe: (consumer: (d: Data) => void, params: Params, options?: CallOptions) => Promise<void>
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
