Demonstrates a bug in vite / Fresh 2. Could be [related to other issues around line numbers reported in vite](https://github.com/vitejs/vite/issues/9825). 

```bash
deno task start
```

Then accessing http://localhost:5173/example yields an error below whose stacktrace shows the error originating on line 5 despite its actually [originating on line 13](https://github.com/will-weiss/vite-fresh-linenumber-repro/blob/main/routes/example.tsx#L13).

```
Task start vite

  VITE v7.1.12  ready in 1058 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
this runs on line 11
this runs on line 12
Error: on line 13
    at fail (/Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/routes/example.tsx:5:30)
    at ExamplePage (/Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/routes/example.tsx:5:155)
    at eval (deno::0::https://jsr.io/@fresh/core/2.1.4/src/render.ts:9:338)
    at NoopContextManager.with (/Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/src/context/NoopContextManager.js:22:480)
    at ContextAPI.with (/Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/src/api/context.js:39:78)
    at NoopTracer.startActiveSpan (/Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/src/trace/NoopTracer.js:28:915)
    at ProxyTracer.startActiveSpan (/Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/src/trace/ProxyTracer.js:24:330)
    at renderAsyncAnyComponent (deno::0::https://jsr.io/@fresh/core/2.1.4/src/render.ts:9:196)
    at renderRouteComponent (deno::0::https://jsr.io/@fresh/core/2.1.4/src/render.ts:9:853)
    at renderRoute (deno::0::https://jsr.io/@fresh/core/2.1.4/src/segments.ts:13:3204)
    at async Context.fn (deno::0::https://jsr.io/@fresh/core/2.1.4/src/middlewares/mod.ts:6:453)
    at async freshServeStaticFiles (deno::0::https://jsr.io/@fresh/core/2.1.4/src/middlewares/static_files.ts:27:14)
    at async Context.fn (deno::0::https://jsr.io/@fresh/core/2.1.4/src/middlewares/mod.ts:6:453)
    at async segmentMiddleware (deno::0::https://jsr.io/@fresh/core/2.1.4/src/segments.ts:13:1289)
    at async fn (deno::0::https://jsr.io/@fresh/core/2.1.4/src/middlewares/mod.ts:6:453)
    at async eval (deno::0::https://jsr.io/@fresh/core/2.1.4/src/middlewares/mod.ts:6:686)
    at async runMiddlewares (deno::0::https://jsr.io/@fresh/core/2.1.4/src/middlewares/mod.ts:6:55)
    at async Object.eval [as fetch] (deno::0::https://jsr.io/@fresh/core/2.1.4/src/app.ts:67:836)
    at async https://jsr.io/@fresh/plugin-vite/1.0.7/src/plugins/dev_server.ts:75:26
```

If run without source maps, we can see the exact same line/column numbers (5:30 & 5:155), so something is failing to map these

```
deno task start_no_sourcemaps
Task start_no_sourcemaps NO_SOURCE_MAPS=1 vite

  VITE v7.1.12  ready in 481 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
this runs on line 11
this runs on line 12
Error: on line 13
    at fail (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:5:30)
    at ExamplePage (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:5:155)
    at eval (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:9:338)
    at NoopContextManager.with (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:22:480)
    at ContextAPI.with (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:39:78)
    at NoopTracer.startActiveSpan (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:28:915)
    at ProxyTracer.startActiveSpan (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:24:330)
    at renderAsyncAnyComponent (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:9:196)
    at renderRouteComponent (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:9:853)
    at renderRoute (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:13:3204)
    at async Context.fn (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:6:453)
    at async freshServeStaticFiles (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:27:14)
    at async Context.fn (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:6:453)
    at async segmentMiddleware (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:13:1289)
    at async fn (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:6:453)
    at async eval (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:6:686)
    at async runMiddlewares (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:6:55)
    at async Object.eval [as fetch] (eval at runInlinedModule (file:///Users/willweiss/dev/morehumaninternet/vite-fresh-linenumber-repro/node_modules/.deno/vite@7.1.12/node_modules/vite/dist/node/module-runner.js:905:9), <anonymous>:67:836)
    at async https://jsr.io/@fresh/plugin-vite/1.0.7/src/plugins/dev_server.ts:75:26