KT.panel.list.registerPage("providers",{create:"new_provider"});$(document).ready(function(){$("#redhatSubscriptionTable").treeTable({expandable:true,initialState:"collapsed",clickableNodeNames:true,onNodeShow:function(){$.sparkline_display_visible()}});$("#upload_button").live("submit",function(a){$("input[id^=provider_submit]").attr("disabled",true);a.preventDefault();$(this).ajaxSubmit({success:subscription.successUpload})});$("form#edit_provider_2").live("submit",function(){$("#provider_submit").val("Uploading...").attr("disabled",true)});$(".product_create").live("click",function(d){var b=$(this);b.addClass("disabled");d.preventDefault();var c=$(this).closest("form");var a=c.attr("action");var e=c.serialize();client_common.create(e,a,function(){KT.panel.panelAjax("",b.attr("data-url"),$("#panel"));KT.panel.closeSubPanel($("#subpanel"))},function(){b.removeClass("disabled")})});$(".repo_create").live("click",function(d){var b=$(this);b.addClass("disabled");d.preventDefault();var c=$(this).closest("form");var a=c.attr("action");var e=c.serialize();client_common.create(e,a,function(){KT.panel.panelAjax("",b.attr("data-url"),$("#panel"));KT.panel.closeSubPanel($("#subpanel"))},function(){b.removeClass("disabled")})});$("#provider_contents").attr("size","17")});var provider=(function(){return{toggleFields:function(){var b=$("#provider_provider_type option:selected").val();var a="#repository_url_field";if(b=="Custom"){$(a).attr("disabled",true)}else{$(a).removeAttr("disabled")}}}})();var subscription=(function(){return{successUpload:function(a){if(a.length!=0){$(".panel-content").html(a)}else{$("input[id^=provider_submit]").removeAttr("disabled")}notices.checkNotices();$("#loading").trigger("ajaxComplete")}}})();(function(g){var j;var a;g.fn.treeTable=function(k){j=g.extend({},g.fn.treeTable.defaults,k);return this.each(function(){g(this).addClass("treeTable").find("tbody tr").each(function(){if(!j.expandable||g(this)[0].className.search(j.childPrefix)==-1){if(isNaN(a)){a=parseInt(g(g(this).children("td")[j.treeColumn]).css("padding-left"),10)}h(g(this))}else{if(j.initialState=="collapsed"){this.style.display="none"}}})})};g.fn.treeTable.defaults={childPrefix:"child-of-",clickableNodeNames:false,expandable:true,indent:19,initialState:"collapsed",onNodeShow:null,treeColumn:0};g.fn.collapse=function(){g(this).addClass("collapsed");i(g(this)).each(function(){if(!g(this).hasClass("collapsed")){g(this).collapse()}this.style.display="none"});return this};g.fn.expand=function(){g(this).removeClass("collapsed").addClass("expanded");i(g(this)).each(function(){h(g(this));if(g(this).is(".expanded.parent")){g(this).expand()}g(this).show();if(g.isFunction(j.onNodeShow)){j.onNodeShow.call()}});return this};g.fn.reveal=function(){g(b(g(this)).reverse()).each(function(){h(g(this));g(this).expand().show()});return this};g.fn.appendBranchTo=function(k){var n=g(this);var l=e(n);var m=g.map(b(g(k)),function(o){return o.id});if(g.inArray(n[0].id,m)==-1&&(!l||(k.id!=l[0].id))&&k.id!=n[0].id){c(n,b(n).length*j.indent*-1);if(l){n.removeClass(j.childPrefix+l[0].id)}n.addClass(j.childPrefix+k.id);d(n,k);c(n,b(n).length*j.indent)}return this};g.fn.reverse=function(){return this.pushStack(this.get().reverse(),arguments)};g.fn.toggleBranch=function(){if(g(this).hasClass("collapsed")){g(this).expand()}else{g(this).removeClass("expanded").collapse()}return this};function b(l){var k=[];while(l=e(l)){k[k.length]=l[0]}return k}function i(k){return g("table.treeTable tbody tr."+j.childPrefix+k[0].id)}function f(l){var k=parseInt(l[0].style.paddingLeft,10);return(isNaN(k))?a:k}function c(l,m){var k=g(l.children("td")[j.treeColumn]);k[0].style.paddingLeft=f(k)+m+"px";i(l).each(function(){c(g(this),m)})}function h(l){if(!l.hasClass("initialized")){l.addClass("initialized");var n=i(l);if(!l.hasClass("parent")&&n.length>0){l.addClass("parent")}if(l.hasClass("parent")){var k=g(l.children("td")[j.treeColumn]);var m=f(k)+j.indent;n.each(function(){g(this).children("td")[j.treeColumn].style.paddingLeft=m+"px"});if(j.expandable){k.prepend('<span style="margin-left: -'+j.indent+"px; padding-left: "+j.indent+'px" class="expander"></span>');g(k[0].firstChild).click(function(){l.toggleBranch()});if(j.clickableNodeNames){k[0].style.cursor="pointer";g(k).click(function(o){if(o.target.className!="expander"){l.toggleBranch()}})}if(!(l.hasClass("expanded")||l.hasClass("collapsed"))){l.addClass(j.initialState)}if(l.hasClass("expanded")){l.expand()}}}}}function d(l,k){l.insertAfter(k);i(l).reverse().each(function(){d(g(this),l[0])})}function e(l){var m=l[0].className.split(" ");for(var k=0;k<m.length;k++){if(m[k].match(j.childPrefix)){return g("#"+m[k].substring(9))}}return null}})(jQuery);