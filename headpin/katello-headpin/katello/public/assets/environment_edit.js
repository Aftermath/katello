$(document).ready(function(){$(".edit_env_name").each(function(){var a=$(this);$(this).editable(a.attr("data-url"),{type:"text",width:270,method:"PUT",name:$(this).attr("name"),cancel:i18n.cancel,submit:i18n.save,indicator:i18n.saving,tooltip:i18n.clickToEdit,placeholder:i18n.clickToEdit,submitdata:{authenticity_token:AUTH_TOKEN},onsuccess:function(){KT.panel.panelAjax("",a.attr("data-forward"),$("#panel"))},onerror:function(c,b,d){b.reset();$("#notification").replaceWith(d.responseText)}})});$(".edit_prior_envs").each(function(){var a=$(this);$(this).editable(a.attr("data-url"),{type:"select",width:440,method:"PUT",name:$(this).attr("name"),cancel:i18n.cancel,submit:i18n.save,indicator:i18n.saving,tooltip:i18n.clickToEdit,placeholder:i18n.clickToEdit,style:"inherit",data:document.environment_edit.elements.prior_envs.value,onsuccess:function(){KT.panel.panelAjax("",a.attr("data-forward"),$("#panel"))},onerror:function(c,b,d){b.reset();$("#notification").replaceWith(d.responseText)}})})});