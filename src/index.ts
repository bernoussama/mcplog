import fs from "node:fs";

export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogSink = {
  write(chunk: string): unknown;
};

const LEVEL_RANK: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export class McpLogger {
  private readonly out: LogSink;
  private readonly minRank: number;
  private readonly name: string;

  constructor(options: {
    name: string;
    level?: LogLevel;
    filePath?: string;
    stderr?: LogSink;
  }) {
    this.name = options.name;
    this.minRank = LEVEL_RANK[options.level ?? "info"];

    const resolvedPath = options.filePath ?? process.env["CLANKER_LOG_FILE"];
    this.out = resolvedPath
      ? fs.createWriteStream(resolvedPath, { flags: "a" })
      : (options.stderr ?? process.stderr);
  }

  private write(
    level: LogLevel,
    message: string,
    extra?: Record<string, unknown>,
  ): void {
    if (LEVEL_RANK[level] < this.minRank) return;

    const line =
      JSON.stringify({
        name: this.name,
        level,
        time: new Date().toISOString(),
        msg: message,
        ...extra,
      }) + "\n";

    this.out.write(line);
  }

  debug(message: string, extra?: Record<string, unknown>): void {
    this.write("debug", message, extra);
  }

  info(message: string, extra?: Record<string, unknown>): void {
    this.write("info", message, extra);
  }

  warn(message: string, extra?: Record<string, unknown>): void {
    this.write("warn", message, extra);
  }

  error(message: string, extra?: Record<string, unknown>): void {
    this.write("error", message, extra);
  }
}
