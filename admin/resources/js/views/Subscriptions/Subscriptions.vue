<template>
    <div>
        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>{{ __('manage_subscriptions') }}</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('manage_subscriptions') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card">
                        <div class="card-header">
                            <h4>{{ __('subscription_plans') }}</h4>
                            <span class="pull-right">
                                <button class="btn btn-primary" @click="openAddModal" v-b-tooltip.hover :title="__('add_subscription')" v-if="$can('subscription_create')">{{ __('add_subscription') }}</button>
                            </span>
                        </div>
                        <div class="card-body">
                            <b-row class="mb-2">
                                <b-col md="3">
                                    <h6 class="box-title">{{ __('subscription_name') }}</h6>
                                    <div class="d-flex gap-2">
                                        <b-form-input
                                            id="subscription-name-input"
                                            v-model="subscriptionName"
                                            type="text"
                                            :placeholder="__('enter_subscription_name')"
                                        ></b-form-input>
                                        <button class="btn btn-primary" @click="updateSubscriptionName" :disabled="isUpdatingName" v-b-tooltip.hover :title="__('update')">
                                            <span v-if="isUpdatingName">
                                                <i class="fa fa-spinner fa-spin"></i>
                                            </span>
                                            <span v-else>
                                                <i class="fa fa-save"></i>
                                            </span>
                                        </button>
                                    </div>
                                </b-col>
                                <b-col md="3" offset-md="5">
                                    <h6 class="box-title">{{ __('search') }}</h6>
                                    <b-form-input
                                        id="filter-input"
                                        v-model="filter"
                                        type="search"
                                        :placeholder="__('search')"
                                    ></b-form-input>
                                </b-col>
                                <b-col md="1" class="text-center">
                                    <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getPlans()">
                                        <i class="fa fa-refresh" aria-hidden="true"></i>
                                    </button>
                                </b-col>
                            </b-row>
                            <b-table
                                :items="plans"
                                :fields="fields"
                                :filter="filter"
                                :filter-included-fields="filterOn"
                                :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc"
                                :sort-direction="sortDirection"
                                :bordered="true"
                                :busy="isLoading"
                                stacked="md"
                                show-empty
                                small>

                                <template #table-busy>
                                    <div class="text-center text-black my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

                                <template #cell(name)="row">
                                    <strong>{{ row.item.name }}</strong>
                                </template>

                                <template #cell(days)="row">
                                    <span>{{ row.item.days }} {{ __('days') }}</span>
                                </template>

                                <template #cell(price)="row">
                                    <span>{{ parseFloat(row.item.price).toFixed(2) }}</span>
                                </template>

                                <template #cell(discounted_price)="row">
                                    <span v-if="row.item.discounted_price">{{ parseFloat(row.item.discounted_price).toFixed(2) }}</span>
                                    <span v-else class="text-muted">-</span>
                                </template>

                                <template #cell(free_delivery_above)="row">
                                    <span v-if="row.item.free_delivery_above">{{ parseFloat(row.item.free_delivery_above).toFixed(2) }}</span>
                                    <span v-else class="text-muted">-</span>
                                </template>

                                <template #cell(status)="row">
                                    <span class='badge bg-success' v-if="row.item.status == 1">{{ __('active') }}</span>
                                    <span class='badge bg-danger' v-if="row.item.status == 0">{{ __('deactive') }}</span>
                                </template>

                                <template #cell(actions)="row">
                                    <button class="btn btn-sm btn-primary" @click="editPlan(row.item)" v-if="$can('subscription_update')" v-b-tooltip.hover :title="__('edit')"><i class="fa fa-pencil-alt"></i></button>
                                    <button class="btn btn-sm btn-danger" @click="deletePlan(row.index, row.item.id)" v-if="$can('subscription_delete')" v-b-tooltip.hover :title="__('delete')"><i class="fa fa-trash"></i></button>
                                </template>

                            </b-table>
                            <b-row>
                                <b-col md="2" class="my-1">
                                    <label>
                                        <b-form-group
                                            :label="__('per_page')"
                                            label-for="per-page-select"
                                            label-align-sm="right"
                                            label-size="sm"
                                            class="mb-0">
                                            <b-form-select
                                                id="per-page-select"
                                                v-model="perPage"
                                                :options="pageOptions"
                                                size="sm"
                                                class="form-control form-select"
                                            ></b-form-select>
                                        </b-form-group>
                                    </label>
                                </b-col>
                                <b-col md="2" class="my-1" offset-md="8">
                                    <b-pagination
                                        v-model="currentPage"
                                        :total-rows="totalRows"
                                        :per-page="perPage"
                                        align="fill"
                                        size="sm"
                                        class="my-0"
                                    ></b-pagination>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Create/Edit Subscription Plan Modal -->
        <b-modal v-model="create_new" :title="edit_record.id ? __('edit_subscription_plan') : __('add_subscription')" size="lg" :hide-footer="true" @hide="resetForm" id="subscription-modal">
            <form @submit.prevent="savePlan" id="subscription-form">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="name">{{ __('plan_name') }} <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="name" v-model="form.name" :placeholder="__('enter_plan_name')" required>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="days">{{ __('days') }} <span class="text-danger">*</span></label>
                            <input type="number" class="form-control" id="days" v-model="form.days" :placeholder="__('enter_days')" min="1" required>
                            <small class="text-muted">{{ __('subscription_duration_in_days') }}</small>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>{{ __('status') }} <span class="text-danger">*</span></label>
                            <div class="col-md-9 text-left mt-1">
                                <b-form-radio-group
                                    v-model="form.status"
                                    :options="[
                                        { text: ' ' + __('deactive'), 'value': 0 },
                                        { text: ' ' + __('active'), 'value': 1 },
                                    ]"
                                    buttons
                                    button-variant="outline-primary"
                                    required
                                ></b-form-radio-group>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="price">{{ __('price')+'('+ this.$currency +')' }} <span class="text-danger">*</span></label>
                            <input 
                                type="number" 
                                class="form-control" 
                                id="price" 
                                v-model="form.price" 
                                :placeholder="__('enter_price')" 
                                step="0.01" 
                                min="0" 
                                required
                                @input="validateDiscountedPrice">
                            <small class="text-muted">{{ __('regular_price_of_subscription') }}</small>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="discounted_price">{{ __('discounted_price')+'('+ this.$currency +')' }}</label>
                            <input 
                                type="number" 
                                class="form-control" 
                                :class="{ 'is-invalid': discountedPriceError }"
                                id="discounted_price" 
                                v-model="form.discounted_price" 
                                :placeholder="__('enter_discounted_price')" 
                                step="0.01" 
                                min="0"
                                @input="validateDiscountedPrice"
                                @blur="validateDiscountedPrice">
                            <small class="text-muted">{{ __('optional_discounted_price') }}</small>
                            <div v-if="discountedPriceError" class="invalid-feedback">
                                {{ discountedPriceError }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="free_delivery_above">{{ __('free_delivery_above')+'('+ this.$currency +')' }}</label>
                            <input type="number" class="form-control" id="free_delivery_above" v-model="form.free_delivery_above" :placeholder="__('enter_free_delivery_above')" step="0.01" min="0">
                            <small class="text-muted">{{ __('minimum_order_amount_for_free_delivery') }}</small>
                            
                            <div class="alert alert-success mt-2 mb-0" role="alert">
                                <small>
                                    <i class="fa fa-info-circle"></i>
                                    <strong>{{ __('note') }}:</strong> {{ __('please_configure_free_delivery_settings_properly') }} 
                                    {{ __('to_avoid_conflicts_with_time_slots') }}. 
                                    <router-link to="/delivery_settings" class="alert-link">
                                        {{ __('configure_delivery_settings') }} <i class="fa fa-external-link-alt"></i>
                                    </router-link>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="ios_product_id">{{ __('ios_product_id') }}</label>
                            <input type="text" class="form-control" id="ios_product_id" v-model="form.ios_product_id" :placeholder="__('enter_ios_product_id')">
                            <small class="text-muted">{{ __('ios_in_app_purchase_product_id') }}</small>
                        </div>
                    </div>
                </div>

                <div class="form-group d-flex justify-content-end gap-2">
                    <button type="button" class="btn btn-secondary" @click="create_new=false; resetForm()">{{ __('cancel') }}</button>
                    <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                        <span v-if="isSubmitting">{{ __('saving') }}...</span>
                        <span v-else>{{ __('save') }}</span>
                    </button>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Subscriptions',
    data() {
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
            fields: [
                { key: 'id', label: __('id'), sortable: true, class: 'text-center' },
                { key: 'name', label: __('plan_name'), sortable: true, class: 'text-center' },
                { key: 'days', label: __('days'), sortable: true, class: 'text-center' },
                { key: 'price', label: __('price')+'('+ this.$currency +')', sortable: true, class: 'text-center' },
                { key: 'discounted_price', label: __('discounted_price')+'('+ this.$currency +')', sortable: true, class: 'text-center' },
                { key: 'free_delivery_above', label: __('free_delivery_above')+'('+ this.$currency +')', sortable: true, class: 'text-center' },
                { key: 'status', label: __('status'), class: 'text-center' },
                { key: 'actions', label: __('actions'), class: 'text-center' }
            ],
            perPage: 10,
            currentPage: 1,
            totalRows: 0,
            pageOptions: [5, 10, 15, 20, 25, 50, 100]
        }
    },
    mounted() {
        this.getPlans();
    },
    methods: {
        // Get all subscription plans
        async getPlans() {
            this.isLoading = true;
            try {
                const params = {
                    limit: this.perPage,
                    offset: (this.currentPage - 1) * this.perPage,
                    include_inactive: 1
                };

                const response = await axios.get(this.$apiUrl + '/subscription_plans/', { params });
                if (response.data.status === 1) {
                    // Check if response has plans array or object with plans property
                    if (Array.isArray(response.data.data)) {
                        this.plans = response.data.data;
                        this.totalRows = response.data.total || response.data.data.length;
                    } else if (response.data.data && response.data.data.plans) {
                        // New format with plans and subscription_name
                        this.plans = response.data.data.plans;
                        this.totalRows = response.data.total || response.data.data.plans.length;
                        // Set subscription name if available
                        if (response.data.data.subscription_name !== undefined) {
                            this.subscriptionName = response.data.data.subscription_name || '';
                        }
                    } else {
                        this.plans = [];
                        this.totalRows = 0;
                    }
                } else {
                    this.showError(response.data.message);
                }
            } catch (error) {
                this.showError(__('something_went_wrong'));
            } finally {
                this.isLoading = false;
            }
        },

        // Validate discounted price
        validateDiscountedPrice() {
            this.discountedPriceError = '';
            
            // Only validate if both price and discounted_price are provided
            if (this.form.discounted_price && this.form.price) {
                const discountedPrice = parseFloat(this.form.discounted_price);
                const regularPrice = parseFloat(this.form.price);
                
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

        async checkFreeDeliveryTimeSlots() {
            try {
                const response = await axios.get(this.$apiUrl + '/subscription_plans/check_free_delivery_time_slots');
                if (response.data.status === 1) {
                    return response.data.data.has_free_delivery_time_slots;
                }
                return false;
            } catch (error) {
                console.error('Error checking free delivery time slots:', error);
                return false;
            }
        },

        // Save or update subscription plan
        async savePlan(event) {
            const form = event.target;
            
            // Validate discounted price before form submission
            if (!this.validateDiscountedPrice()) {
                // Focus on discounted price field if validation fails
                this.$nextTick(() => {
                    const discountedPriceInput = document.getElementById('discounted_price');
                    if (discountedPriceInput) {
                        discountedPriceInput.focus();
                        discountedPriceInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
                return;
            }
            
            // Check HTML5 form validation
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            this.isSubmitting = true;
            try {
                const formData = {
                    name: this.form.name,
                    days: this.form.days,
                    price: this.form.price,
                    discounted_price: this.form.discounted_price || null,
                    free_delivery_above: this.form.free_delivery_above || null,
                    ios_product_id: this.form.ios_product_id || null,
                    status: this.form.status
                };

                let response;
                if (this.edit_record.id) {
                    // Update existing plan
                    response = await axios.post(this.$apiUrl + `/subscription_plans/update/${this.edit_record.id}`, formData);
                } else {
                    // Create new plan
                    response = await axios.post(this.$apiUrl + '/subscription_plans/save', formData);
                }

                if (response.data.status === 1) {
                    this.showMessage("success", response.data.message);
                    this.create_new = false;
                    this.resetForm();
                    this.getPlans();
                } else {
                    this.showError(response.data.message);
                }
            } catch (error) {
                this.showError(__('something_went_wrong'));
            } finally {
                this.isSubmitting = false;
            }
        },

        // Edit plan - populate form with plan data and check for conflicts
        async editPlan(plan) {
            // Check for free delivery time slots before opening edit modal
            const hasFreeDeliveryTimeSlots = await this.checkFreeDeliveryTimeSlots();
            if (hasFreeDeliveryTimeSlots) {
                this.$swal.fire({
                    title: __('cannot_create_subscription_plan'),
                    html: `
                        <div class="text-left">
                            <p>${__('free_delivery_time_slots_exist_message')}</p>
                            <p class="mt-3">
                                <strong>${__('please_remove_free_delivery_time_slots_first')}</strong>
                            </p>
                            <p class="mt-3">
                                <a href="/delivery_settings" class="btn btn-primary btn-sm">
                                    ${__('go_to_delivery_settings')} <i class="fa fa-external-link-alt"></i>
                                </a>
                            </p>
                        </div>
                    `,
                    icon: 'warning',
                    confirmButtonText: __('ok'),
                    confirmButtonColor: '#37a279',
                    width: '600px'
                });
                return;
            }
            
            // If no conflicts, proceed to open the edit modal
            this.edit_record = { ...plan };
            this.form = {
                name: plan.name || '',
                days: plan.days || '',
                price: plan.price || '',
                discounted_price: plan.discounted_price || '',
                free_delivery_above: plan.free_delivery_above || '',
                ios_product_id: plan.ios_product_id || '',
                status: plan.status !== undefined ? plan.status : 1
            };
            this.create_new = true;
        },

        // Delete subscription plan
        async deletePlan(index, id) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
            }).then(result => {
                if (result.value) {
                    this.isLoading = true;
                    axios.post(this.$apiUrl + `/subscription_plans/delete/${id}`)
                        .then((response) => {
                            this.isLoading = false;
                            if (response.data.status === 1) {
                                this.showMessage('success', response.data.message);
                                this.getPlans();
                            } else {
                                this.showError(response.data.message);
                            }
                        })
                        .catch(error => {
                            this.isLoading = false;
                            this.showError(__('something_went_wrong'));
                        });
                }
            });
        },

        // Reset form to default values
        resetForm() {
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
        async openAddModal() {
            // Check for free delivery time slots before opening the modal
            const hasFreeDeliveryTimeSlots = await this.checkFreeDeliveryTimeSlots();
            if (hasFreeDeliveryTimeSlots) {
                this.$swal.fire({
                    title: __('cannot_create_subscription_plan'),
                    html: `
                        <div class="text-left">
                            <p>${__('free_delivery_time_slots_exist_message')}</p>
                            <p class="mt-3">
                                <strong>${__('please_remove_free_delivery_time_slots_first')}</strong>
                            </p>
                                <p class="mt-3">
                                    <a href="/delivery_settings" class="btn btn-primary btn-sm">
                                        ${__('go_to_delivery_settings')} <i class="fa fa-external-link-alt"></i>
                                    </a>
                                </p>
                        </div>
                    `,
                    icon: 'warning',
                    confirmButtonText: __('ok'),
                    confirmButtonColor: '#37a279',
                    width: '600px'
                });
                return;
            }
            
            // If no conflicts, proceed to open the modal
            this.resetForm();
            this.create_new = true;
        },

        // Update subscription name in settings
        async updateSubscriptionName() {
            if (!this.subscriptionName || this.subscriptionName.trim() === '') {
                this.showError(__('subscription_name_cannot_be_empty'));
                return;
            }

            this.isUpdatingName = true;
            try {
                const response = await axios.post(this.$apiUrl + '/subscription_plans/update_setting', {
                    subscription_name: this.subscriptionName.trim()
                });

                if (response.data.status === 1) {
                    this.showMessage("success", response.data.message);
                } else {
                    this.showError(response.data.message);
                }
            } catch (error) {
                this.showError(__('something_went_wrong'));
            } finally {
                this.isUpdatingName = false;
            }
        }
    },
    watch: {
        // Watch for pagination changes
        currentPage() {
            this.getPlans();
        },
        
        // Watch for per page changes
        perPage() {
            this.currentPage = 1; // Reset to first page when changing per page
            this.getPlans();
        }
    }
}
</script>

