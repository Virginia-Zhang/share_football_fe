# Shared Football Uni-App

A Uni-App (Vue 3) application for a shared football booking experience. It includes authentication, stadium browsing, booking/orders, wallet recharge, rewards exchange, and profile management. The app targets H5, native app, and mini-programs via Uni-App.

## Quick start

1) Install dependencies
```bash
npm install
```

2) Run (H5)
```bash
npm run dev:h5
```

3) Build (H5)
```bash
npm run build:h5
```

4) Other platforms
Use the scripts in `package.json` (e.g., `dev:app-android`, `dev:mp-weixin`). Refer to Uni-App docs for platform-specific setup.

## Requirements
- Node.js 16+
- npm 8+

## Project structure
```
src/
  api/          # Feature API modules (aggregate exported as default from src/api/index.js)
  request/      # HTTP request wrapper (uni.request)
  upload/       # File upload wrapper (uni.uploadFile)
  utils/        # Utilities (auth/session helpers)
  pages/        # App pages (Vue SFCs)
  pages.json    # Pages and navigation configuration
  App.vue       # App entry and global lifecycle
  main.js       # createSSRApp entry
vite.config.js
```

## Configuration
- API base URL is set in `src/request/index.js` and `src/upload/index.js` as `http://localhost:9000`. Change it to your backend origin for production.
- The token is read from storage (`uni.getStorageSync('token')`) and attached as `Authorization: Bearer <token>`.

## Documentation
Comprehensive docs live in the `docs/` directory:
- `docs/api/request.md` — HTTP client wrapper
- `docs/api/upload.md` — File upload wrapper
- `docs/api/modules/*.md` — Feature API modules (stadium, contact, register, login, upload, update, recharge, reward, order)
- `docs/utils.md` — Utilities (clearOldInfo, verifyLogin)
- `docs/pages.md` — Pages and navigation

## Scripts
A few useful ones (see `package.json` for the full list):
- `dev:h5` — start H5 dev server
- `build:h5` — build H5 bundle
- `dev:app-android` — Android dev
- `dev:mp-weixin` — WeChat Mini Program dev

## Conventions
- Most API methods return raw backend responses; some also show user feedback using `uni.showToast` and may return `undefined` on non-zero codes. Check return values before use.
- `utils.verifyLogin()` checks 24-hour session expiry on app launch.

## License
MIT