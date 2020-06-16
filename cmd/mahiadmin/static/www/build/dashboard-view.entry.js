import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';
import { B as BASE_URL } from './index-37baca77.js';
import { g as get } from './base-fd95655b.js';
import './validation-9a44dfe6.js';
import { m as me } from './auth-d1cdc736.js';
import { g as generateParams, b as byteToGB } from './index-fb199afa.js';
import { t as toastr } from './index-61f3bdea.js';

const initialUsagesModel = {
    totals: {
        transformations: 0,
        bandwidth: 0,
        storage: 0,
        fileCount: 0,
        nsfw: 0,
        virusScans: 0,
        imagesDescribed: 0,
        imageTags: 0,
    },
    metrics: []
};

function UsageService() {
    return Object.freeze({
        listUsages(params) {
            return get(`${BASE_URL()}/usages${generateParams(params)}`);
        },
    });
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var dayjs_min = createCommonjsModule(function (module, exports) {
!function(t,n){"object"=='object'&&"undefined"!='object'?module.exports=n():"function"==typeof undefined&&undefined.amd?undefined(n):t.dayjs=n();}(commonjsGlobal,function(){"use strict";var t="millisecond",n="second",e="minute",r="hour",i="day",s="week",u="month",o="quarter",a="year",h=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c=function(t,n,e){var r=String(t);return !r||r.length>=n?t:""+Array(n+1-r.length).join(e)+t},d={s:c,z:function(t){var n=-t.utcOffset(),e=Math.abs(n),r=Math.floor(e/60),i=e%60;return (n<=0?"+":"-")+c(r,2,"0")+":"+c(i,2,"0")},m:function(t,n){var e=12*(n.year()-t.year())+(n.month()-t.month()),r=t.clone().add(e,u),i=n-r<0,s=t.clone().add(e+(i?-1:1),u);return Number(-(e+(n-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return {M:u,y:a,w:s,d:i,D:"date",h:r,m:e,s:n,ms:t,Q:o}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},l="en",m={};m[l]=$;var y=function(t){return t instanceof v},M=function(t,n,e){var r;if(!t)return l;if("string"==typeof t)m[t]&&(r=t),n&&(m[t]=n,r=t);else{var i=t.name;m[i]=t,r=i;}return !e&&r&&(l=r),r||!e&&l},g=function(t,n,e){if(y(t))return t.clone();var r=n?"string"==typeof n?{format:n,pl:e}:n:{};return r.date=t,new v(r)},D=d;D.l=M,D.i=y,D.w=function(t,n){return g(t,{locale:n.$L,utc:n.$u,$offset:n.$offset})};var v=function(){function c(t){this.$L=this.$L||M(t.locale,null,!0),this.parse(t);}var d=c.prototype;return d.parse=function(t){this.$d=function(t){var n=t.date,e=t.utc;if(null===n)return new Date(NaN);if(D.u(n))return new Date;if(n instanceof Date)return new Date(n);if("string"==typeof n&&!/Z$/i.test(n)){var r=n.match(h);if(r)return e?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(n)}(t),this.init();},d.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},d.$utils=function(){return D},d.isValid=function(){return !("Invalid Date"===this.$d.toString())},d.isSame=function(t,n){var e=g(t);return this.startOf(n)<=e&&e<=this.endOf(n)},d.isAfter=function(t,n){return g(t)<this.startOf(n)},d.isBefore=function(t,n){return this.endOf(n)<g(t)},d.$g=function(t,n,e){return D.u(t)?this[n]:this.set(e,t)},d.year=function(t){return this.$g(t,"$y",a)},d.month=function(t){return this.$g(t,"$M",u)},d.day=function(t){return this.$g(t,"$W",i)},d.date=function(t){return this.$g(t,"$D","date")},d.hour=function(t){return this.$g(t,"$H",r)},d.minute=function(t){return this.$g(t,"$m",e)},d.second=function(t){return this.$g(t,"$s",n)},d.millisecond=function(n){return this.$g(n,"$ms",t)},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,o){var h=this,f=!!D.u(o)||o,c=D.p(t),d=function(t,n){var e=D.w(h.$u?Date.UTC(h.$y,n,t):new Date(h.$y,n,t),h);return f?e:e.endOf(i)},$=function(t,n){return D.w(h.toDate()[t].apply(h.toDate(),(f?[0,0,0,0]:[23,59,59,999]).slice(n)),h)},l=this.$W,m=this.$M,y=this.$D,M="set"+(this.$u?"UTC":"");switch(c){case a:return f?d(1,0):d(31,11);case u:return f?d(1,m):d(0,m+1);case s:var g=this.$locale().weekStart||0,v=(l<g?l+7:l)-g;return d(f?y-v:y+(6-v),m);case i:case"date":return $(M+"Hours",0);case r:return $(M+"Minutes",1);case e:return $(M+"Seconds",2);case n:return $(M+"Milliseconds",3);default:return this.clone()}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(s,o){var h,f=D.p(s),c="set"+(this.$u?"UTC":""),d=(h={},h[i]=c+"Date",h.date=c+"Date",h[u]=c+"Month",h[a]=c+"FullYear",h[r]=c+"Hours",h[e]=c+"Minutes",h[n]=c+"Seconds",h[t]=c+"Milliseconds",h)[f],$=f===i?this.$D+(o-this.$W):o;if(f===u||f===a){var l=this.clone().set("date",1);l.$d[d]($),l.init(),this.$d=l.set("date",Math.min(this.$D,l.daysInMonth())).toDate();}else d&&this.$d[d]($);return this.init(),this},d.set=function(t,n){return this.clone().$set(t,n)},d.get=function(t){return this[D.p(t)]()},d.add=function(t,o){var h,f=this;t=Number(t);var c=D.p(o),d=function(n){var e=g(f);return D.w(e.date(e.date()+Math.round(n*t)),f)};if(c===u)return this.set(u,this.$M+t);if(c===a)return this.set(a,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(h={},h[e]=6e4,h[r]=36e5,h[n]=1e3,h)[c]||1,l=this.$d.getTime()+t*$;return D.w(l,this)},d.subtract=function(t,n){return this.add(-1*t,n)},d.format=function(t){var n=this;if(!this.isValid())return "Invalid Date";var e=t||"YYYY-MM-DDTHH:mm:ssZ",r=D.z(this),i=this.$locale(),s=this.$H,u=this.$m,o=this.$M,a=i.weekdays,h=i.months,c=function(t,r,i,s){return t&&(t[r]||t(n,e))||i[r].substr(0,s)},d=function(t){return D.s(s%12||12,t,"0")},$=i.meridiem||function(t,n,e){var r=t<12?"AM":"PM";return e?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:c(i.monthsShort,o,h,3),MMMM:h[o]||h(this,e),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,a,2),ddd:c(i.weekdaysShort,this.$W,a,3),dddd:a[this.$W],H:String(s),HH:D.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:D.s(u,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:r};return e.replace(f,function(t,n){return n||l[t]||r.replace(":","")})},d.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},d.diff=function(t,h,f){var c,d=D.p(h),$=g(t),l=6e4*($.utcOffset()-this.utcOffset()),m=this-$,y=D.m(this,$);return y=(c={},c[a]=y/12,c[u]=y,c[o]=y/3,c[s]=(m-l)/6048e5,c[i]=(m-l)/864e5,c[r]=m/36e5,c[e]=m/6e4,c[n]=m/1e3,c)[d]||m,f?y:D.a(y)},d.daysInMonth=function(){return this.endOf(u).$D},d.$locale=function(){return m[this.$L]},d.locale=function(t,n){if(!t)return this.$L;var e=this.clone(),r=M(t,n,!0);return r&&(e.$L=r),e},d.clone=function(){return D.w(this.$d,this)},d.toDate=function(){return new Date(this.valueOf())},d.toJSON=function(){return this.isValid()?this.toISOString():null},d.toISOString=function(){return this.$d.toISOString()},d.toString=function(){return this.$d.toUTCString()},c}();return g.prototype=v.prototype,g.extend=function(t,n){return t(n,v,g),g},g.locale=M,g.isDayjs=y,g.unix=function(t){return g(1e3*t)},g.en=m[l],g.Ls=m,g});
});

const dashboardViewCss = "dashboard-view{}.stats-wrapper{display:grid;grid-template-columns:auto auto auto auto;grid-gap:20px;}ta-card{--ta-card-margin:38px 0 0 0;--ta-card-min-height:258px}.page-action-wrapper{margin-top:18px}.page-actions{display:flex;pointer-events:auto}.page-actions.loading{opacity:.5;pointer-events:none}.action-item{font-size:14px;font-weight:500;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:#425a70;padding:0 12px;cursor:pointer;border-bottom:solid 2px rgba(66, 90, 112, 0.11);padding-bottom:18px}.action-item.selected{font-weight:900;border-bottom:solid 3px #fe6e71}@media (max-width: 1200px){.stats-wrapper{grid-template-columns:auto auto}}@media (max-width: 590px){.stats-wrapper{grid-template-columns:auto}}@media (max-width: 464px){.page-action-wrapper{width:calc(100vw - 40px);margin-top:25px;display:flex;justify-content:center}}";

const DashboardView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.me = me();
        this.usages = initialUsagesModel;
        this.fetchingApi = false;
        this.reFetchingUsages = false;
        this.dateRange = 'month';
        this.totalDue = 0;
        this.fetchUsages = () => {
            this.fetchingApi = true;
            UsageService()
                .listUsages()
                .then(this.handleSuccess)
                .catch(this.handleError)
                .finally(() => this.fetchingApi = false);
        };
        this.handleSuccess = (resp) => {
            this.usages = resp.data;
        };
        // I'm reusing this same handle error for many parts of the app
        // maybe I extract this into its own thing.
        this.handleError = (err) => {
            if (!err.error) {
                toastr().danger('Oops! Something went wrong. Please refresh and try again');
                return console.log(err);
            }
            toastr().danger(err.error);
        };
        this.updateDateRange = (dateRange) => {
            this.dateRange = dateRange;
            this.reFetchingUsages = true;
            let start_time = '';
            switch (dateRange) {
                case 'day':
                    start_time = dayjs_min().subtract(24, 'hour').unix().toString();
                    break;
                case 'week':
                    start_time = dayjs_min().startOf('week').unix().toString();
                    break;
                case 'month':
                    start_time = dayjs_min().startOf('month').unix().toString();
                    break;
                case 'year':
                    start_time = dayjs_min().startOf('year').unix().toString();
                    break;
            }
            UsageService()
                .listUsages({
                start_time,
            })
                .then(this.handleSuccess)
                .catch(this.handleError)
                .finally(() => this.reFetchingUsages = false);
        };
        this.metricLabels = () => {
            const { metrics } = this.usages;
            return metrics.map((metric) => dayjs_min(metric.endTime).format('YYYY-MM-DD'));
        };
        this.metricDatasets = () => {
            const { metrics } = this.usages;
            // const transformationsData = {
            //     name: 'Transformations',
            //     values: metrics.map((m) => m.transformations)
            // }
            const bandwidthData = {
                name: 'Bandwidth(GB)',
                values: metrics.map((m) => byteToGB(m.bandwidth))
            };
            const storageData = {
                name: 'Storage(GB)',
                values: metrics.map((m) => byteToGB(m.storage))
            };
            return [bandwidthData, storageData];
        };
    }
    componentWillLoad() {
        this.fetchUsages();
    }
    render() {
        const { totals } = this.usages;
        return (h(Host, null, h("ta-app-page", null, h("ta-page-header", { pageTitle: "Dashboard" }, h("div", { slot: "right" }, h("div", { class: "page-action-wrapper" }, h("div", { class: {
                'page-actions': true,
                'loading': this.reFetchingUsages
            } }, h("div", { onClick: () => this.updateDateRange('day'), class: {
                'action-item': true,
                'selected': this.dateRange === 'day'
            } }, "Day"), h("div", { onClick: () => this.updateDateRange('week'), class: {
                'action-item': true,
                'selected': this.dateRange === 'week'
            } }, "Week"), h("div", { onClick: () => this.updateDateRange('month'), class: {
                'action-item': true,
                'selected': this.dateRange === 'month'
            } }, "Month"), h("div", { onClick: () => this.updateDateRange('year'), class: {
                'action-item': true,
                'selected': this.dateRange === 'year'
            } }, "Year"))))), this.fetchingApi
            ?
                h("ta-loader", null)
            :
                h("div", null, h("div", { class: "stats-wrapper" }, h("ta-stat-card", { icon: "storage-disks", label: "Total Storage", value: `${byteToGB(totals.storage)}GB` }), h("ta-stat-card", { icon: "dashboard", label: "Total Bandwidth", value: `${byteToGB(totals.bandwidth)}GB` }), h("ta-stat-card", { icon: "transformations", label: "Transformations", value: `${totals.transformations}` }), h("ta-stat-card", { icon: "files", label: "File Count", value: `${totals.fileCount}` }), h("ta-stat-card", { icon: "files", label: "Virus Scans", value: `${totals.virusScans}` }), h("ta-stat-card", { icon: "files", label: "Images Described", value: `${totals.imagesDescribed}` }), h("ta-stat-card", { icon: "files", label: "Images Tagged", value: `${totals.imageTags}` }), h("ta-stat-card", { icon: "files", label: "NSFW Checks", value: `${totals.nsfw}` })), h("ta-card", null, h("div", null, "Usage"), h("ta-line-graph", { labels: this.metricLabels(), datasets: this.metricDatasets() })), h("ta-recent-applications-list", null)))));
    }
};
DashboardView.style = dashboardViewCss;

export { DashboardView as dashboard_view };
