"use client";

import { ToolInvocationsView } from "@/lib/tool-invocations-view";
import { useChat } from "ai/react";

export default function Page() {
  const { messages, input, setInput, handleSubmit } = useChat();

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <div>{message.role}</div>
          <div>{message.content}</div>

          <ToolInvocationsView
            toolInvocations={message.toolInvocations}
            components={{
              displayWeather: {
                call: () => <div>Calling weather tool</div>,
                result: ({ result: { weather, temperature } }) => (
                  <div>
                    <h2>Current Weather</h2>
                    <p>Condition: {weather}</p>
                    <p>Temperature: {temperature}°C</p>
                  </div>
                ),
              },
              getStockPrice: {
                call: () => <div>Calling stock tool</div>,
                result: ({ result: { symbol, price } }) => (
                  <div>
                    <h2>Stock Information</h2>
                    <p>Symbol: {symbol}</p>
                    <p>Price: ${price}</p>
                  </div>
                ),
              },
            }}
          />
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
