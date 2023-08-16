interface RequestBody {
  email: string;
  password: string;
};

export async function mockLogin(url: string, options: { body: string }) {
  const credentials: RequestBody = JSON.parse(options.body);
  if (credentials.email === 'eve.holt@reqres.in' && credentials.password === 'cityslicka') {
    return {
      status: 200,
      json: async () => ({ token: '123456789', authorized: true, email: 'eve.holt@reqres.in', message: '' })
    };
  } else {
    return {
      status: 401,
      json: async () => ({ token: '123456789', authorized: false, email: '', message: 'Something went wrong!' })
    };
  }
};
