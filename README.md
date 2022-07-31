# @teakit/atom

## Installation

```
$ npm install @teakit/atom
```

## Example

```js
import Atom from "@teakit/atom";
const app = new Atom();

// response
app.use(ctx => {
  ctx.body = "Hello Atom";
});

app.listen(3000);
```

## Middleware

Atom is a middleware framework that can take two different kinds of functions as middleware:

- async function
- common function

Here is an example of logger middleware with each of the different functions:

### **_async_** functions (node v16.x)

```js
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
```

### Common function

```js
// Middleware normally takes two parameters (ctx, next), ctx is the context for one request,
// next is a function that is invoked to execute the downstream middleware. It returns a Promise with a then function for running code after completion.

app.use((ctx, next) => {
  const start = Date.now();
  return next().then(() => {
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
});
```
