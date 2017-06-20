var winHt=0;
var radVar = 45;
var cirDia = 55;
var radInc = 25;
var strInl = 20;
var strHov = 25;
var cirCnt = 400;
var rdCnt  = 200;
var fontSize = '1em Arial';
$(window).bind("load resize", function() {
       winHt = $(document).width();
      setWinHeight(winHt);
       $("#diagram").empty();
       $(function(){ o.init(); });
});
function setWinHeight(winHt){
if (winHt > 767){
radVar = 40;
cirDia = 50;
radInc = 20;
strInl = 20;
strHov = 25;
cirCnt = 400;
rdCnt  = 200;
var fontSize = '1em Arial';
}else if (winHt > 300){
    radVar = 25;
	cirDia = 35;
	radInc = 10;
	strInl = 10;
	strHov = 15;
        cirCnt = 200;
        rdCnt  = 100;
		var fontSize = '0.7em Arial';
}else if(winHt > 100){
    radVar = 10;
	cirDia = 20;
	radInc = 5;
	strInl = 5;
	strHov = 7;
        cirCnt = 100;
        rdCnt  = 50;
		var fontSize = '0.4em Arial';
}else{
    radVar = 0;
	cirDia = 0;
	radInc = 0;
	strInl = 0;
	strHov = 0;
        cirCnt = 0;
        rdCnt  = 0;
		var fontSize = '';
}
}

var o = {
        	init: function(){
		this.diagram();
	},
	random: function(l, u){
		return Math.floor((Math.random()*(u-l+1))+l);
	},
	diagram: function(){
                        

		var r = Raphael('diagram', cirCnt, cirCnt),
			rad = radVar,
			defaultText = 'Skills',
			speed = 250;
		r.circle(rdCnt, rdCnt, cirDia).attr({ stroke: 'none', fill: '#193340' });
		
		var title = r.text(rdCnt, rdCnt, defaultText).attr({
			font: '0.7em Arial',
			fill: '#fff'
		}).toFront();
		
                
		r.customAttributes.arc = function(value, color, rad){
			var v = 3.6*value,
				alpha = v == 360 ? 359.99 : v,
				random = o.random(91, 240),
				a = (random-alpha) * Math.PI/180,
				b = random * Math.PI/180,
				sx = rdCnt + rad * Math.cos(b),
				sy = rdCnt - rad * Math.sin(b),
				x = rdCnt + rad * Math.cos(a),
				y = rdCnt - rad * Math.sin(a),
				path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
			return { path: path, stroke: color }
		}
		
		$('.get').find('.arc').each(function(i){
			var t = $(this), 
				color = t.find('.color').val(),
				value = t.find('.percent').val(),
				text = t.find('.text').text();
			
			rad += radInc;	
			var z = r.path().attr({ arc: [value, color, rad], 'stroke-width': strInl });
			
			z.mouseover(function(){
                this.animate({ 'stroke-width': strHov, opacity: 1.75 }, 1000, 'elastic');
                if(Raphael.type != 'VML') //solves IE problem
				this.toFront();
				title.stop().animate({ opacity: 0 }, speed, '>', function(){
					this.attr({ text: text + '\n' + value + '%' }).animate({ opacity: 1 }, speed, '<');
				});
            }).mouseout(function(){
				this.stop().animate({ 'stroke-width': strInl, opacity: 1 }, speed*4, 'elastic');
				title.stop().animate({ opacity: 0 }, speed, '>', function(){
					title.attr({ text: defaultText }).animate({ opacity: 1 }, speed, '<');
				});	
            });
		});
		
	}
}

