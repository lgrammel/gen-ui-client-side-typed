import { CoreToolCall, CoreToolResult, JSONValue } from "ai";

export type TypedToolInvocation<
  NAME extends string,
  ARGS extends Record<string, JSONValue>,
  RESULT extends JSONValue
> =
  | ({
      state: "partial-call";
    } & CoreToolCall<NAME, ARGS>)
  | ({
      state: "call";
    } & CoreToolCall<NAME, ARGS>)
  | ({
      state: "result";
    } & CoreToolResult<NAME, ARGS, RESULT>);
