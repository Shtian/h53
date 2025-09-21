#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();

program
  .name("h53")
  .description("Administrative CLI for the H53 family cabin portal")
  .version("0.0.0");

program
  .command("placeholder")
  .description("Placeholder subcommand until tasks T025-T027 are implemented")
  .action(() => {
    console.log("CLI scaffolding is in place. Real commands arrive in Phase 3.3.");
  });

program.parse();
