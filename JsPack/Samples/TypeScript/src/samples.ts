import { Control } from '@mindfusion/controls';

let resizeEvent;
if (typeof (Event) === 'function')
{
	resizeEvent = new Event('resize');
} else
{
	resizeEvent = document.createEvent('Event');
	resizeEvent.initEvent('resize', true, true);
}

let collapsed = false;
function onExpandCollapse() {
	if (collapsed) {
		document.getElementById('info').style.width = '400px';
		document.getElementById('content').style.right = '401px';
		document.getElementById('expandButton').innerHTML = "&rsaquo;";
		collapsed = false;
	}
	else {
		document.getElementById('info').style.width = '0px';
		document.getElementById('content').style.right = '0px';
		document.getElementById('expandButton').innerHTML = "&lsaquo;";
		collapsed = true;
	}
	window.dispatchEvent(resizeEvent);
}

document.addEventListener("DOMContentLoaded", function () {
	if (document.getElementById('copyright'))
		document.getElementById('copyright').innerHTML = "&copy; " + new Date().getFullYear() + " MindFusion";

	if (document.getElementById('expandButton'))
		document.getElementById('expandButton').addEventListener("click", onExpandCollapse);
	Control.licenseLocation = "pack_lic.txt";
});

// themes

import s_blue from '@mindfusion/scheduling/themes/blue.css';
import s_business from '@mindfusion/scheduling/themes/business.css';
import s_earth from '@mindfusion/scheduling/themes/earth.css';
import s_gray from '@mindfusion/scheduling/themes/gray.css';
import s_green from '@mindfusion/scheduling/themes/green.css';
import s_light from '@mindfusion/scheduling/themes/light.css';
import s_pastel from '@mindfusion/scheduling/themes/pastel.css';
import s_peach from '@mindfusion/scheduling/themes/peach.css';
import s_standard from '@mindfusion/scheduling/themes/standard.css';
export {s_blue, s_business, s_earth, s_gray, s_green, s_light, s_pastel, s_peach, s_standard };

import m_blue from '@mindfusion/mapping/themes/blue.css';
import m_business from '@mindfusion/mapping/themes/business.css';
import m_earth from '@mindfusion/mapping/themes/earth.css';
import m_gray from '@mindfusion/mapping/themes/gray.css';
import m_green from '@mindfusion/mapping/themes/green.css';
import m_light from '@mindfusion/mapping/themes/light.css';
import m_pastel from '@mindfusion/mapping/themes/pastel.css';
import m_peach from '@mindfusion/mapping/themes/peach.css';
import m_standard from '@mindfusion/mapping/themes/standard.css';
export {m_blue, m_business, m_earth, m_gray, m_green, m_light, m_pastel, m_peach, m_standard };

import k_blue from '@mindfusion/keyboard/themes/blue.css';
import k_business from '@mindfusion/keyboard/themes/business.css';
import k_earth from '@mindfusion/keyboard/themes/earth.css';
import k_gray from '@mindfusion/keyboard/themes/gray.css';
import k_green from '@mindfusion/keyboard/themes/green.css';
import k_light from '@mindfusion/keyboard/themes/light.css';
import k_pastel from '@mindfusion/keyboard/themes/pastel.css';
import k_peach from '@mindfusion/keyboard/themes/peach.css';
import k_standard from '@mindfusion/keyboard/themes/standard.css';
export {k_blue, k_business, k_earth, k_gray, k_green, k_light, k_pastel, k_peach, k_standard };

import dv_blue from '@mindfusion/dataviews/themes/blue.css';
import dv_business from '@mindfusion/dataviews/themes/business.css';
import dv_earth from '@mindfusion/dataviews/themes/earth.css';
import dv_gray from '@mindfusion/dataviews/themes/gray.css';
import dv_green from '@mindfusion/dataviews/themes/green.css';
import dv_light from '@mindfusion/dataviews/themes/light.css';
import dv_pastel from '@mindfusion/dataviews/themes/pastel.css';
import dv_peach from '@mindfusion/dataviews/themes/peach.css';
import dv_standard from '@mindfusion/dataviews/themes/standard.css';
export {dv_blue, dv_business, dv_earth, dv_gray, dv_green, dv_light, dv_pastel, dv_peach, dv_standard };

import ui_blue from '@mindfusion/common-ui/themes/blue.css';
import ui_business from  '@mindfusion/common-ui/themes/business.css';
import ui_earth from '@mindfusion/common-ui/themes/earth.css';
import ui_gray from  '@mindfusion/common-ui/themes/gray.css';
import ui_green from  '@mindfusion/common-ui/themes/green.css';
import ui_light from  '@mindfusion/common-ui/themes/light.css';
import ui_pastel from  '@mindfusion/common-ui/themes/pastel.css';
import ui_peach from  '@mindfusion/common-ui/themes/peach.css';
import ui_standard from '@mindfusion/common-ui/themes/standard.css';
import ui_sky from './UI/themes/sky.css';
export {ui_blue, ui_business, ui_earth, ui_gray, ui_green, ui_light, ui_pastel, ui_peach, ui_standard, ui_sky };