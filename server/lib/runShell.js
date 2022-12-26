const { exec } = require("child_process");

const runShell = shell => new Promise((resolved, rejected)=>{
    exec(shell,(error, stdout)=>{
        if(error){
            rejected(stdout);
        }else{
            resolved(stdout);
        }
    })
})
module.exports = runShell;