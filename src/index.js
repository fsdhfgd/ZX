export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 自动加上 .json 后缀（友好访问）
    if (path.endsWith('/') || !path.includes('.')) {
      const jsonPath = path === '/' ? '/4kj.json' : path + '.json';
      return env.ASSETS.fetch(new Request(jsonPath, request));
    }

    return env.ASSETS.fetch(request);
  }
};
