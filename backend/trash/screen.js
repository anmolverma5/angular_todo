var prettyjson = require('prettyjson');
var screen = {
    clear: function()
    {
        process.stdout.write("\033c");
    },
    write: function(data, mode)
    {
        var output  = data;
        if(mode ==="json"){
            output = JSON.stringify(data, null, 4);
        }else if(mode === "pretty"){
            output = prettyjson.render(data);
        }else if (mode ===""){
            output = data;
        }
        console.log(output);
    }


};
module.exports = screen;