<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('subscription_faqs') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('subscription_faqs') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">{{ __('subscription_faqs_list') }}</h4>
                        <span class="pull-right">
                            <button class="btn btn-primary" @click="openAddModal" v-b-tooltip.hover :title="__('add')" v-if="$can('subscription_faq_create')">{{ __('add') }} {{ __('subscription_faqs') }}</button>
                        </span>
                    </div>
                    <div class="card-body">

                        <b-row class="mb-2">
                            <b-col md="2">
                                <div class="form-check form-switch">
                                    <label>
                                        <input type="checkbox" v-model="enableDragDrop" class="form-check-input">
                                        {{ __('enable_drag_and_drop') }}
                                    </label>
                                </div>
                            </b-col>
                            <b-col md="3" offset-md="6">
                                <h6 class="box-title">{{ __('search') }}</h6>
                                <b-form-input
                                    id="filter-input"
                                    v-model="filter"
                                    type="search"
                                    :placeholder="__('search')"
                                ></b-form-input>
                            </b-col>
                            <b-col md="1" class="text-center">
                                <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getFaqs()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </b-col>
                        </b-row>

                        <!-- Table with drag and drop -->
                        <div v-if="enableDragDrop" class="table-responsive">
                            <table class="table table-bordered table-sm">
                                <thead>
                                    <tr>
                                        <th class="text-center" style="width: 50px;">{{ __('drag') }}</th>
                                        <th class="text-center" style="width: 80px;">{{ __('id') }}</th>
                                        <th>{{ __('frequently_asked_questions') }}</th>
                                        <th class="text-center" style="width: 100px;">{{ __('sort_order') }}</th>
                                        <th class="text-center" style="width: 100px;">{{ __('status') }}</th>
                                        <th class="text-center" style="width: 120px;">{{ __('actions') }}</th>
                                    </tr>
                                </thead>
                                <draggable 
                                    v-model="faqs" 
                                    tag="tbody" 
                                    :disabled="!enableDragDrop"
                                    v-bind="dragOptions"
                                    @start="isDragging = true"
                                    @end="isDragging = false"
                                    @change="updateFaqsOrder"
                                    handle=".drag-handle">
                                    <tr v-for="faq in faqs" :key="faq.id" :class="{ 'dragging': isDragging }">
                                        <td class="text-center drag-handle" style="cursor: move;">
                                            <i class="fas fa-arrows-alt"></i>
                                        </td>
                                        <td class="text-center">{{ faq.id }}</td>
                                        <td>
                                            <a href="javascript:void(0)" style="color:#435ebe;">{{ faq.question }}</a>
                                            <div class="faq-answer">
                                                <p class="mb-0" v-if="!shouldTruncate(faq.answer) || expandedFaqs[faq.id]">
                                                    {{ faq.answer }}
                                                </p>
                                                <p class="mb-0" v-else>
                                                    {{ getTruncatedText(faq.answer) }}
                                                </p>
                                                <a 
                                                    v-if="shouldTruncate(faq.answer)"
                                                    @click="toggleFaqExpansion(faq.id)"
                                                    href="javascript:void(0)"
                                                    style="color: #007bff; font-size: 12px; cursor: pointer;"
                                                >
                                                    {{ expandedFaqs[faq.id] ? __('view_less') : __('view_more') }}
                                                </a>
                                            </div>
                                        </td>
                                        <td class="text-center">{{ faq.sort_order }}</td>
                                        <td class="text-center">
                                            <span class='badge bg-success' v-if="faq.status == 1">{{ __('active') }}</span>
                                            <span class='badge bg-danger' v-if="faq.status == 0">{{ __('deactive') }}</span>
                                        </td>
                                        <td class="text-center">
                                            <button class="btn btn-sm btn-primary" @click="editFaq(faq)" v-b-tooltip.hover :title="__('edit')" v-if="$can('subscription_faq_update')"><i class="fa fa-pencil-alt"></i></button>
                                            <button class="btn btn-sm btn-danger" @click="deleteFaq(getFaqIndex(faq.id), faq.id)" v-b-tooltip.hover :title="__('delete')" v-if="$can('subscription_faq_delete')"><i class="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </draggable>
                            </table>
                        </div>

                        <!-- Regular table when drag and drop is disabled -->
                        <b-table
                            v-else
                            :items="allFaqs"
                            :fields="fields"
                            :current-page="currentPage"
                            :per-page="perPage"
                            :filter="filter"
                            :filter-included-fields="filterOn"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            :sort-direction="sortDirection"
                            :bordered="true"
                            :busy="isLoading"
                            stacked="md"
                            show-empty
                            small
                            @filtered="onFiltered">
                            <template #table-busy>
                                <div class="text-center text-black my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>
                            <template #cell(faqs)="row">
                                <a href="javascript:void(0)" style="color:#435ebe;">{{ row.item.question }}</a>
                                <div class="faq-answer">
                                    <p class="mb-0" v-if="!shouldTruncate(row.item.answer) || expandedFaqs[row.item.id]">
                                        {{ row.item.answer }}
                                    </p>
                                    <p class="mb-0" v-else>
                                        {{ getTruncatedText(row.item.answer) }}
                                    </p>
                                    <!-- View More/Less Link -->
                                    <a 
                                        v-if="shouldTruncate(row.item.answer)"
                                        @click="toggleFaqExpansion(row.item.id)"
                                        href="javascript:void(0)"
                                        style="color: #007bff; font-size: 12px; cursor: pointer;"
                                    >
                                        {{ expandedFaqs[row.item.id] ? __('view_less') : __('view_more') }}
                                    </a>
                                </div>
                            </template>
                            <template #cell(sort_order)="row">
                                <span>{{ row.item.sort_order }}</span>
                            </template>
                            <template #cell(status)="row">
                                <span class='badge bg-success' v-if="row.item.status == 1">{{ __('active') }}</span>
                                <span class='badge bg-danger' v-if="row.item.status == 0">{{ __('deactive') }}</span>
                            </template>
                            <template #cell(actions)="row">
                                <button class="btn btn-sm btn-primary" @click="editFaq(row.item)" v-b-tooltip.hover :title="__('edit')" v-if="$can('subscription_faq_update')"><i class="fa fa-pencil-alt"></i></button>
                                <button class="btn btn-sm btn-danger" @click="deleteFaq(row.index, row.item.id)" v-b-tooltip.hover :title="__('delete')" v-if="$can('subscription_faq_delete')"><i class="fa fa-trash"></i></button>
                            </template>
                        </b-table>
                        <!-- Pagination controls (only show when drag-and-drop is disabled) -->
                        <b-row v-if="!enableDragDrop">
                            <b-col md="2" class="my-1">
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
                            </b-col>
                            <b-col md="4" class="my-1" offset-md="6">
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
                        <!-- Show total count when drag-and-drop is enabled -->
                        <b-row v-else class="mt-2">
                            <b-col>
                                <p class="text-muted mb-0">{{ __('total') }}: {{ totalRows }} {{ __('items') }}</p>
                            </b-col>
                        </b-row>

                    </div>

                </div>
            </section>
        </div>
        
        <!-- Add / Edit Modal -->
        <b-modal 
            ref="faq-modal" 
            :title="modalTitle" 
            @hidden="hideModal" 
            scrollable 
            no-close-on-backdrop 
            no-fade 
            static 
            size="lg"
            v-model="create_new">
            <div slot="modal-footer">
                <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isSubmitting">
                    {{ __('save') }}
                    <b-spinner v-if="isSubmitting" small label="Spinning"></b-spinner>
                </b-button>
                <b-button variant="secondary" @click="hideModal">{{ __('cancel') }}</b-button>
            </div>
            <form ref="faq-form" @submit.prevent="saveFaq">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="question">{{ __('query') }} <span class="text-danger">*</span></label>
                            <input 
                                class="form-control" 
                                name="question" 
                                id="question" 
                                v-model="form.question" 
                                :placeholder="__('enter_question')"
                                required
                                maxlength="1000">
                            <small class="text-muted">{{ __('enter_the_faq_question') }}</small>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="answer">{{ __('answer') }} <span class="text-danger">*</span></label>
                            <textarea 
                                class="form-control" 
                                name="answer" 
                                id="answer" 
                                v-model="form.answer" 
                                rows="5"
                                :placeholder="__('enter_answer')"
                                required
                                maxlength="1000"></textarea>
                            <small class="text-muted">{{ __('enter_the_faq_answer_optional') }}</small>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="sort_order">{{ __('sort_order') }}</label>
                            <input 
                                type="number" 
                                class="form-control" 
                                name="sort_order" 
                                id="sort_order" 
                                v-model="form.sort_order" 
                                :placeholder="__('enter_sort_order')"
                                min="0">
                            <small class="text-muted">{{ __('lower_numbers_appear_first') }}</small>
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
                <button ref="dummy_submit" style="display:none;"></button>
            </form>
        </b-modal>
    </div>
