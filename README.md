A fork of [zephir/zephir-gulp-workflow](https://github.com/zephir/zephir-gulp-workflow) with added sourcemaps and other things.

# differences to zephir-gulp-workflow:

## Installation

1. Create a package.json in you project **>>** `npm init`
2. Install GULP local **>>** `npm i --save gulp-cli`
3. Install the mj Workflow **>>** `npm i --save mj-gulp-workflow` `// @todo add to npm`
4. Create a new file gulpfile.js and add the content you find below

```js
var mjWorkflow = require('mj-gulp-workflow');
mjWorkflow( require('gulp') );
```

### Tasks


#### CSS

Sourcemaps included

#### JS

Runs the following plugins:

1. BabelJS *[configuration](https://github.com/babel/gulp-babel#api)*
2. with babel-preset-env and a autoprefixer config as defaultConfig.js

# @todo:
- Port to gulp 4
- Notifications
- better error-reporting