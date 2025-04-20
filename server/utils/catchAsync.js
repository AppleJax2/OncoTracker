// Simple utility to catch errors from async functions and pass them to the global error handler
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // Pass any caught error to next()
  };
}; 