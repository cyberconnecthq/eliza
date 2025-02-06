import {
    type Action,
    type HandlerCallback,
    type IAgentRuntime,
    type Memory,
    type State,
    elizaLogger,
} from "@elizaos/core";
import { TwitterSearchService } from "../services/twitterSearchService";

export const twitterSearchAction: Action = {
    name: "TWITTER_SEARCH",
    similes: [
        "SEARCH_TWITTER",
        "CRYPTO_SEARCH",
        "SOCIAL_SEARCH",
        "FIND_TWEETS",
        "TWITTER_LOOKUP",
        "CRYPTO_NEWS",
        "SOCIAL_SENTIMENT",
        "MARKET_SENTIMENT",
        "CRYPTO_TRENDS",
    ],
    description: "Search for tweets about crypto projects",
    suppressInitialMessage: true,
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        return true; // 如果需要验证配置可以在这里添加
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options: {
            query?: string;
            num_results?: number;
            time_range?: string;
            search_type?: "neutral" | "keyword";
        },
        callback: HandlerCallback
    ) => {
        elizaLogger.log("Composing state for message:", message);
        state = (await runtime.composeState(message)) as State;

        const query = options.query || message.content.text;
        const searchType = options.search_type || "neutral";

        if (!["neutral", "keyword"].includes(searchType)) {
            throw new Error(
                "Invalid search type. Must be either 'neutral' or 'keyword'"
            );
        }

        const twitterService = new TwitterSearchService();
        await twitterService.initialize(runtime);

        const searchResponse = await twitterService.search({
            query,
            num_results: options.num_results || 10,
            time_range: options.time_range || "1d",
            type: searchType as "neutral" | "keyword",
        });

        if (searchResponse && searchResponse.result.projects.length) {
            const responseText = searchResponse.result.projects
                .map((project) => `${project.name}:\n${project.summary}`)
                .join("\n\n");

            callback({
                text: responseText,
            });
        } else {
            elizaLogger.error("search failed or returned no data.");
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "What's the latest news about Bitcoin?",
                },
            },
            {
                user: "{{agentName}}",
                content: {
                    text: "Here's what I found about Bitcoin:",
                    action: "TWITTER_SEARCH",
                },
            },
        ],
    ],
};
