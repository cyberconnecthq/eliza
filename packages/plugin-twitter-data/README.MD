# @elizaos/plugin-twitter-data

A plugin for analyzing crypto market sentiment and social trends through Twitter data. This plugin provides real-time sentiment analysis, trend detection, and social signal monitoring specifically for the crypto market.

## Overview

This plugin enables:
- Real-time crypto market sentiment analysis
- Trending projects detection
- Social signals monitoring
- Community engagement metrics
- Cross-platform social sentiment tracking

## Installation

```bash
pnpm add @elizaos/plugin-twitter-data
```

## Usage

Import and register the plugin in your Eliza configuration:

```typescript
import { twitterDataPlugin } from "@elizaos/plugin-twitter-data";

export default {
    plugins: [twitterDataPlugin],
    // ... other configuration
};
```

## Features

### 1. Twitter Search
Search and analyze Twitter data for specific crypto projects or topics.

```typescript
// Example usage in an action handler
const searchResponse = await twitterService.search({
    query: "Bitcoin",
    num_results: 10,
    time_range: "1d",
    type: "neutral"
});

// Response includes sentiment analysis and tweet summaries
console.log(searchResponse.result.projects[0].summary);
```

### 2. Trending Projects Detection
Monitor and analyze trending crypto projects based on social metrics.

```typescript
// Example usage in an action handler
const trendingProjects = await twitterService.getTrendingProjects({
    num_results: 10,
    time_range: "1d"
});

// Access trending project data
console.log(trendingProjects.result.projects);
```

## API Reference

### Core Interfaces

```typescript
interface TwitterSearchResult {
    code: number;
    message: string;
    result: {
        projects: Array<{
            id: number;
            name: string;
            tweet_summaries: Array<{
                summary: string;
                timestamp: number;
                tweets: Array<{
                    twitter_id: string;
                    tweet_id: string;
                    tweet_at: number;
                }>;
            }>;
            summary: string;
        }>;
    };
}
```

### Available Actions

#### TWITTER_SEARCH
- **Description**: Search and analyze Twitter data for crypto projects
- **Parameters**:
  - `query`: Search query string
  - `num_results`: Number of results (default: 10)
  - `time_range`: Time range (default: "1d")
  - `type`: "neutral" or "keyword"

#### GET_TRENDING_PROJECTS
- **Description**: Get trending crypto projects
- **Parameters**:
  - `num_results`: Number of projects (default: 10)
  - `time_range`: Time range (default: "1d")

## Character Integration

Example character configuration using this plugin:

```json
{
    "name": "crypto_analyst",
    "plugins": [
        "@elizaos/plugin-twitter-data"
    ],
    "bio": [
        "Crypto sentiment analyst who's fluent in both English and Chinese",
        "Master of finding alpha through Twitter data analysis",
        "Makes complex market data fun and accessible"
    ],
    "settings": {
        "model": "gpt-4"
    }
}
```

## Development

### Building
```bash
pnpm run build
```

### Testing
```bash
pnpm run test
```

### Linting
```bash
pnpm run lint
pnpm run lint:fix
```

### Formatting
```bash
pnpm run format
pnpm run format:fix
```

## API Endpoints

The plugin uses the following API endpoints:
- Search: `https://api.stg.cyber.ai/crypto-ai/v1/search`
- Trending Projects: `https://api.stg.cyber.ai/crypto-ai/v1/trending_projects`

## Dependencies

- `@elizaos/core`: Core Eliza functionality
- `axios`: HTTP client for API requests
- Other dependencies listed in package.json

## Common Issues/Troubleshooting

### Rate Limiting
- **Issue**: Too many requests in short time
- **Solution**: Implement proper request throttling

### API Response Format
- **Issue**: Unexpected response format
- **Solution**: Verify API endpoint and response structure

## Security Best Practices

- Validate all search inputs
- Implement proper error handling
- Keep dependencies updated
- Monitor API usage
- Use HTTPS for API communication

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This plugin is part of the Eliza project. See the main project repository for license information.
