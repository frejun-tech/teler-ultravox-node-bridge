import axios from "axios";

interface UltravoxCallResponse {
    callId: string;              
    joinUrl: string;
}

interface UltravoxResponse {
    data: string;
    webSocketURL: string | null;
}

export class UltravoxClient {
    private apiKey: string;
    private agentId: string;
    private sampleRate: number;
    private bufferSize: number;
    private baseURL: string;

    constructor(apiKey: string, agentId: string, sampleRate: number=8000, bufferSize: number = 60) {
        this.apiKey  = apiKey;
        this.agentId = agentId;
        this.sampleRate  = sampleRate;
        this.bufferSize = bufferSize;
        this.baseURL     = "https://api.ultravox.ai/api";
    }

    public createCall = async (): Promise<UltravoxResponse> => {
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey
                }
            };

            const body = {
                medium: {
                    serverWebSocket: {
                        inputSampleRate: this.sampleRate,
                        outputSampleRate: this.sampleRate,
                        clientBufferSizeMs: this.bufferSize
                    }
                }
            }
            console.log(`${this.baseURL}/agents/${this.agentId}/calls`);
            const res = await axios.post<UltravoxCallResponse>(
                `${this.baseURL}/agents/${this.agentId}/calls`, body,  config
            )

            if (!res?.data?.joinUrl) {
                throw new Error(`No websocket URL returned from Ultravox ${res.data}`);
            }
            
            const response = {
                "data": "WebSocket URL",
                "webSocketURL": res.data.joinUrl
            }

            return response;
        } catch (err) {
            const response = {
                "data": "WebSocket URL",
                "webSocketURL": null
            }
            if (axios.isAxiosError(err)) {
                const message =
                err.response?.data?.message ||
                err.response?.data ||
                err.message;

                console.error("Ultravox Error: ", message);
                return response;
            }
            console.error("Ultravox Error: ", err);
            return response;
        }
    }
}