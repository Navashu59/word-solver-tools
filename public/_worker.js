export default {
  fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.wordsolvertools.org") {
      url.hostname = "wordsolvertools.org";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  }
};
