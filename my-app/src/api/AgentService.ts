import agentApi from './agentApi';

const AgentService = {
  //  1. Health Check – GET /health
  // Checks if Health Agent service is online and ready
//   checkHealthAgent: async () => {
//     try {
//       const response = await agentApi.get('/health');
//       return response.data;
//     } catch (error) {
//       console.error('Health check failed:', error);
//       return { status: 'unhealthy', agent_available: false };
//     }
//   },

//   //  2. Async Analysis – POST /analyze
//   // Starts a background analysis task and returns session ID
//   startAnalysis: async (payload: {
//     first_name: string;
//     last_name: string;
//     ssn: string;
//     date_of_birth: string;
//     gender: string;
//     zip_code: string;
//   }) => {
//     try {
//       const response = await agentApi.post('/analyze', payload);
//       return response.data;
//     } catch (error) {
//       console.error('Async analysis request failed:', error);
//       throw error;
//     }
//   },

  //  3. Sync Analysis – POST /analyze-sync
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

  //  4. Chat With Analysis – POST /chat
  // Sends a user question and history to chat with analyzed data
  sendChatMessage: async (
    sessionId: string,
    question: string,
    chatHistory: any[] = []
  ) => {
    try {
      const response = await agentApi.post('/chat', {
        session_id: sessionId,
        question,
        chat_history: chatHistory,
      });
      return response.data;
    } catch (error: any) {
      console.error('Chat request failed:', error);
      if (error.response?.status === 404) {
        return { success: false, message: 'Session not found' };
      }
      if (error.response?.data?.detail) {
        return { success: false, errors: error.response.data.detail };
      }
      throw error;
    }
  },

  //  5. Get Analysis Status – GET /status/{session_id}
  // Returns the status and progress of a running analysis session
  getAnalysisStatus: async (sessionId: string) => {
    try {
      const response = await agentApi.get(`/status/${sessionId}`);
      return response.data;
    } catch (error: any) {
      console.error('Status check failed:', error);
      if (error.response?.status === 404) {
        return { success: false, message: 'Session not found' };
      }
      if (error.response?.data?.detail) {
        return { success: false, errors: error.response.data.detail };
      }
      throw error;
    }
  },

  //  6. Get Analysis Results – GET /results/{session_id}
  // Retrieves final results after analysis is complete
  getAnalysisResults: async (sessionId: string) => {
    try {
      const response = await agentApi.get(`/results/${sessionId}`);
      return response.data;
    } catch (error: any) {
      console.error('Results fetch failed:', error);
      if (error.response?.status === 404) {
        return { success: false, message: 'Session not found' };
      }
      if (error.response?.data?.detail) {
        return { success: false, errors: error.response.data.detail };
      }
      throw error;
    }
  },

  //  7. List All Sessions – GET /sessions
  // Returns an array of all historical analysis sessions
  listSessions: async () => {
    try {
      const response = await agentApi.get('/sessions');
      return response.data;
    } catch (error) {
      console.error('Listing sessions failed:', error);
      throw error;
    }
  },

  //  8. Get Sample Data – GET /test/sample-data
  // Returns example patient data for testing/demo purposes
  getSampleData: async () => {
    try {
      const response = await agentApi.get('/test/sample-data');
      return response.data;
    } catch (error) {
      console.error('Sample data fetch failed:', error);
      throw error;
    }
  }
};

export default AgentService;
