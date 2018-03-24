/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  
  return moviesArray.map(function (elem) {
    var hours = 0;
    var minutes = 0;
    
    if(typeof(elem.duration) !== 'number'){
      if (elem.duration.indexOf('h') !== -1) {
        hours = parseInt(elem.duration[0], 10) * 60;
      }
      if (elem.duration.indexOf('min') !== -1) {
        minutes = parseInt(elem.duration.substring(elem.duration.length - 5, elem.duration.length - 3), 10);
      }
      return Object.assign({}, elem, { duration: hours + minutes });
    }
    else{
      return elem;
    }
  });
}
turnHoursToMinutes(movies);

// Get the average of all rates with 2 decimals
function ratesAverage(moviesArray) {
  var total = moviesArray.reduce(function(sum, movie) {
    return sum + parseInt(movie.rate);
  }, 0);

  return parseFloat((total / moviesArray.length).toFixed(2));
}

console.log("Average rate: " + ratesAverage(movies));

// Get the average of Drama Movies
function dramaMoviesRate(moviesArray) {
  // get drama movies
  var dramaMovies = moviesArray.filter(function(movie) {
    return movie.genre.includes("Drama");
  });

  // if there is not drama movies, return undefined
  if (dramaMovies.length == 0) {
    return;
  }

  var total = dramaMovies.reduce(function(sum, movie) {
    var rate = 0;
    if (movie.rate != "") {
      rate = parseInt(movie.rate);
    }
    return sum + rate;
  }, 0);

  return parseFloat((total / dramaMovies.length).toFixed(2));
}

console.log("Drama movies average rate: " + dramaMoviesRate(movies));

// Order by time duration, in growing order
function orderByDuration(moviesArray) {
  // get duration in minutes
  var minutesMovies = turnHoursToMinutes(moviesArray);
  var durationOrder = minutesMovies.sort(function(a, b) {
    if (a.duration < b.duration) {
      return -1;
    }

    if (a.duration > b.duration) {
      return 1;
    }

    if (a.duration == b.duration) {
      // if duration is equal, order alphatically
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }

      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }

      return 0;
    }
  });

  return durationOrder;
}

// How many movies did STEVEN SPIELBERG
function howManyMovies(moviesArray) {
  if (moviesArray == "") {
    return;
  }

  var dramaSpielberg = moviesArray.filter(function(movie) {
    return (
      movie.genre.includes("Drama") && movie.director == "Steven Spielberg"
    );
  });

  if (dramaSpielberg.length == 0) {
    return "Steven Spielberg directed 0 drama movies!";
  }

  return (
    "Steven Spielberg directed " + dramaSpielberg.length + " drama movies!"
  );
}

// Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  var movies = [];

  // order movies
  var ordered = moviesArray.sort(function(a, b) {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }

    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }

    return 0;
  });

  // get 20 movies
  if (ordered.length < 20) {
    movies = moviesArray.slice(0, moviesArray.length);
  } else {
    movies = moviesArray.slice(0, 20);
  }  

  // get only title
  var titles = movies.map(function(e) {
    return e.title;
  });

  return titles;
}

// Best yearly rate average

function bestYearAvg(moviesArray) {

  if(moviesArray.length == 0) {
    return;
  }

  var numYear = {};
  var rateYear = {};
  var avgYear = {};

  moviesArray.forEach( function(e) {
    if( rateYear[e.year] ) {
      numYear[e.year] += 1;
      rateYear[e.year] += parseFloat(e.rate);
      avgYear[e.year] = parseFloat( (rateYear[e.year]/numYear[e.year]).toFixed(2) );
    } else {
      rateYear[e.year] = parseFloat(e.rate);
      numYear[e.year] = 1;
      avgYear[e.year] = parseFloat(e.rate);
    }
  });

  var year = Object.keys(avgYear).reduce( function(a,b) {
    if( avgYear[a] === avgYear[b] ) {
      if( b < a ) {
        return b;
      }
      return a;
    } else if( avgYear[a] > avgYear[b] ) {
      return a;
    }
    return b;
  });

  return "The best year was " + year + " with an average rate of " + avgYear[year];
}
