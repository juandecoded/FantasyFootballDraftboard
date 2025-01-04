export const api = async (endpoint, options = {}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  console.log('API Request URL:', url);
  // console.log('API Request Options:', options);
  
  const res = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  let json;
  try {
    json = await res.json()
    
  } catch (err) {
    console.error('failed to parse JSON: ', err.message)
    throw new Error(err.message || 'Something went wrong')
  }

  return {
    ok: res.ok,
    status: res.status,
    statusText: res.statusText,
    json,
  };
}