exports.loggingMiddleware = (req, res, next) => {
  const start = Date.now();

  // Capture response information after request processing completes
  res.on("finish", () => {
    const duration = Date.now() - start;
    const { statusCode, statusMessage } = res;
    console.log(`
      [${new Date().toISOString()}] | ${req.method} | ${
      req.url
    } | ${statusCode} | ${statusMessage} - ${duration}ms
      `);
  });

  // Pass control to the next middleware function
  next();
};
