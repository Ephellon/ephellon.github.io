$(document).ready(function() {

  // import view port library function
  jQuery.extend(verge);

  // smooth scrolling of viewport to target
  $('a[href^="#"]').click(function(event) {
    event.preventDefault();
    $('html,body').animate({
      scrollTop: $(this.hash).offset().top - 50
    }, 900);
  });

  $('#down').click(function() {
    $('html,body').animate({
      scrollTop: $('#about').offset().top - 50
    }, 900);
  });

  var currentTime = new Date();
  var year = currentTime.getFullYear();

  // data for the portfolio cards front and back
  var projectData = [{
      title: 'Paramour',
      text: '<p>A fantastic JavaScript interpreter! JavaScript/Python/Swift Syntax with ES7 recommendations and regular updates. This version simply makes the code more developer friendly (proper variable names, commentation, etc.)</p> <b>Code:</b> Javascript<br>',

      image: ['http://ephellon.github.io/Designer/img/Paramour.png'],
      site: [
        ['CodePen', 'fa-codepen', 'https://codepen.io/Ephellon/pen/XKPVgw'],
        ['Live Site', 'fa-link', 'https://ephellon.github.io/Paramour/']
      ]
    }, {
      title: 'Mi/o',
      text: '<p>An improved LZW compression algorithm that allows the use of Base64.</p> <b>Code:</b> JavaScript<br>',

      image: ['https://ephellon.github.io/Designer/img/Mio.png'],
      site: [
        ['CodePen', 'fa-codepen', 'https://codepen.io/Ephellon/debug/NvEXbV'],
        ['Live Site', 'fa-link', 'https://ephellon.github.io/Mio/']
      ]
    }, {
      title: 'Rihanna ANTI',
      text: '<p>An edited version of Rihanna\'s <a href="http://www.rihannanow.com/music/anti/" target="blank_">ANTI</a> album art, which I thought should be her deluxe version\'s cover art.</p>',

      image: ['https://ephellon.github.io/Designer/img/ANTI.png'],
      site: [
        ['Link to Image', 'fa-link', 'https://ephellon.github.io/Designer/ANTI.png']
      ]
    }, {
      title: 'Rihanna ANTI (Alternate)',
      text: '<p>An edited version of Rihanna\'s <a href="http://www.rihannanow.com/music/anti/" target="blank_">ANTI</a> album art, which I thought should be her deluxe version\'s cover art.</p>',

      image: ['https://ephellon.github.io/Designer/img/ANTI (Alternate).png'],
      site: [
        ['Link to Image', 'fa-link', 'https://ephellon.github.io/Designer/ANTI (Alternate).png']
      ]
    }
    /*, {
      title: 'Title',
      text: '<p>Description.</p>',

      image: ['#link-to-preview-image'],
      site: [
        ['CodePen', 'fa-codepen', '#link-to-pen'],
        ['Live Site', 'fa-link', '#link-to-site']
      ]
    }
    */
  ];

  // add listener to all the cards for click flipping
  function addListener() {
    var cards = document.querySelectorAll(".card.effect_click");

    for (var i = 0; i < cards.length; i++) {
      clickListener(cards[i]);
    }

    function clickListener(card) {
      card.addEventListener("click", function() {
        this.classList.toggle("flipped");
      });
    }
  }

  // create, populate and show portfolio project cards
  function showProjectCards() {
    var html = '';

    projectData.forEach(function(project) {
      html += '<div class="col-sm-6 col-md-4">' +
              '<div class="card effect_click"><div class="card_front">' +
              '<figure><img class="img-responsive" src="' + project.image[0] + '">' +
              '<figcaption class="project-title">' +
              project.title +
              '</figcaption></figure></div>' +

              '<div class="card_back"><figure>' +
              '<div class="project-title">' + project.title + '</div>' +
              '<figcaption">' +
              '<div class="project-body">' + project.text + '</div>' +
              '<div><a data-toggle="tooltip" title="' + project.site[0][0] + '" data-placement="top" href="' + project.site[0][2] + '" target="_blank" class="btn btn-primary btn-lg btn-circle btn-lnk btn-lnk0"><i class="fa ' + project.site[0][1] + '" aria-hidden="true"></i></a>';

      if (typeof project.site[1] != 'undefined')
        html += '<a data-toggle="tooltip" title="' + project.site[1][0] + '" data-placement="top" href="' + project.site[1][2] + '" target="_blank" class="btn btn-primary btn-lg btn-circle btn-lnk btn-lnk1"><i class="fa ' + project.site[1][1] + '" aria-hidden="true"></i></a>';

      html += '</div></figcaption></figure></div>' +
              '</div>' +
              '</div>';
    });

    $('#theProjects').append(html);
    addListener();
  }

  showProjectCards();
  $(".copyright").append("<span>© " + year + " Ephellon Dantzler. All rights reserved</span>");

  // turn on bootstrap tooltips
  $('[data-toggle="tooltip"]').tooltip();

});
