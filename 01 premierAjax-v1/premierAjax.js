function addTable(o) {
  $.each(o.titles, function (i, element) {
    $("#maTable  tr:nth-child(1) th:nth-child(" + (i + 1) + ")")
      .html(element.title)
      .css(element.css);
  });
  $.each(o.items, function (i, element) {
    $("#maTable").append(
      "<tr><td>" +
        element.libelle +
        "</td><td>" +
        element.prixU +
        "</td><td>" +
        element.qte +
        "</td><td>" +
        element.tauxTVA +
        "</td></tr>"
    );
  });

  /*   var tableTitles = o.titles;
  var tableItems = o.items;
  console.log(tableTitles); */
}
