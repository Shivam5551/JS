const fs = require('fs');
const path = require('path')
const files = fs.readdirSync(__dirname);

const task = files.forEach(async (file) => {
    const fileName = file.split('.');
    if(fileName.length <= 1) {
        return;
    }
    const folderName = fileName[fileName.length - 1];
    const newPath = path.join(`${__dirname}/${folderName}`)
    if(!fs.existsSync(newPath)) {
        fs.mkdir(newPath, (err) => {});
    }
    const newFileName = await checkFilePath(newPath, file);
    fs.copyFile(file, path.join(newPath, newFileName), (err) => {});
    fs.rm(path.join(__dirname, file), (err) => {});
})

function newName(file, counter) {
    const tmp = file.split('.');
        let fileName = '';
        const n = tmp.length-1;
        for(let i = 0; i < n; i++){
            fileName += tmp[i];
        }
        const newFileName = `${fileName}${counter}.${tmp[n]}`;
        return newFileName;
}



async function checkFilePath(filePath, file) {
    let counter = 1;
    let newFileName = file;
    let newPath = path.join(filePath, newFileName);

    while (fs.existsSync(newPath)) {
        newFileName = newName(file, counter);
        newPath = path.join(filePath, newFileName);
        counter++;
    }

    return newFileName;
}

