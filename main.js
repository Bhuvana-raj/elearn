function closeWindow(){updateSessionTime(),scorm.quit();var e=window.open("","_self");e.close(),window.close()}function goNext(){if(!isAssessment&&!$(".modal").hasClass("in")){if(currSlide==maxSlide){if(void 0!=userAnswers[currModule]||nilAssessment){if(noOfSlides.length-1!=completedModule)currModule==completedModule&&(completedModule++,enableCompletedModules()),currModule++;else if(completedModule>currModule)currModule++;else if(noOfSlides.length-1==completedModule)return $("#myModalAssInst .cancelbtn").text("Repeat Course"),$("#myModalAssInst .okbtn").text("Exit"),$("#myModalAssInst .assmntRetake").text("Assessment Retake"),$("#myModalAssInst .modal-body p").html("You have completed the course. If you wish to repeat the course, click <b> Repeat Course </b> else click <b>Exit</b> to quit the course."),1==assessmentCount&&($("#myModalAssInst .modal-body p").html("You have completed the course!!!</br>If you wish to repeat the course, click <b>Repeat Course</b></br>If you wish to retake the Assessment, click <b>Assessment Retake</b></br>To quit the course click <b>Exit</b></br>"),$("#myModalAssInst .assmntRetake").removeClass("hide")),$("#myModalAssInst").modal("show"),void(nilAssessment&&courseComplete());return void changeModule(currModule,1)}return $("#myModalAssInst .modal-header h4").html("ASSESSMENT INSTRUCTION"),$("#myModalAssInst .modal-body p").html("1. Each module assessment has 5 questions. And the Assessments can be taken twice. <ul><li>The scores pertaining to the assessments are important and is part of the overall Pass Criteria.</li></ul>2. Module Assessment has to be taken without any interruptions <ul><li>Planning to wind-up the learning for the day or take a break, kindly complete the assessments and quit the modules or close the module before taking the Assessments.</li><li>Closing the window during the Assessments, would pass a null score. And will show as '0' for the particular module.</li></ul>"),$("#myModalAssInst").modal("show"),$(".cancelbtn").css("opacity","1"),void $(".cancelbtn").prop("disabled",!1)}currSlide++,showHtmlContent()}}function goBack(){1==currSlide||isAssessment||$(".modal").hasClass("in")||(currSlide--,showHtmlContent())}function initiateFontSizeController(){$("#incfont").click(function(){fontSize>=19||(fontSize+=5,applyCSS())}),$("#decfont").click(function(){9>=fontSize||(fontSize-=5,applyCSS())})}function applyCSS(){$("body, .btn").css("font-size",fontSize),$("h2").css("font-size",fontSize+6),$("h3, h4").css("font-size",fontSize+2),$("body").css("line-height",fontSize+8+"px"),$(".xmlcontent").children().each(function(){$(this).html(function(e,o){var t=$(".xmlcontent").html().replace(/,/g,", ");$(".xmlcontent").html(t),t=$(".xmlcontent").html().replace(/=/g," = "),$(".xmlcontent").html(t),t=$(".xmlcontent").html().replace(/è/g,"e"),$(".xmlcontent").html(t),t=$(".xmlcontent").html().replace(/�/g,"'"),$(".xmlcontent").html(t)})})}function showHtmlContent(){$(".xmlcontent").css("display","none"),$(".xmlcontent").html(""),$("#loading-indicator").css("display","block"),$("#prev-btn, #next-btn").css("display","block"),1==currSlide&&$("#prev-btn").css("display","none"),$(".xmlcontent").load("Modules/Module_"+currModule+"/Page-"+currSlide+".html",function(e,o){"success"==o&&($(".xmlcontent").fadeIn(600),$("#loading-indicator").css("display","none"),applyCSS())}),$(".page-number").html("<h4>Page "+addZero(currSlide)+" of "+addZero(maxSlide)+"</h4>"),isComplete||completedModule==noOfSlides.length-1&&currSlide==maxSlide?(isComplete=!0,set("cmi.location",String(currModule+"_"+currSlide+"_"+completedModule+"_COMPLETED_"+assessmentCount+"_"+fstAssmntScore))):set("cmi.location",String(currModule+"_"+currSlide+"_"+completedModule+"_INCOMPLETE_"+assessmentCount+"_"+fstAssmntScore))}function enableCompletedModules(){for(var e=1;completedModule>=e;e++)$("#myModalMenu .modal-body ul li:nth-child("+e+") a").removeClass("disabled"),$("#myModalMenu .modal-body ul li:nth-child("+e+")").click(function(){changeModule(Number($(this).index())+1,1),$("#myModalMenu").modal("hide")});$(".top-number").html("<h4>"+courseName+" &emsp;&#8594;&emsp;"+moduleNames[currModule-1]+"</h4>")}function changeModule(e,o){isAssessment=!1,currASlide=0,$("#prev-btn").css("display","block"),currModule=e,maxSlide=noOfSlides[currModule],currSlide=o,$(".top-number").html("<h4>"+courseName+" &emsp;&#8594;&emsp;"+moduleNames[currModule-1]+"</h4>"),showHtmlContent()}function addZero(e){return 10>e?"0"+e:e}function callResourceJson(){$.ajax({url:"ajax/resources.json",beforeSend:function(e){e.overrideMimeType&&e.overrideMimeType("application/json")},dataType:"json",data:data,success:callbackResourse})}function callbackResourse(e){$.each(e.content.resources,function(e,o){$("#myModalRes .modal-body ul").append("<li>"+o.link+"</li>")}),$.each(e.content.coursemenu,function(e,o){$("#myModalMenu .modal-body ul").append('<li><a class="btn btn-default disabled" href="#">'+o.moduleTitle+"</a></li>"),moduleNames.push(o.moduleTitle)}),noOfSlides=String(e.content.courseinfo[0].moduleCounts).split(","),courseName=e.content.courseinfo[1].courseTitle,nilAssessment=e.content.courseinfo[2].noAssessment,noOfSlides.unshift(""),maxSlide=noOfSlides[currModule],quizWeight=100/(5*(noOfSlides.length-1)),enableCompletedModules(),init()}function callGlossaryJson(){$.ajax({url:"ajax/glossary.json",beforeSend:function(e){e.overrideMimeType&&e.overrideMimeType("application/json")},dataType:"json",data:data,success:callbackGlossary})}function callbackGlossary(e){$.each(e.content.glossary,function(e,o){$("#myModalGlos .modal-body").append('<div class="row"><div class="col-xs-12 col-sm-4"><h3>'+o.title+'</h3></div><div class="col-xs-12 col-sm-8"><h4>'+o.description+"</h4></div></div>")})}function data(){}function initCourse(){"null"!=learnerlocation&&""!=learnerlocation?$("#myModalBookMark").modal("show"):(completedModule=1,changeModule(1,1))}var currSlide=1,currASlide=0,currModule=1,completedModule=1,moduleNames=[],courseName="",noOfSlides=[],maxSlide=0,fontSize=14,isAssessment=!1,nilAssessment,assessmentArray=[1,2,3,4,5,6,7,8],xmlDoc,userAnswers=[],lmsScoreString="",quizWeight=0,totalScore=0;$(document).ready(function(){callResourceJson(),callGlossaryJson(),initiateFontSizeController(),$("#single_1").fancybox({helpers:{title:{type:"float"}}}),$("body").keyup(function(e){39==e.which&&goNext(),37==e.which&&goBack()}),$(".xmlcontent").swipeleft(function(){goNext()}),$(".xmlcontent").swiperight(function(){goBack()}),$("#next-btn").mouseup(function(){goNext()}),$("#prev-btn").mouseup(function(){goBack()}),$("#myModalMenu .modal-body ul > li").click(function(){currModule=Number($(this).index())+1}),$("#myModalBookMark button").click(function(){completedModule=learnerlocation.split("_")[2],enableCompletedModules(),1==Number($(this).attr("value"))?changeModule(learnerlocation.split("_")[0],learnerlocation.split("_")[1]):changeModule(1,1),$("#myModalBookMark").modal("hide")}),$(".help-exit ul > li").click(function(){1==Number($(this).index())&&closeWindow()})}),Array.prototype.equals=function(e){if(!e)return!1;if(this.length!=e.length)return!1;for(var o=0,t=this.length;t>o;o++)if(this[o]instanceof Array&&e[o]instanceof Array){if(!this[o].equals(e[o]))return!1}else if(this[o]!=e[o])return!1;return!0},Array.prototype.shuffle=function(){for(var e=this,o=e.length-1;o>=0;o--){var t=Math.floor(Math.random()*(o+1)),s=e[t];e[t]=e[o],e[o]=s}return e};
