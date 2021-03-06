/**
 * BannerControllers Module
 *
 * Description
 */
angular.module('BannerControllers', [])
	.controller('BannerEditor', function($scope, $compile, imageReader){
		// banner model
		$scope.banner = {
			title : {
				text    : 'Company Name, Company Contest, Contest',
				limit   : 50,
				counter : 50
			},
			description : {
				text    : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, fugit hic tempora dolorem non sunt incidunt velit quam distinctio cum.',
				limit   : 225,
				counter : 255
			},
			logo : {
				w : 122,
				h : 80,
				margin : 20
			},
			price : {
				one: {
					text   : 'Enter price 1 description',
					limit  : 75,
					counter: 75
				},
				two: {
					text    : 'Enter price 2 description',
					limit   : 75,
					counter : 75
				},
				three: {
					text    : 'Enter price 3 description',
					limit   : 75,
					counter : 75
				}
			}
		};

		// scope watchers
		$scope.$watch('banner.title.text', function(input){
			$scope.banner.title.limit = $scope.banner.title.counter - input.length;
			if($scope.banner.title.limit <= 0) {
				$scope.banner.title.limit = 0;
				$scope.banner.title.text = $scope.banner.title.text.substring(0, $scope.banner.title.text.counter);
			}
		});
		$scope.$watch('banner.description.text', function(input){
			$scope.banner.description.limit = $scope.banner.description.counter - input.length;
			if($scope.banner.description.limit <= 0) {
				$scope.banner.description.limit = 0;
				$scope.banner.description.text = $scope.banner.description.text.substring(0, $scope.banner.description.text.counter);
			}
		});
		$scope.$watch('banner.price.one.text', function(input){
			$scope.banner.price.one.counter = $scope.banner.price.one.limit - input.length;
			if($scope.banner.price.one.counter <= 0) {
				$scope.banner.price.one.counter = 0;
				$scope.banner.price.one.text = $scope.banner.price.one.text.substring(0, $scope.banner.price.one.limit);
			}
		});
		$scope.$watch('banner.price.two.text', function(input){
			$scope.banner.price.two.counter = $scope.banner.price.two.limit - input.length;
			if($scope.banner.price.two.counter <= 0) {
				$scope.banner.price.two.counter = 0;
				$scope.banner.price.two.text = $scope.banner.price.two.text.substring(0, $scope.banner.price.two.limit);
			}
		});
		$scope.$watch('banner.price.three.text', function(input){
			$scope.banner.price.three.counter = $scope.banner.price.three.limit - input.length;
			if($scope.banner.price.three.counter <= 0) {
				$scope.banner.price.three.counter = 0;
				$scope.banner.price.three.text = $scope.banner.price.three.text.substring(0, $scope.banner.price.three.limit);
			}
		});

		$('#templates').bind('cancelTemplate', function(e){
			$(this).fadeOut(400, function(){
				$(this).hide();
				$('.tab-content').hide();
				$(this).next().removeClass('overwrite');
				$(this).siblings('#cancelTpl').hide();
				$(this).siblings('#settings').show();
				$('#svg-editor').show();
			});
		});

		var dimensions = {
			'tpl-1' : {
				background : {
					width:810,
					height:381
				},
				logo : {
					width:340,
					height:183
				}				
			},
			'tpl-2' : {
				background : {
					width:810,
					height:339
				},
				logo : {
					width:203,
					height:130
				}
			},
			'tpl-3' : {
				background : {
					width:770,
					height:315
				},
				logo : {
					width:250,
					height:250
				}
			},
			'tpl-4' : {
				background : {
					width:810,
					height:339
				},
				logo : {
					width:208,
					height:109
				}
			},
			'tpl-5' : {
				background : {
					width:810,
					height:339
				},
				logo : {
					width:170,
					height:68
				}
			},
			'tpl-6' : {
				background : {
					width:810,
					height:339
				},
				logo : {
					width:137,
					height:68
				}
			}
		};

		$scope.doSetting = function($event){
			var $btnTemplate     = $($event.currentTarget);
			var $btnCancel       = $btnTemplate.next();
			var $templateField   = $btnTemplate.siblings('#templates');
			var $settingField    = $btnTemplate.siblings('#settings');
			var $contentField    = $('#banner-editor .tab-content');
			var $displayTplField = $('#banner-editor #display-tpl');
			var $svgEditor       = $('#svg-editor');
			var $actEditor       = $('#action-editor');
			var $liActive        = $('ul > li.active > a', $templateField);
			var pricesInBottom   = $liActive.data('priceBottom');
			var tplDimension     = $liActive.data('tpl');
			var tplShowPrice     = $scope.tplShowPrice = $liActive.data('price').match(/(\d)/)[0];
			
			var settings = {
				field : {
					template   : $templateField,
					setting    : $settingField,
					displayTpl : $displayTplField,
					content    : $contentField
				},
				btn: {
					template : $btnTemplate,
					cancel   : $btnCancel
				},
				editor : {
					svg    : $svgEditor,
					action : $actEditor
				},
				attributes : {
					tplDimension    : tplDimension,
					pricesInBottom  : pricesInBottom,
					tplShowPrice    : tplShowPrice
				}
			};

			// alert overwrite
			if($btnTemplate.hasClass('overwrite')){
				$('#alert-overwrite').bind('overwrite', function(){
					var self = this;
					$('.blockOverlay').click();
					bannerSetting(settings, true);
				});
				// show message
				$.blockUI({
					message: $('#alert-overwrite'),
					css: {
						background : 'transparent',
						border     : 'none',
						top        : ($(window).height() - 479) / 2 + 'px',
						left       : ($(window).width() - 649) / 2 + 'px',
						width      : '649px'
					}
				});
				$('.blockOverlay').attr('title','Click to cancel').click($.unblockUI);
				return;
			}
			// return to the templates
			if($templateField.is(':hidden')){
				$templateField.show(400, function(){
					$btnCancel.show();
					$btnTemplate.addClass('overwrite').html('<i class="icon-cog"></i> Settings');
					$contentField.show();
					$settingField.hide();
					$displayTplField.hide();
					$svgEditor.hide();
					$actEditor.hide();
				});
				return;
			}
			bannerSetting(settings, false);
		};

		$scope.overwiriteTplYes = function(evt){
			$('#alert-overwrite').trigger('overwrite');
		};
		$scope.overwiriteTplNo = function(evt){
			$('.blockOverlay').click();
			$('#templates').trigger('cancelTemplate');
		};

		var bannerSetting = function( options, overwrite ){
			var $tpl          = options.field.template;
			var $settingField = options.field.setting;
			var $tplContent   = options.field.content;
			var $displayTpl   = options.field.displayTpl;
			var $btnTemplate  = options.btn.template;
			var $btnCancel    = options.btn.cancel;
			var $editorSVG    = options.editor.svg;
			var $editorAction = options.editor.action;
			var tplDimension  = options.attributes.tplDimension;
			var pricesInBottom = options.attributes.pricesInBottom;
			var tplShowPrice  = options.attributes.tplShowPrice;

			console.log('settings', options);
			// tooltip
			$('a').tooltip();

			if( overwrite ){
				// remove class overwrite
				$btnTemplate.removeClass('overwrite');
				// clear all setting input file
				$('input[type="file"]', $settingField).each(function(e,i){
					$(this).val('');
				});
			}

			// canvas dimensions
			var canvasDimensions    = dimensions[tplDimension];
			var backgroundDimension = canvasDimensions['background'];
			var logoDimension       = canvasDimensions['logo'];
			// compile SVG (inject scope)
			var tplIndex = tplDimension.match(/(\d)/)[0] - 1;
			var $svg = getSVGCompiled($tplContent, 'like', tplIndex);
			var $svg2 = getSVGCompiled($tplContent, 'enter', tplIndex);
			$tpl.hide(400, function(){
				$(this).hide();
				$tplContent.hide();
				$btnCancel.hide();
				$btnTemplate.html('<i class="icon-list"></i> Choose Template');

				$settingField.show(400,function(){
					$displayTpl.show();
					// clear editor
					$editorSVG.html('');
					// append svg
					$editorSVG.append($svg);
					$editorSVG.append($svg2);
					// create input hidden to set canvas dimensions
					// will be used to image conversion
					var inputCanvas = document.createElement("input");
					inputCanvas.setAttribute("type", "hidden");
					inputCanvas.setAttribute("name", "canvasDimensions");
					inputCanvas.setAttribute("value", JSON.stringify(backgroundDimension));
					// append canvas
					$editorSVG.append(inputCanvas);
					// set height drop background same as canvas dimension
					$('#drop-background').css('height', backgroundDimension.height + 'px');

					// show editor
					if($editorSVG.is(':hidden')) $editorSVG.show();
					/* initialize image reader */
					// background
					imageReader.init({
						dropArea      : '#drop-background',
						inputFileEl   : '#input-background',
						inputFileText : 'Select an image',
						section       : 'background',
						compile       : function(buttonEl, changeEl, image){
							console.log('changeEl', changeEl);

							var labelEl = $(buttonEl).parent().siblings('label')[0];
							if((image.width <= backgroundDimension.width && image.height <= backgroundDimension.height) ){
								// change the button text to 'Edit'
								labelEl.innerHTML = labelEl.innerHTML.replace(/upload/i, 'Edit');
								// re-compile to injecting scope
								for(var i in changeEl){
									changeEl[i].setAttribute('xlink:href',image.src);
									changeEl[i].setAttribute('width', image.width);
									changeEl[i].setAttribute('height', image.height);
								}
								return;
							}

							// define crop selection
							var cropSelection = {};
							// create temporary image for cropping
							image.setAttribute('id', 'temp-crop-image hide');
							// append to body
							document.querySelector('body').appendChild(image);
							var $tempImg = $(image);
							// calculating crop center
							var x1 = parseInt((image.width - backgroundDimension.width) / 2);
							var y1 = parseInt((image.height - backgroundDimension.height) / 2);
							var pos = {
								x1 : x1,
								y1 : y1,
								x2 : parseInt(x1 + backgroundDimension.width),
								y2 : parseInt(y1 + backgroundDimension.height)
							};
							// show crop popup
							$.blockUI({
								message   : $tempImg,
								overlayCSS:{
									cursor : 'default'
								},
								css: {
									cursor : 'default',
									border : 'none',
									top    : ($(window).height() - image.height) / 2 + 'px',
									left   : ($(window).width() - image.width) / 2 + 'px',
									width  : image.width + 'px'
								},
								onBlock: function(){
									$tempImg.imgAreaSelect({
										x1 : pos.x1,
										y1 : pos.y1,
										x2 : pos.x2,
										y2 : pos.y2,
										resizable : false,
										handles   : true,
										fadeSpeed : 200,
										onInit    : function(img, selection){
											console.log('imgAreaSelect init', 'x', -selection.x1, 'y', -selection.y1);
											// set cropSelection
											cropSelection = selection;
											var $handle = $('.imgareaselect-handle').parent();
											$handle.parent().append($compile('<div id="crop-wrapper"><button class="btn btn-primary" ng-click="cropHandle(\'do\')"><i class="icon-crop"></i> Crop</button><button class="btn btn-primary" ng-click="cropHandle(\'fit\')"><i class="icon-resize-horizontal"></i> Auto Fit</button><button class="btn" ng-click="cropHandle(\'cancel\')">Cancel</button></div>')($scope));
										},
										onSelectStart : function(){
											console.log('imgAreaSelect start');
										},
										onSelectChange : function(img, selection){
											if(!selection.width || !selection.height) return;
											console.log('imgAreaSelect change', 'x', -selection.x1, 'y', -selection.y1);
										},
										onSelectEnd : function(img, selection){
											console.log('imgAreaSelect end');
											// set cropSelection
											cropSelection = selection;
										}
									});
								}
							});
							$scope.cropHandle = function(act){
								// remove imgAreaSelect
								$tempImg.imgAreaSelect({remove:true});
								$.unblockUI({
									onUnblock: function() {
										$tempImg.remove();
										$('#crop-wrapper').remove();
										if(act == 'do'){
											// change the button text to 'Edit'
											labelEl.innerHTML = labelEl.innerHTML.replace(/upload/i, 'Edit');
											// change image src, dimension n position
											for(var i in changeEl){
												changeEl[i].setAttribute('xlink:href',image.src);
												changeEl[i].setAttribute('width', image.width);
												changeEl[i].setAttribute('height', image.height);
												changeEl[i].setAttribute('x', -Math.abs(cropSelection.x1));
												changeEl[i].setAttribute('y', -Math.abs(cropSelection.y1));
											}
											// background reposition
											$editorAction.show();
											$('body').trigger('bgReposition', {
												svg         : $svg,
												imageBG     : changeEl,
												pricesInBottom : pricesInBottom,
												dimension   : backgroundDimension
											});
										}
										else if(act == 'fit'){
											// change the button text to 'Edit'
											labelEl.innerHTML = labelEl.innerHTML.replace(/add/i, 'Edit');
											// change image src only
											for(var i in changeEl){
												changeEl[i].setAttribute('xlink:href',image.src);
											}
										}
									}
								});
							};
						}
					});
					// logo
					imageReader.init({
						dropArea      : '#drop-logo',
						inputFileEl   : '#input-logo',
						inputFileText : 'Select an image',
						section       : 'logo',
						compile       : function(buttonEl, changeEl, image){
							// change text button input file
							buttonEl.innerHTML = buttonEl.innerHTML.replace(/upload/i, 'Edit');
							// re-compile to injecting scope
							angular.forEach(changeEl, function(e,i){
								var logo = {
									parent : $(e).parent(),
									holder : $(e).prev()[0],
									image  : e
								};
								// inject logo holder (padding 20)
								logo.holder.setAttribute('width','{{getWH()}}');
								logo.holder.setAttribute('height','{{getHH()}}');
								// inject logo image
								logo.image.setAttribute('xlink:href',image.src);
								logo.image.setAttribute('width','{{banner.logo.w}}');
								logo.image.setAttribute('height','{{banner.logo.h}}');
								// remove old logo image n holder
								logo.parent.html('');
								// append new logo image n holder with inject scope
								logo.parent.append($compile(logo.holder)($scope));
								logo.parent.append($compile(logo.image)($scope));
							});
							// applying scope
							$scope.$apply(function(scope){
								scope.banner.logo.w = parseInt(image.width);
								scope.banner.logo.h = parseInt(image.height);
								// calculate image placeholder
								scope.getWH = function() {
									return parseInt(scope.banner.logo.w) + scope.banner.logo.margin;
								};
								scope.getHH = function() {
									return parseInt(scope.banner.logo.h) + scope.banner.logo.margin;
								};
								// calculate aspect ratio image height
								scope.$watch('banner.logo.w', function(input) {
									var ratio = [input / image.width, image.height / image.height];
									var aspectRatio = Math.min(ratio[0], ratio[1]);
									scope.banner.logo.h = parseInt(image.height * aspectRatio);
								});
							});
						}
					});

					// callback price compile
					var priceCompile = function(buttonEl, changeEl, image){
						var labelEl = $(buttonEl).parent().siblings('label')[0];
						// auto strecth, if image dimension less than background dimension
						if(image.width <= backgroundDimension.width && image.height <= backgroundDimension.height)
						{
							// change label text
							labelEl.innerHTML = labelEl.innerHTML.replace(/upload/i, 'Edit');
							// re-compile to injecting scope
							angular.forEach(changeEl, function(e,i){
								e.setAttribute('xlink:href',image.src);
							});
							return;
						}
						// define crop selection
						var cropSelection = {};
						// create temporary image for cropping
						image.setAttribute('id', 'temp-crop-image');
						// append to body
						document.querySelector('body').appendChild(image);
						var $tempImg = $(image);
						// calculating crop center
						var x1 = parseInt((image.width - logoDimension.width) / 2);
						var y1 = parseInt((image.height - logoDimension.height) / 2);
						var pos = {
							x1 : x1,
							y1 : y1,
							x2 : parseInt(x1 + logoDimension.width),
							y2 : parseInt(y1 + logoDimension.height)
						};
						// show crop popup
						$.blockUI({
							message   : $tempImg,
							overlayCSS:{
								cursor : 'default'
							},
							css: {
								cursor : 'default',
								border : 'none',
								top    : ($(window).height() - image.height) / 2 + 'px',
								left   : ($(window).width() - image.width) / 2 + 'px',
								width  : image.width + 'px'
							},
							onBlock: function(){
								$tempImg.imgAreaSelect({
									x1 : pos.x1,
									y1 : pos.y1,
									x2 : pos.x2,
									y2 : pos.y2,
									resizable : false,
									handles   : true,
									fadeSpeed : 200,
									onInit    : function(img, selection){
										console.log('imgAreaSelect init', 'x', -selection.x1, 'y', -selection.y1);
										// set cropSelection
										cropSelection = selection;
										var $handle = $('.imgareaselect-handle').parent();
										$handle.parent().append($compile('<div id="crop-wrapper"><button class="btn btn-primary" ng-click="cropHandle(\'do\')"><i class="icon-crop"></i> Crop</button><button class="btn btn-primary" ng-click="cropHandle(\'fit\')"><i class="icon-resize-horizontal"></i> Auto Fit</button><button class="btn" ng-click="cropHandle(\'cancel\')">Cancel</button></div>')($scope));
									},
									onSelectStart : function(){
										console.log('imgAreaSelect start');
									},
									onSelectChange : function(img, selection){
										if(!selection.width || !selection.height) return;
										console.log('imgAreaSelect change', 'x', -selection.x1, 'y', -selection.y1);
									},
									onSelectEnd : function(img, selection){
										console.log('imgAreaSelect end');
										// set cropSelection
										cropSelection = selection;
									}
								});
							}
						});
						$scope.cropHandle = function(act){
							$tempImg.imgAreaSelect({remove:true});
							$.unblockUI({
								onUnblock: function() {
									$tempImg.remove();
									$('#crop-wrapper').remove();
									if(act == 'do'){
										// change the button text to 'Edit'
										labelEl.innerHTML = labelEl.innerHTML.replace(/add/i, 'Edit');
										// change image src, dimension n position
										for(var i in changeEl){
											changeEl[i].setAttribute('xlink:href',image.src);
											changeEl[i].setAttribute('width', image.width);
											changeEl[i].setAttribute('height', image.height);
											changeEl[i].setAttribute('x', -Math.abs(cropSelection.x1));
											changeEl[i].setAttribute('y', -Math.abs(cropSelection.y1));
										}
									}
									else if(act == 'fit'){
										// change the button text to 'Edit'
										labelEl.innerHTML = labelEl.innerHTML.replace(/add/i, 'Edit');
										// change image src only
										for(var j in changeEl){
											changeEl[j].setAttribute('xlink:href',image.src);
										}
									}
								}
							});
						};
					};
					// prizes
					imageReader.init({
						dropArea      : '#drop-price-1',
						inputFileEl   : '#input-price-1',
						inputFileText : 'Select an image',
						section       : 'price-1',
						compile       : priceCompile
					});
					imageReader.init({
						dropArea      : '#drop-area',
						inputFileEl   : '#input-price-2',
						inputFileText : 'Select an image',
						section       : 'price-2',
						compile       : priceCompile
					});
					imageReader.init({
						dropArea      : '#drop-area',
						inputFileEl   : '#input-price-3',
						inputFileText : 'Select an image',
						section       : 'price-3',
						compile       : priceCompile
					});
				});
			});
		}

		var getSVGCompiled = function ($tplContent, type, tplIndex){
			var $svg = $('.active > svg', $tplContent).clone();
			$svg.attr('id', 'svg-editor-'+type);
			$('#pattern', $svg).children().map(function(i,e){
				$(e).attr('id', function(index, id){
					return id.replace(/(\d+)/, function(fullMatch, n) {
						return 'editor-'+type;
					});
				});
			});
			$('#shadow', $svg).children().map(function(i,e){
				$(e).attr('id', function(index, id){
					return id.replace(/(\d+)/, function(fullMatch, n) {
						return 'editor';
					});
				});
			});
			$('#background', $svg).children().map(function(i,e){
				if($(e).attr('fill')) {
					$(e).attr('fill', function(index, id){
						return id.replace(/(\d+)/, function(fullMatch, n) {
							return 'editor-'+type;
						});
					});
				}
				else {
					e.setAttribute('width', '{{banner.fb.w}}');
					e.setAttribute('height', '{{banner.fb.h}}');
					e.setAttribute('x', '{{getX()}}');
					// compile banner fb 
					$scope.banner.fb = {
						w:283,
						h:67
					};
					$scope.$watch('banner.fb.w', function(input){
						var ratio = [input / 283, 67 / 67];
						var aspectRatio = Math.min(ratio[0], ratio[1]);
						$scope.banner.fb.h = parseInt(67 * aspectRatio);
					});
					$scope.getX = function(){
						return 810 - $scope.banner.fb.w;
					}
				}
				if(i == 1 && type == 'enter') $(e).remove();
			});
			$('#logo', $svg).children().map(function(i,e){
				if($(e).attr('id') !== undefined) {
					$(e).attr('id', function(index, id){
						return id.replace(/(\d+)/, function(fullMatch, n) {
							return 'editor-'+type;
						});
					});
				} else if($(e).attr('filter') !== undefined) {
					$(e).attr('filter', function(index, id){
						return id.replace(/(\d+)/, function(fullMatch, n) {
							return 'editor';
						});
					});
				}
				else return;
			});
			var _index = 1;
			$('#price', $svg).children().map(function(i,e){
				if($(e).attr('id') === undefined) return;
				if(type == 'enter') {
					var x = [586,542,345,96,168,198];
					$('#price > text > tspan', $svg).text('Enter to Win!');
					$('#price > text > tspan', $svg).attr('x', x[tplIndex]);
				}
				$(e).attr('id', function(index, id){
					return id.replace(/(\d+)/, function(fullMatch, n) {
						return 'editor-'+ type + '-' + _index;
					});
				});
				_index++;
			});

			return $compile($svg)($scope);
		};

		$scope.cancelTemplate = function($event){
			$('#templates').trigger('cancelTemplate');
		};

		$scope.addWhitePlaceholder = function(event){
			var $placeholder = $(event.currentTarget);
			var $rect = $('#svg-editor > svg > #logo > rect');
			if($placeholder.is(":checked")){
				$rect.attr('fill', 'white');
			} else {
				$rect.attr('fill', 'transparent');
			}
		};

		function createCanvas(svg, canvasDimensions, callback){
			var svg_xml = (new XMLSerializer()).serializeToString(svg);
			console.log(svg_xml);
			var canvas    = document.createElement('canvas');
			canvas.width  = canvasDimensions.width;
			canvas.height = canvasDimensions.height;
			// get canvas context
			var ctx = canvas.getContext("2d");
			var img = new Image();
			img.onload = function(){
				ctx.drawImage(img, 0, 0);
				var imgDataURI = canvas.toDataURL('image/png');
				callback(img, imgDataURI);
			};
			img.src = "data:image/svg+xml;base64," + btoa(svg_xml);
		}

		// SVG to dataURI
		$scope.convert = function(evt){
			$.blockUI({
				message: $('#loading-problem'),
				css: {
					background : 'transparent',
					border     : 'none',
					top        : ($(window).height() - 350) / 2 + 'px',
					left       : ($(window).width() - 375) / 2 + 'px',
					width      : '350px'
				}
			});

			$('#svg-editor > svg').each(function(){ $(this).show(); });
			var svg_like  = $('#svg-editor > svg').eq(0)[0];
			var svg_enter = $('#svg-editor > svg').eq(1)[0];
			// get canvas dimensions
			var canvasDimensions = JSON.parse($('input[name="canvasDimensions"]').val());
			// create canvas banner like
			createCanvas(svg_like, canvasDimensions, function(imgLike, imgDataURILike){
				// create download anchor
				var downloadLinkLike       = document.createElement('a');
				downloadLinkLike.title     = 'Download Banner Like';
				downloadLinkLike.href      = imgDataURILike;
				downloadLinkLike.target    = '_blank';
				downloadLinkLike.className = 'btn btn-success';
				downloadLinkLike.innerHTML = '<i class="icon-download-alt"></i> Download Banner Like';
				downloadLinkLike.download  = 'banner-like.png';
				// create canvas banner enter
				createCanvas(svg_enter, canvasDimensions, function(imgEnter, imgDataURIEnter){
					// create download anchor
					var downloadLinkEnter       = document.createElement('a');
					downloadLinkEnter.title     = 'Download Banner Enter';
					downloadLinkEnter.href      = imgDataURIEnter;
					downloadLinkEnter.target    = '_blank';
					downloadLinkEnter.className = 'btn btn-success';
					downloadLinkEnter.innerHTML = '<i class="icon-download-alt"></i> Download Banner Enter';
					downloadLinkEnter.download  = 'banner-enter.png';
					// set image class
					imgLike.className  = 'span12';
					imgEnter.className = 'span12';
					// define generate element
					var $generate = $('#result-generate-image');
					// create template banner list
					var tplImages = '<li class="span6 banner-like">' +
										'<div class="thumbnail">' + imgLike.outerHTML +
											'<div class="caption">' +
												'<h3>Banner Like</h3>' +
												'<p>This is banner like description</p>'+
												'<p>'+ downloadLinkLike.outerHTML +'</p>' +
											'</div>' +
										'</div>' +
									'</li>'+
									'<li class="span6 banner-like">' +
										'<div class="thumbnail">' + imgEnter.outerHTML +
											'<div class="caption">' +
												'<h3>Banner Enter</h3>' +
												'<p>This is banner enter description</p>'+
												'<p>'+ downloadLinkEnter.outerHTML +'</p>' +
											'</div>' +
										'</div>' +
									'</li>';
					// append banner images
					$generate.find('ul').html('');
					$generate.find('ul').append(tplImages);
					// open popup
					setTimeout(function() {
						$.unblockUI({
							onUnblock: function() {
								$.blockUI({
									overlayCSS:{
										cursor : 'pointer',
										border : '3px solid #006DCC'
									},
									message: $generate,
									css: {
										cursor: 'default',
										top    : ($(window).height() - $generate.height()) / 2 + 'px',
										left   : ($(window).width() - $generate.width()) / 2 + 'px',
										width  : $generate.width() + 'px',
										height : $generate.height() + 'px'
									}
								});
								$('.blockOverlay').attr('title', 'Click to cancel').click($.unblockUI);
							}
						});
					}, 1000);
				});
			});
		};

		// http://stackoverflow.com/questions/3142007/how-to-either-determine-svg-text-box-width-or-force-line-breaks-after-x-chara
		// http://documentup.com/wout/svg.js
		// https://github.com/wout/svg.textflow.js
		$scope.foreignToSVGXML = function(evt){
			// var $svg = $('#svg-editor > svg').eq(0);
			// var description   = $('#description', $svg)[0];
			// var foreignobject = $('#description > .foreign-object', $svg)[0];
			// var titles = $(foreignobject).find('h3').html().split(/<br[^>]*>/gi);
			// var p = $(foreignobject).find('p').html();

			// var x = parseInt(foreignobject.getAttribute('x')) + 20;
			// var y = parseInt(foreignobject.getAttribute('y')) + 35; // 163

			// var svgNS = "http://www.w3.org/2000/svg";
			// for(var i in titles) {
			// 	var newText = document.createElementNS(svgNS,"text");
			// 	newText.setAttributeNS(null,"x", x);
			// 	newText.setAttributeNS(null,"y", y);
			// 	newText.setAttributeNS(null,"font-family", "Rockwell");
			// 	newText.setAttributeNS(null,"font-size", 27);
			// 	newText.setAttributeNS(null,"fill", "white");

			// 	var textNode = document.createTextNode(titles[i]);
			// 	newText.appendChild(textNode);
			// 	description.appendChild(newText);

			// 	y += 32;
			// }

			// var draw = SVG('canvas');
			// var flow = draw.textflow(p).size(364);
			// flow.font({ family: 'Arial', size: 12 });
			// flow.fill('white');
			// flow.attr('x', x);
			// flow.attr('y', 245);

			// var canvas = $('#canvas svg')[0];
			// console.log(canvas);
			// description.appendChild(canvas);

			// $(foreignobject).remove();
			
			// http://updates.html5rocks.com/2011/08/Saving-generated-files-on-the-client-side
			// http://www.html5rocks.com/en/tutorials/file/filesystem/#toc-file-writing
			var svg = $('#svg-editor > svg')[0];
			var svg_xml = (new XMLSerializer()).serializeToString(svg);

			// var bb = new BlobBuilder();
			// bb.append(svg_xml);
			// var blob = bb.getBlob("application/svg+xml;charset=" + svg.characterSet);
			// saveAs(blob, "test.svg");
			// 
			// var DOMURL = window.URL || window.webkitURL || window.mozURL;
			// var img = new Image();
			// var svg = new Blob([svg_xml], {type: "image/jpeg;charset=utf-8"});
			// var url = DOMURL.createObjectURL(svg);
			// console.log(url);
			// img.onload = function() {
			//     DOMURL.revokeObjectURL(url);
			//     $('body').append(img.outerHTML);
			// };
			// img.src = url;

			// var canvas    = document.createElement('canvas');
			// // get canvas context
			// var ctx = canvas.getContext("2d");
			// var img = new Image();
			// img.onload = function(){
			// 	canvas.width  = img.width;
			// 	canvas.height = img.height;
			// 	ctx.drawImage(img, 0, 0);

			// 	$('body').append(canvas.outerHTML);

			var file = dataURItoBlob("data:image/svg+xml;base64," + btoa(svg_xml));
			console.log(file);
			var url = window.URL.createObjectURL(file);
			var img2 = new Image();
			img2.onload = function(){
				// Clean up after
				window.URL.revokeObjectURL(url);
			};
			img2.src = url;
			$('body').append(img2.outerHTML);

			// 	// var fd = new FormData();
			// 	// fd.append('file', file);

			// 	// var xhr = new XMLHttpRequest();
			// 	// xhr.open('POST', 'upload.php', true);
			// 	// xhr.onload= function(e) {
			// 	// 	console.log('onload', e);
			// 	// 	// status ok
			// 	// 	if (this.status == 200) {
			// 	// 		var response = JSON.parse(this.response);
			// 	// 		console.log(response);

			// 	// 		var canvas2 = document.createElement('canvas');
			// 	// 		var ctx2 = canvas2.getContext("2d");
			// 	// 		var img2 = new Image();
			// 	// 		img2.onload = function(){
			// 	// 			canvas2.width  = img2.width;
			// 	// 			canvas2.height = img2.height;
			// 	// 			ctx2.drawImage(img2, 0, 0);
			// 	// 			$('body').append(img2);
			// 	// 			var du = canvas2.toDataURL('image/png');
			// 	// 			console.log(du);
			// 	// 		};
			// 	// 		img2.src = response.data;
			// 	// 	}
			// 	// };
			// 	// // send
			// 	// xhr.send(fd);

			// 	// $('body').append(img.outerHTML);
			// };
			// img.src = "data:image/svg+xml;base64," + btoa(svg_xml);
		};

		function dataURItoBlob(dataURI) {
		    var byteString;
			if (dataURI.split(',')[0].indexOf('base64') >= 0)
			    byteString = atob(dataURI.split(',')[1]);
			else
			    byteString = unescape(dataURI.split(',')[1]);
			var array = [];
			for (var i = 0; i < byteString.length; i++) {
				array.push(byteString.charCodeAt(i));
			}
			return new Blob([new Uint8Array(array)], {
				type: 'image/svg+xml'
			});
		}
	});