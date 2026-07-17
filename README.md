# n8n-nodes-autobrr

[![npm version](https://img.shields.io/npm/v/n8n-nodes-autobrr.svg)](https://www.npmjs.com/package/n8n-nodes-autobrr)

n8n community node for [autobrr](https://autobrr.com/) — the IRC/RSS announce autodownloader — via its API.

Install via **Settings -> Community Nodes -> Install** -> `n8n-nodes-autobrr`.

## Operations
- Get Releases / Filters / Indexers / IRC Networks / Config

## Credentials
Configure the base URL and authentication in the **Autobrr API** credential.

## Usage example

List the latest grabbed releases:

1. Add the node after a trigger (e.g. *When clicking 'Test workflow'*).
2. Select your credential.
3. **Get Releases** (set a Limit).
4. Execute the node — example output:

```json
{ "id": 42, "filter": "Movies 2160p", "indexer": "BeyondHD", "torrent_name": "Some.Movie.2160p", "timestamp": "2026-07-10T12:00:00Z" }
```

## Disclaimer
Not affiliated with or endorsed by the respective project.
