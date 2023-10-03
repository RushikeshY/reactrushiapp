// Statuses for forward order with out any break.
exports.ORDER_CREATED = 'created'
exports.ORDER_PROCESSING = 'processing'
exports.ORDER_SHIPPED = 'shipped'
exports.ORDER_DELIVERED = 'delivered'

// Statuses for forward order but cancelled.
exports.ORDER_CANCELLED = 'cancelled'
exports.ORDER_RETURNED = 'returned'
exports.ORDER_PAID = 'paid'
// ------------------------------------------

// this status is for :- when user chosen paymentGateway and proceed but not paid or due to anything not able to paid
exports.ORDER_PENDING_DELETE = 'pending_delete'

// payment Status
exports.PAYMENT_PAID = 'paid'
exports.PAYMENT_UNPAID = 'unpaid'
exports.PAYMENT_METHOD_COD = 'cashOnDelivery'
exports.PAYMENT_METHOD_GATEWAY = 'payment_gateway_used'

//------------Return and refund Status-----------------
exports.RETURN_NULL = 'return_null'
exports.RETURN_REQUESTED = 'return_requested'
exports.RETURN_APPROVED = 'return_approved'
exports.RETURN_REJECTED = 'return_rejected'
exports.RETURN_RECEIVED = 'return_received'
exports.REFUND_INITIATED = 'refund_initiated'
exports.REFUND_COMPLETED = 'refund_completed'
exports.REFUND_HOLD = 'refund_hold'
exports.REFUND_CANCELLED = 'refund_cancelled'

// exports.RETURN_INITIATED = 'return_initiated'
// exports.REFUND_REJECTED = 'refund_rejected'

// Return Initiated: The customer has requested to return a product.
// Return Approved: The return request has been approved and the customer can proceed with the return.
// Return Received:The returned product has been received by the seller.
// Refund Processed: The refund for a returned product has been processed.

// exports._ = ''
// exports._ = ''
// exports.RETURN_INITIATED = 'return_initiated'
// exports.REFUND_PROCESSED = 'refund_in_process'
// exports.REFUND_RECEIVED = 'refund_received'
