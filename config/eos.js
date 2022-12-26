const webpack = require('webpack');
const path  = require('path');
const fs = require('fs');

const webpackConfig = require('./pro.config');

const mapReg = /.*\.map/

const targetPath = path.resolve(__dirname, './../server/.maps');
const sourceMap = path.resolve(__dirname,'./../dist'); 

const compiler = webpack(webpackConfig);

compiler.run(()=>{
    const dirs = fs.readdirSync(sourceMap);
    const mapFiles = dirs.filter(dir=>dir.match(mapReg));
    mapFiles.forEach((sourceFile)=>fs.promises.rename(`${sourceMap}/${sourceFile}`, `${targetPath}/${sourceFile}`)
        .then(()=>{
            console.info('move file successful')
        })
        .catch(console.error)
)})
