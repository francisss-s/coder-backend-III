import { Command } from "commander";

const args = new Command();

// Definir opciones de entorno y persistencia con valores por defecto
args
  .option("--env <env>", "Define el ambiente (development, production, test)", "production")
  .option("--persistence <persistence>", "Define el tipo de persistencia (mongo, memory, fs)", "mongo")
args.parse();

export default args.opts();
