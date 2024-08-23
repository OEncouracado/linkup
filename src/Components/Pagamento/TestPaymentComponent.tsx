import React, { useState } from 'react';
import { createCharge } from '../../services/paymentService';
import './TestPaymentComponent.css'; // Para estilização (opcional)
import { Card } from 'react-bootstrap';

const TestPaymentComponent: React.FC = () => {
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Lista de itens
    const items = [
        {
            name: 'Product A',
            value: 1000,
            amount: 2,
        }
    ];

    const handlePayment = async () => {
        const body = {
            items,
        };

        try {
            const result = await createCharge(body);
            setResult(`Charge created successfully: ${JSON.stringify(result)}`);
            setError(null); // Limpa erros anteriores
        } catch (error) {
            setError(`Charge creation failed: ${error}`);
            setResult(null); // Limpa resultados anteriores
        }
    };

    return (
        <div className="test-payment-container">
            <Card style={{ width: '100%', maxWidth: '600px' }}>
                <Card.Header>
                    <h4>Items</h4>
                </Card.Header>
                <Card.Body>
                    {items.map((item, index) => (
                        <div key={index} className="item-details">
                            <p><strong>Name:</strong> {item.name}</p>
                            <p><strong>Value:</strong> R${(item.value / 100).toFixed(2)}</p>
                            <p><strong>Quantity:</strong> {item.amount}</p>
                            <hr />
                        </div>
                    ))}
                </Card.Body>
                <Card.Footer>
                    <button onClick={handlePayment} className="test-payment-button">
                        Test Payment
                    </button>
                </Card.Footer>
            </Card>
            {result && (
                <div className="result-card">
                    <h3>Success</h3>
                    <pre>{result}</pre>
                </div>
            )}
            {error && (
                <div className="error-card">
                    <h3>Error</h3>
                    <pre>{error}</pre>
                </div>
            )}
        </div>
    );
};

export default TestPaymentComponent;
