import { Service, type IAgentRuntime, ServiceType } from "@elizaos/core";
import type { TwitterSearchResult } from "../types";
import axios from "axios";

export interface ITwitterSearchService extends Service {
    search(params: {
        query: string;
        num_results?: number;
        time_range?: string;
        type: "neutral" | "keyword";
    }): Promise<TwitterSearchResult>;

    getTrendingProjects(params: {
        num_results?: number;
        time_range?: string;
    }): Promise<TwitterSearchResult>;
}

export class TwitterSearchService
    extends Service
    implements ITwitterSearchService
{
    private API_URL = "https://api.stg.cyber.ai/crypto-ai/v1";

    async initialize(_runtime: IAgentRuntime): Promise<void> {
        // 如果需要初始化配置，可以在这里添加
    }

    getInstance(): ITwitterSearchService {
        return TwitterSearchService.getInstance();
    }

    static get serviceType(): ServiceType {
        return ServiceType.TWITTER_DATA_SEARCH;
    }

    async search(params: {
        query: string;
        num_results?: number;
        time_range?: string;
        type: "neutral" | "keyword";
    }): Promise<TwitterSearchResult> {
        try {
            const response = await axios.post<TwitterSearchResult>(
                `${this.API_URL}/search`,
                {
                    query: params.query,
                    num_results: params.num_results || 10,
                    time_range: params.time_range || "1d",
                    type: params.type,
                },
                {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error("Error searching tweets:", error);
            throw error;
        }
    }

    async getTrendingProjects(params: {
        num_results?: number;
        time_range?: string;
    }): Promise<TwitterSearchResult> {
        try {
            const response = await axios.post<TwitterSearchResult>(
                `${this.API_URL}/trending_projects`,
                {
                    num_results: params.num_results || 10,
                    time_range: params.time_range || "1d",
                },
                {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error("Error fetching trending projects:", error);
            throw error;
        }
    }
}
