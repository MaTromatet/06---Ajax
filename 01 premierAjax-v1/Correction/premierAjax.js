function addTable(obj){
var titres = obj.titles;
for(var i=0; i<titres.length;i++){
    $("#maTable tr:first-of-type th").eq(i).html(titres[i].title).css(titres[i].css);
    }

   for(var row=0; row< obj.items.length ; row++) {
       $("#maTable").append("<tr></tr>");
       for(var col=0 ; col<titres.length; col++){
           var temp = Object.values(obj.items[row])[col];
           if(temp)
           $("#maTable  tr:last-of-type").append("<td>"+temp+"</td>");
           else
           $("#maTable  tr:last-of-type").append("<td></td>");
        
       }
   }
}