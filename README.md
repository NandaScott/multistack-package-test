# Multistack Package Test

A little test or example about how to create an npm package that can share reusable code across multiple apps or services.

## Brief Overview

- `nds-common` is the custom package that wraps some functionality for forms and exports a few React components.
- `react-mui-js` is using React with Material UI for styling, written in JS.
- `react-tailwind-ts` is using React with TailwindCSS for styling, written in TS.

## Installation

This project uses Docker with docker-compose to build and run all of its parts. After cloning, simply run the following commands:

```bash
  cd ./react-mui-js && npm i
  cd ./react-tailwind && npm i
  cd ./nds-common && npm i
  docker-compose up -d
```

and it should build all the correct images and everything for you.

## Development

There are two ways to go about development with the package.

### The long way

This method is ideal for smaller bug fixes that can be verified with tests. This works well with development with docker.

```
1. Update package logic
2. Build/Test
3. Publish Patch
4. Pull patch in app or rebuild images and containers
5. Test changes
```

### The short way

This method is ideal for larger logic changes and the need to quickly test iterations. This works best when running the app
through `npm start`, rather than docker containers. Unless you want to set up sym links to the container, but I didn't feel like
doing that.

```
1. cd into package directory
2. npm link
3. cd into app directory
4. npm link <package_name>
```

## Authors

- [@NandaScott](https://github.com/NandaScott)
- [@darjama](https://github.com/darjama)
