export const callLLMApi = async (url: string, apiKey: string, messages: any[]) => {
  // Ensure URL ends with /v1/chat/completions if not already present
  const apiUrl = url.endsWith('/v1/chat/completions') 
    ? url 
    : `${url.replace(/\/$/, '')}/v1/chat/completions`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "deepseek-chat", // Adding the required model parameter
      messages,
      temperature: 0.7,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API调用失败 (${response.status}): ${errorText}`);
  }

  return response.json();
};