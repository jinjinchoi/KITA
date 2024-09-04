const fs = require('fs');
const path = require('path');

const directory = './js'; // 컴파일된 JS 파일이 있는 디렉토리

function addJsExtension(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      addJsExtension(fullPath);
    } else if (path.extname(fullPath) === '.js') {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/(from\s+['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
        console.log(match)
        console.log( p1)
        console.log( p2)
        console.log(p3)
        if (!p2.endsWith('.js') && p2.startsWith('.')) {
            console.log('ok?')
          return `${p1}${p2}.js${p3}`;
        }
        return match;
      });
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  });
}

addJsExtension(directory);
