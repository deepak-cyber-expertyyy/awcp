"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Subscriptions_Subscriptions_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Subscriptions/Subscriptions.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Subscriptions/Subscriptions.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Subscriptions',
  data: function data() {
    return {
      plans: [],
      create_new: false,
      edit_record: {},
      form: {
        name: '',
        days: '',
        price: '',
        discounted_price: '',
        free_delivery_above: '',
        ios_product_id: '',
        status: 1
      },
      isLoading: false,
      isSubmitting: false,
      isUpdatingName: false,
      subscriptionName: '',
      discountedPriceError: '',
      filter: '',
      filterOn: ['name'],
      sortBy: 'id',
      sortDesc: true,
      sortDirection: 'desc',
      fields: [{
        key: 'id',
        label: __('id'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'name',
        label: __('plan_name'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'days',
        label: __('days'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'price',
        label: __('price') + '(' + this.$currency + ')',
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'discounted_price',
        label: __('discounted_price') + '(' + this.$currency + ')',
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'free_delivery_above',
        label: __('free_delivery_above') + '(' + this.$currency + ')',
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'status',
        label: __('status'),
        "class": 'text-center'
      }, {
        key: 'actions',
        label: __('actions'),
        "class": 'text-center'
      }],
      perPage: 10,
      currentPage: 1,
      totalRows: 0,
      pageOptions: [5, 10, 15, 20, 25, 50, 100]
    };
  },
  mounted: function mounted() {
    this.getPlans();
  },
  methods: {
    // Get all subscription plans
    getPlans: function getPlans() {
      var _this = this;
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var params, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.isLoading = true;
                _context.prev = 1;
                params = {
                  limit: _this.perPage,
                  offset: (_this.currentPage - 1) * _this.perPage,
                  include_inactive: 1
                };
                _context.next = 5;
                return axios__WEBPACK_IMPORTED_MODULE_1___default().get(_this.$apiUrl + '/subscription_plans/', {
                  params: params
                });
              case 5:
                response = _context.sent;
                if (response.data.status === 1) {
                  // Check if response has plans array or object with plans property
                  if (Array.isArray(response.data.data)) {
                    _this.plans = response.data.data;
                    _this.totalRows = response.data.total || response.data.data.length;
                  } else if (response.data.data && response.data.data.plans) {
                    // New format with plans and subscription_name
                    _this.plans = response.data.data.plans;
                    _this.totalRows = response.data.total || response.data.data.plans.length;
                    // Set subscription name if available
                    if (response.data.data.subscription_name !== undefined) {
                      _this.subscriptionName = response.data.data.subscription_name || '';
                    }
                  } else {
                    _this.plans = [];
                    _this.totalRows = 0;
                  }
                } else {
                  _this.showError(response.data.message);
                }
                _context.next = 12;
                break;
              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                _this.showError(__('something_went_wrong'));
              case 12:
                _context.prev = 12;
                _this.isLoading = false;
                return _context.finish(12);
              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 9, 12, 15]]);
      }))();
    },
    // Validate discounted price
    validateDiscountedPrice: function validateDiscountedPrice() {
      this.discountedPriceError = '';

      // Only validate if both price and discounted_price are provided
      if (this.form.discounted_price && this.form.price) {
        var discountedPrice = parseFloat(this.form.discounted_price);
        var regularPrice = parseFloat(this.form.price);

        // Check if discounted price is less than regular price
        if (discountedPrice >= regularPrice) {
          this.discountedPriceError = __('discounted_price_must_be_less_than_regular_price');
          return false;
        }

        // Check if discounted price is negative
        if (discountedPrice < 0) {
          this.discountedPriceError = __('discounted_price_cannot_be_negative');
          return false;
        }
      }
      return true;
    },
    checkFreeDeliveryTimeSlots: function checkFreeDeliveryTimeSlots() {
      var _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return axios__WEBPACK_IMPORTED_MODULE_1___default().get(_this2.$apiUrl + '/subscription_plans/check_free_delivery_time_slots');
              case 3:
                response = _context2.sent;
                if (!(response.data.status === 1)) {
                  _context2.next = 6;
                  break;
                }
                return _context2.abrupt("return", response.data.data.has_free_delivery_time_slots);
              case 6:
                return _context2.abrupt("return", false);
              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                console.error('Error checking free delivery time slots:', _context2.t0);
                return _context2.abrupt("return", false);
              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }))();
    },
    // Save or update subscription plan
    savePlan: function savePlan(event) {
      var _this3 = this;
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var form, formData, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                form = event.target; // Validate discounted price before form submission
                if (_this3.validateDiscountedPrice()) {
                  _context3.next = 4;
                  break;
                }
                // Focus on discounted price field if validation fails
                _this3.$nextTick(function () {
                  var discountedPriceInput = document.getElementById('discounted_price');
                  if (discountedPriceInput) {
                    discountedPriceInput.focus();
                    discountedPriceInput.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center'
                    });
                  }
                });
                return _context3.abrupt("return");
              case 4:
                if (form.checkValidity()) {
                  _context3.next = 7;
                  break;
                }
                form.reportValidity();
                return _context3.abrupt("return");
              case 7:
                _this3.isSubmitting = true;
                _context3.prev = 8;
                formData = {
                  name: _this3.form.name,
                  days: _this3.form.days,
                  price: _this3.form.price,
                  discounted_price: _this3.form.discounted_price || null,
                  free_delivery_above: _this3.form.free_delivery_above || null,
                  ios_product_id: _this3.form.ios_product_id || null,
                  status: _this3.form.status
                };
                if (!_this3.edit_record.id) {
                  _context3.next = 16;
                  break;
                }
                _context3.next = 13;
                return axios__WEBPACK_IMPORTED_MODULE_1___default().post(_this3.$apiUrl + "/subscription_plans/update/".concat(_this3.edit_record.id), formData);
              case 13:
                response = _context3.sent;
                _context3.next = 19;
                break;
              case 16:
                _context3.next = 18;
                return axios__WEBPACK_IMPORTED_MODULE_1___default().post(_this3.$apiUrl + '/subscription_plans/save', formData);
              case 18:
                response = _context3.sent;
              case 19:
                if (response.data.status === 1) {
                  _this3.showMessage("success", response.data.message);
                  _this3.create_new = false;
                  _this3.resetForm();
                  _this3.getPlans();
                } else {
                  _this3.showError(response.data.message);
                }
                _context3.next = 25;
                break;
              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](8);
                _this3.showError(__('something_went_wrong'));
              case 25:
                _context3.prev = 25;
                _this3.isSubmitting = false;
                return _context3.finish(25);
              case 28:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[8, 22, 25, 28]]);
      }))();
    },
    // Edit plan - populate form with plan data and check for conflicts
    editPlan: function editPlan(plan) {
      var _this4 = this;
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var hasFreeDeliveryTimeSlots;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this4.checkFreeDeliveryTimeSlots();
              case 2:
                hasFreeDeliveryTimeSlots = _context4.sent;
                if (!hasFreeDeliveryTimeSlots) {
                  _context4.next = 6;
                  break;
                }
                _this4.$swal.fire({
                  title: __('cannot_create_subscription_plan'),
                  html: "\n                        <div class=\"text-left\">\n                            <p>".concat(__('free_delivery_time_slots_exist_message'), "</p>\n                            <p class=\"mt-3\">\n                                <strong>").concat(__('please_remove_free_delivery_time_slots_first'), "</strong>\n                            </p>\n                            <p class=\"mt-3\">\n                                <a href=\"/delivery_settings\" class=\"btn btn-primary btn-sm\">\n                                    ").concat(__('go_to_delivery_settings'), " <i class=\"fa fa-external-link-alt\"></i>\n                                </a>\n                            </p>\n                        </div>\n                    "),
                  icon: 'warning',
                  confirmButtonText: __('ok'),
                  confirmButtonColor: '#37a279',
                  width: '600px'
                });
                return _context4.abrupt("return");
              case 6:
                // If no conflicts, proceed to open the edit modal
                _this4.edit_record = _objectSpread({}, plan);
                _this4.form = {
                  name: plan.name || '',
                  days: plan.days || '',
                  price: plan.price || '',
                  discounted_price: plan.discounted_price || '',
                  free_delivery_above: plan.free_delivery_above || '',
                  ios_product_id: plan.ios_product_id || '',
                  status: plan.status !== undefined ? plan.status : 1
                };
                _this4.create_new = true;
              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // Delete subscription plan
    deletePlan: function deletePlan(index, id) {
      var _this5 = this;
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this5.$swal.fire({
                  title: __('are_you_sure'),
                  text: __('you_want_be_able_to_revert_this'),
                  confirmButtonText: __('yes_sure'),
                  cancelButtonText: __('cancel'),
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#37a279',
                  cancelButtonColor: '#d33'
                }).then(function (result) {
                  if (result.value) {
                    _this5.isLoading = true;
                    axios__WEBPACK_IMPORTED_MODULE_1___default().post(_this5.$apiUrl + "/subscription_plans/delete/".concat(id)).then(function (response) {
                      _this5.isLoading = false;
                      if (response.data.status === 1) {
                        _this5.showMessage('success', response.data.message);
                        _this5.getPlans();
                      } else {
                        _this5.showError(response.data.message);
                      }
                    })["catch"](function (error) {
                      _this5.isLoading = false;
                      _this5.showError(__('something_went_wrong'));
                    });
                  }
                });
              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    // Reset form to default values
    resetForm: function resetForm() {
      this.form = {
        name: '',
        days: '',
        price: '',
        discounted_price: '',
        free_delivery_above: '',
        ios_product_id: '',
        status: 1
      };
      this.edit_record = {};
      this.discountedPriceError = '';
    },
    // Open add modal - reset form first and check for conflicts
    openAddModal: function openAddModal() {
      var _this6 = this;
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        var hasFreeDeliveryTimeSlots;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this6.checkFreeDeliveryTimeSlots();
              case 2:
                hasFreeDeliveryTimeSlots = _context6.sent;
                if (!hasFreeDeliveryTimeSlots) {
                  _context6.next = 6;
                  break;
                }
                _this6.$swal.fire({
                  title: __('cannot_create_subscription_plan'),
                  html: "\n                        <div class=\"text-left\">\n                            <p>".concat(__('free_delivery_time_slots_exist_message'), "</p>\n                            <p class=\"mt-3\">\n                                <strong>").concat(__('please_remove_free_delivery_time_slots_first'), "</strong>\n                            </p>\n                                <p class=\"mt-3\">\n                                    <a href=\"/delivery_settings\" class=\"btn btn-primary btn-sm\">\n                                        ").concat(__('go_to_delivery_settings'), " <i class=\"fa fa-external-link-alt\"></i>\n                                    </a>\n                                </p>\n                        </div>\n                    "),
                  icon: 'warning',
                  confirmButtonText: __('ok'),
                  confirmButtonColor: '#37a279',
                  width: '600px'
                });
                return _context6.abrupt("return");
              case 6:
                // If no conflicts, proceed to open the modal
                _this6.resetForm();
                _this6.create_new = true;
              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    // Update subscription name in settings
    updateSubscriptionName: function updateSubscriptionName() {
      var _this7 = this;
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(!_this7.subscriptionName || _this7.subscriptionName.trim() === '')) {
                  _context7.next = 3;
                  break;
                }
                _this7.showError(__('subscription_name_cannot_be_empty'));
                return _context7.abrupt("return");
              case 3:
                _this7.isUpdatingName = true;
                _context7.prev = 4;
                _context7.next = 7;
                return axios__WEBPACK_IMPORTED_MODULE_1___default().post(_this7.$apiUrl + '/subscription_plans/update_setting', {
                  subscription_name: _this7.subscriptionName.trim()
                });
              case 7:
                response = _context7.sent;
                if (response.data.status === 1) {
                  _this7.showMessage("success", response.data.message);
                } else {
                  _this7.showError(response.data.message);
                }
                _context7.next = 14;
                break;
              case 11:
                _context7.prev = 11;
                _context7.t0 = _context7["catch"](4);
                _this7.showError(__('something_went_wrong'));
              case 14:
                _context7.prev = 14;
                _this7.isUpdatingName = false;
                return _context7.finish(14);
              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[4, 11, 14, 17]]);
      }))();
    }
  },
  watch: {
    // Watch for pagination changes
    currentPage: function currentPage() {
      this.getPlans();
    },
    // Watch for per page changes
    perPage: function perPage() {
      this.currentPage = 1; // Reset to first page when changing per page
      this.getPlans();
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Subscriptions/Subscriptions.vue":
/*!************************************************************!*\
  !*** ./resources/js/views/Subscriptions/Subscriptions.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Subscriptions_vue_vue_type_template_id_23e12aae__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscriptions.vue?vue&type=template&id=23e12aae */ "./resources/js/views/Subscriptions/Subscriptions.vue?vue&type=template&id=23e12aae");
/* harmony import */ var _Subscriptions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subscriptions.vue?vue&type=script&lang=js */ "./resources/js/views/Subscriptions/Subscriptions.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Subscriptions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Subscriptions_vue_vue_type_template_id_23e12aae__WEBPACK_IMPORTED_MODULE_0__.render,
  _Subscriptions_vue_vue_type_template_id_23e12aae__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Subscriptions/Subscriptions.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Subscriptions/Subscriptions.vue?vue&type=script&lang=js":
/*!************************************************************************************!*\
  !*** ./resources/js/views/Subscriptions/Subscriptions.vue?vue&type=script&lang=js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Subscriptions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Subscriptions.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Subscriptions/Subscriptions.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Subscriptions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Subscriptions/Subscriptions.vue?vue&type=template&id=23e12aae":
/*!******************************************************************************************!*\
  !*** ./resources/js/views/Subscriptions/Subscriptions.vue?vue&type=template&id=23e12aae ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Subscriptions_vue_vue_type_template_id_23e12aae__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Subscriptions_vue_vue_type_template_id_23e12aae__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Subscriptions_vue_vue_type_template_id_23e12aae__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Subscriptions.vue?vue&type=template&id=23e12aae */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Subscriptions/Subscriptions.vue?vue&type=template&id=23e12aae");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Subscriptions/Subscriptions.vue?vue&type=template&id=23e12aae":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Subscriptions/Subscriptions.vue?vue&type=template&id=23e12aae ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "page-heading" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-12 col-md-6 order-md-1 order-last" }, [
            _c("h3", [_vm._v(_vm._s(_vm.__("manage_subscriptions")))]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-12 col-md-6 order-md-2 order-first" }, [
            _c(
              "nav",
              {
                staticClass: "breadcrumb-header float-start float-lg-end",
                attrs: { "aria-label": "breadcrumb" },
              },
              [
                _c("ol", { staticClass: "breadcrumb" }, [
                  _c(
                    "li",
                    { staticClass: "breadcrumb-item" },
                    [
                      _c("router-link", { attrs: { to: "/dashboard" } }, [
                        _vm._v(_vm._s(_vm.__("dashboard"))),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "li",
                    {
                      staticClass: "breadcrumb-item active",
                      attrs: { "aria-current": "page" },
                    },
                    [_vm._v(_vm._s(_vm.__("manage_subscriptions")))]
                  ),
                ]),
              ]
            ),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-12 col-md-12 order-md-1 order-last" }, [
            _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "card-header" }, [
                _c("h4", [_vm._v(_vm._s(_vm.__("subscription_plans")))]),
                _vm._v(" "),
                _c("span", { staticClass: "pull-right" }, [
                  _vm.$can("subscription_create")
                    ? _c(
                        "button",
                        {
                          directives: [
                            {
                              name: "b-tooltip",
                              rawName: "v-b-tooltip.hover",
                              modifiers: { hover: true },
                            },
                          ],
                          staticClass: "btn btn-primary",
                          attrs: { title: _vm.__("add_subscription") },
                          on: { click: _vm.openAddModal },
                        },
                        [_vm._v(_vm._s(_vm.__("add_subscription")))]
                      )
                    : _vm._e(),
                ]),
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "card-body" },
                [
                  _c(
                    "b-row",
                    { staticClass: "mb-2" },
                    [
                      _c("b-col", { attrs: { md: "3" } }, [
                        _c("h6", { staticClass: "box-title" }, [
                          _vm._v(_vm._s(_vm.__("subscription_name"))),
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "d-flex gap-2" },
                          [
                            _c("b-form-input", {
                              attrs: {
                                id: "subscription-name-input",
                                type: "text",
                                placeholder: _vm.__("enter_subscription_name"),
                              },
                              model: {
                                value: _vm.subscriptionName,
                                callback: function ($$v) {
                                  _vm.subscriptionName = $$v
                                },
                                expression: "subscriptionName",
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                directives: [
                                  {
                                    name: "b-tooltip",
                                    rawName: "v-b-tooltip.hover",
                                    modifiers: { hover: true },
                                  },
                                ],
                                staticClass: "btn btn-primary",
                                attrs: {
                                  disabled: _vm.isUpdatingName,
                                  title: _vm.__("update"),
                                },
                                on: { click: _vm.updateSubscriptionName },
                              },
                              [
                                _vm.isUpdatingName
                                  ? _c("span", [
                                      _c("i", {
                                        staticClass: "fa fa-spinner fa-spin",
                                      }),
                                    ])
                                  : _c("span", [
                                      _c("i", { staticClass: "fa fa-save" }),
                                    ]),
                              ]
                            ),
                          ],
                          1
                        ),
                      ]),
                      _vm._v(" "),
                      _c(
                        "b-col",
                        { attrs: { md: "3", "offset-md": "5" } },
                        [
                          _c("h6", { staticClass: "box-title" }, [
                            _vm._v(_vm._s(_vm.__("search"))),
                          ]),
                          _vm._v(" "),
                          _c("b-form-input", {
                            attrs: {
                              id: "filter-input",
                              type: "search",
                              placeholder: _vm.__("search"),
                            },
                            model: {
                              value: _vm.filter,
                              callback: function ($$v) {
                                _vm.filter = $$v
                              },
                              expression: "filter",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "b-col",
                        { staticClass: "text-center", attrs: { md: "1" } },
                        [
                          _c(
                            "button",
                            {
                              directives: [
                                {
                                  name: "b-tooltip",
                                  rawName: "v-b-tooltip.hover",
                                  modifiers: { hover: true },
                                },
                              ],
                              staticClass: "btn btn-primary btn_refresh",
                              attrs: { title: _vm.__("refresh") },
                              on: {
                                click: function ($event) {
                                  return _vm.getPlans()
                                },
                              },
                            },
                            [
                              _c("i", {
                                staticClass: "fa fa-refresh",
                                attrs: { "aria-hidden": "true" },
                              }),
                            ]
                          ),
                        ]
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("b-table", {
                    attrs: {
                      items: _vm.plans,
                      fields: _vm.fields,
                      filter: _vm.filter,
                      "filter-included-fields": _vm.filterOn,
                      "sort-by": _vm.sortBy,
                      "sort-desc": _vm.sortDesc,
                      "sort-direction": _vm.sortDirection,
                      bordered: true,
                      busy: _vm.isLoading,
                      stacked: "md",
                      "show-empty": "",
                      small: "",
                    },
                    on: {
                      "update:sortBy": function ($event) {
                        _vm.sortBy = $event
                      },
                      "update:sort-by": function ($event) {
                        _vm.sortBy = $event
                      },
                      "update:sortDesc": function ($event) {
                        _vm.sortDesc = $event
                      },
                      "update:sort-desc": function ($event) {
                        _vm.sortDesc = $event
                      },
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "table-busy",
                        fn: function () {
                          return [
                            _c(
                              "div",
                              { staticClass: "text-center text-black my-2" },
                              [
                                _c("b-spinner", {
                                  staticClass: "align-middle",
                                }),
                                _vm._v(" "),
                                _c("strong", [
                                  _vm._v(_vm._s(_vm.__("loading")) + "..."),
                                ]),
                              ],
                              1
                            ),
                          ]
                        },
                        proxy: true,
                      },
                      {
                        key: "cell(name)",
                        fn: function (row) {
                          return [_c("strong", [_vm._v(_vm._s(row.item.name))])]
                        },
                      },
                      {
                        key: "cell(days)",
                        fn: function (row) {
                          return [
                            _c("span", [
                              _vm._v(
                                _vm._s(row.item.days) +
                                  " " +
                                  _vm._s(_vm.__("days"))
                              ),
                            ]),
                          ]
                        },
                      },
                      {
                        key: "cell(price)",
                        fn: function (row) {
                          return [
                            _c("span", [
                              _vm._v(
                                _vm._s(parseFloat(row.item.price).toFixed(2))
                              ),
                            ]),
                          ]
                        },
                      },
                      {
                        key: "cell(discounted_price)",
                        fn: function (row) {
                          return [
                            row.item.discounted_price
                              ? _c("span", [
                                  _vm._v(
                                    _vm._s(
                                      parseFloat(
                                        row.item.discounted_price
                                      ).toFixed(2)
                                    )
                                  ),
                                ])
                              : _c("span", { staticClass: "text-muted" }, [
                                  _vm._v("-"),
                                ]),
                          ]
                        },
                      },
                      {
                        key: "cell(free_delivery_above)",
                        fn: function (row) {
                          return [
                            row.item.free_delivery_above
                              ? _c("span", [
                                  _vm._v(
                                    _vm._s(
                                      parseFloat(
                                        row.item.free_delivery_above
                                      ).toFixed(2)
                                    )
                                  ),
                                ])
                              : _c("span", { staticClass: "text-muted" }, [
                                  _vm._v("-"),
                                ]),
                          ]
                        },
                      },
                      {
                        key: "cell(status)",
                        fn: function (row) {
                          return [
                            row.item.status == 1
                              ? _c(
                                  "span",
                                  { staticClass: "badge bg-success" },
                                  [_vm._v(_vm._s(_vm.__("active")))]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            row.item.status == 0
                              ? _c("span", { staticClass: "badge bg-danger" }, [
                                  _vm._v(_vm._s(_vm.__("deactive"))),
                                ])
                              : _vm._e(),
                          ]
                        },
                      },
                      {
                        key: "cell(actions)",
                        fn: function (row) {
                          return [
                            _vm.$can("subscription_update")
                              ? _c(
                                  "button",
                                  {
                                    directives: [
                                      {
                                        name: "b-tooltip",
                                        rawName: "v-b-tooltip.hover",
                                        modifiers: { hover: true },
                                      },
                                    ],
                                    staticClass: "btn btn-sm btn-primary",
                                    attrs: { title: _vm.__("edit") },
                                    on: {
                                      click: function ($event) {
                                        return _vm.editPlan(row.item)
                                      },
                                    },
                                  },
                                  [_c("i", { staticClass: "fa fa-pencil-alt" })]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.$can("subscription_delete")
                              ? _c(
                                  "button",
                                  {
                                    directives: [
                                      {
                                        name: "b-tooltip",
                                        rawName: "v-b-tooltip.hover",
                                        modifiers: { hover: true },
                                      },
                                    ],
                                    staticClass: "btn btn-sm btn-danger",
                                    attrs: { title: _vm.__("delete") },
                                    on: {
                                      click: function ($event) {
                                        return _vm.deletePlan(
                                          row.index,
                                          row.item.id
                                        )
                                      },
                                    },
                                  },
                                  [_c("i", { staticClass: "fa fa-trash" })]
                                )
                              : _vm._e(),
                          ]
                        },
                      },
                    ]),
                  }),
                  _vm._v(" "),
                  _c(
                    "b-row",
                    [
                      _c("b-col", { staticClass: "my-1", attrs: { md: "2" } }, [
                        _c(
                          "label",
                          [
                            _c(
                              "b-form-group",
                              {
                                staticClass: "mb-0",
                                attrs: {
                                  label: _vm.__("per_page"),
                                  "label-for": "per-page-select",
                                  "label-align-sm": "right",
                                  "label-size": "sm",
                                },
                              },
                              [
                                _c("b-form-select", {
                                  staticClass: "form-control form-select",
                                  attrs: {
                                    id: "per-page-select",
                                    options: _vm.pageOptions,
                                    size: "sm",
                                  },
                                  model: {
                                    value: _vm.perPage,
                                    callback: function ($$v) {
                                      _vm.perPage = $$v
                                    },
                                    expression: "perPage",
                                  },
                                }),
                              ],
                              1
                            ),
                          ],
                          1
                        ),
                      ]),
                      _vm._v(" "),
                      _c(
                        "b-col",
                        {
                          staticClass: "my-1",
                          attrs: { md: "2", "offset-md": "8" },
                        },
                        [
                          _c("b-pagination", {
                            staticClass: "my-0",
                            attrs: {
                              "total-rows": _vm.totalRows,
                              "per-page": _vm.perPage,
                              align: "fill",
                              size: "sm",
                            },
                            model: {
                              value: _vm.currentPage,
                              callback: function ($$v) {
                                _vm.currentPage = $$v
                              },
                              expression: "currentPage",
                            },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
            ]),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          attrs: {
            title: _vm.edit_record.id
              ? _vm.__("edit_subscription_plan")
              : _vm.__("add_subscription"),
            size: "lg",
            "hide-footer": true,
            id: "subscription-modal",
          },
          on: { hide: _vm.resetForm },
          model: {
            value: _vm.create_new,
            callback: function ($$v) {
              _vm.create_new = $$v
            },
            expression: "create_new",
          },
        },
        [
          _c(
            "form",
            {
              attrs: { id: "subscription-form" },
              on: {
                submit: function ($event) {
                  $event.preventDefault()
                  return _vm.savePlan.apply(null, arguments)
                },
              },
            },
            [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-md-12" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "name" } }, [
                      _vm._v(_vm._s(_vm.__("plan_name")) + " "),
                      _c("span", { staticClass: "text-danger" }, [_vm._v("*")]),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.form.name,
                          expression: "form.name",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        id: "name",
                        placeholder: _vm.__("enter_plan_name"),
                        required: "",
                      },
                      domProps: { value: _vm.form.name },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.form, "name", $event.target.value)
                        },
                      },
                    }),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-md-6" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "days" } }, [
                      _vm._v(_vm._s(_vm.__("days")) + " "),
                      _c("span", { staticClass: "text-danger" }, [_vm._v("*")]),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.form.days,
                          expression: "form.days",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "number",
                        id: "days",
                        placeholder: _vm.__("enter_days"),
                        min: "1",
                        required: "",
                      },
                      domProps: { value: _vm.form.days },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.form, "days", $event.target.value)
                        },
                      },
                    }),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(_vm._s(_vm.__("subscription_duration_in_days"))),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-6" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", [
                      _vm._v(_vm._s(_vm.__("status")) + " "),
                      _c("span", { staticClass: "text-danger" }, [_vm._v("*")]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "col-md-9 text-left mt-1" },
                      [
                        _c("b-form-radio-group", {
                          attrs: {
                            options: [
                              { text: " " + _vm.__("deactive"), value: 0 },
                              { text: " " + _vm.__("active"), value: 1 },
                            ],
                            buttons: "",
                            "button-variant": "outline-primary",
                            required: "",
                          },
                          model: {
                            value: _vm.form.status,
                            callback: function ($$v) {
                              _vm.$set(_vm.form, "status", $$v)
                            },
                            expression: "form.status",
                          },
                        }),
                      ],
                      1
                    ),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-md-6" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "price" } }, [
                      _vm._v(
                        _vm._s(_vm.__("price") + "(" + this.$currency + ")") +
                          " "
                      ),
                      _c("span", { staticClass: "text-danger" }, [_vm._v("*")]),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.form.price,
                          expression: "form.price",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "number",
                        id: "price",
                        placeholder: _vm.__("enter_price"),
                        step: "0.01",
                        min: "0",
                        required: "",
                      },
                      domProps: { value: _vm.form.price },
                      on: {
                        input: [
                          function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.form, "price", $event.target.value)
                          },
                          _vm.validateDiscountedPrice,
                        ],
                      },
                    }),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(_vm._s(_vm.__("regular_price_of_subscription"))),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-6" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "discounted_price" } }, [
                      _vm._v(
                        _vm._s(
                          _vm.__("discounted_price") +
                            "(" +
                            this.$currency +
                            ")"
                        )
                      ),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.form.discounted_price,
                          expression: "form.discounted_price",
                        },
                      ],
                      staticClass: "form-control",
                      class: { "is-invalid": _vm.discountedPriceError },
                      attrs: {
                        type: "number",
                        id: "discounted_price",
                        placeholder: _vm.__("enter_discounted_price"),
                        step: "0.01",
                        min: "0",
                      },
                      domProps: { value: _vm.form.discounted_price },
                      on: {
                        input: [
                          function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.form,
                              "discounted_price",
                              $event.target.value
                            )
                          },
                          _vm.validateDiscountedPrice,
                        ],
                        blur: _vm.validateDiscountedPrice,
                      },
                    }),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(_vm._s(_vm.__("optional_discounted_price"))),
                    ]),
                    _vm._v(" "),
                    _vm.discountedPriceError
                      ? _c("div", { staticClass: "invalid-feedback" }, [
                          _vm._v(
                            "\n                            " +
                              _vm._s(_vm.discountedPriceError) +
                              "\n                        "
                          ),
                        ])
                      : _vm._e(),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-md-6" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "free_delivery_above" } }, [
                      _vm._v(
                        _vm._s(
                          _vm.__("free_delivery_above") +
                            "(" +
                            this.$currency +
                            ")"
                        )
                      ),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.form.free_delivery_above,
                          expression: "form.free_delivery_above",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "number",
                        id: "free_delivery_above",
                        placeholder: _vm.__("enter_free_delivery_above"),
                        step: "0.01",
                        min: "0",
                      },
                      domProps: { value: _vm.form.free_delivery_above },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.form,
                            "free_delivery_above",
                            $event.target.value
                          )
                        },
                      },
                    }),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(
                        _vm._s(_vm.__("minimum_order_amount_for_free_delivery"))
                      ),
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "alert alert-success mt-2 mb-0",
                        attrs: { role: "alert" },
                      },
                      [
                        _c(
                          "small",
                          [
                            _c("i", { staticClass: "fa fa-info-circle" }),
                            _vm._v(" "),
                            _c("strong", [
                              _vm._v(_vm._s(_vm.__("note")) + ":"),
                            ]),
                            _vm._v(
                              " " +
                                _vm._s(
                                  _vm.__(
                                    "please_configure_free_delivery_settings_properly"
                                  )
                                ) +
                                " \n                                " +
                                _vm._s(
                                  _vm.__("to_avoid_conflicts_with_time_slots")
                                ) +
                                ". \n                                "
                            ),
                            _c(
                              "router-link",
                              {
                                staticClass: "alert-link",
                                attrs: { to: "/delivery_settings" },
                              },
                              [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(
                                      _vm.__("configure_delivery_settings")
                                    ) +
                                    " "
                                ),
                                _c("i", {
                                  staticClass: "fa fa-external-link-alt",
                                }),
                              ]
                            ),
                          ],
                          1
                        ),
                      ]
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-6" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "ios_product_id" } }, [
                      _vm._v(_vm._s(_vm.__("ios_product_id"))),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.form.ios_product_id,
                          expression: "form.ios_product_id",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        id: "ios_product_id",
                        placeholder: _vm.__("enter_ios_product_id"),
                      },
                      domProps: { value: _vm.form.ios_product_id },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.form,
                            "ios_product_id",
                            $event.target.value
                          )
                        },
                      },
                    }),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(_vm._s(_vm.__("ios_in_app_purchase_product_id"))),
                    ]),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "form-group d-flex justify-content-end gap-2" },
                [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-secondary",
                      attrs: { type: "button" },
                      on: {
                        click: function ($event) {
                          _vm.create_new = false
                          _vm.resetForm()
                        },
                      },
                    },
                    [_vm._v(_vm._s(_vm.__("cancel")))]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-primary",
                      attrs: { type: "submit", disabled: _vm.isSubmitting },
                    },
                    [
                      _vm.isSubmitting
                        ? _c("span", [_vm._v(_vm._s(_vm.__("saving")) + "...")])
                        : _c("span", [_vm._v(_vm._s(_vm.__("save")))]),
                    ]
                  ),
                ]
              ),
            ]
          ),
        ]
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);