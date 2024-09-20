type RequestConfig = {
  url: string
  baseUrl?: string
  headers?: HeadersInit
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  signal?: AbortSignal | null
}

export const http = {
  request: async <T>(config: RequestConfig) => {
    const response = await fetch(
      config.baseUrl ? `${config.baseUrl}${config.url}` : config.url,
      {
        method: config.method,
        body: JSON.stringify(config.body),
        headers: config.headers,
        signal: config.signal,
      }
    )
    if (!response.ok) {
      throw new Error(await response.text())
    }
    return (await response.json()) as T
  },
}
