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
        ['CodePen', 'fa-codepen', 'https://codepen.io/Ephellon/full/XKPVgw'],
        ['Live Site', 'fa-link', 'https://ephellon.github.io/Paramour/']
      ]
    }, {
      title: 'Mi/o',
      text: '<p>An improved LZW compression algorithm that allows the use of Base64.</p> <b>Code:</b> JavaScript<br>',

      image: ['https://ephellon.github.io/Designer/img/Mio.png'],
      site: [
        ['CodePen', 'fa-codepen', 'https://codepen.io/Ephellon/full/NvEXbV'],
        ['Live Site', 'fa-link', 'https://ephellon.github.io/Mio/']
      ]
    }, {
      title: 'Rihanna: ANTI',
      text: '<p>An edited version of Rihanna\'s <a href="http://www.rihannanow.com/music/bitch-better-have-my-money/" target="blank_">Bitch Better Have My Money</a> album art./p>',

      image: ['https://ephellon.github.io/Designer/img/Bitch Better Have My Money.jpg'],
      site: [
        ['Link to Image', 'fa-link', 'https://ephellon.github.io/Designer/img/Bitch Better Have My Money.jpg']
      ]
    }, {
      title: 'Rihanna: ANTI (Alternate)',
      text: '<p>An edited version of Rihanna\'s <a href="http://www.rihannanow.com/music/anti/" target="blank_">ANTI</a> album art, which I thought should be her deluxe version\'s cover art.</p>',

      image: ['https://ephellon.github.io/Designer/img/ANTI (Alternate).png'],
      site: [
        ['Link to Image', 'fa-link', 'https://ephellon.github.io/Designer/img/ANTI (Alternate).png']
      ]
    }, {
      title: 'Rihanna: Bitch Better Have My Money',
      text: '<p>Preffered album art for Cardi B\'s <a target="blacnk_" href="https://itunes.apple.com/us/album/bodak-yellow-feat-kodak-black-single/id1286929334">Bodak Yellow (iTunes)</a>.</p>',

      image: ['https://ephellon.github.io/Designer/img/Bodak Yellow.png'],
      site: [
        ['Link to Image', 'fa-link', 'https://ephellon.github.io/Designer/img/Bodak Yellow.png']
      ]
    }, {
      title: 'J. Cole: Born Sinner',
      text: '<p>An edited version of J. Cole\'s <a href="https://dreamville.lnk.to/BornSinnerDeluxeDB" target="blank_">Born Sinner (Deluxe)</a> album art. I thought "Forbidden Fruit" should\'ve had a different cover (as a single).</p>',

      image: ['https://ephellon.github.io/Designer/img/Forbidden Fruit.jpg'],
      site: [
        ['Link to Image', 'fa-link', 'https://ephellon.github.io/Designer/img/Forbidden Fruit.jpg']
      ]
    }, {
      title: 'Michael Jackson: Dirty Diana',
      text: '<p>A single version of Michael Jackson\'s <a href="http://www.michaeljackson.com/track/dirty-diana-4/" target="blank_">Dirty Diana</a>. It feels more like the song than the original, and 2017 album arts.</p>',

      image: ['https://ephellon.github.io/Designer/img/Dirty Diana.png'],
      site: [
        ['Link to Image', 'fa-link', 'https://ephellon.github.io/Designer/img/Dirty Diana.png']
      ]
    }, {
      title: 'Cardi B: Bodak Yellow',
      text: '<p>Preffered album art for Cardi B\'s <a target="blacnk_" href="https://itunes.apple.com/us/album/bodak-yellow-feat-kodak-black-single/id1286929334">Bodak Yellow (iTunes)</a>.</p>',

      image: ['https://ephellon.github.io/Designer/img/Bodak Yellow.png'],
      site: [
        ['Link to Image', 'fa-link', 'https://ephellon.github.io/Designer/img/Bodak Yellow.png']
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
