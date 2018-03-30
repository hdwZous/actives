
exports.closeIFrames = function () {
    let url = getUrl('local');

    if (url) {
        window.parent.postMessage(JSON.stringify({paramType:'1'}), `${url}:80/`);
    }
};

exports.cloneIFrames = function () {
  window.parent.cloneIFrames && window.parent.cloneIFrames()
};
exports.showModal = function (msg) {
    let url = getUrl('local');

    if (url) {
        window.parent.postMessage(JSON.stringify({paramType:'2',paramTitle:'温馨提示',paramMsg:msg}), `${url}:80/`);
    }
};
function getUrl(name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.href.substr(window.location.href.indexOf('?') + 1).match(reg);
    if (r != null)return decodeURIComponent(r[2]);
    return null;
}
