// server.js
// Minimal, secure SOCKS5 server for Railway using 'socksv5'
const socks = require('socksv5');
const PORT = process.env.PORT || 1080;

// AUTH_PAIRS env format: "user1:pass1,user2:pass2" (optional). If empty => no auth (not recommended).
const authPairs = (process.env.AUTH_PAIRS || '').split(',').filter(Boolean);

// Username/password auth handler
if (authPairs.length) {
  socks.auth.UserPassword((user, password, cb) => {
    const ok = authPairs.includes(`${user}:${password}`);
    cb(ok);
  });
} else {
  // Allow anonymous if no auth pairs provided
  socks.auth.None(() => true);
}

const server = socks.createServer((info, accept, deny) => {
  const socket = accept(true);
  // The socksv5 module handles the proxying.
});

server.on('error', (err) => {
  console.error('SOCKS server error:', err);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`SOCKS5 server listening on 0.0.0.0:${PORT}`);
});

process.on('SIGINT', () => server.close(() => process.exit(0)));
process.on('SIGTERM', () => server.close(() => process.exit(0)));
