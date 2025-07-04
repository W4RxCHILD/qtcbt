import type { KVNamespace } from '@cloudflare/workers-types';

declare global {
  namespace App {
    interface Locals {
      env: {
        DONATION_TOTAL: KVNamespace;
      };
    }
  }
}

export {};
