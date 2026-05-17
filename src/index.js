export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // 根路径默认返回 4kj.json
    if (pathname === "/" || pathname === "") {
      pathname = "/4kj.json";
    }

    // 自动补全 .json 后缀
    if (!pathname.endsWith(".json")) {
      if (pathname.endsWith("/")) {
        pathname = pathname.slice(0, -1);
      }
      pathname = pathname + ".json";
    }

    // 尝试获取文件
    try {
      const response = await env.ASSETS.fetch(new Request(pathname, request));
      return response;
    } catch (err) {
      console.error("Asset fetch error:", err);
      return new Response("404 - 文件不存在或读取失败", { 
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  }
};
