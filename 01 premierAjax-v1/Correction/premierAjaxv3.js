function addTable(obj) {
    var titres = obj.titles;
    $("body").append('<table id="maTable"><thead><tr></tr></thead><tbody></tbody><tfoot><tr></tr></tfoot></table>');
    for (var i = 0; i < titres.length; i++) {
        $("#maTable thead tr").append("<th></th>");
        $("#maTable thead tr th").eq(i).html(titres[i].title).css(titres[i].css);
        $("#maTable tfoot tr").append("<td></td>");
    }

    for (var row = 0; row < obj.items.length; row++) {
        $("#maTable tbody").append("<tr></tr>");
        for (var col = 0; col < titres.length; col++) {
            var temp = Object.values(obj.items[row])[col];
            if (temp)
                $("#maTable tbody tr:last-of-type").append("<td>" + temp + "</td>");
            else
                $("#maTable tbody tr:last-of-type").append("<td></td>");

        }
    }







}


function myAjax() {

    $.ajax({
        url: 'premierAjax.php',
        type: 'POST',
        dataType: 'json',
        async: true,
        data: '',
        success: function (result) {
            ajaxSuccess(result);
        },
        error: function (result) {
            ajaxError(result);

        },
        complete: function (result) {
            // faire qq chose quand c'est fini 
            console.log('fini');
        }

    });
}

function ajaxSuccess(o) {
    console.log(o);
    obj = o;
}

function ajaxError(o) {
    alert('error');
    console.log(o);
}

function calculer() {

    var total = 0;
    $("#maTable tbody tr").each(function () {
        var qte;
        var prixU = parseFloat($(this).children("td:nth-of-type(2)").text());
        // if($(this).children("td:nth-of-type(3)").has("span").length){
        //     qte = parseFloat($(this).children("td:nth-of-type(3)").children("span").text());
        // }else{

        //     qte = parseFloat($(this).children("td:nth-of-type(3)").text());
            
        // }
        qte = parseFloat($(this).children("td:nth-of-type(3)").children("span").text() || $(this).children("td:nth-of-type(3)").text());
        var tauxTva = parseFloat($(this).children("td:nth-of-type(4)").text());
        var totalHt = prixU * qte;
        var tva = totalHt * tauxTva;
        var ttc = (totalHt + tva);
        $(this).children("td:nth-of-type(5)").text(totalHt.toFixed(2));
        $(this).children("td:nth-of-type(6)").text(tva.toFixed(2));
        $(this).children("td:nth-of-type(7)").text(ttc.toFixed(2));
        console.log(totalHt);
        total += ttc;

    });
    $("tfoot tr td:last-of-type").text(total.toFixed(2));

}

function modifQte() {
    console.log("ici");
    $("#maTable tbody td:nth-of-type(3)").each(function () {

        var content = $(this).html();
        console.log($(this).html());
        content = '<button class="dec"> - </button><span>' + content + '</span><button class="inc"> + </button>';
        $(this).html(content);
   



    });


    $("button.dec").click(function () {
        $(this).next().next().prop("disabled", false);
        var qte = parseInt($(this).next().text());
        qte -= 1;
        $(this).next().text(qte);
        if (qte === 0) $(this).prop("disabled", true);
        calculer();
    });

    $("button.inc").click(function(){
        $(this).prev().prev().prop("disabled", false);
        var qte = parseInt($(this).prev().text());
        qte += 1;
        $(this).prev().text(qte);
        if (qte === 9) $(this).prop("disabled", true);
        calculer();
    });

}