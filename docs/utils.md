# Utilities

Location: `src/utils/index.js`

## clearOldInfo()
Clears stored token and user info from both global data and persistent storage, then relaunches the app to the home page.

- Removes `token`, `userInfo`, `loginTime` from storage
- Resets `getApp().globalData`
- Calls `uni.reLaunch({ url: '/pages/index/index' })`

### Example
```js
import { clearOldInfo } from '@/utils';

// After sensitive changes or logout
clearOldInfo();
```

## verifyLogin()
Checks whether the last login time (stored as `loginTime`) exceeded 24 hours. If expired, shows a toast, clears old info, and relaunches to login.

- Called in `App.vue` `onLaunch`

### Example
```js
import { verifyLogin } from '@/utils';

// App startup
verifyLogin();
```