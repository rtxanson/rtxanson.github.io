(function($){var $entry=$(".entry-content.columns");function parallaxer(elem,colors,css_attr,height){function scrollfx(){var steps=Math.floor(height/colors.length);var position=$(this).scrollTop();var currentStep=Math.floor(position/steps);if(currentStep===colors.length)currentStep=colors.length-1;var rgb=elem.css(css_attr).replace("rgb(","").replace(")","").replace(/\s/g,"").split(",");var previousColor=colors[currentStep]||colors[0];var nextColor=colors[currentStep+1]||colors[colors.length-1];var percentFromThisStep=(position-currentStep*steps)/steps;if(percentFromThisStep>1)percentFromThisStep=1;var newRgb=[Math.floor(previousColor[0]+(nextColor[0]-previousColor[0])*percentFromThisStep),Math.floor(previousColor[1]+(nextColor[1]-previousColor[1])*percentFromThisStep),Math.floor(previousColor[2]+(nextColor[2]-previousColor[2])*percentFromThisStep)];elem.css(css_attr,"rgb("+newRgb.join(",")+")")}if($(document).width()>1045){$(".after-banner").scroll(scrollfx)}else{$(document).scroll(scrollfx);$(document).bind("touchmove",scrollfx)}}function createColumns(element){if($(window).width()<880){var cols=3}else{var cols=4}$.when(function(){element.find("table, thead, tbody, tfoot, colgroup, caption, label, legend, script, style, textarea, button, object, embed, tr, th, td, li, h1, h2, h3, h4, h5, h6, form").addClass("dontsplit");element.find("h1, h2, h3, h4, h5, h6").addClass("dontend");element.find("br").addClass("removeiflast").addClass("removeiffirst")}).then(function(){element.columnize({columns:cols})}).done(function(){element.show()})}function removeColumns(){if($(".entry-content.columns").length===0){return false}var $cols=$(".entry-content.columns");var $col=$cols.find(".column");$col.removeClass("first").removeClass("last").css({width:"100%","float":"none"}).removeClass("column");$cols.removeClass("columns");return false}$(window).ready(function(){if($(window).width()>768){var $entry=$(".entry-content.columns");createColumns($entry)}var title_colors=[[255,51,0],[50,50,50],[0,0,0],[0,0,0],[0,0,0]];var box_colors=[[0,204,255],[182,182,182]];if(parseInt($(document).height()/$(window).height())>1){if($("h1.entry-title").length>0){parallaxer($("h1.entry-title"),title_colors,"color",window.innerHeight)}if($(".center-col").length>0){parallaxer($(".center-col"),box_colors,"background-color",window.innerHeight)}}else if($(document).width()>1045){if($("h1.entry-title").length>0){parallaxer($("h1.entry-title"),title_colors,"color",window.innerHeight-300)}if($(".center-col").length>0){parallaxer($(".center-col"),box_colors,"background-color",window.innerHeight-300)}}});$(window).load(function(){var $grid=$(".article-boxes");function createGrid(){if($(".isotope").length===0){$.when($(".article-boxes").addClass("article-grid"),$(".article-boxes article").addClass("columns")).then(function(){$grid.isotope({itemSelector:"article",resizable:true,layoutMode:"masonry"})}).done(function(){$grid.isotope("reLayout");if($(window).width()<=768){setTimeout(function(){$grid.isotope("reLayout")},500)}})}return false}function destroyGrid(){if($(".isotope").length>0){$grid.isotope("destroy");$(".article-boxes").removeClass("article-grid");$(".article-boxes article").removeClass("columns")}return false}if($(window).width()>=768){createGrid()}else{$(".article-boxes").removeClass("article-grid");$(".article-boxes article").removeClass("columns")}function refreshGrid(){$.when(destroyGrid()).done(createGrid())}$(window).smartresize(function(){if($(window).width()<767){destroyGrid()}else{refreshGrid()}});$("a.tag-filter").click(function(){var selector="."+$(this).attr("data-filter");if($(".isotope").length>0){$.when($grid.isotope({filter:selector})).done(function(){$grid.isotope("reLayout")})}return false})})})(jQuery);