</template>
<script>
import draggable from 'vuedraggable';
import axios from "axios";

export default {
    name: 'SubscriptionsFaqs',
    components: {
        draggable,
    },
    data: function() {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, class: 'text-center' },
                { key: 'faqs', label: __('frequently_asked_questions')},
                { key: 'sort_order', label: __('sort_order'), sortable: true, class: 'text-center' },
                { key: 'status', label: __('status'), class: 'text-center' },
                { key: 'actions', label: __('actions'), class: 'text-center' }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: 'id',
            sortDesc: true,
            sortDirection: 'desc',
            filter: null,
            filterOn: ['question', 'answer'],
            page: 1,

            isLoading: false,
            isSubmitting: false,
            isUpdatingOrder: false,
            create_new: false,
            edit_record: null,
            allFaqs: [], // Store all FAQs
            faqs: [], // Displayed FAQs for drag-and-drop mode
            expandedFaqs: {}, // Track which FAQs are expanded
            maxLength: 200, // Maximum characters to show before truncation
            enableDragDrop: false, // Enable/disable drag and drop
            isDragging: false, // Track if currently dragging
            form: {
                id: null,
                question: '',
                answer: '',
                sort_order: 0,
                status: 1
            }
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        },
        // Modal title based on whether we're editing or creating
        modalTitle() {
            let title = this.form.id ? __('edit') : __('add');
            title += " ";
            title += __('subscription_faqs');
            return title;
        },
        // Drag options for vuedraggable
        dragOptions() {
            return {
                animation: 200,
                group: "faqs",
                disabled: !this.enableDragDrop,
                ghostClass: "ghost",
                chosenClass: "chosen"
            };
        }
    },
    watch: {
        // Watch for enableDragDrop changes
        enableDragDrop(newVal) {
            if (newVal) {
                // When enabling drag-drop, show all FAQs (no pagination)
                this.faqs = [...this.allFaqs];
                this.totalRows = this.allFaqs.length;
            } else {
                // When disabling drag-drop, b-table will handle pagination automatically
                // Just ensure totalRows is set correctly
                this.totalRows = this.allFaqs.length;
            }
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.faqs.length
    },
    created: function() {
        this.getFaqs();
    },
    methods: {
        // Get all subscription FAQs
        getFaqs(){
            this.isLoading = true
            // Get all FAQs without pagination for proper sorting
            const params = {
                include_inactive: 1
            };
            
            axios.get(this.$apiUrl + '/subscription_faqs/', { params })
                .then((response) => {
                    this.isLoading = false;
                    if (response.data.status === 1) {
                        this.allFaqs = response.data.data || [];
                        this.totalRows = response.data.total || this.allFaqs.length;
                        // Update displayed FAQs based on current mode
                        if (this.enableDragDrop) {
                            // When drag-drop is enabled, show all FAQs
                            this.faqs = [...this.allFaqs];
                        }
                        // When drag-drop is disabled, b-table handles pagination automatically
                    } else {
                        this.showError(response.data.message);
                        this.allFaqs = [];
                        this.faqs = [];
                        this.totalRows = 0;
                    }
                })
                .catch((error) => {
                    this.isLoading = false;
                    this.showError(__('something_went_wrong'));
                    this.allFaqs = [];
                    this.faqs = [];
                    this.totalRows = 0;
                });
        },
        
        // Handle filtered event from b-table
        onFiltered(filteredItems) {
            // Update totalRows when filter is applied
            this.totalRows = filteredItems.length;
        },
        
        // Delete a subscription FAQ
        deleteFaq(index, id){
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
                    this.isLoading = true
                    axios.post(this.$apiUrl + `/subscription_faqs/delete/${id}`)
                        .then((response) => {
                            this.isLoading = false
                            if (response.data.status === 1) {
                                // Remove from both faqs and allFaqs arrays
                                const allFaqsIndex = this.allFaqs.findIndex(faq => faq.id === id);
                                if (allFaqsIndex !== -1) {
                                    this.allFaqs.splice(allFaqsIndex, 1);
                                }
                                
                                // Remove from faqs array (for drag-drop mode)
                                if (this.enableDragDrop) {
                                    const faqsIndex = this.faqs.findIndex(faq => faq.id === id);
                                    if (faqsIndex !== -1) {
                                        this.faqs.splice(faqsIndex, 1);
                                    }
                                }
                                
                                this.totalRows = this.allFaqs.length;
                                this.showMessage("success", response.data.message);
                            } else {
                                this.showError(response.data.message);
                            }
                        })
                        .catch((error) => {
                            this.isLoading = false;
                            this.showError(__('something_went_wrong'));
                        });
                }
            });
        },
        
        // Hide modal and reset form
        hideModal() {
            this.create_new = false;
            this.resetForm();
        },
        
        // Open add modal
        openAddModal() {
            this.resetForm();
            this.create_new = true;
        },
        
        // Edit FAQ - populate form with FAQ data
        editFaq(faq) {
            this.form = {
                id: faq.id,
                question: faq.question || '',
                answer: faq.answer || '',
                sort_order: faq.sort_order || 0,
                status: faq.status !== undefined ? faq.status : 1
            };
            this.create_new = true;
        },
        
        // Reset form to default values
        resetForm() {
            this.form = {
                id: null,
                question: '',
                answer: '',
                sort_order: 0,
                status: 1
            };
            this.edit_record = null;
        },
        
        // Save FAQ (create or update)
        saveFaq() {
            // Validate form
            if (!this.form.question || this.form.question.trim() === '') {
                this.showError(__('question_is_required'));
                return;
            }

            this.isSubmitting = true;
            
            let formData = {
                question: this.form.question.trim(),
                answer: this.form.answer ? this.form.answer.trim() : '',
                sort_order: parseInt(this.form.sort_order) || 0,
                status: parseInt(this.form.status)
            };

            let url = this.$apiUrl + '/subscription_faqs/save';
            if(this.form.id){
                url = this.$apiUrl + `/subscription_faqs/update/${this.form.id}`;
            }
            
            axios.post(url, formData)
                .then((response) => {
                    this.isSubmitting = false;
                    if (response.data.status === 1) {
                        this.showMessage("success", response.data.message);
                        this.hideModal();
                        this.getFaqs();
                    } else {
                        this.showError(response.data.message);
                    }
                })
                .catch((error) => {
                    this.isSubmitting = false;
                    if (error.response && error.response.data && error.response.data.message) {
                        this.showError(error.response.data.message);
                    } else {
                        this.showError(__('something_went_wrong'));
                    }
                });
        },
        
        // Toggle FAQ expansion state
        toggleFaqExpansion(faqId) {
            this.$set(this.expandedFaqs, faqId, !this.expandedFaqs[faqId]);
        },
        
        // Check if FAQ answer should be truncated
        shouldTruncate(answer) {
            return answer && answer.length > this.maxLength;
        },
        
        // Get truncated text for display
        getTruncatedText(answer) {
            if (!answer) return '';
            return answer.length > this.maxLength ? answer.substring(0, this.maxLength) + '...' : answer;
        },
        
        // Get FAQ index by ID (for delete function)
        getFaqIndex(id) {
            return this.faqs.findIndex(faq => faq.id === id);
        },
        
        // Update FAQs order after drag and drop
        updateFaqsOrder() {
            // Update sort_order based on new position in the displayed list
            // Since we're showing all FAQs when drag-drop is enabled, update all
            this.faqs.forEach((faq, index) => {
                faq.sort_order = index + 1;
            });
            
            // Also update allFaqs to keep them in sync
            this.allFaqs = [...this.faqs];
            
            // Send update to server
            this.isUpdatingOrder = true;
            const formData = this.faqs.map(faq => ({
                id: faq.id,
                sort_order: faq.sort_order
            }));
            
            axios.post(this.$apiUrl + '/subscription_faqs/update_order', { faqs: formData })
                .then((response) => {
                    this.isUpdatingOrder = false;
                    if (response.data.status === 1) {
                        this.showMessage("success", response.data.message || __('order_updated_successfully'));
                        // Update allFaqs to reflect new order
                        this.allFaqs = [...this.faqs];
                    } else {
                        this.showError(response.data.message);
                        // Reload FAQs to restore original order
                        this.getFaqs();
                    }
                })
                .catch((error) => {
                    this.isUpdatingOrder = false;
                    this.showError(__('something_went_wrong'));
                    // Reload FAQs to restore original order
                    this.getFaqs();
                });
        },
    },
};
</script>

<style scoped>
.faq-answer {
    margin-top: 8px;
    color: #666;
    font-size: 14px;
}

/* Drag and drop styles */
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.chosen {
    background: #e3f2fd;
}

.dragging {
    opacity: 0.8;
}

.drag-handle {
    cursor: move;
    user-select: none;
}

.drag-handle:hover {
    color: #007bff;
}

.table tbody tr {
    cursor: default;
}

.table tbody tr:hover {
    background-color: #f8f9fa;
}
</style>

<style>
.swal2-container {
    z-index: 9999 !important;
}

.swal2-popup {
    z-index: 10000 !important;
}

.swal2-backdrop-show {
    z-index: 9998 !important;
}

.swal2-container.swal2-backdrop-show {
    z-index: 9999 !important;
}
</style>

