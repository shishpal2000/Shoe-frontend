"use client"; // Ensure this is at the top
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const RazorpayPayment = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const paymentId = searchParams.get('paymentId');
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderId) {
                setError('No order ID provided.');
                setLoading(false);
                return;
            }

            try {
                const token = localStorage.getItem("token"); // If your API requires authentication
                if (!token) {
                    throw new Error("No authentication token found");
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/get-order/${orderId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();

                if (data.success) {
                    setOrderDetails(data.data);
                    console.log("Order Details:", data.data);
                    console.log(orderDetails?.shippingAddress, orderDetails?.userEmail);
                } else {
                    setError('Failed to fetch order details');
                }
            } catch (err) {
                console.log(err);
                setError('Error fetching order details');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    useEffect(() => {
        if (orderDetails) {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => {
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: orderDetails.amount,
                    currency: orderDetails.currency,
                    name: 'Shoe',
                    order_id: orderDetails.razorpayOrderId,
                    handler: async (response) => {
                        console.log("Payment Success:", response);
                        window.location.href = `/payment-success?paymentId=${response.razorpay_payment_id}&orderId=${response.razorpay_order_id}`;
                        try {
                            const token = localStorage.getItem("token");
                            if (!token) {
                                throw new Error("No authentication token found");
                            }

                            const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-payment`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({
                                    razorpayOrderId: response.razorpay_order_id,
                                    razorpayPaymentId: response.razorpay_payment_id,
                                    razorpaySignature: response.razorpay_signature
                                })
                            });

                            const result = await verifyResponse.json();
                            if (result.success) {
                                alert('Payment verified successfully');
                            } else {
                                alert('Payment verification failed');
                            }
                        } catch (error) {
                            console.error("Error verifying payment:", error);
                            alert('Error verifying payment');
                        }
                    },
                    prefill: {
                        name: `${orderDetails?.shippingAddress?.firstName} ${orderDetails?.shippingAddress?.lastName}`,
                        email: orderDetails?.userEmail || '',
                        contact: orderDetails?.shippingAddress?.phone || ''
                    },
                    notes: {
                        description: 'Your custom description or notes'
                    },
                    theme: {
                        color: '#F37254'
                    }
                };

                const razorpayObject = new window.Razorpay(options);

                razorpayObject.on('payment.failed', function (response) {
                    console.log("Payment Failed:", response);
                    console.error("Payment Failed:", response);
                    window.location.href = `/payment-failed?reason=${response.error.description}`;
                    alert('Payment Failed');
                });

                document.getElementById('pay-button').onclick = function (e) {
                    razorpayObject.open();
                    e.preventDefault();
                };
            };

            document.body.appendChild(script);

            return () => {
                // Clean up the script
                document.body.removeChild(script);
            };
        }
    }, [orderDetails]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <hr />
            <h2>{orderDetails?.courseName || 'Advanced Data Structures & Algorithms Course'}</h2>
            <h3>Description</h3>

            <ul>
                <li>Best Course for SDE placements</li>
                <li>Available in 4 major Languages: JAVA, C/C++, Python, JavaScript</li>
                <li>Lifetime Access</li>
            </ul>

            <span>
                Cost: {orderDetails ? `${(orderDetails.amount)} Rupees` : 'Loading...'}
                <button id="pay-button" style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#2300a3', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Pay Now & Get Access
                </button>
            </span>
            <hr />
        </div>
    );
};

export default RazorpayPayment;
