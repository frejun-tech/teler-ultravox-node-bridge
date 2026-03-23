import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port:                       Number(process.env.PORT) || 8000,
    nodeEnv:                    process.env.NODE_ENV || 'development',
    serverDomain:               process.env.SERVER_DOMAIN || 'your_fallback_domain',
    
    telerKey:                   process.env.TELER_API_KEY || '',
    telerSampleRate:            process.env.TELER_SAMPLE_RATE || "8k",
    telerChunkSize:             Number(process.env.TELER_CHUNK_SIZE) || 500,
    
    ultravoxAgentId:            process.env.ULTAVOX_AGENT_ID || '',
    ultravoxApiKey:             process.env.ULTAVOX_API_KEY || '',
    ultravoxSampleRate:         Number(process.env.ULTAVOX_SAMPLE_RATE) || 8000,
    ultravoxBufferSize:         Number(process.env.ULTAVOX_MESSAGE_BUFFER_SIZE) || 50,
} as const;