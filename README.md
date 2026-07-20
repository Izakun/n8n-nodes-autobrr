<img src="nodes/Autobrr/autobrr.svg" width="90" align="right" alt="Autobrr" />

# n8n-nodes-autobrr

[![npm version](https://img.shields.io/npm/v/n8n-nodes-autobrr.svg)](https://www.npmjs.com/package/n8n-nodes-autobrr)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-autobrr.svg)](https://www.npmjs.com/package/n8n-nodes-autobrr)
[![License: MIT](https://img.shields.io/npm/l/n8n-nodes-autobrr.svg)](./LICENSE)
[![n8n verified](https://img.shields.io/badge/n8n-verified%20community%20node-EA4B71)](https://docs.n8n.io/integrations/community-nodes/installation/verified-install/)

Community node for **n8n** to interact with **Autobrr**. It lets you automate
Autobrr directly from your n8n workflows using a secure stored credential.

> ✅ **Verified community node** — installable directly from the n8n node panel
> (self-hosted **and** n8n Cloud).

## Installation

This is a **verified** community node: in n8n click **+ (Add node)**, search for
**Autobrr**, and add it — no manual install needed.

<details>
<summary>Manual install (older n8n, or as an unverified package)</summary>

Go to **Settings → Community Nodes → Install** and enter `n8n-nodes-autobrr`.
</details>

## Operations

| Operation | Description |
|---|---|
| **Get Config** | Get the configuration |
| **Get Filters** | Get many filters |
| **Get Indexers** | Get many indexers |
| **Get IRC Networks** | Get many IRC networks |
| **Get Releases** | Get many releases |

## Authentication

This node uses the **Autobrr API** credential. In n8n, go to **Credentials → New**, pick
**Autobrr API**, and fill in:

- **Base URL** — the address of your instance, e.g. `http://autobrr:7474` (no trailing slash).
- **API Key** — your service API key.

Your credential is sent as the `X-API-Token` request header.

**Where to find it:** See the service documentation: https://autobrr.com/

The credential's **Test** button verifies the connection before you save.

## Usage

1. Add the **Autobrr** node to a workflow (after a trigger such as *When clicking 'Test workflow'* or a Schedule Trigger).
2. Select your **Autobrr API** credential.
3. Pick an **Operation** and run the workflow — the response is returned as JSON for the next node.

## Compatibility

Requires n8n **1.0** or newer. Built and linted with the official `@n8n/node-cli`, and
published to npm with a build-provenance attestation.

## Resources

- [Autobrr](https://autobrr.com/)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](./LICENSE)
