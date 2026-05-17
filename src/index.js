export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    if (pathname === "/" || pathname === "") {
      return env.ASSETS.fetch(new Request("/4kj.json", request));
    }

    // 自动补全 .json 后缀
    if (!pathname.endsWith(".json")) {
      if (pathname.endsWith("/")) pathname = pathname.slice(0, -1);
      pathname += ".json";
    }

    try {
      return await env.ASSETS.fetch(new Request(pathname, request));
    } catch (e) {
      return new Response("404 - 文件不存在", { status: 404 });
    }
  }
};
