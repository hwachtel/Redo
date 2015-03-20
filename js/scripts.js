//global variables
  var current_unit="F";
  var other_unit="C";
  var city="Baltimore, MD";

  //on focus and off focus show and hide submit button
  $("#city").focus(function(){
      $("#search").animate({opacity:1},200);
    }
  );

  $("#city").focusout(function(){
      $("#search").animate({opacity:0},200);
    }
  );

  //search button
  $("#search").click(function() {
    //get new city value and plug it in
    city = $("#city").val();
    getLocation();
  });

  //switch units
  $("#other_unit").click(
    function() {
      var temp=current_unit;
      current_unit=other_unit;
      other_unit=temp;
      getLocation();
    }
  );

  //weather information method
  function getLocation() {
    loading();
    var units={"F":"imperial", "C": "metric"};
    //get json data from openweathermap
    $.getJSON("http://api.openweathermap.org/data/2.5/find?q="+city+"&units="+units[current_unit]+"&callback=?",
       function(data) {
         loaded();
         //relate icons codes to icons in metaicons
         var icons = {"01d": "B", "01n": "C", "02d": "H", "02n": "I", "03d": "N", "03n": "N", "04d": "Y", "04n": "Y", "09d": "Q", "09n": "Q", "10d": "R", "10n": "R", "11d": "0", "11n": "0", "13d": "W", "13n": "W", "50d": "J", "50n": "K"};
         // make sure that the data exits before changing it
         if (data.count>0) {
           //set icon, temperature, current unit, other unit and the description and wind speed
           $("#icon").html(icons[data.list[0].weather[0].icon]);
           $("#temp").html(Math.round(data.list[0].main.temp));
           $("#current_unit").html(current_unit);
           $("#other_unit").html(other_unit);
           $("#description span:nth-of-type(1)").html("&raquo; "+data.list[0].weather[0].description);
           //get proper wind speed units based on current unit
           var wind_units={"F":"mi/h", "C": "m/s"};
           $("#description span:nth-of-type(2)").html("&raquo; "+data.list[0].wind.speed+" "+wind_units[current_unit]);
         }
       }
    );
  }

  function loading() {
    //add the loader
    $("body").append("<div id='loader' class='center'><span class='center spinner'></span><span class='center text'>"+city+"</span></div>");
    //fade out the content
    $("#middle").animate({opacity:0},100);
    //fade in the loader
    $("#loader").animate({opacity:1},600);
    $("#loader span").animate({opacity:1},600);
  }
  function loaded() {
    //fade in the content and fade out and then delete the loader
    $("#middle").animate({opacity:1},600);
    $("#loader").animate({opacity:0},200).remove();
  }
 
  //get initial location weather on page load
  getLocation();