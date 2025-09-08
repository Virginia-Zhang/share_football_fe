# File Upload Wrapper

Location: `src/upload/index.js`

Provides a wrapper around `uni.uploadFile` with a base URL and Authorization header injection. Parses JSON responses automatically.

## Base URL
- Default: `http://localhost:9000`
- Change by editing the `new UploadFile('...')` instantiation.

## API

### upload(url, name, filePath, formData?)
- `url` (string): path, e.g. `/upload/avatar`
- `name` (string): form field name for file
- `filePath` (string): local file path
- `formData` (object, optional): additional form fields
- Returns: `Promise<any>` resolving to parsed JSON response

### uploadAvatar(url, filePath, formData?)
- Convenience method that uses field name `avatar`.

## Usage
```js
import upload from '@/upload';

// Generic upload
const result = await upload.upload('/files', 'file', tempFilePath, { tag: 'doc' });

// Upload avatar
const res = await upload.uploadAvatar('/upload/avatar', tempFilePath);
if (res.code === 0) {
  // success
}
```