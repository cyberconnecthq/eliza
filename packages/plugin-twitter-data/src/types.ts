export interface TwitterSearchResult {
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

export interface TrendingProjectsResponse {
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
