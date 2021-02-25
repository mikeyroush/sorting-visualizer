# Sorting Visualizer

A simple merge sort visualizer built with React and Tailwind. Hosted [here](https://mikeyroush.com/sorting-visualizer/).

## Getting Started

These instructions will outline the steps I went through to create this project.

### Prerequisites

- A working command line
- Node >= 10.16
- npm >= 5.6

### React Configuration

To create a new React app, run the following commands:

```console
foo@bar:~$ npx create-react-app my-app
foo@bar:~$ cd my-app
```

To add Material UI components to your project, like a slider, run the following command:

```console
foo@bar:~$ npm install @material-ui/core
```

To change the default title and icon of the page, go to ```./public```,
This contains index.html and favicon.ico, which control the title and icon of the page, respectively. 

### ESLint and Prettier Configuration

To add ESLint and Prettier to your project, run the following commands:

```console
foo@bar:~$ npm install -g prettier eslint
foo@bar:~$ eslint —init
foo@bar:~$ npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

### TailwindCSS Configuration

To add TailwindCSS to your project, run the following commands:

```console
foo@bar:~$ npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
foo@bar:~$ npm install @craco/craco
foo@bar:~$ npx tailwindcss init 
```

The last command shown above adds a file called tailwind.config.js to your root direcotry. Change the ```purge``` line of the file to match the following in oder to remove unused CSS from your production builds for maximum performance.

```
purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
```

### GitHub Pages Configuration

To easily deploy static pages to GitHub Pages, run the following command:

```console
foo@bar:~$ npm install gh-pages --save-dev
```

Then, add the following scripts to your Package.json:

```json
"scripts": {
  //...
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Finally, add a homepage to your Package.json and run ```npm run deploy``` when you are ready to deploy your project

```json
"homepage": "http://gitname.github.io/react-gh-pages"
```

## Authors

* **Michael Roush** - *Project completion*

## License

Copyright © 2021 Michael Roush. All rights reserved.