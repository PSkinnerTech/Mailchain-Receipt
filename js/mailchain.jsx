import { Mailchain } from "@mailchain/sdk";
import * as dotenv from "dotenv";
dotenv.config();

const secretRecoveryPhrase = process.env.SECRET_RECOVERY_PHRASE;

const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);
