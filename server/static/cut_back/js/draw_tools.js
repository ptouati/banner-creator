function DRAW_TOOLS_CLASS(){this.select_square_action="",this.last_line=[],this.select_data=!1,this.active_tool="select_tool";var a=[],b=!1;this.toolFiller=function(a,b,c,d,e,f,g,h){canvas_front.clearRect(0,0,WIDTH,HEIGHT);var i=canvas_front.getImageData(0,0,b,c),j=i.data,k=a.getImageData(0,0,b,c),l=k.data,m=e*(4*k.width)+4*d,n=[0,-1,1,0],o=[-1,0,0,1],p={r:l[m+0],g:l[m+1],b:l[m+2],a:l[m+3]};if(p.r==f.r&&p.g==f.g&&p.b==f.b&&p.a==f.a)return!1;var q=[];for(q.push([d,e]);q.length>0;)for(var r=q.pop(),s=0;s<4;s++){var t=r[0]+n[s],u=r[1]+o[s];if(!(t<0||u<0||t>=b||u>=c)){var m=4*(u*b+t);0==j[m+3]&&Math.abs(l[m+0]-p.r)<=g&&Math.abs(l[m+1]-p.g)<=g&&Math.abs(l[m+2]-p.b)<=g&&Math.abs(l[m+3]-p.a)<=g&&(j[m]=f.r,j[m+1]=f.g,j[m+2]=f.b,j[m+3]=f.a,q.push([t,u]))}}canvas_front.putImageData(i,0,0),1==h&&(a.shadowColor="rgba("+f.r+", "+f.g+", "+f.b+", "+f.a/255+")",a.shadowBlur=5),a.drawImage(document.getElementById("canvas_front"),0,0),a.shadowBlur=0},this.tool_magic_wand=function(a,b,c,d,e,f,g){canvas_front.clearRect(0,0,WIDTH,HEIGHT),canvas_front.rect(0,0,WIDTH,HEIGHT),canvas_front.fillStyle="rgba(255, 255, 255, 0)",canvas_front.fill();var h=canvas_front.getImageData(0,0,b,c),i=h.data,j=a.getImageData(0,0,b,c),k=j.data,l=e*(4*j.width)+4*d,m=[0,-1,1,0],n=[-1,0,0,1],o={r:255,g:255,b:255,a:255},p={r:k[l+0],g:k[l+1],b:k[l+2],a:k[l+3]};if(p.r==o.r&&p.g==o.g&&p.b==o.b&&0==p.a)return!1;var q=[];for(q.push([d,e]);q.length>0;)for(var r=q.pop(),s=0;s<4;s++){var t=r[0]+m[s],u=r[1]+n[s];if(!(t<0||u<0||t>=b||u>=c)){var l=4*(u*b+t);0==i[l+3]&&Math.abs(k[l]-p.r)<=f&&Math.abs(k[l+1]-p.g)<=f&&Math.abs(k[l+2]-p.b)<=f&&Math.abs(k[l+3]-p.a)<=f&&(i[l]=o.r,i[l+1]=o.g,i[l+2]=o.b,i[l+3]=o.a,q.push([t,u]))}}1==g&&(h=ImageFilters.StackBlur(h,2)),canvas_front.putImageData(h,0,0),a.globalCompositeOperation="destination-out",a.drawImage(document.getElementById("canvas_front"),0,0),a.shadowBlur=0,a.globalCompositeOperation="source-over"},this.select_tool=function(a,b,c){if(void 0==b)return!1;if(0==b.valid)return!0;if(0==b.click_valid)return!0;if(void 0!=c&&"canvas_preview"==c.target.id)return!0;var d=document.getElementById(LAYER.layers[LAYER.layer_active].name);if("drag"==a)if(canvas_front.clearRect(0,0,WIDTH,HEIGHT),"hidden"!=d.style.visibility&&(d.style.visibility="hidden"),1==EVENTS.ctrl_pressed){var e=b.x,f=b.y;Math.abs(b.click_x-b.x)<Math.abs(b.click_y-b.y)?e=b.click_x:f=b.click_y,canvas_front.drawImage(canvas_active(!0),e-b.click_x,f-b.click_y)}else canvas_front.drawImage(canvas_active(!0),b.x-b.click_x,b.y-b.click_y);else if("release"==a){if(d.style.visibility="visible",0==b.valid||b.click_x===!1)return!1;if(b.x-b.click_x==0&&b.y-b.click_y==0)return!1;EDIT.save_state();var g=canvas_active().getImageData(0,0,WIDTH,HEIGHT);if(canvas_active().clearRect(0,0,WIDTH,HEIGHT),1==EVENTS.ctrl_pressed){var e=b.x,f=b.y;Math.abs(b.click_x-b.x)<Math.abs(b.click_y-b.y)?e=b.click_x:f=b.click_y,canvas_active().putImageData(g,e-b.click_x,f-b.click_y)}else canvas_active().putImageData(g,b.x-b.click_x,b.y-b.click_y)}},this.magic_wand=function(a,b,c){return 0==b.valid||void("click"==a&&(EDIT.save_state(),this.tool_magic_wand(canvas_active(),WIDTH,HEIGHT,b.x,b.y,GUI.action_data().attributes.power,GUI.action_data().attributes.anti_aliasing)))},this.erase=function(a,b,c){if(0==b.valid)return!0;var d=GUI.action_data().attributes.strict,e=GUI.action_data().attributes.size,f=GUI.action_data().attributes.circle,g=document.getElementById("strict");if(0==f?void 0!=g&&(g.style.display="none"):void 0!=g&&(g.style.display="block"),"click"==a)if(EDIT.save_state(),0==f)canvas_active().save(),canvas_active().globalCompositeOperation="destination-out",canvas_active().fillStyle="rgba(255, 255, 255, "+ALPHA/255+")",canvas_active().fillRect(b.x-Math.ceil(e/2)+1,b.y-Math.ceil(e/2)+1,e,e),canvas_active().restore();else{if(0==d){var h=canvas_active().createRadialGradient(b.x,b.y,e/8,b.x,b.y,e/2);h.addColorStop(0,"rgba(255, 255, 255, "+ALPHA/255+")"),h.addColorStop(1,"rgba(255, 255, 255, 0)")}canvas_active().save(),canvas_active().globalCompositeOperation="destination-out",1==d?canvas_active().fillStyle="rgba(255, 255, 255, "+ALPHA/255+")":canvas_active().fillStyle=h,canvas_active().beginPath(),canvas_active().arc(b.x,b.y,e/2,0,2*Math.PI,!0),canvas_active().fill(),canvas_active().restore()}else if("drag"==a){if(0==f)canvas_active().save(),canvas_active().globalCompositeOperation="destination-out",ALPHA<255?canvas_active().fillStyle="rgba(255, 255, 255, "+ALPHA/255/10+")":canvas_active().fillStyle=COLOR,canvas_active().fillRect(b.x-Math.ceil(e/2)+1,b.y-Math.ceil(e/2)+1,e,e),canvas_active().restore();else{if(0==d){var h=canvas_active().createRadialGradient(b.x,b.y,e/10,b.x,b.y,e/2);ALPHA<255?h.addColorStop(0,"rgba(255, 255, 255, "+ALPHA/255/10+")"):h.addColorStop(0,"rgba(255, 255, 255, 1)"),h.addColorStop(1,"rgba(255, 255, 255, 0)")}canvas_active().save(),canvas_active().globalCompositeOperation="destination-out",1==d?ALPHA<255?canvas_active().fillStyle="rgba(255, 255, 255, "+ALPHA/255/10+")":canvas_active().fillStyle=COLOR:canvas_active().fillStyle=h,canvas_active().beginPath(),canvas_active().arc(b.x,b.y,e/2,0,2*Math.PI,!0),canvas_active().fill(),canvas_active().restore()}canvas_front.clearRect(0,0,WIDTH,HEIGHT),0==f?(canvas_front.lineWidth=1,EL.rectangle_dashed(canvas_front,b.x-Math.ceil(e/2)+1,b.y-Math.ceil(e/2)+1,b.x+Math.floor(e/2),b.y+Math.floor(e/2),1,"#000000")):EL.circle(canvas_front,b.x,b.y,e)}else if("move"==a){var i=Math.floor(e/2),j=Math.floor(e/2);e%2==0?j--:i--,canvas_front.clearRect(0,0,WIDTH,HEIGHT),0==f?(canvas_front.lineWidth=1,EL.rectangle_dashed(canvas_front,b.x-Math.ceil(e/2)+1,b.y-Math.ceil(e/2)+1,b.x+Math.floor(e/2),b.y+Math.floor(e/2),1,"#000000")):EL.circle(canvas_front,b.x,b.y,e)}},this.fill=function(a,b,c){if(0==b.valid)return!0;if("click"==a){EDIT.save_state();var d=HELPER.hex2rgb(COLOR);d.a=ALPHA,DRAW.toolFiller(canvas_active(),WIDTH,HEIGHT,b.x,b.y,d,GUI.action_data().attributes.power,GUI.action_data().attributes.anti_aliasing)}},this.pick_color=function(a,b,c){if(0==b.valid)return!0;if("click"==a){var d=canvas_active().getImageData(b.x,b.y,1,1).data;COLOR="#"+("000000"+HELPER.rgbToHex(d[0],d[1],d[2])).slice(-6),ALPHA=d[3],document.getElementById("rgb_a").value=ALPHA,GUI.sync_colors()}},this.pencil=function(a,b,c){if(0==b.valid)return!0;var d=HELPER.hex2rgb(COLOR);if("click"==a)EDIT.save_state();else if("drag"==a){if(0!=b.last_x&&0!=b.last_y){dist_x=b.last_x-b.x,dist_y=b.last_y-b.y,distance=Math.sqrt(dist_x*dist_x+dist_y*dist_y),radiance=Math.atan2(dist_y,dist_x);for(var e=0;e<distance;e++){x_tmp=b.x+Math.cos(radiance)*e,y_tmp=b.y+Math.sin(radiance)*e,x_tmp=Math.round(x_tmp),y_tmp=Math.round(y_tmp);HELPER.hex2rgb(COLOR);canvas_active().fillStyle="rgba("+d.r+", "+d.g+", "+d.b+", "+ALPHA/255+")",canvas_active().fillRect(x_tmp,y_tmp,1,1)}}}else"release"==a&&(canvas_active().fillStyle="rgba("+d.r+", "+d.g+", "+d.b+", "+ALPHA/255+")",canvas_active().fillRect(b.x,b.y,1,1))},this.line=function(b,c,d){if(0==c.click_valid)return!1;var e=HELPER.hex2rgb(COLOR),f=c.x,g=c.y,h=c.click_x,i=c.click_y,j=GUI.action_data().attributes.type;if("move"==b)canvas_front.clearRect(0,0,WIDTH,HEIGHT),canvas_front.strokeStyle="rgba("+e.r+", "+e.g+", "+e.b+", "+ALPHA/255+")",canvas_front.lineWidth=GUI.action_data().attributes.size,"Curve"==j&&2==a.length&&(canvas_front.beginPath(),canvas_front.moveTo(a[0][0]+.5,a[0][1]+.5),canvas_front.quadraticCurveTo(c.x+.5,c.y+.5,a[1][0],a[1][1]),canvas_front.stroke());else if("drag"==b)if(document.body.style.cursor="crosshair",canvas_front.clearRect(0,0,WIDTH,HEIGHT),canvas_front.beginPath(),canvas_front.strokeStyle="rgba("+e.r+", "+e.g+", "+e.b+", "+ALPHA/255+")",canvas_front.lineWidth=GUI.action_data().attributes.size,"Multi-line"==j&&void 0!=this.last_line[0]&&(h=this.last_line[0],i=this.last_line[1]),1==EVENTS.ctrl_pressed&&(Math.abs(h-c.x)<Math.abs(i-c.y)?f=h:g=i),"Arrow"==j){var k=5*GUI.action_data().attributes.size;k<15&&(k=15),EL.arrow(canvas_front,h+.5,i+.5,f+.5,g+.5,k)}else canvas_front.moveTo(h+.5,i+.5),canvas_front.lineTo(f+.5,g+.5),canvas_front.stroke();else if("click"==b)"Curve"==j&&(EDIT.save_state(),canvas_active().beginPath(),canvas_active().strokeStyle="rgba("+e.r+", "+e.g+", "+e.b+", "+ALPHA/255+")",canvas_active().lineWidth=GUI.action_data().attributes.size,1==EVENTS.ctrl_pressed&&(Math.abs(h-c.x)<Math.abs(i-c.y)?f=h:g=i),2==a.length&&(canvas_active().beginPath(),canvas_active().moveTo(a[0][0]+.5,a[0][1]+.5),canvas_active().quadraticCurveTo(f+.5,g+.5,a[1][0],a[1][1]),canvas_active().stroke(),a=[]));else if("release"==b){if(c.x-c.click_x==0&&c.y-c.click_y==0&&"Multi-line"!=j)return!1;if(EDIT.save_state(),canvas_active().beginPath(),canvas_active().strokeStyle="rgba("+e.r+", "+e.g+", "+e.b+", "+ALPHA/255+")",canvas_active().lineWidth=GUI.action_data().attributes.size,"Multi-line"==j&&void 0!=this.last_line[0]&&(h=DRAW.last_line[0],i=DRAW.last_line[1]),1==EVENTS.ctrl_pressed&&(Math.abs(h-c.x)<Math.abs(i-c.y)?f=h:g=i),"Arrow"==j){var k=5*GUI.action_data().attributes.size;k<15&&(k=15),EL.arrow(canvas_active(),h+.5,i+.5,f+.5,g+.5,k),this.last_line[0]=f,this.last_line[1]=g}else"Curve"==j?0!=a.length||c.click_x==c.x&&c.click_y==c.y?2==a.length&&(a=[]):(a.push([c.click_x,c.click_y]),a.push([f,g])):(EL.line(canvas_active(),h,i,f,g),this.last_line[0]=f,this.last_line[1]=g)}},this.letters=function(a,b,c){var d=this;if(0==b.valid)return!0;var e=b.x,f=b.y;"click"==a&&(POP.add({name:"text",title:"Text:",value:"",type:"textarea"}),POP.add({name:"size",title:"Size:",value:20,range:[2,1e3],step:2}),POP.add({name:"color",title:"Color:",value:"#000000",type:"color"}),POP.add({name:"style",title:"Font style:",values:["Normal","Italic","Bold","Bold Italic"],type:"select"}),POP.add({name:"family",title:"Font family:",values:["Arial","Courier","Impact","Helvetica","monospace","Times New Roman","Verdana"],type:"select"}),POP.add({name:"size_3d",title:"3D size:",value:0,range:[0,200]}),POP.add({name:"pos_3d",title:"3D position:",values:["Top-left","Top-right","Bottom-left","Bottom-right"],type:"select"}),POP.add({name:"shadow",title:"Shadow:",values:["No","Yes"]}),POP.add({name:"shadow_blur",title:"Shadow blur:",value:6,range:[1,20]}),POP.add({name:"shadow_color",title:"Shadow color:",value:"#000000",type:"color"}),POP.add({name:"fill_style",title:"Fill style:",values:["Fill","Stroke","Both"],type:"select"}),POP.add({name:"stroke_size",title:"Stroke size:",value:1,range:[1,100]}),POP.preview_in_main=!0,POP.show("Text",function(a){EDIT.save_state(),text=a.text.split("\n");for(var b in text){a.text=text[b];var c=f+b*(parseInt(a.size)+2);d.letters_render(canvas_active(),e,c,a)}canvas_front.clearRect(0,0,WIDTH,HEIGHT)},function(a){canvas_front.clearRect(0,0,WIDTH,HEIGHT),text=a.text.split("\n");for(var b in text){a.text=text[b];var c=f+b*(parseInt(a.size)+2);d.letters_render(canvas_front,e,c,a)}}))},this.letters_render=function(a,b,c,d){var q,r,e=d.text,f=parseInt(d.size),g=d.color,h=parseInt(d.size_3d),i=d.pos_3d,j=d.shadow,k=parseInt(d.shadow_blur),l=d.shadow_color,m=d.family,n=d.style,o=d.fill_style,p=d.stroke_size;"Top-left"==i?(q=-1,r=-1):"Top-right"==i?(q=1,r=-1):"Bottom-left"==i?(q=-1,r=1):"Bottom-right"==i&&(q=1,r=1);var s=HELPER.hex2rgb(g);a.fillStyle="rgba("+s.r+", "+s.g+", "+s.b+", "+ALPHA/255+")",a.font=n+" "+f+"px "+m;var t=HELPER.font_pixel_to_height(f);if("Yes"==j&&(a.save(),a.shadowColor=l,a.shadowBlur=k,a.shadowOffsetX=q,a.shadowOffsetY=r,a.fillText(e,b+q*(h-1),c+t+r*(h-1)),a.restore()),h>0){for(a.fillStyle=HELPER.darkenColor(COLOR,-30),alpha_tmp=ALPHA,alpha_tmp<255&&(alpha_tmp/=10),s.r-=50,s.g-=50,s.b-=50,s.r<0&&(s.r*=-1),s.g<0&&(s.g*=-1),s.b<0&&(s.b*=-1),a.fillStyle="rgba("+s.r+", "+s.g+", "+s.b+", "+alpha_tmp/255+")",cnt=0;cnt<h;cnt++)a.fillText(e,b+q*cnt,c+t+r*cnt);s=HELPER.hex2rgb(COLOR)}a.fillStyle="rgba("+s.r+", "+s.g+", "+s.b+", "+ALPHA/255+")",a.strokeStyle="rgba("+s.r+", "+s.g+", "+s.b+", "+ALPHA/255+")",a.lineWidth=p,"Fill"!=o&&"Both"!=o||a.fillText(e,b,c+t),"Stroke"!=o&&"Both"!=o||a.strokeText(e,b,c+t),GUI.zoom()},this.draw_square=function(a,b,c){if(0==b.click_valid)return!0;var d=HELPER.hex2rgb(COLOR),e=GUI.action_data().attributes.fill,f=b.x-b.click_x,g=b.y-b.click_y;if("drag"==a)canvas_front.clearRect(0,0,WIDTH,HEIGHT),canvas_front.fillStyle="rgba("+d.r+", "+d.g+", "+d.b+", "+ALPHA/255+")",canvas_front.strokeStyle="rgba("+d.r+", "+d.g+", "+d.b+", "+ALPHA/255+")",canvas_front.lineWidth=1,1==GUI.action_data().attributes.square?EL.square(canvas_front,b.click_x,b.click_y,f,g,e):EL.rectangle(canvas_front,b.click_x,b.click_y,f,g,e);else if("release"==a){if(b.x==b.click_x&&b.y==b.click_y)return!1;EDIT.save_state(),canvas_active().fillStyle="rgba("+d.r+", "+d.g+", "+d.b+", "+ALPHA/255+")",canvas_active().strokeStyle="rgba("+d.r+", "+d.g+", "+d.b+", "+ALPHA/255+")",canvas_active().lineWidth=1,1==GUI.action_data().attributes.square?EL.square(canvas_active(),b.click_x,b.click_y,f,g,e):EL.rectangle(canvas_active(),b.click_x,b.click_y,f,g,e)}},this.draw_circle=function(a,b,c){if(0==b.click_valid)return!0;var d=HELPER.hex2rgb(COLOR);if("drag"==a)dist_x=b.x-b.click_x,dist_y=b.y-b.click_y,canvas_front.clearRect(0,0,WIDTH,HEIGHT),1==GUI.action_data().attributes.circle&&(dist_x=dist_y=Math.min(dist_x,dist_y)),1==GUI.action_data().attributes.fill?EL.ellipse_by_center(canvas_front,b.click_x,b.click_y,2*dist_x,2*dist_y,"rgba("+d.r+", "+d.g+", "+d.b+", "+ALPHA/255+")",!0):EL.ellipse_by_center(canvas_front,b.click_x,b.click_y,2*dist_x,2*dist_y,"rgba("+d.r+", "+d.g+", "+d.b+", "+ALPHA/255+")");else if("release"==a){if(dist_x=b.x-b.click_x,dist_y=b.y-b.click_y,0==dist_x&&0==dist_y)return!1;EDIT.save_state(),1==GUI.action_data().attributes.circle&&(dist_x=dist_y=Math.min(dist_x,dist_y)),canvas_active().lineWidth=1,1==GUI.action_data().attributes.fill?EL.ellipse_by_center(canvas_active(),b.click_x,b.click_y,2*dist_x,2*dist_y,"rgba("+d.r+", "+d.g+", "+d.b+", "+ALPHA/255+")",!0):EL.ellipse_by_center(canvas_active(),b.click_x,b.click_y,2*dist_x,2*dist_y,"rgba("+d.r+", "+d.g+", "+d.b+", "+ALPHA/255+")")}},this.update_brush=function(){document.getElementById("anti_aliasing").style.display="","Brush"!=GUI.action_data().attributes.type&&(document.getElementById("anti_aliasing").style.display="none")},this.desaturate_tool=function(a,b,c){if(0==b.valid)return!0;var d=GUI.action_data().attributes.size,e=b.x-d/2,f=b.y-d/2;if(e<0&&(e=0),f<0&&(f=0),"click"==a){EDIT.save_state();var g=canvas_active().getImageData(e,f,d,d),h=ImageFilters.GrayScale(g);EL.image_round(canvas_active(),b.x,b.y,d,h,document.getElementById("canvas_front"),GUI.action_data().attributes.anti_aliasing)}else if("drag"==a){var g=canvas_active().getImageData(e,f,d,d),h=ImageFilters.GrayScale(g);EL.image_round(canvas_active(),b.x,b.y,d,h,document.getElementById("canvas_front"),GUI.action_data().attributes.anti_aliasing)}"move"!=a&&"drag"!=a||(canvas_front.clearRect(0,0,WIDTH,HEIGHT),EL.circle(canvas_front,b.x,b.y,d))},this.brush=function(a,b,d){if(0==b.valid)return!0;var e=GUI.action_data().attributes.type,g=HELPER.hex2rgb(COLOR),h=GUI.action_data().attributes.size;if("click"==a&&EDIT.save_state(),"Brush"==e)"click"==a?(canvas_active().beginPath(),canvas_active().strokeStyle="rgba("+g.r+", "+g.g+", "+g.b+", "+ALPHA/255+")",canvas_active().lineWidth=GUI.action_data().attributes.size,canvas_active().lineCap="round",canvas_active().lineJoin="round",canvas_front.clearRect(0,0,WIDTH,HEIGHT),ALPHA<255&&(canvas_front.beginPath(),canvas_front.strokeStyle="rgba("+g.r+", "+g.g+", "+g.b+", "+ALPHA/255+")",canvas_front.lineWidth=GUI.action_data().attributes.size,canvas_front.lineCap="round",canvas_front.lineJoin="round"),canvas_front.beginPath(),canvas_front.arc(b.x,b.y,GUI.action_data().attributes.size/2,0,2*Math.PI,!1),canvas_front.fillStyle="rgba("+g.r+", "+g.g+", "+g.b+", "+ALPHA/255+")",canvas_front.fill(),canvas_active().shadowBlur=0,1==GUI.action_data().attributes.anti_aliasing&&(canvas_active().shadowColor="rgba("+g.r+", "+g.g+", "+g.b+", "+ALPHA/255+")",canvas_active().shadowBlur=Math.round(GUI.action_data().attributes.size))):"drag"==a&&0!=b.last_x&&0!=b.last_y?(255==ALPHA&&canvas_active().beginPath(),canvas_active().moveTo(b.last_x,b.last_y),canvas_active().lineTo(b.x,b.y),255==ALPHA&&canvas_active().stroke(),ALPHA<255&&(canvas_front.beginPath(),canvas_front.globalCompositeOperation="destination-out",canvas_front.strokeStyle="rgba("+g.r+", "+g.g+", "+g.b+", 1)",canvas_front.moveTo(b.last_x,b.last_y),canvas_front.lineTo(b.x,b.y),canvas_front.stroke(),canvas_front.strokeStyle="rgba("+g.r+", "+g.g+", "+g.b+", "+ALPHA/255+")",canvas_front.globalCompositeOperation="source-over",canvas_front.moveTo(b.last_x,b.last_y),canvas_front.lineTo(b.x,b.y),canvas_front.stroke())):"release"==a?(canvas_front.clearRect(0,0,WIDTH,HEIGHT),canvas_active().stroke(),b.click_x==b.x&&b.click_y==b.y&&(canvas_active().beginPath(),canvas_active().arc(b.x,b.y,GUI.action_data().attributes.size/2,0,2*Math.PI,!1),canvas_active().fillStyle="rgba("+g.r+", "+g.g+", "+g.b+", "+ALPHA/255+")",canvas_active().fill()),canvas_active().shadowBlur=0):"move"==a&&(canvas_front.clearRect(0,0,WIDTH,HEIGHT),EL.circle(canvas_front,b.x,b.y,h));else if("BezierCurve"==e){if("click"==a)BezierCurveBrush.startCurve(b.x,b.y);else if("drag"==a&&0!=b.last_x&&0!=b.last_y){var g=HELPER.hex2rgb(COLOR);canvas_active().strokeStyle="rgba("+g.r+", "+g.g+", "+g.b+", "+ALPHA/255+")",canvas_active().lineWidth=.5,BezierCurveBrush.draw(canvas_active(),g,b.x,b.y,GUI.action_data().attributes.size)}}else if("Chrome"==e){if("click"==a)chrome_brush.init(canvas_active()),chrome_brush.strokeStart(b.x,b.y);else if("drag"==a&&0!=b.last_x&&0!=b.last_y){var g=HELPER.hex2rgb(COLOR);canvas_active().strokeStyle="rgba("+g.r+", "+g.g+", "+g.b+", "+ALPHA/255+")",canvas_active().lineWidth=1,chrome_brush.stroke(g,b.x,b.y,GUI.action_data().attributes.size)}}else if("Fur"==e){if("click"==a)points=new Array,prevMouseX=b.x,prevMouseY=b.y,count=0;else if("drag"==a&&0!=b.last_x&&0!=b.last_y){var g=HELPER.hex2rgb(COLOR);canvas_active().strokeStyle="rgba("+g.r+", "+g.g+", "+g.b+", 0.1)",canvas_active().lineWidth=1,f=b.x,c=b.y;var i,j,k,l;for(points.push([f,c]),canvas_active().beginPath(),canvas_active().moveTo(prevMouseX,prevMouseY),canvas_active().lineTo(f,c),canvas_active().stroke(),i=0;i<points.length;i++){j=points[i][0]-points[count][0],k=points[i][1]-points[count][1],l=j*j+k*k;var m=Math.round(400*GUI.action_data().attributes.size);l<m&&Math.random()>l/m&&(canvas_active().beginPath(),canvas_active().moveTo(f+.5*j,c+.5*k),canvas_active().lineTo(f-.5*j,c-.5*k),canvas_active().stroke())}prevMouseX=f,prevMouseY=c,count++}}else if("Grouped"==e){if(groups_n=GUI.action_data().attributes.size,gsize=10,random_power=5,"click"==a){chrome_brush.init(canvas_active()),chrome_brush.strokeStart(b.x,b.y),groups=[];for(var l=0;l<groups_n;l++)groups[l]={},groups[l].x=HELPER.getRandomInt(-gsize,gsize),groups[l].y=HELPER.getRandomInt(-gsize,gsize)}else if("drag"==a&&0!=b.last_x&&0!=b.last_y){canvas_active().strokeStyle="rgba("+g.r+", "+g.g+", "+g.b+", "+ALPHA/255+")",canvas_active().lineWidth=.5;for(var l in groups)canvas_active().beginPath(),canvas_active().moveTo(b.last_x+groups[l].x,b.last_y+groups[l].y),groups[l].x+=HELPER.getRandomInt(-random_power,random_power),groups[l].y+=HELPER.getRandomInt(-random_power,random_power),groups[l].x<-gsize&&(groups[l].x=-gsize+random_power),groups[l].y<-gsize&&(groups[l].y=-gsize+random_power),groups[l].x>gsize&&(groups[l].x=gsize-random_power),groups[l].y>gsize&&(groups[l].y=gsize-random_power),canvas_active().lineTo(b.x+groups[l].x,b.y+groups[l].y),canvas_active().stroke()}}else if("Shaded"==e){if("click"==a)shaded_brush.init(canvas_active()),shaded_brush.strokeStart(b.x,b.y);else if("drag"==a&&0!=b.last_x&&0!=b.last_y){var g=HELPER.hex2rgb(COLOR);canvas_active().strokeStyle="rgba("+g.r+", "+g.g+", "+g.b+", "+ALPHA/255+")",canvas_active().lineWidth=1,shaded_brush.stroke(g,b.x,b.y,GUI.action_data().attributes.size)}}else if("Sketchy"==e)if("click"==a)sketchy_brush.init(canvas_active()),sketchy_brush.strokeStart(b.x,b.y);else if("drag"==a&&0!=b.last_x&&0!=b.last_y){var g=HELPER.hex2rgb(COLOR);canvas_active().strokeStyle="rgba("+g.r+", "+g.g+", "+g.b+", "+ALPHA/255+")",canvas_active().lineWidth=1,sketchy_brush.stroke(g,b.x,b.y,GUI.action_data().attributes.size)}},this.gradient_tool=function(a,b,c){if(void 0!=b&&0==b.valid&&"init"!=a)return!0;var d=GUI.action_data().attributes.power;if(d>99&&(d=99),"init"==a)POP.add({name:"param1",title:"Color #1:",value:"#000000",type:"color"}),POP.add({name:"param2",title:"Transparency #1:",value:"255",range:[0,255]}),POP.add({name:"param3",title:"Color #2:",value:"#ffffff",type:"color"}),POP.add({name:"param4",title:"Transparency #2:",value:"255",range:[0,255]}),POP.show("Text",function(a){color1=HELPER.hex2rgb(a.param1),color1.a=parseInt(a.param2),color2=HELPER.hex2rgb(a.param3),color2.a=parseInt(a.param4)});else if("drag"==a){if(canvas_front.clearRect(0,0,WIDTH,HEIGHT),0==GUI.action_data().attributes.radial){if(canvas_front.rect(0,0,WIDTH,HEIGHT),b.x>b.click_x)var e=canvas_front.createLinearGradient(b.click_x,b.click_y,b.x,b.y);else var e=canvas_front.createLinearGradient(b.x,b.y,b.click_x,b.click_y);e.addColorStop(0,"rgba("+color1.r+", "+color1.g+", "+color1.b+", "+color1.a/255+")"),e.addColorStop(1,"rgba("+color2.r+", "+color2.g+", "+color2.b+", "+color2.a/255+")"),canvas_front.fillStyle=e,canvas_front.fill()}else{var f=b.click_x-b.x,g=b.click_y-b.y,h=Math.sqrt(f*f+g*g),i=canvas_front.createRadialGradient(b.click_x,b.click_y,h*d/100,b.click_x,b.click_y,h);i.addColorStop(0,"rgba("+color1.r+", "+color1.g+", "+color1.b+", "+color1.a/255+")"),i.addColorStop(1,"rgba("+color2.r+", "+color2.g+", "+color2.b+", "+color2.a/255+")"),canvas_front.fillStyle=i,canvas_front.fillRect(0,0,WIDTH,HEIGHT)}canvas_front.beginPath(),canvas_front.strokeStyle="#ff0000",canvas_front.lineWidth=1;var j=b.x,k=b.y;canvas_front.moveTo(b.click_x+.5,b.click_y+.5),canvas_front.lineTo(j+.5,k+.5),canvas_front.stroke()}else if("release"==a)if(EDIT.save_state(),0==GUI.action_data().attributes.radial){if(canvas_active().rect(0,0,WIDTH,HEIGHT),b.x>b.click_x)var e=canvas_active().createLinearGradient(b.click_x,b.click_y,b.x,b.y);else var e=canvas_active().createLinearGradient(b.x,b.y,b.click_x,b.click_y);e.addColorStop(0,"rgba("+color1.r+", "+color1.g+", "+color1.b+", "+color1.a/255+")"),e.addColorStop(1,"rgba("+color2.r+", "+color2.g+", "+color2.b+", "+color2.a/255+")"),canvas_active().fillStyle=e,canvas_active().fill()}else{var f=b.click_x-b.x,g=b.click_y-b.y,h=Math.sqrt(f*f+g*g),i=canvas_active().createRadialGradient(b.click_x,b.click_y,h*d/100,b.click_x,b.click_y,h);i.addColorStop(0,"rgba("+color1.r+", "+color1.g+", "+color1.b+", "+color1.a/255+")"),i.addColorStop(1,"rgba("+color2.r+", "+color2.g+", "+color2.b+", "+color2.a/255+")"),canvas_active().fillStyle=i,canvas_active().fillRect(0,0,WIDTH,HEIGHT)}},this.blur_tool=function(a,b,c){if(0==b.valid)return!0;var d=GUI.action_data().attributes.size,f=(Math.round(d/2),b.x-d/2),g=b.y-d/2;if(f<0&&(f=0),g<0&&(g=0),"click"==a){EDIT.save_state();var h=GUI.action_data().attributes.power,i=canvas_active().getImageData(f,g,d,d),j=ImageFilters.StackBlur(i,h);EL.image_round(canvas_active(),b.x,b.y,d,j,document.getElementById("canvas_front")),canvas_front.clearRect(0,0,WIDTH,HEIGHT),EL.circle(canvas_front,b.x,b.y,d)}else if("drag"==a){var h=GUI.action_data().attributes.power,i=canvas_active().getImageData(f,g,d,d),j=ImageFilters.StackBlur(i,h);EL.image_round(canvas_active(),b.x,b.y,d,j,document.getElementById("canvas_front")),canvas_front.clearRect(0,0,WIDTH,HEIGHT),EL.circle(canvas_front,b.x,b.y,d)}else"move"==a&&(canvas_front.clearRect(0,0,WIDTH,HEIGHT),EL.circle(canvas_front,b.x,b.y,d))},this.sharpen_tool=function(a,b,c){if(0==b.valid)return!0;var d=GUI.action_data().attributes.size,e=.5,f=b.x-d/2,g=b.y-d/2;if(f<0&&(f=0),g<0&&(g=0),"click"==a){EDIT.save_state();var h=canvas_active().getImageData(f,g,d,d),i=ImageFilters.Sharpen(h,e);EL.image_round(canvas_active(),b.x,b.y,d,i,document.getElementById("canvas_front")),canvas_front.clearRect(0,0,WIDTH,HEIGHT),EL.circle(canvas_front,b.x,b.y,d)}else if("drag"==a){var h=canvas_active().getImageData(f,g,d,d),i=ImageFilters.Sharpen(h,e);EL.image_round(canvas_active(),b.x,b.y,d,i,document.getElementById("canvas_front")),canvas_front.clearRect(0,0,WIDTH,HEIGHT),EL.circle(canvas_front,b.x,b.y,d)}else"move"==a&&(canvas_front.clearRect(0,0,WIDTH,HEIGHT),EL.circle(canvas_front,b.x,b.y,d))},this.burn_dodge_tool=function(a,b,c){if(0==b.valid)return!0;var d=GUI.action_data().attributes.size,e=2.5*GUI.action_data().attributes.power;"click"==a?(EDIT.save_state(),canvas_front.clearRect(0,0,WIDTH,HEIGHT),canvas_front.save(),EVENTS.clear_front_on_release=!1,canvas_active().beginPath(),canvas_active().lineWidth=GUI.action_data().attributes.size,canvas_active().lineCap="round",canvas_active().lineJoin="round",canvas_front.beginPath(),1==GUI.action_data().attributes.burn?canvas_front.strokeStyle="rgba(0, 0, 0, "+e/255+")":canvas_front.strokeStyle="rgba(255, 255, 255, "+e/255+")",canvas_front.lineWidth=GUI.action_data().attributes.size,canvas_front.lineCap="round",canvas_front.lineJoin="round"):"drag"==a&&0!=b.last_x&&0!=b.last_y?(canvas_front.beginPath(),canvas_front.globalCompositeOperation="destination-out",canvas_front.moveTo(b.last_x,b.last_y),canvas_front.lineTo(b.x,b.y),canvas_front.stroke(),canvas_front.globalCompositeOperation="source-over",canvas_front.moveTo(b.last_x,b.last_y),canvas_front.lineTo(b.x,b.y),canvas_front.stroke()):"release"==a?(canvas_active().globalCompositeOperation="soft-light",canvas_active().shadowBlur=5,canvas_active().drawImage(document.getElementById("canvas_front"),0,0),canvas_active().globalCompositeOperation="source-over",canvas_front.clearRect(0,0,WIDTH,HEIGHT),EVENTS.clear_front_on_release=!0,b.click_x==b.x&&b.click_y==b.y&&(canvas_active().globalCompositeOperation="soft-light",canvas_active().beginPath(),canvas_active().arc(b.x,b.y,GUI.action_data().attributes.size/2,0,2*Math.PI,!1),1==GUI.action_data().attributes.burn?canvas_active().fillStyle="rgba(0, 0, 0, "+e/255+")":canvas_active().fillStyle="rgba(255, 255, 255, "+e/255+")",canvas_active().shadowBlur=5,canvas_active().fill(),canvas_active().globalCompositeOperation="source-over"),canvas_active().shadowBlur=0,canvas_front.clearRect(0,0,WIDTH,HEIGHT),canvas_front.restore()):"move"==a&&0==EVENTS.isDrag&&(canvas_front.clearRect(0,0,WIDTH,HEIGHT),EL.circle(canvas_front,b.x,b.y,d))},this.crop_tool=function(a,b,c){if(0==b.click_valid)return!0;if("drag"==a)b.x<0&&(b.x=0),b.y<0&&(b.y=0),b.x>=WIDTH&&(b.x=WIDTH),b.y>=HEIGHT&&(b.y=HEIGHT),b.click_x>=WIDTH&&(b.click_x=WIDTH),b.click_y>=HEIGHT&&(b.click_y=HEIGHT),""==this.select_square_action&&(document.body.style.cursor="crosshair",canvas_front.clearRect(0,0,WIDTH,HEIGHT),canvas_front.fillStyle="rgba(0, 255, 0, 0.3)",canvas_front.fillRect(b.click_x,b.click_y,b.x-b.click_x,b.y-b.click_y));else if("move"==a&&0!=this.select_data){if(1==EVENTS.isDrag)return!0;canvas_front.lineWidth=1,border_size=5,this.select_square_action="",""==this.select_square_action&&b.x>this.select_data.x&&b.y>this.select_data.y&&b.x<this.select_data.x+this.select_data.w&&b.y<this.select_data.y+this.select_data.h&&(this.select_square_action="move",document.body.style.cursor="pointer"),""==this.select_square_action&&1==b.valid&&(document.body.style.cursor="auto")}else if("release"==a)b.x<0&&(b.x=0),b.y<0&&(b.y=0),b.x>=WIDTH&&(b.x=WIDTH),b.y>=HEIGHT&&(b.y=HEIGHT),b.click_x>=WIDTH&&(b.click_x=WIDTH),b.click_y>=HEIGHT&&(b.click_y=HEIGHT),""==this.select_square_action&&b.x!=b.click_x&&b.y!=b.click_y&&(this.select_data={x:Math.min(b.x,b.click_x),y:Math.min(b.y,b.click_y),w:Math.abs(b.x-b.click_x),h:Math.abs(b.y-b.click_y)}),GUI.draw_selected_area(!0),LAYER.update_info_block();else if("click"==a&&0!=this.select_data&&(document.body.style.cursor="auto",b.x>this.select_data.x&&b.y>this.select_data.y&&b.x<this.select_data.x+this.select_data.w&&b.y<this.select_data.y+this.select_data.h)){EDIT.save_state();for(var d in LAYER.layers){var e=document.getElementById(LAYER.layers[d].name).getContext("2d"),f=e.getImageData(this.select_data.x,this.select_data.y,this.select_data.w,this.select_data.h);e.clearRect(0,0,WIDTH,HEIGHT),e.putImageData(f,0,0)}EDIT.save_state(),WIDTH=this.select_data.w,HEIGHT=this.select_data.h,LAYER.set_canvas_size(),EDIT.edit_clear()}},this.clone_tool=function(a,c,d){if(0==c.valid)return!0;var e=GUI.action_data().attributes.size,f=Math.round(e/2);if("click"==a)EDIT.save_state(),b===!1?(POP.add({html:"Source is empty, right click on image first."}),POP.show("Error","")):EL.image_round(canvas_active(),c.x,c.y,e,b,document.getElementById("canvas_front"),GUI.action_data().attributes.anti_aliasing);else{if("right_click"==a){b=document.createElement("canvas"),b.width=e,b.height=e;var g=c.x-f,h=c.y-f;return g<0&&(g=0),h<0&&(h=0),b.getContext("2d").drawImage(canvas_active(!0),g,h,e,e,0,0,e,e),!1}if("drag"==a){if(3==d.which)return!0;if(b===!1)return!1;EL.image_round(canvas_active(),c.x,c.y,e,b,document.getElementById("canvas_front"),GUI.action_data().attributes.anti_aliasing)}else"move"==a&&(canvas_front.clearRect(0,0,WIDTH,HEIGHT),EL.circle(canvas_front,c.x,c.y,e))}},this.select_square=function(a,b,c){if(0==b.click_valid)return!0;if("drag"==a)if(b.x<0&&(b.x=0),b.y<0&&(b.y=0),b.x>=WIDTH&&(b.x=WIDTH),b.y>=HEIGHT&&(b.y=HEIGHT),b.click_x>=WIDTH&&(b.click_x=WIDTH),b.click_y>=HEIGHT&&(b.click_y=HEIGHT),""==this.select_square_action)document.body.style.cursor="crosshair",canvas_front.clearRect(0,0,WIDTH,HEIGHT),canvas_front.fillStyle="rgba(0, 255, 0, 0.3)",canvas_front.fillRect(b.click_x,b.click_y,b.x-b.click_x,b.y-b.click_y);else if("move"==this.select_square_action)try{canvas_front.clearRect(0,0,WIDTH,HEIGHT),canvas_front.drawImage(canvas_active(!0),this.select_data.x,this.select_data.y,this.select_data.w,this.select_data.h,b.x-b.click_x+this.select_data.x,b.y-b.click_y+this.select_data.y,this.select_data.w,this.select_data.h),canvas_front.restore()}catch(a){console.log("Error: "+a.message)}else{var d=this.select_data.x,e=this.select_data.y,f=this.select_data.w,g=this.select_data.h;"resize-left"==this.select_square_action?(d+=b.x-b.click_x,f-=b.x-b.click_x):"resize-right"==this.select_square_action?f+=b.x-b.click_x:"resize-top"==this.select_square_action?(e+=b.y-b.click_y,g-=b.y-b.click_y):"resize-bottom"==this.select_square_action?g+=b.y-b.click_y:"resize-1"==this.select_square_action?(d+=b.x-b.click_x,e+=b.y-b.click_y,f-=b.x-b.click_x,g-=b.y-b.click_y):"resize-2"==this.select_square_action?(f+=b.x-b.click_x,e+=b.y-b.click_y,g-=b.y-b.click_y):"resize-3"==this.select_square_action?(f+=b.x-b.click_x,g+=b.y-b.click_y):"resize-4"==this.select_square_action&&(d+=b.x-b.click_x,f-=b.x-b.click_x,g+=b.y-b.click_y);var d=Math.max(d,0),e=Math.max(e,0),f=Math.max(f,0),g=Math.max(g,0);canvas_front.save(),canvas_front.clearRect(0,0,WIDTH,HEIGHT),canvas_front.mozImageSmoothingEnabled=!1,canvas_front.webkitImageSmoothingEnabled=!1,canvas_front.msImageSmoothingEnabled=!1,canvas_front.ImageSmoothingEnabled=!1,canvas_front.drawImage(canvas_active(!0),this.select_data.x,this.select_data.y,this.select_data.w,this.select_data.h,d,e,f,g),canvas_front.restore()}else if("move"==a&&0!=this.select_data){if(1==EVENTS.isDrag)return!0;canvas_front.lineWidth=1,border_size=5,this.select_square_action="";var h=Math.ceil(EVENTS.sr_size/GUI.ZOOM*100);1==this.check_mouse_pos(this.select_data.x,this.select_data.y+this.select_data.h/2,h,b.x,b.y)?(document.body.style.cursor="w-resize",this.select_square_action="resize-left"):1==this.check_mouse_pos(this.select_data.x+this.select_data.w/2,this.select_data.y,h,b.x,b.y)?(document.body.style.cursor="n-resize",this.select_square_action="resize-top"):1==this.check_mouse_pos(this.select_data.x+this.select_data.w-h,this.select_data.y+this.select_data.h/2,h,b.x,b.y)?(document.body.style.cursor="w-resize",this.select_square_action="resize-right"):1==this.check_mouse_pos(this.select_data.x+this.select_data.w/2,this.select_data.y+this.select_data.h-h,h,b.x,b.y)&&(document.body.style.cursor="n-resize",
this.select_square_action="resize-bottom"),1==this.check_mouse_pos(this.select_data.x,this.select_data.y,h,b.x,b.y)?(document.body.style.cursor="nw-resize",this.select_square_action="resize-1"):1==this.check_mouse_pos(this.select_data.x+this.select_data.w-h,this.select_data.y,h,b.x,b.y)?(document.body.style.cursor="ne-resize",this.select_square_action="resize-2"):1==this.check_mouse_pos(this.select_data.x+this.select_data.w-h,this.select_data.y+this.select_data.h-h,h,b.x,b.y)?(document.body.style.cursor="nw-resize",this.select_square_action="resize-3"):1==this.check_mouse_pos(this.select_data.x,this.select_data.y+this.select_data.h-h,h,b.x,b.y)&&(document.body.style.cursor="ne-resize",this.select_square_action="resize-4"),""==this.select_square_action&&b.x>this.select_data.x&&b.y>this.select_data.y&&b.x<this.select_data.x+this.select_data.w&&b.y<this.select_data.y+this.select_data.h&&(this.select_square_action="move",document.body.style.cursor="move"),""==this.select_square_action&&1==b.valid&&(document.body.style.cursor="auto")}else if("release"==a){if(b.x<0&&(b.x=0),b.y<0&&(b.y=0),b.x>=WIDTH&&(b.x=WIDTH),b.y>=HEIGHT&&(b.y=HEIGHT),b.click_x>=WIDTH&&(b.click_x=WIDTH),b.click_y>=HEIGHT&&(b.click_y=HEIGHT),""==this.select_square_action)b.x!=b.click_x&&b.y!=b.click_y&&(this.select_data={x:Math.min(b.x,b.click_x),y:Math.min(b.y,b.click_y),w:Math.abs(b.x-b.click_x),h:Math.abs(b.y-b.click_y)});else{if(b.x-b.click_x==0&&b.y-b.click_y==0)return!1;if(EDIT.save_state(),"move"==this.select_square_action)0!=this.select_data&&(select_data_tmp=canvas_active().getImageData(this.select_data.x,this.select_data.y,this.select_data.w,this.select_data.h),canvas_active().clearRect(this.select_data.x,this.select_data.y,this.select_data.w,this.select_data.h),canvas_active().putImageData(select_data_tmp,b.x-b.click_x+this.select_data.x,b.y-b.click_y+this.select_data.y)),this.select_data.x+=b.x-b.click_x,this.select_data.y+=b.y-b.click_y;else{var d=this.select_data.x,e=this.select_data.y,f=this.select_data.w,g=this.select_data.h;"resize-left"==this.select_square_action?(d+=b.x-b.click_x,f-=b.x-b.click_x):"resize-right"==this.select_square_action?f+=b.x-b.click_x:"resize-top"==this.select_square_action?(e+=b.y-b.click_y,g-=b.y-b.click_y):"resize-bottom"==this.select_square_action?g+=b.y-b.click_y:"resize-1"==this.select_square_action?(d+=b.x-b.click_x,e+=b.y-b.click_y,f-=b.x-b.click_x,g-=b.y-b.click_y):"resize-2"==this.select_square_action?(f+=b.x-b.click_x,e+=b.y-b.click_y,g-=b.y-b.click_y):"resize-3"==this.select_square_action?(f+=b.x-b.click_x,g+=b.y-b.click_y):"resize-4"==this.select_square_action&&(d+=b.x-b.click_x,f-=b.x-b.click_x,g+=b.y-b.click_y);var d=Math.max(d,0),e=Math.max(e,0),f=Math.max(f,0),g=Math.max(g,0),i=document.createElement("canvas"),j=i.getContext("2d");i.width=Math.max(f,this.select_data.w),i.height=Math.max(g,this.select_data.h),j.drawImage(canvas_active(!0),this.select_data.x,this.select_data.y,this.select_data.w,this.select_data.h,0,0,this.select_data.w,this.select_data.h),canvas_active().clearRect(d,e,f,g),canvas_active().drawImage(i,0,0,this.select_data.w,this.select_data.h,d,e,f,g),this.select_data.x=d,this.select_data.y=e,this.select_data.w=f,this.select_data.h=g}}GUI.draw_selected_area(),LAYER.update_info_block()}},this.check_mouse_pos=function(a,b,c,d,e){return d>a-Math.round(c)&&d<a+Math.round(c)&&e>b-Math.round(c)&&e<b+Math.round(c)}}var DRAW=new DRAW_TOOLS_CLASS;