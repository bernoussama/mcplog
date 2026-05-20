# mcplog

Small JSON-lines logger for MCP servers.

## Install

```sh
npm install mcplog
```

## Usage

```ts
import { McpLogger } from "mcplog";
```

## Usage

```ts
import { McpLogger } from "mcp-log";

const logger = new McpLogger({ name: "my-mcp-server" });

logger.info("server started", { port: 3000 });
logger.error("request failed", { requestId: "abc123" });
```

Logs are written to `stderr` by default so MCP protocol messages on `stdout` stay untouched. Set `CLANKER_LOG_FILE` or pass `filePath` to write JSON lines to a file instead.

## API

```ts
new McpLogger({
  name: string,
  level?: "debug" | "info" | "warn" | "error",
  filePath?: string,
  stderr?: { write(chunk: string): unknown },
})
```

Methods: `debug`, `info`, `warn`, and `error`.

The package also exports the `LogLevel` and `LogSink` types.
