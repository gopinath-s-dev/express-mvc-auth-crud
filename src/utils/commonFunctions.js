class Utils {
  apiError = (msg, status) => {
    return Object.assign(new Error(msg), { status });
  };
}

export default new Utils();
