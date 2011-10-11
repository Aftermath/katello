/**
 Copyright 2011 Red Hat, Inc.

 This software is licensed to you under the GNU General Public
 License as published by the Free Software Foundation; either version
 2 of the License (GPLv2) or (at your option) any later version.
 There is NO WARRANTY for this software, express or implied,
 including the implied warranties of MERCHANTABILITY,
 NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 have received a copy of GPLv2 along with this software; if not, see
 http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
*/

(function(){
	KT.panel.registerPage('organizations', { create : 'new_organization' });
})();

$(document).ready(function() {

    var env_scroll = KT.env_select_scroll({});
    KT.panel.set_expand_cb(function() {
        env_scroll.bind(undefined);
    });


   $('.environment_link').live('click', function() {
        $(this).siblings().show();

   });

   $('.environment_create').live('click', function(event) {
        var button = $(this);
        button.addClass("disabled");

        event.preventDefault();
        var form = $(this).closest("form");
        var url = form.attr('action');
        var dataToSend = form.serialize();
        $.ajax({
            type: "POST",
            url: url,
            data: dataToSend,
            cache: false,
            success: function() {
                KT.panel.panelAjax('', button.attr("data-url") ,$('#panel'));
                KT.panel.closeSubPanel($('#subpanel'));
           },
            error: function() {button.removeClass("disabled")}
        });
   });
});