(function(a){a.fn.fancyQueries=function(){a(document).click(function(b){if(!(a(b.target).closest(".search").length||a(b.target).hasClass("queryeditor")||a(b.target).hasClass("showmore"))){a(".qdropdown").hide();a(".queries").removeClass("open queryeditor")}});a("#search").click(function(b){a(document).click()});this.each(function(){var g=a(".qdropdown",this);var c=this;var d=a(c).attr("data-url");var f;var h=a(this).offset();var b=a(this).outerHeight();var e=a(this).outerWidth();if(!g.length){g=a("<div class='qdropdown'></div>");g.appendTo(this).hide()}f=a('<div class="queries"><span class="arrow"></span></div>"');f.attr("data-url",d);f.appendTo(a(this));a("input",this).css("margin-left","24px");a("input",this).css("width",function(){e=a(this).width()-24;return e});f.click(function(){if(g.filter(":visible").length>0){g.hide();a(".queries").removeClass("open queryeditor")}else{a(".qdropdown").hide();a(".queries").removeClass("open queryeditor");a.get(d,function(k){var i,j,l;g.html(k).css("top",b-1);if(g.width()+h.left>a("#maincontent").width()){g.removeClass("left-menu").addClass("right-menu")}else{g.removeClass("right-menu").addClass("left-menu")}g.show(200);a(".one-line-ellipsis").ellipsis();f.addClass("open");i=a("ul:first",g);a("li.item:gt(9)",i).hide();j=a("li.item:hidden",i).length;if(j){l=a('<a class="showmore">Show '+j+" more</a>");a("#search_list").append(l);l.click(function(m){m.preventDefault();a("li.item",i).show();a(this).remove()})}})}});a(".queryeditor",g[0]).live("click",function(j){var i="<h1>Query Editor</h1>";i+="<div><h2>FIXME</h2>";i+="<p style='width: 400px; min-height: 100px;'>Initially I think this would provide help on how to compose a query. Once we have a better idea on what the queries look like, a gui editor.</p><a href='#' onclick='$(document).click()'>Close</a></div>";f.removeClass("open").addClass("queryeditor");g.empty().hide().addClass("queryeditor").html(i);if(g.width()+h.left>a("#maincontent").width()){g.removeClass("left-menu").addClass("right-menu")}else{g.removeClass("right-menu").addClass("left-menu")}g.show(200)})})}})(jQuery);
/*
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);var thisPanel=null;var subpanel=null;var subpanelSpacing=55;var panelLeft=null;var count=0;$(document).ready(function(){$(".left").resize(function(){var d=$(".panel");panelLeft=$(this).width();$(".block").width(panelLeft-17);d.width(940-panelLeft);$(".right").width(898-panelLeft);if(d.hasClass("opened")){d.css({left:(panelLeft)})}$(".left #new").css({width:"10em"});$(".list-title").width(panelLeft);$("#list-title").width(panelLeft);if($(this).hasClass("column_panel_3")){var e=Math.floor((panelLeft/430)*100);e=(e>100)?100:e;$("#systems .block").css({"font-size":parseInt(e,10)+"%"})}}).resize();thisPanel=$("#panel");subpanel=$("#subpanel");var c=null;var b=null;var a=null;$(".block").live("click",function(d){if(d.target.nodeName==="A"&&d.target.className.match("content_add_remove")){return false}else{c=$(this);a=c.attr("data-ajax_url");b=c.attr("id");if(d.ctrlKey&&!thisPanel.hasClass("opened")&&!(d.target.id=="new")&&!c.hasClass("active")){if(c.hasClass("active")){c.removeClass("active")}else{c.addClass("active");c.find(".arrow-right").hide()}}else{if(d.ctrlKey&&!thisPanel.hasClass("opened")&&!(d.target.id=="new")&&c.hasClass("active")&&$(".block.active").length>1){c.removeClass("active")}else{if(c.hasClass("active")&&thisPanel.hasClass("opened")){KT.panel.closePanel(thisPanel)}else{$.bbq.pushState({panel:b});c.find(".arrow-right").show()}}}KT.panel.updateResult();return false}});$(".close").live("click",function(){if($(this).attr("data-close")==="panel"||($(this).attr("data-close")!=="subpanel"&&$(this).parent().parent().hasClass("opened"))){KT.panel.closePanel(thisPanel);KT.panel.closeSubPanel(subpanel)}else{KT.panel.closeSubPanel(subpanel)}return false});$(window).resize(function(){KT.panel.panelResize($("#panel_main"),false);KT.panel.panelResize($("#subpanel_main"),true)});$(".subpanel_element").live("click",function(){KT.panel.openSubPanel($(this).attr("data-url"))});$(".navigation_element > a").live("click",function(){$.ajax({cache:"false",type:"GET",url:$(this).attr("href"),dataType:"html",success:function(f){var e=KT.panel.get_expand_cb(),d=function(){};thisPanel.find(".panel-content").html(f);KT.common.jscroll_init($(".scroll-pane"));KT.common.jscroll_resize($(".jspPane"));KT.panel.panelResize($("#panel_main"),false);for(d in e){e[d]()}}});return false});$(".left").resizable({maxWidth:550,minWidth:350,grid:25,handles:"e",autoHide:true});KT.panel.actions.registerAction("select_none",{});$("#select-none").mouseup(function(){$(".block.active").removeClass("active");KT.panel.updateResult()});KT.panel.updateResult();KT.panel.actions.registerDefaultActions();$(".search").fancyQueries();if(KT.panel.control_bbq){$(window).bind("hashchange",KT.panel.hash_change);$(window).trigger("hashchange")}});var list=(function(){return{last_child:function(){return $("#list").children().last()},add:function(a){$("#list").append($(a).hide().fadeIn(function(){$(this).addClass("add",250,function(){$(this).removeClass("add",250)})}));return false},remove:function(a){$("#"+a).fadeOut(function(){$(this).empty().remove();KT.panel.updateResult()});return false},refresh:function(d,b,a){var c=$("#"+d);$.ajax({cache:"false",type:"GET",url:b,dataType:"html",success:function(e){notices.checkNotices();c.html(e);if(a){a()}}});return false}}})();$(window).ready(function(){if($("#container").length>0){KT.panel.registerPanel($("#panel-frame"),0);$(window).scroll(KT.panel.list.extend)}KT.panel.actions.resetActions()});KT.panel=(function(i){var v=false,d=true,m=0,h=[],t="",b=[],w=function(){},g=function(){},p=function(B){var A=i("#"+KT.common.escapeId(B)),y=A.attr("data-ajax_url"),z=null;thisPanel=i("#panel");subpanel=i("#subpanel");if(A.length){if(!thisPanel.hasClass("opened")&&thisPanel.attr("data-id")!==B){i(".block.active").removeClass("active");thisPanel.css({"z-index":"200"});thisPanel.parent().css({"z-index":"1"});thisPanel.animate({left:(panelLeft)+"px",opacity:1},200,function(){i(this).css({"z-index":"200"})}).removeClass("closed").addClass("opened").attr("data-id",B);A.addClass("active");z=B;o(B,y,thisPanel,false)}else{if(thisPanel.hasClass("opened")&&thisPanel.attr("data-id")!==B){g();i(".block.active").removeClass("active");r(subpanel);thisPanel.css({"z-index":"200"});thisPanel.parent().css({"z-index":"1"});thisPanel.addClass("opened").attr("data-id",B);i("#"+z).removeClass("active");A.addClass("active");z=B;thisPanel.removeClass("closed");o(B,y,thisPanel,false)}}}},o=function(A,y,B,z){var D=B.find(".spinner"),C=B.find(".panel-content");D.show();C.hide();i.ajax({cache:true,url:y,dataType:"html",success:function(G,E,H){var F=C.html(G);var I;D.hide();F.fadeIn(function(){i(".panel-content :input:visible:enabled:first").focus()});KT.common.jscroll_init(i(".scroll-pane"));KT.common.jscroll_resize(i(".jspPane"));if(z){l(i("#subpanel_main"),z)}else{l(i("#panel_main"),z)}for(I in b){b[I](A)}i(".one-line-ellipsis").ellipsis(true)},error:function(G,E,F){D.hide();C.html("<h2>"+i18n.error+"</h2><p>"+i18n.row_error+F+"</p>").fadeIn()}})},l=function(y,z){if(y.length>0){e(y,z)}return y},e=function(I,G){var E=i(".left"),D=i("#panel"),y=500,B=Math.floor(i(".list").offset().top-60),H=D.find(".head").height(),z=D.find("nav").height()+10,F=I.height(),K=y-H-z,A=I.parent().parent().parent().parent(),C=0,L=i(window).height(),J;if(L<=(K+80)&&E.height()>550){K=L-80-H-z}if(G){J=(i("#subpanel").find("nav").length>0)?i("#subpanel").find("nav").height()+10:0;K=K-subpanelSpacing*2-J+z}I.height(K);if(I.length>0){I.data("jsp").reinitialise()}},a=function(z){var z=z||i("#panel"),A=z.find(".panel-content"),y;if(z.hasClass("opened")){i(".block.active").removeClass("active");z.animate({left:0,opacity:0},400,function(){i(this).css({"z-index":"-1"})}).removeClass("opened").addClass("closed").attr("data-id","");A.html("");y=KT.common.scrollTop();i.bbq.removeState("panel");i(window).scrollTop(y);x();w(name);r(subpanel)}return false},r=function(y){if(y.hasClass("opened")){y.animate({left:0,opacity:0},400,function(){i(this).css({"z-index":"-1"});i(this).removeClass("opened").addClass("closed")});x()}return false},x=function(){var y=i(".block.active").length;i("#select-result").html(y+i18n.items_selected).effect("highlight",{},200);i(".numitems").html(y).effect("highlight",{},200);n.resetActions(y);return y},q=function(){var y=[];i(".block.active").each(function(){var z=i(this).attr("id");y.push(z.split("_")[1])});return y},u=function(y){var z=i("#subpanel");z.animate({left:panelLeft+"px",opacity:1},200,function(){i(this).css({"z-index":"204"});i(this).parent().css({"z-index":"2"});i(this).removeClass("closed").addClass("opened")});o("",y,z,true)},f=function(A,F){var D=KT.common.scrollTop(),E=KT.common.scrollLeft(),z=A.css("position")==="fixed",y=i("#container"),B=parseInt(y.position().top,10),C=y.find(".left");top_position=C.position().top;F+=i("#maincontent").position().left;if(A.length>0){if(C.height()>550){if(D<B){A.css({position:"absolute",top:top_position,left:""})}else{if(!z&&A.position().top-KT.common.scrollTop()>40){A.stop().css({position:"fixed",top:40,})}else{if((i(".left").position().top+i(".left").height()-20)<(A.position().top+A.height()+40)){A.css({position:"absolute",top:(i(".left").position().top+i(".left").height())-A.height()-40,})}else{if(!z&&(i(".left").position().top+i(".left").height())>(A.position().top+A.height()+40)){A.stop().css({position:"fixed",top:40,})}}}}}}},c=function(y){if(y.length>0){if(y.css("position")==="fixed"){y.css("left","")}}},j=function(A,C){var z=i.bbq.getState("panel"),y=i.bbq.getState("search"),B=i("#search");if(C){if(z&&y){B.val(y);i("#search_form").trigger("submit",[C,function(){p(z)}])}else{if(z&&!y){i("#search_form").trigger("submit",[C,function(){p(z)}])}else{if(y&&!z){B.val(y);i("#search_form").trigger("submit",[C])}else{i("#search_form").trigger("submit",[C])}}}}else{if(B.val()!==y&&y!==undefined){B.val(y);i("#search_form").trigger("submit",[C])}else{if(z){p(z)}else{if(!z){a();if(B.val()!==""&&y===undefined){B.val("");i("#search_form").trigger("submit")}}}}}return false},k=function(y,A){var z={panel:y,offset:A};i(window).scroll(function(){f(y,A)});i(window).resize(function(){c(y)});i(document).bind("helptip-closed",function(){f(y,A)});i(document).bind("helptip-opened",function(){f(y,A)});h.push(z)},s=function(){var C=new Object;var y=window.location.search.substring(1);var B=y.split("&");for(var z=0;z<B.length;z++){var A=B[z].split("=");C[A[0]]=A[1]}return C},n=(function(){var y={};var A=function(){var C=i(".panel_action");C.each(function(E){var F=i(this);var D=F.find(".options");F.find("a").click(function(){if(!F.hasClass("disabled")){D.slideDown("fast")}});F.find(".cancel").click(function(){if(i(this).hasClass("disabled")){return}D.slideUp("fast")});F.find(".trigger").click(function(){var I=y[F.attr("data-id")];var H=function(){D.slideUp("fast");F.find("input").removeClass("disabled");if(I.success_cb){I.success_cb(q())}};var G=function(){F.find("input").removeClass("disabled");if(I.error_cb){I.error_cb(q())}};if(i(this).hasClass("disabled")){return}F.find("input").addClass("disabled");if(I.ajax_cb){I.ajax_cb(q())}else{i.ajax({cache:"false",type:I.method,url:I.url,data:{ids:q()},success:H,error:G})}})});x()},B=function(C,D){y[C]=D},z=function(C){i.each(y,function(E,F){if(!F.unselected_action){var G=i("[data-id="+E+"]");if(C>0){G.removeClass("disabled")}else{G.addClass("disabled")}}});var D=i(".panel_action");D.each(function(E){var F=i(this);F.find(".cancel").click()})};return{registerAction:B,registerDefaultActions:A,resetActions:z}})();return{set_expand_cb:function(y){b.push(y)},get_expand_cb:function(){return b},set_contract_cb:function(y){w=y},set_switch_content_cb:function(y){g=y},select_item:p,hash_change:j,openSubPanel:u,updateResult:x,closeSubPanel:r,closePanel:a,panelResize:l,panelAjax:o,control_bbq:d,registerPanel:k,queryParameters:s,actions:n}})(jQuery);KT.panel.list=(function(){var f=0,h=0,c=0,n=false,e=function(){},b=function(s,r,q,p){if(p){h=s;f=r;c=q}else{h+=s;f+=r;c+=q}$("#total_items_count").html(f);$("#current_items_count").html(h);$("#total_results_count").html(c)},a=function(){return $("#list section").children().last()},d=function(){return $("#list section").children().first()},o=function(p){$("#list section").prepend($(p).hide().fadeIn(function(){$(this).addClass("add",250,function(){$(this).removeClass("add",250)})}));return false},g=function(p){$("#"+p).fadeOut(function(){$(this).empty().remove();b(-1,-1,-1)});return false},l=function(s,q,p){var r=$("#"+s);$.ajax({cache:"false",type:"GET",url:q,dataType:"html",success:function(t){notices.checkNotices();r.html(t);var u=r.find("#heading_title");if(u.length==0){u=r.children("div:first")}$(".pane_heading").html(u.html());if(p){p()}}});return false},k=function(){var s=$("#list"),u=s.find(".block").size(),r=s.attr("data-page_size"),p=s.attr("data-scroll_url"),q=KT.common.getSearchParams(),t={offset:u};if(s.hasClass("ajaxScroll")&&!n&&KT.common.scrollTop()>=($(document).height()-$(window).height())-700){n=true;if(parseInt(r)>parseInt(u)){return}if(q){$.extend(t,q)}$(".expand_list").append('<div class="list-spinner"> <img src="/katello/images/spinner.gif" class="ajax_scroll">  </div>');$.ajax({type:"GET",url:p,data:t,cache:false,success:function(v){var w=$(".expand_list").find("section");if(w.length==0){w=$(".expand_list")}n=false;w.append(v.html);$(".list-spinner").remove();if(v.current_items===0){s.removeClass("ajaxScroll")}b(v.current_items,0,0);e()},error:function(){$(".list-spinner").remove();n=false}})}},j=function(p,q){q=q||{};i(p,q);if(KT.panel_search_autocomplete){KT.search.enableAutoComplete({data:KT.panel_search_autocomplete})}KT.panel.control_bbq=false;$(window).bind("hashchange",KT.panel.hash_change);$(document).ready(function(){if(q.extra_params){for(var r=0;r<q.extra_params.length;r+=1){q.extra_params[r]["init_func"]()}}$(window).trigger("hashchange",[true])});if(q.create){$("#"+q.create).live("submit",function(u){var s=$(this).find('input[type|="submit"]'),t=KT.common.getSearchParams()||{},r=q.validation||function(){return true};u.preventDefault();if(q.extra_create_data){$.extend(t,q.extra_create_data())}if(r()){s.attr("disabled","disabled");$(this).ajaxSubmit({url:KT.routes[p+"_path"](),data:t,success:m,error:function(v){s.removeAttr("disabled");notices.checkNotices()}})}})}},m=function(p){var q;if(p.no_match){KT.panel.closePanel($("#panel"));notices.checkNotices();b(0,0,1)}else{o(p);KT.panel.closePanel($("#panel"));q=d().attr("id");$.bbq.pushState({panel:q});KT.panel.select_item(q);notices.checkNotices();b(1,1,1)}},i=function(p,q){$("#search_form").live("submit",function(A,z,s){var y=$("#search_button"),x=$("#list"),r=KT.routes["items_"+p+"_path"](),t=t||0,w=q.extra_params,v={},z=z||false,s=s||function(){};A.preventDefault();y.attr("disabled","disabled");x.find("section").empty();x.find(".spinner").show();if($(this).serialize()!=="search="){$.bbq.pushState($(this).serialize())}r+="?offset="+t;var B=KT.panel.queryParameters();if(B){for(var C in B){r+="&"+C+"="+B[C]}}if(w){for(var u=0;u<w.length;u+=1){v[w[u]["hash_id"]]=$.bbq.getState(w[u]["hash_id"])}}if(!z){KT.panel.closePanel()}$(this).ajaxSubmit({url:r,data:v,cache:false,success:function(E){var D=E.html?E.html:E;x.find("section").append(D);x.find(".spinner").hide();y.removeAttr("disabled");x.find("section").fadeIn();b(E.current_items,E.total_items,E.results_count,true);$(".left").resize();$(".ui-autocomplete").hide();$("#list").addClass("ajaxScroll");s()},error:function(D){y.removeAttr("disabled")}})});$("#search").live("change",function(){var r=$(this).val();if(r===""){$.bbq.removeState("search");$("#search_form").trigger("submit")}}).live("keypress",function(s){var r=$("#search_button"),t=$(this).val();if(s.keyCode===13){s.preventDefault();if(r.attr("disabled")!=="disabled"){if(t===""){$.bbq.removeState("search")}else{$.bbq.pushState({search:t})}$("#search_form").trigger("submit")}}})};return{set_extended_cb:function(p){e=p},extend:k,registerPage:j,createSuccess:m,remove:g,refresh:l,add:o}})();