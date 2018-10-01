$('.search').click(searchArticles);

function searchArticles() {
  let val = $('.input').val();
  let request = encodeURIComponent(val);
  let url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=&list=search&utf8=1&srsearch=' + request + '&sroffset=0&srwhat=text&srprop=snippet';
  if (val) {
 $.ajax({
    type: "GET",
    url: url,
    dataType: 'jsonp',
    success: function(data) {
    console.log(data);
      $('.content').add('.footer').css('opacity', 0);
      $('.control').animate({transform: 'none', padding: '1% 0', top: '10%'}, 500, function(){
        $('.content').empty().animate({opacity: 1}, 300);
        if (data.query.search.length > 0) {
    data.query.search.forEach(function(elem){
      $('.content').append('<a class="article" href="http://en.wikipedia.org/?curid=' + elem.pageid + '" target="_blank"><h2 class="article-header">' + elem.title + '</h2><p class="article-text">...' + elem.snippet + '...</p></a>');
       $('.footer').css({position: 'static', opacity: 1}); 
    })
        } else {
          $('.content').text('No resutls').css({'text-align': 'center', border: 'none'});
          $('.footer').css({'opacity': 1});
        }
      
      });   
  },
   error: function(data) {
      console.log(data);
      $('.content').html('Error');
   }
  })}
  else {
    $('.input').animate({backgroundColor: '#FFAE40'}, 300, function() {
      $('.input').animate({backgroundColor: '#FFC640'}, 300
    )
  });
}}