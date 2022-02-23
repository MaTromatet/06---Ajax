let myObject;

//--------------------------------------------------------------------------------------------------------

$(document).ready(function () {
  $("button#meteo").click(function () {
    ville = $("select#ville option:selected").val();

    myAjax({ ville: ville });
  });

  $("button#meteo2").click(function () {
    ville = $("#ville2").val();

    myAjax({ ville: ville });
  });

  $("button#graph").click(function () {
    graphique(myObject);
  });
});

//--------------------------------------------------------------------------------------------------------

function myAjax(ville) {
  $.ajax({
    url: "meteoAjax-v2.php",
    type: "POST",
    dataType: "json",
    async: true,
    data: ville,
    success: function (result) {
      myObject = result;
      ajaxSuccess(result);
    },
    error: function (result) {
      ajaxError(result);
    },
    complete: function (result) {
      console.log("fini");
    },
  });
}

//--------------------------------------------------------------------------------------------------------

function ajaxSuccess(obj) {
  $("#container").html("");
  if (obj.errors) {
    $("body #madiv").html("");

    $("body #madiv").append("<h1>" + obj.errors[0].text + "</h1>");
  } else {
    addTable(obj);
  }
}

//--------------------------------------------------------------------------------------------------------

function ajaxError(obj) {
  console.log(obj);
}

function addTable(obj) {
  $("body #madiv").html("");
  $("body #madiv").append("<h1>" + obj.city_info.name + "</h1>");
  $("body #madiv").append("<h2>" + obj.current_condition.date + "</h2>");
  $("body #madiv").append(
    $(
      "<table id='prev_jours'><tr><td>Jour</td><td>Icône</td><td>Cond.</td><td>Tmin</td><td>Tmax</td></tr></table>"
    )
  );

  $.each(obj, function (key, value) {
    var reg = new RegExp("^fcst_day_");
    if (key.match(reg)) {
      $("#prev_jours tbody").append(
        `<tr><td>${value.day_long}</td><td><img src='${value.icon}'/></td><td>${value.condition}</td><td>${value.tmin}°C</td><td>${value.tmax}°C</td></tr>`
      );
    }
  });
}

//--------------------------------------------------------------------------------------------------------

function graphique(obj) {
  if (obj !== undefined && !obj.errors) {
    let tabTempMin = [];
    let tabTempMax = [];
    let tabJour = [];

    $.each(obj, function (key, value) {
      let reg = new RegExp("^fcst_day_");
      if (key.match(reg)) {
        tabTempMin.push(value.tmin);
        tabTempMax.push(value.tmax);
        tabJour.push(value.day_long);
      }
    });

    const chart = Highcharts.chart("container", {
      chart: {
        type: "column",
      },
      title: {
        text: "Températures",
      },
      subtitle: {
        text: "Source : Météo",
      },
      xAxis: {
        categories: tabJour,
      },
      yAxis: {
        title: {
          text: "Températures (°C)",
        },
      },
      series: [
        {
          name: obj.city_info.name + " (Min)",
          data: tabTempMin,
        },
        {
          name: obj.city_info.name + " (Max)",
          data: tabTempMax,
        },
      ],
    });
    chart.reflow();
  }
}
