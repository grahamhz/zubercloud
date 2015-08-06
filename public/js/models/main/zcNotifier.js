angular.module('zubercloud').value('zcToastr', toastr);

angular.module('zubercloud').factory('zcNotifier', function(zcToastr) {
  return {
    success: function(msg, title) {
      zcToastr.success(msg, title);
    },
    info: function(msg, title) {
      zcToastr.info(msg, title);
    },
    warning: function(msg, title) {
      zcToastr.warning(msg, title);
    },
    error: function(msg, title) {
      zcToastr.error(msg, title);
    }
  };
});
