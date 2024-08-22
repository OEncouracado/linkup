import React from 'react';
import { createCharge } from '../../services/paymentService';

const TestPaymentComponent: React.FC = () => {
    const handlePayment = async () => {
        const body = {
            items: [
                {
                    name: 'Product A',
                    value: 1000,
                    amount: 2,
                },
            ],
        };

        try {
            const result = await createCharge(body);
            console.log('Charge created successfully:', result);
        } catch (error) {
            console.error('Charge creation failed:', error);
        }
    };

    return (
        <div>
            <button onClick={handlePayment}>Test Payment</button>
        </div>
    );
};

export default TestPaymentComponent;
