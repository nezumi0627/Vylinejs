# Step 1: Install Vylinejs

Start here to add the published package to an existing project. The docs site
uses Node.js and npm; the library itself also supports Deno and Bun.

## Choose a runtime

### Deno

```sh
deno add jsr:@nezumi0627/vylinejs
```

### Node.js with npm

```sh
npx jsr add @nezumi0627/vylinejs
```

Keep the `.npmrc` file created by the JSR CLI so npm resolves the package.

### Bun

```sh
bunx jsr add @nezumi0627/vylinejs
```

## Confirm the package name

Import the library from `@nezumi0627/vylinejs`. Do not substitute the old
`@evex/linejs` package name in new code. The JSR package page is
[jsr.io/@nezumi0627/vylinejs](https://jsr.io/@nezumi0627/vylinejs).

The library is not a browser chat application. UDP-based call transports need
a compatible server runtime; browsers cannot open the required UDP sockets.

<div class="vy-page-actions" id="continue">
  <a class="vy-page-button vy-page-button-primary" href="./2-login">
    <span>Next step · 2</span>
    <strong>Log in with QR</strong>
  </a>
</div>

Maintainer signature: [nezumi0627](https://github.com/nezumi0627)
