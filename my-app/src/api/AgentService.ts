import agentApi from './agentApi';

type ChatResponse = {
    success: boolean;
    session_id: string;
    response: string;
    updated_chat_history: {
      role: 'user' | 'assistant';
      content: string;
    }[];
  };
  
const AgentService = {

    //   Sync Analysis – POST /analyze-sync
    // Performs validation and immediate analysis, returns summary or errors
    runAnalysisSync: async (payload: {
        first_name: string;
        last_name: string;
        ssn: string;
        date_of_birth: string;
        gender: string;
        zip_code: string;
    }) => {
        try {
            const response = await agentApi.post('/analyze-sync', payload);
            return response.data;
        } catch (error: any) {
            console.error('Sync analysis failed:', error);
            if (error.response?.data?.detail) {
                return { success: false, errors: error.response.data.detail };
            }
            throw error;
        }
    },

    //  Chat With Analysis – POST /chat
    // Sends a user question and history to chat with analyzed data
    sendChatMessage: async (
        sessionId: string,
        question: string,
        chatHistory: { role: string; content: string }[] = []
      ): Promise<ChatResponse> => {
        console.log('Sending to /chat:', {
          session_id: sessionId,
          question,
          chat_history: chatHistory,
        });
      
        try {
          const response = await agentApi.post('/chat', {
            session_id: sessionId,
            question,
            chat_history: chatHistory,
          });
      
          return response.data as ChatResponse;
        } catch (error: any) {
          console.error('Chat request failed:', error);
      
          if (error.response?.status === 404) {
            return {
              success: false,
              session_id: sessionId,
              response: 'Session not found',
              updated_chat_history: [],
            };
          }
      
          if (error.response?.data?.detail) {
            return {
              success: false,
              session_id: sessionId,
              response: error.response.data.detail,
              updated_chat_history: [],
            };
          }
          throw error;
        }
      }
};

export default AgentService;