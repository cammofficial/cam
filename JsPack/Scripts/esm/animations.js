var _0x1d6c=['animationComplete','item','duration','fromValue','toValue','animationType','Linear','param','easingType','EaseIn','repeat','onUpdate','onCustomFunction','Power','BackBow','Elastic','Exponential','reverse','ellapsedTime','prototype','dispose','stop','start','startTimeStamp','animationId','requestAnimationFrame','update','bind','cancelAnimationFrame','raiseEvent','isRunning','progress','_progress','animationProgress','pow','Circular','Bounce','cos','onCustomFunctionDelegate','easeIn','easeOut','easeInOut','getTime','onUpdateDelegate','EaseOut','EaseInOut','EaseOutIn','updateAnimation','_duration','_fromValue','_toValue','_animationType','_param','_easingType','_repeat','_reverse','webkitRequestAnimationFrame','mozRequestAnimationFrame','oRequestAnimationFrame','msRequestAnimationFrame','setTimeout','undefined','webkitCancelAnimationFrame','mozCancelAnimationFrame','clearTimeout'];var _0xe344=function(_0x1bf9a4,_0x53e7be){_0x1bf9a4=_0x1bf9a4-0x0;var _0x1b704c=_0x1d6c[_0x1bf9a4];return _0x1b704c;};import{Disposable,ControlUtils,EventArgs}from'@mindfusion/controls';const AnimationType={'Linear':0x0,'Power':0x1,'Exponential':0x2,'Circular':0x3,'BackBow':0x4,'Bounce':0x5,'Elastic':0x6,'Custom':0x7};const EasingType={'EaseIn':0x0,'EaseOut':0x1,'EaseInOut':0x2,'EaseOutIn':0x3};class Events{static get[_0xe344('0x0')](){return _0xe344('0x0');}}class Animation extends Disposable{constructor(_0x1bc15d,_0x5460a7,_0x542d87,_0x196e11){super();this[_0xe344('0x1')]=_0x1bc15d;this[_0xe344('0x2')]=0x3e8;this[_0xe344('0x3')]=null;this[_0xe344('0x4')]=null;this[_0xe344('0x5')]=AnimationType[_0xe344('0x6')];this[_0xe344('0x7')]=null;this[_0xe344('0x8')]=EasingType[_0xe344('0x9')];this[_0xe344('0xa')]=![];this['reverse']=![];this['onUpdateDelegate']=_0x542d87?(_0x3b6aa1,_0x3ac735)=>_0x542d87(_0x3b6aa1,_0x3ac735):(_0x389f47,_0x14a8af)=>this[_0xe344('0xb')](_0x389f47,_0x14a8af);this['onCustomFunctionDelegate']=_0x196e11?(_0x3f4494,_0x5e683b)=>_0x196e11(_0x3f4494,_0x5e683b):(_0x26c9ad,_0x30b98e)=>this[_0xe344('0xc')](_0x26c9ad,_0x30b98e);if(_0x5460a7){if(_0x5460a7[_0xe344('0x2')]!=null)this[_0xe344('0x2')]=_0x5460a7[_0xe344('0x2')];if(_0x5460a7['fromValue']!=null)this['fromValue']=_0x5460a7[_0xe344('0x3')];if(_0x5460a7[_0xe344('0x4')]!=null)this['toValue']=_0x5460a7[_0xe344('0x4')];if(_0x5460a7['animationType'])this[_0xe344('0x5')]=_0x5460a7['animationType'];if(_0x5460a7[_0xe344('0x7')]!=null)this[_0xe344('0x7')]=_0x5460a7[_0xe344('0x7')];else{if(this[_0xe344('0x5')]==AnimationType[_0xe344('0xd')])this[_0xe344('0x7')]=0x2;else if(this[_0xe344('0x5')]==AnimationType[_0xe344('0xe')])this['param']=1.5;else if(this[_0xe344('0x5')]==AnimationType[_0xe344('0xf')])this[_0xe344('0x7')]=0.5;else if(this[_0xe344('0x5')]==AnimationType[_0xe344('0x10')])this[_0xe344('0x7')]=0xa;}if(_0x5460a7[_0xe344('0x8')])this[_0xe344('0x8')]=_0x5460a7[_0xe344('0x8')];if(_0x5460a7[_0xe344('0xa')]!=null)this[_0xe344('0xa')]=_0x5460a7[_0xe344('0xa')];if(_0x5460a7[_0xe344('0x11')]!=null)this[_0xe344('0x11')]=_0x5460a7[_0xe344('0x11')];}this[_0xe344('0x12')]=0x0;this['_progress']=0x0;this['animationId']=null;if(ControlUtils['propFunctions']){ControlUtils['generatePropFunctions'](Animation[_0xe344('0x13')]);}}[_0xe344('0x14')](){this[_0xe344('0x15')]();super[_0xe344('0x14')]();}[_0xe344('0x16')](){this[_0xe344('0x17')]=new Date()['getTime']();this[_0xe344('0x18')]=Animation[_0xe344('0x19')](this[_0xe344('0x1a')][_0xe344('0x1b')](this));}['stop'](){if(this['animationId']!=null){Animation[_0xe344('0x1c')](this[_0xe344('0x18')]);this[_0xe344('0x18')]=null;this[_0xe344('0x1d')](Events[_0xe344('0x0')],EventArgs['Empty']);}}get[_0xe344('0x1e')](){return this[_0xe344('0x18')]!=null;}get[_0xe344('0x1f')](){if(this[_0xe344('0x1e')]){return this[_0xe344('0x20')];}return 0x0;}[_0xe344('0x21')](_0x4b490a){if(_0x4b490a===0x0)return 0x0;if(_0x4b490a===0x1)return 0x1;switch(this[_0xe344('0x5')]){case AnimationType['Linear']:{return _0x4b490a;}case AnimationType['Power']:{return Math[_0xe344('0x22')](_0x4b490a,this['param']);}case AnimationType[_0xe344('0x10')]:{return(Math['pow'](Math['E'],this[_0xe344('0x7')]*_0x4b490a)-0x1)/(Math[_0xe344('0x22')](Math['E'],this[_0xe344('0x7')])-0x1);}case AnimationType[_0xe344('0x23')]:{return 0x1-Math['sin'](Math['acos'](_0x4b490a));}case AnimationType[_0xe344('0xe')]:{return Math['pow'](_0x4b490a,0x2)*((this[_0xe344('0x7')]+0x1)*_0x4b490a-this[_0xe344('0x7')]);}case AnimationType[_0xe344('0x24')]:{var _0x47a21c=0x0,_0x691b2=0x1;while(!![]){if(_0x4b490a>=(0x7-0x4*_0x47a21c)/0xb)return-Math['pow']((0xb-0x6*_0x47a21c-0xb*_0x4b490a)/0x4,0x2)+Math['pow'](_0x691b2,0x2);_0x47a21c+=_0x691b2;_0x691b2/=0x2;}}case AnimationType[_0xe344('0xf')]:{return Math[_0xe344('0x22')](0x2,0xa*(_0x4b490a-0x1))*Math[_0xe344('0x25')](0x14*Math['PI']*this['param']*_0x4b490a);}case AnimationType['Custom']:{return this[_0xe344('0x26')](_0x4b490a,this[_0xe344('0x7')]);}}}['onCustomFunction'](_0x35ec41,_0x955f46){return _0x35ec41;}[_0xe344('0x27')](_0x59bf53){return this[_0xe344('0x21')](_0x59bf53);}[_0xe344('0x28')](_0x32cd36){return 0x1-this[_0xe344('0x21')](0x1-_0x32cd36);}[_0xe344('0x29')](_0x580afc){if(_0x580afc<=0.5){return this[_0xe344('0x27')](_0x580afc*0x2)/0x2;}else{return this[_0xe344('0x28')]((_0x580afc-0.5)*0x2)/0x2+0.5;}}['easeOutIn'](_0xdd0afb){if(_0xdd0afb<=0.5){return this[_0xe344('0x28')](_0xdd0afb*0x2)/0x2;}else{return this[_0xe344('0x27')]((_0xdd0afb-0.5)*0x2)/0x2+0.5;}}[_0xe344('0x1a')](){this['animationId']=Animation['requestAnimationFrame'](this[_0xe344('0x1a')][_0xe344('0x1b')](this));this[_0xe344('0x12')]=new Date()[_0xe344('0x2a')]();this[_0xe344('0x20')]=(this[_0xe344('0x12')]-this[_0xe344('0x17')])/this[_0xe344('0x2')];if(this[_0xe344('0x1f')]>=0x1){this[_0xe344('0x20')]=0x1;}switch(this[_0xe344('0x8')]){case EasingType[_0xe344('0x9')]:{this[_0xe344('0x2b')](this,this['easeIn'](this[_0xe344('0x1f')]));break;}case EasingType[_0xe344('0x2c')]:{this[_0xe344('0x2b')](this,this[_0xe344('0x28')](this['progress']));break;}case EasingType[_0xe344('0x2d')]:{this[_0xe344('0x2b')](this,this[_0xe344('0x29')](this[_0xe344('0x1f')]));break;}case EasingType[_0xe344('0x2e')]:{this['onUpdateDelegate'](this,this['easeOutIn'](this[_0xe344('0x1f')]));break;}}if(this['progress']==0x1){if(this[_0xe344('0xa')]){this[_0xe344('0x20')]=0x0;this[_0xe344('0x17')]=new Date()['getTime']();}else this[_0xe344('0x15')]();if(this[_0xe344('0x11')]){var _0x35a349=this['toValue'];this[_0xe344('0x4')]=this[_0xe344('0x3')];this[_0xe344('0x3')]=_0x35a349;}}}['onUpdate'](_0x133536,_0x1257fd){if(_0x133536[_0xe344('0x1')][_0xe344('0x2f')]){_0x133536['item']['updateAnimation'](_0x133536,_0x1257fd);}}get['duration'](){return this[_0xe344('0x30')];}set['duration'](_0x3f5683){if(this[_0xe344('0x30')]!=_0x3f5683){this['_duration']=_0x3f5683;}}get['fromValue'](){return this[_0xe344('0x31')];}set['fromValue'](_0x1807b2){if(this[_0xe344('0x31')]!=_0x1807b2){this[_0xe344('0x31')]=_0x1807b2;}}get['toValue'](){return this[_0xe344('0x32')];}set[_0xe344('0x4')](_0x221c60){if(this[_0xe344('0x32')]!=_0x221c60){this[_0xe344('0x32')]=_0x221c60;}}get[_0xe344('0x5')](){return this[_0xe344('0x33')];}set[_0xe344('0x5')](_0x4d89ae){if(this['_animationType']!=_0x4d89ae){this[_0xe344('0x33')]=_0x4d89ae;}}get[_0xe344('0x7')](){return this[_0xe344('0x34')];}set[_0xe344('0x7')](_0x58d5ed){if(this['_param']!=_0x58d5ed){this[_0xe344('0x34')]=_0x58d5ed;}}get[_0xe344('0x8')](){return this[_0xe344('0x35')];}set['easingType'](_0x51402e){if(this[_0xe344('0x35')]!=_0x51402e){this['_easingType']=_0x51402e;}}get[_0xe344('0xa')](){return this['_repeat'];}set[_0xe344('0xa')](_0x5cea01){if(this[_0xe344('0x36')]!=_0x5cea01){this['_repeat']=_0x5cea01;}}get[_0xe344('0x11')](){return this['_reverse'];}set['reverse'](_0x5aaab2){if(this[_0xe344('0x37')]!=_0x5aaab2){this['_reverse']=_0x5aaab2;}}}Animation['requestAnimationFrame']=function(){if(typeof window==='undefined')return;var _0x13f399=window[_0xe344('0x19')]||window[_0xe344('0x38')]||window[_0xe344('0x39')]||window[_0xe344('0x3a')]||window[_0xe344('0x3b')]||function(_0x17f950){return window[_0xe344('0x3c')](_0x17f950,0x3e8/0x3c);};return _0x13f399[_0xe344('0x1b')](window);}();Animation['cancelAnimationFrame']=function(){if(typeof window===_0xe344('0x3d'))return;var _0x2d9132=window[_0xe344('0x1c')]||window[_0xe344('0x3e')]||window[_0xe344('0x3f')]||window['oCancelAnimationFrame']||window['msCancelAnimationFrame']||function(_0x4aece1){window[_0xe344('0x40')](_0x4aece1);};return _0x2d9132[_0xe344('0x1b')](window);}();export{Animation,AnimationType,EasingType,Events};
