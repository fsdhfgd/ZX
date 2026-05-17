export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // 根路径默认返回 4kj.json
    if (pathname === "/" || pathname === "") {
      pathname = "/4kj.json";
    }

    // 解码中文路径 + 自动补全 .json
    pathname = decodeURIComponent(pathname);

    if (!pathname.endsWith(".json")) {
      if (pathname.endsWith("/")) {
        pathname = pathname.slice(0, -1);
      }
      pathname = pathname + ".json";
    }

    // 确保路径以 / 开头
    if (!pathname.startsWith("/")) {
      pathname = "/" + pathname;
    }

    try {
      const response = await env.ASSETS.fetch(new Request(pathname, request));
      
      // 如果文件存在但返回 404，说明没找到
      if (response.status === 404) {
        throw new Error("File not found");
      }
      
      return response;
    } catch (err) {
      console.error(`Failed to fetch: ${pathname}`, err);
      
      return new Response(`404 - 文件不存在: ${pathname}`, { 
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  }
};
