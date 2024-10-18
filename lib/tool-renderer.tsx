import { JSONValue } from "ai";

export type ToolComponent<
  ARGS extends Record<string, JSONValue>,
  RESULT extends JSONValue
> = {
  call?: ({
    args,
    isPartial,
  }: {
    args: ARGS;
    isPartial: boolean;
  }) => JSX.Element;
  result?: ({ args, result }: { args: ARGS; result: RESULT }) => JSX.Element;
};
