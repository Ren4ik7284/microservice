export declare class HealthController {
    checkHealth(): {
        status: string;
        service: string;
        timestamp: string;
    };
    checkHealthMicro(): {
        status: string;
        uptime: number;
    };
}
