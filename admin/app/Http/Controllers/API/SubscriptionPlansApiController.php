<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use App\Models\Setting;
use App\Models\SubscriptionFaq;
use App\Models\Order;
use App\Models\TimeSlot;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscriptionPlansApiController extends Controller
{

    public function getPlans(Request $request)
    {
        try {
            $limit = $request->input('limit', 10);
            $offset = $request->input('offset', 0);
            $search = $request->input('search', '');
            $include_inactive = (bool) $request->input('include_inactive', false);

            $query = SubscriptionPlan::query();

            if (!empty($search)) {
                $query->search($search);
            }

            if (!$include_inactive) {
                $query->active();
            }

            $totalQuery = SubscriptionPlan::query();
            if (!empty($search)) {
                $totalQuery->search($search);
            }
            if (!$include_inactive) {
                $totalQuery->active();
            }
            $total = $totalQuery->count();

            // Apply limit and offset only if include_inactive is true
            if ($include_inactive) {
                $plans = $query->orderBy('id', 'desc')
                    ->limit($limit)
                    ->offset($offset)
                    ->get();
            } else {
                // If include_inactive is false, get all active plans without pagination
                $plans = $query->orderBy('id', 'desc')->get();
            }

            $subscriptionNameSetting = Setting::where('variable', 'subscription_name')->first();
            $subscriptionName = $subscriptionNameSetting ? $subscriptionNameSetting->value : '';

            $responseData = [
                'plans' => $plans,
                'subscription_name' => $subscriptionName
            ];

            return CommonHelper::responseWithData($responseData, $total);
        } catch (\Exception $e) {
            return CommonHelper::responseError(__('something_went_wrong'));
        }
    }

    public function checkFreeDeliveryTimeSlots()
    {
        try {
            $timeSlotsEnabled = Setting::get_value('time_slots_is_enabled');

            // If time slots are disabled, return 0 count
            if ($timeSlotsEnabled == "false") {
                return CommonHelper::responseWithData([
                    'has_free_delivery_time_slots' => false,
                    'count' => 0
                ]);
            }

            // If time slots are enabled, count free delivery time slots
            $freeDeliveryTimeSlots = TimeSlot::where('is_free_delivery', 1)
                ->where('status', 1)
                ->count();

            return CommonHelper::responseWithData([
                'has_free_delivery_time_slots' => $freeDeliveryTimeSlots > 0,
                'count' => $freeDeliveryTimeSlots
            ]);
        } catch (\Exception $e) {
            return CommonHelper::responseError(__('something_went_wrong'));
        }
    }

    public function save(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'days' => 'required|integer|unique:subscription_plans,days|min:1',
                'price' => 'required|numeric|min:0',
                'discounted_price' => 'nullable|numeric|min:0',
                'free_delivery_above' => 'nullable|numeric|min:0',
                'status' => 'required|in:0,1'
            ]);

            if ($validator->fails()) {
                return CommonHelper::responseError($validator->errors()->first());
            }
            $timeSlotsEnabled = Setting::get_value('time_slots_is_enabled');
            $freeDeliveryTimeSlots = TimeSlot::where('is_free_delivery', 1)
                ->where('status', 1)
                ->count();

            if ($freeDeliveryTimeSlots > 0 && $timeSlotsEnabled == "true") {
                return CommonHelper::responseError(
                    __('cannot_create_subscription_plan_free_delivery_time_slots_exist')
                );
            }

            if ($request->has('discounted_price') && $request->discounted_price !== null) {
                if ($request->discounted_price >= $request->price) {
                    return CommonHelper::responseError(__('discounted_price_must_be_less_than_regular_price'));
                }
            }

            $plan = SubscriptionPlan::create([
                'name' => $request->name,
                'days' => $request->days,
                'price' => $request->price,
                'discounted_price' => $request->discounted_price ?? null,
                'free_delivery_above' => $request->free_delivery_above ?? 0,
                'ios_product_id' => $request->ios_product_id ?? null,
                'status' => $request->status
            ]);

            return CommonHelper::responseSuccessWithData(__('subscription_plan_created_successfully'), $plan);
        } catch (\Exception $e) {
            return CommonHelper::responseError(__('something_went_wrong'));
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $plan = SubscriptionPlan::find($id);
            if (!$plan) {
                return CommonHelper::responseError(__('subscription_plan_not_found'));
            }

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'days' => 'required|integer|min:1',
                'price' => 'required|numeric|min:0',
                'discounted_price' => 'nullable|numeric|min:0',
                'free_delivery_above' => 'nullable|numeric|min:0',
                'status' => 'required|in:0,1'
            ]);

            if ($validator->fails()) {
                return CommonHelper::responseError($validator->errors()->first());
            }

            if ($request->has('discounted_price') && $request->discounted_price !== null) {
                if ($request->discounted_price >= $request->price) {
                    return CommonHelper::responseError(__('discounted_price_must_be_less_than_regular_price'));
                }
            }

            $freeDeliveryTimeSlots = TimeSlot::where('is_free_delivery', 1)
                ->where('status', 1)
                ->count();

            if ($freeDeliveryTimeSlots > 0) {
                return CommonHelper::responseError(__('cannot_create_subscription_plan_free_delivery_time_slots_exist'));
            }

            $plan->update([
                'name' => $request->name,
                'days' => $request->days,
                'price' => $request->price,
                'discounted_price' => $request->discounted_price ?? null,
                'free_delivery_above' => $request->free_delivery_above ?? 0,
                'ios_product_id' => $request->ios_product_id ?? null,
                'status' => $request->status
            ]);

            return CommonHelper::responseSuccessWithData(__('subscription_plan_updated_successfully'), $plan);
        } catch (\Exception $e) {
            return CommonHelper::responseError(__('something_went_wrong'));
        }
    }

    public function delete($id)
    {
        try {
            $plan = SubscriptionPlan::find($id);
            if (!$plan) {
                return CommonHelper::responseError(__('subscription_plan_not_found'));
            }

            $plan->delete();

            return CommonHelper::responseSuccess(__('subscription_plan_deleted_successfully'));
        } catch (\Exception $e) {
            return CommonHelper::responseError(__('something_went_wrong'));
        }
    }

    public function getPlan()
    {
        try {
            $user = auth()->user();
            if (!$user) {
                return CommonHelper::responseError(__('user_not_authenticated'));
            }

            $userSubscription = UserSubscription::where('user_id', $user->id)
                ->where('status', 'active')
                ->where('end_date', '>=', now()->toDateString())
                ->with('plan')
                ->orderBy('id', 'desc')
                ->first();

            if (!$userSubscription) {
                return CommonHelper::responseError(__('no_active_subscription_found'));
            }

            $totalMoneySaved = Order::where('subscription_id', $userSubscription->id)
                ->sum('delivery_save_amount');

            $endDate = Carbon::parse($userSubscription->end_date);
            $today = Carbon::now();
            $daysRemaining = $today->diffInDays($endDate, false);
            $deliveriesNumber = Order::where('subscription_id', $userSubscription->id)->count();
            if ($daysRemaining < 0) {
                $daysRemaining = 0;
            }

            $responseData = [
                'id' => $userSubscription->id,
                'user_id' => $userSubscription->user_id,
                'plan_id' => $userSubscription->plan_id,
                'plan_name' => $userSubscription->plan_name,
                'price_paid' => $userSubscription->price_paid,
                'discounted_price' => $userSubscription->discounted_price,
                'free_delivery_above' => $userSubscription->free_delivery_above,
                'start_date' => $userSubscription->start_date,
                'end_date' => $userSubscription->end_date,
                'status' => $userSubscription->status,
                'total_money_saved' => round($totalMoneySaved, 2),
                'days_remaining' => $daysRemaining,
                'deliveries_number' => $deliveriesNumber
            ];

            return CommonHelper::responseSuccessWithData(__('success'), $responseData);
        } catch (\Exception $e) {
            return CommonHelper::responseError(__('something_went_wrong'));
        }
    }

    public function updateSetting(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'subscription_name' => 'required|string|max:255'
            ]);

            if ($validator->fails()) {
                return CommonHelper::responseError($validator->errors()->first());
            }

            $setting = Setting::where('variable', 'subscription_name')->first();

            if ($setting) {
                $setting->value = $request->subscription_name;
                $setting->save();
            } else {
                $setting = new Setting();
                $setting->variable = 'subscription_name';
                $setting->value = $request->subscription_name;
                $setting->save();
            }

            return CommonHelper::responseSuccess(__('subscription_name_updated_successfully'));
        } catch (\Exception $e) {
            return CommonHelper::responseError(__('something_went_wrong'));
        }
    }

    public function getFaqs(Request $request)
    {
        try {
            $limit = $request->input('limit', 10);
            $offset = $request->input('offset', 0);
            $search = $request->input('search', '');
            $include_inactive = (bool) $request->input('include_inactive', false);

            $query = SubscriptionFaq::query();

            if (!empty($search)) {
                $query->search($search);
            }

            if (!$include_inactive) {
                $query->active();
            }

            $totalQuery = SubscriptionFaq::query();
            if (!empty($search)) {
                $totalQuery->search($search);
            }
            if (!$include_inactive) {
                $totalQuery->active();
            }
            $total = $totalQuery->count();

            $faqs = $query->ordered()->limit($limit)->offset($offset)->get();

            return CommonHelper::responseWithData($faqs, $total);
        } catch (\Exception $e) {
            return CommonHelper::responseError(__('something_went_wrong'));
        }
    }

    public function saveFaq(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'question' => 'required|string|max:1000',
                'answer' => 'nullable|string',
                'sort_order' => 'nullable|min:0',
                'status' => 'required|in:0,1'
            ]);

            if ($validator->fails()) {
                return CommonHelper::responseError($validator->errors()->first());
            }

            $faq = SubscriptionFaq::create([
                'question' => $request->question,
                'answer' => $request->answer ?? '',
                'sort_order' => $request->sort_order ?? 0,
                'status' => $request->status
            ]);

            return CommonHelper::responseSuccessWithData(__('subscription_faq_created_successfully'), $faq);
        } catch (\Exception $e) {
            return CommonHelper::responseError(__('something_went_wrong'));
        }
    }

    public function updateFaq(Request $request, $id)
    {
        try {
            $faq = SubscriptionFaq::find($id);
            if (!$faq) {
                return CommonHelper::responseError(__('subscription_faq_not_found'));
            }

            $validator = Validator::make($request->all(), [
                'question' => 'required|string|max:1000',
                'answer' => 'nullable|string',
                'sort_order' => 'nullable|min:0',
                'status' => 'required|in:0,1'
            ]);

            if ($validator->fails()) {
                return CommonHelper::responseError($validator->errors()->first());
            }

            $faq->update([
                'question' => $request->question,
                'answer' => $request->answer ?? '',
                'sort_order' => $request->sort_order ?? 0,
                'status' => $request->status
            ]);

            return CommonHelper::responseSuccessWithData(__('subscription_faq_updated_successfully'), $faq);
        } catch (\Exception $e) {
            return CommonHelper::responseError(__('enter_valid_sort_order'));
        }
    }

    public function deleteFaq($id)
    {
        try {
            $faq = SubscriptionFaq::find($id);
            if (!$faq) {
                return CommonHelper::responseError(__('subscription_faq_not_found'));
            }

            $faq->delete();

            return CommonHelper::responseSuccess(__('subscription_faq_deleted_successfully'));
        } catch (\Exception $e) {
            return CommonHelper::responseError(__('something_went_wrong'));
        }
    }

    public function updateFaqsOrder(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'faqs' => 'required|array',
                'faqs.*.id' => 'required|integer|exists:subscription_faqs,id',
                'faqs.*.sort_order' => 'required|integer|min:0'
            ]);

            if ($validator->fails()) {
                return CommonHelper::responseError($validator->errors()->first());
            }

            // Update each FAQ's sort_order
            foreach ($request->faqs as $faqData) {
                $faq = SubscriptionFaq::find($faqData['id']);
                if ($faq) {
                    $faq->sort_order = $faqData['sort_order'];
                    $faq->save();
                }
            }

            return CommonHelper::responseSuccess(__('subscription_faqs_order_updated_successfully'));
        } catch (\Exception $e) {
            return CommonHelper::responseError(__('something_went_wrong'));
        }
    }
}
