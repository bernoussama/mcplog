# mcplog

[![lang: Typescript](https://img.shields.io/badge/Language-Typescript-Blue.svg?style=flat-square)](https://www.typescriptlang.org)
![License: MIT](https://img.shields.io/npm/l/tslog?logo=tslog&style=flat-square)
[![npm version](https://img.shields.io/npm/v/mcplog?color=76c800&logoColor=76c800&style=flat-square)](https://www.npmjs.com/package/mcplog)
![CI: GitHub](https://github.com/bernoussama/mcplog/actions/workflows/ci.yml/badge.svg)
[![codecov.io](https://codecov.io/github/bernoussama/mcplog/coverage.svg?branch=master)](https://codecov.io/github/bernoussama/mcplog?branch=master)

> Small JSON-lines logger for MCP servers.

## Install

```sh
pnpm add mcplog
# or
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
