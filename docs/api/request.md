# HTTP Request Wrapper

Location: `src/request/index.js`

Provides a thin wrapper around `uni.request` with a base URL and Authorization header injection.

## Base URL
- Default: `http://localhost:9000`
- Change by editing the `new Request('...')` instantiation.

## API

### request(url, data, method)
- `url` (string): path, e.g. `/login`
- `data` (object): request payload or query params
- `method` (string): `GET` | `POST`
- Returns: `Promise<any>` resolving to `res.data` from backend

### get(url, data?)
- Convenience method for GET.

### post(url, data?)
- Convenience method for POST.

Authorization header `Authorization: Bearer <token>` is attached if `token` exists in storage.

A loading overlay is shown during the request and hidden in `complete`.

## Usage
```js
import myRequest from '@/request';

// Login
const res = await myRequest.post('/login', { username, password });
if (res.code === 0) {
  // handle success
}

// Get list
const listRes = await myRequest.get('/stadium/list');
if (listRes.code === 0) {
  const items = listRes.data;
}
```