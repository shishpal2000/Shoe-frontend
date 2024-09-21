"use client"; // Ensure this is at the top
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
                const token = localStorage.getItem("token");
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
                    setOrderDetails(data.order);
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
                    amount: orderDetails.totalAmount,
                    currency: orderDetails.currency,
                    name: 'Shoe',
                    order_id: orderDetails.razorpayOrderId,
                    handler: async (response) => {

                        try {
                            const token = localStorage.getItem("token");
                            if (!token) {
                                throw new Error("No authentication token found");
                            }

                            const verifyResponse = await axios.post(
                                `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-payment`,
                                {
                                    razorpayOrderId: response.razorpay_order_id,
                                    razorpayPaymentId: response.razorpay_payment_id,
                                    razorpaySignature: response.razorpay_signature
                                },
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    }
                                }
                            );

                            if (verifyResponse.data.success) {
                                alert('Payment verified successfully');

                                const totalQuantity = orderDetails.cartItems.reduce((acc, item) => acc + item.quantity, 0);

                                // Check if shippingAddress ID is present
                                if (!orderDetails.shippingAddress) {
                                    alert('Shipping address is not available');
                                    return;
                                }

                                const shippingAddressId = orderDetails.shippingAddress.toString(); // Ensure it's a string

                                const shippingResponse = await axios.post(
                                    `${process.env.NEXT_PUBLIC_API_URL}/api/shipping/create-shipping`,
                                    {
                                        orderId: orderId,
                                        shipmentAddress: shippingAddressId,
                                        totalQuantity: totalQuantity,
                                        shippingDate: new Date() // Assuming you want the current date for shipping date
                                    },
                                    {
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}` // Include token if required
                                        }
                                    }
                                );

                                if (shippingResponse.data.success) {
                                    window.location.href = `/payment-success?paymentId=${response.razorpay_payment_id}&orderId=${response.razorpay_order_id}`;
                                } else {
                                    alert('Failed to save shipping details');
                                    console.error('Shipping response:', shippingResponse.data);
                                }
                            } else {
                                alert('Payment verification failed');
                            }

                        } catch (error) {
                            console.error("Error processing payment:", error);
                            alert('Error processing payment');
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
                document.body.removeChild(script);
            };
        }
    }, [orderDetails]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <hr />
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Item</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails?.cartItems.map((item, index) => (
                        <tr key={index}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                {item.productName || 'Product Name'}
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: '20px' }}>
                <h4>Total Amount: {orderDetails ? `${orderDetails.finalTotal} Rupees` : 'Loading...'}</h4>
                <br />
                <button
                    id="pay-button"
                    style={{
                        marginLeft: '0px',
                        padding: '20px 30px',
                        backgroundColor: '#2300a3',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Pay Now & Get Access
                </button>
            </div>
            <hr />
        </div>

    );
};

export default RazorpayPayment;
