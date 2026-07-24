export default {
  fetch(request, env) {
    const url = new URL(request.url);
    let redirect = false;
    if (url.hostname === "www.wordsolvertools.org") {
      url.hostname = "wordsolvertools.org";
      redirect = true;
    }
    const redirects = {"/wordle-helper/":"/wordle-solver/","/wordle-finder/":"/wordle-solver/","/wordle-cheat/":"/wordle-solver/"};
    if (redirects[url.pathname]) {
      url.pathname = redirects[url.pathname];
      redirect = true;
    }
    if (redirect) return Response.redirect(url.toString(), 301);
    return env.ASSETS.fetch(request);
  }
};
