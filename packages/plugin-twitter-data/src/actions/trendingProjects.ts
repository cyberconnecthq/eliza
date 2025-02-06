import {
    type Action,
    type HandlerCallback,
    type IAgentRuntime,
    type Memory,
    type State,
    elizaLogger,
} from "@elizaos/core";
import { TwitterSearchService } from "../services/twitterSearchService";

export const trendingProjectsAction: Action = {
    name: "GET_TRENDING_PROJECTS",
    similes: [
        "TRENDING_CRYPTO",
        "HOT_PROJECTS",
        "POPULAR_TOKENS",
        "TRENDING_TOKENS",
        "CRYPTO_TRENDS",
        "TOP_PROJECTS",
        "MARKET_TRENDS",
        "TRENDING_COINS",
        "POPULAR_CRYPTO",
    ],
    description: "Get trending crypto projects and their social sentiment",
    suppressInitialMessage: true,
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options: {
            num_results?: number;
            time_range?: string;
        },
        callback: HandlerCallback
    ) => {
        elizaLogger.log("Getting trending projects");
        state = (await runtime.composeState(message)) as State;

        const twitterService = new TwitterSearchService();
        await twitterService.initialize(runtime);

        const response = await twitterService.getTrendingProjects({
            num_results: options.num_results || 10,
            time_range: options.time_range || "1d",
        });

        if (response && response.result.projects.length) {
            const responseText = response.result.projects
                .map((project) => `${project.name}:\n${project.summary}`)
                .join("\n\n");

            callback({
                text: responseText,
            });
        } else {
            elizaLogger.error(
                "Failed to get trending projects or no data returned."
            );
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Show me trending crypto projects",
                },
            },
            {
                user: "{{agentName}}",
                content: {
                    text: "Here are the trending crypto projects:",
                    action: "GET_TRENDING_PROJECTS",
                },
            },
        ],
    ],
};
