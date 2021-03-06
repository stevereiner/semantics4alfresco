/**
 * Site and All Site Search component GET method
 */

// fetch the request params search all / search term
var siteId = (page.url.templateArgs["site"] != undefined) ? page.url.templateArgs["site"] : "";
model.siteId = siteId;
model.siteName = siteId;
model.searchTerm = (page.url.args["t"] != null) ? page.url.args["t"] : "";
model.searchTag = (page.url.args["tag"] != null) ? page.url.args["tag"] : "";

// semantic search
model.searchSemanticTag = (page.url.args["semanticTag"] != null) ? page.url.args["semanticTag"] : "";   
model.searchSemanticCategory = (page.url.args["semanticCategory"] != null) ? page.url.args["semanticCategory"] : "";   

model.searchAll = true;
if (page.url.args["a"] != undefined)
{
   // default to search all if not specified
   model.searchAll = (page.url.args["a"] != "false");
}

// fetch the site title if we got a site id
if (siteId.length != 0)
{
   // Call the repository for the site profile
   var json = remote.call("/api/sites/" + siteId);
   if (json.status == 200)
   {
      // Create javascript objects from the repo response
      var obj = eval('(' + json + ')');
      if (obj)
      {
         model.siteName = (obj.title.length != 0) ? obj.title : obj.shortName;
      }
   }
}