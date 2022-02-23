function addTable(obj){
var titres = obj.titles;
$("body").append('<table id="maTable"><thead><tr></tr></thead><tbody></tbody><tfoot><tr></tr></tfoot></table>');
for(var i=0; i<titres.length;i++){
    $("#maTable thead tr").append("<th></th>");
    $("#maTable thead tr th").eq(i).html(titres[i].title).css(titres[i].css);
    $("#maTable tfoot tr").append("<td></td>");
    }

   for(var row=0; row< obj.items.length ; row++) {
       $("#maTable tbody").append("<tr></tr>");
       for(var col=0 ; col<titres.length; col++){
           var temp = Object.values(obj.items[row])[col];
           if(temp)
           $("#maTable tbody tr:last-of-type").append("<td>"+temp+"</td>");
           else
           $("#maTable tbody tr:last-of-type").append("<td></td>");
        
       }
   }


   




}


function myAjax(){

    $.ajax({
        url : 'premierAjax.php',
        type : 'POST',
        dataType : 'json',
        async	:	true,
        data: '',
        success : function(result){
            ajaxSuccess(result);				
        },
        error : function(result){
            ajaxError(result);
            
        },
        complete : function(result){
            // faire qq chose quand c'est fini 
            console.log('fini');
        }
        
    });
}

function ajaxSuccess(o){
	console.log(o);	
    obj = o; 
}
	
function ajaxError(o){
	alert('error');
	console.log(o);
}

function calculer(){

    var total= 0;
    $("#"+ obj.id_table +" tbody tr").each(function(){
        var prixU = parseFloat($(this).children("td:nth-of-type(2)").text());
        var qte = parseFloat($(this).children("td:nth-of-type(3)").text());
        var tauxTva = parseFloat($(this).children("td:nth-of-type(4)").text());
        var totalHt = prixU*qte;
        var tva = totalHt * tauxTva;
        var ttc = (totalHt + tva);
        $(this).children("td:nth-of-type(5)").text(totalHt.toFixed(2));
        $(this).children("td:nth-of-type(6)").text(tva.toFixed(2));
        $(this).children("td:nth-of-type(7)").text(ttc.toFixed(2));
        console.log(totalHt);
        total += ttc;
        
    });
    $("#"+ obj.id_table +"tfoot tr td:last-of-type").text(total.toFixed(2));

}