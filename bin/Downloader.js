(function(){var a,b,c,d,e,f,g,h,i,j,k;g=require("fs"),k=require("winston"),i=require("request"),c=require("cheerio"),h=require("inquirer"),a=null,d=function(a,b,c){return k.info("Download started."),console.log("Download started."),i.head(a,function(d,e,f){var h;return k.info("Data received, writing to file."),h=g.createWriteStream(b),i(a).pipe(h).on("close",function(){return k.info("Wrote data."),c()})})},f=function(b,c){var e,f;return k.info("Going to download track."),e={url:c,headers:{Accept:"*/*",Referer:"http://www.123savemp3.net","User-agent":"Mozilla/5.0 (Macintosh)"}},k.info("Created download headers."),f=a,null==a&&(f=process.cwd()+"/"+b+".mp3"),k.info("Calculated destination."),d(e,f,function(){return k.info("Bye."),console.log("Done.")})},b=function(a,b){return k.info("Ask user to select a song."),h.prompt([{type:"confirm",name:"ready",message:"Are you ready to pick a song?"},{when:function(a){return a.ready},type:"list",name:"song",message:"Choose a song to download:",choices:a}],function(c){var d,e,g;return c.ready?(k.info("Received answer from user."),e=c.song,d=a.indexOf(e),g="http://123savemp3.net"+b[d],k.info("Should download: "+e),f(e,g)):(k.info("Bye."),console.log("Done."))})},j=function(a){return k.info("Start scrape for source: "+a),i(a,function(a,d,e){var f,g,h,i;return k.info("Received answer from server."),f=c.load(e),k.info("Parsed page with $."),h=f(".item").find(".play"),i=[],g=[],k.info("Fetched links."),f(".item").find(".desc").each(function(a,b){return i.push(f(this).text().trim()),g.push(f(h[a]).attr("data-url"))}),k.info("Present titles to user."),i.length>0?b(i,g):console.log("No results found.")})},e=function(b,c){var d;return k.info("Download query: "+b),null!=c&&(a=c),d="http://www.123savemp3.net/mp3/"+encodeURIComponent(b),j(d)},module.exports.download=e}).call(this);