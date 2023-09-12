$(document).ready(function(){
	
	var isdesktop = '0';
	var position = $(window).scrollTop();
	var globalvarfromcss = document.querySelector(':root');	//I load my global variables from my CSS
	var cssvarinjs = getComputedStyle(globalvarfromcss);
	
	if ($(window).width() > 767) {
		
		isdesktop = '1';
	}else{
		$('div#top-creator p#scroll-down').css('opacity','0%'); // I hide the scroll msg for mobile
	}
	
	date =  new Date(); // used to show the current year copyright. We initialize Date object in a way to use year function on it
	year = date.getFullYear();
	document.getElementById("date").innerHTML = year; // I don't want that JS appear on my HTML page
	
	document.addEventListener('contextmenu', event => event.preventDefault());
		
	$(window).on('scroll', function() {
		
		var position = $(window).scrollTop();  //We recreated the variable to update the progress bar into scroll function
		var pagefullheight = $("body").height();
		var positionofprogressbar = 100 * position / pagefullheight;
		
		if(positionofprogressbar >= '50'){ //When we reach 50% of the portfolio, I add the bottom of the window to the formula 
			
			positionofprogressbar = 100 * (position + window.innerHeight) / pagefullheight;
			
		}
		
		$('#progresscontainer').css({"width":"" + positionofprogressbar + "%"}); //this part is for the progress bar on top of the page
		
		var scrollinabout = $('#about').offset().top;
		var isseen = position + window.innerHeight; // when we see hobbies section
		
		if (isdesktop =='1'){

			$('div#top-creator p#scroll-down').css('opacity','0');  // we hide the scroll down msg when we scroll for the first time
													//this part is for the auto activation of hobbies animations sections
			var scrollinhobbies = $('#hobbies').offset().top; 	// when we enter to hobbies section

			if(isseen >= scrollinhobbies) { 														//when user can see hobbies section, animation start
				$('.hobbies-description').css('color', cssvarinjs.getPropertyValue('--primary-color'));		//I use the value from my CSS file in JS
				$('.hobbies-left').css('margin-left','0');
				$('.hobbies-right').css('right','0');
			}
			else{
				$('.hobbies-left').css({"margin-left":"120%", "color" : "white"});
				$('.hobbies-right').css({"right":"120%", "color" : "white"}); 
			}
			
					//this part is for the auto activation about animations sections
			if(isseen >= scrollinabout) {
				$('#about-describe').css('animation','double-transition 3s forwards');
			}
			
		}

	});
	
	if (isdesktop == '1'){
		
		var scrollupcount = '0'; 

		$(window).scroll(function() {
										//This function is used to hide nav when we scroll down and reappear when we scroll up twice
			var scroll = $(window).scrollTop();

			if(scroll > position) {
				scrollupcount = '0';
			} else {
				scrollupcount ++;
			}

			position = scroll;

			if(scrollupcount >= '2' || position == '0') {
				$('nav').css('transform','translateY(0px)'); // when the user scroll up twice, nav become visible. If we reached the top of the page it is also important to let the nav visible because we can't scroll twice at this case.
			}
			else{
				$('nav').css('transform','translateY(-58px)');
			}

		});
		
	}

});