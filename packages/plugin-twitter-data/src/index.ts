import type { Plugin } from "@elizaos/core";
import { twitterSearchAction } from "./actions/twitterSearch";
import { trendingProjectsAction } from "./actions/trendingProjects";
import { TwitterSearchService } from "./services/twitterSearchService";

const plugin: Plugin = {
    name: "twitter-data",
    description: "Twitter Search Plugin for Crypto Data",
    actions: [twitterSearchAction, trendingProjectsAction],
    evaluators: [],
    providers: [],
    services: [new TwitterSearchService()],
};

export { plugin as twitterDataPlugin };
