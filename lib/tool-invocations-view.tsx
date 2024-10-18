/** eslint-disable @typescript-eslint/no-explicit-any */
import { ToolInvocation } from "ai";
import { ToolComponent } from "./tool-renderer";

export function ToolInvocationsView<
  COMPONENTS extends Record<string, ToolComponent<any, any>>
>({
  toolInvocations,
  components,
}: {
  toolInvocations?: ToolInvocation[];
  components: COMPONENTS;
}): JSX.Element | null {
  if (!toolInvocations) {
    return null;
  }

  return (
    <div>
      {toolInvocations.map((toolInvocation) => {
        const component = components[toolInvocation.toolName];

        if (component == null) {
          throw new Error(
            `No component defined for tool: ${toolInvocation.toolName}`
          );
        }

        const renderCall = component.call ?? (() => <></>);
        const renderResult = component.result ?? (() => <></>);

        switch (toolInvocation.state) {
          case "partial-call":
            return renderCall({
              args: toolInvocation.args,
              isPartial: true,
            });
          case "call":
            return renderCall({
              args: toolInvocation.args,
              isPartial: false,
            });
          case "result":
            return renderResult({
              args: toolInvocation.args,
              result: toolInvocation.result,
            });
        }
      })}
    </div>
  );
}
