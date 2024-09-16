import React from 'react';
import { GooglePayButton } from '@google-pay/button-react';

const GooglePay = () => {
    return (
        <GooglePayButton
            environment="TEST" // Troque para 'PRODUCTION' quando estiver pronto
            paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                    {
                        type: 'CARD',
                        parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                gateway: 'stripe', // O gateway de pagamento que você está usando
                                'stripe:version': '2020-08-27',
                                'stripe:publishableKey': 'sua_chave_publica_aqui',
                            },
                        },
                    },
                ],
                merchantInfo: {
                    merchantId: 'MERCHANT_ID_AQUI',
                    merchantName: 'Nome da sua loja',
                },
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: '10.00', // Preço total da transação
                    currencyCode: 'USD',
                    countryCode: 'US',
                },
            }}
            onLoadPaymentData={paymentRequest => {
                console.log('Sucesso', paymentRequest);
            }}
            onError={(error) => {
                console.error('Erro', error);
            }}
        />
    );
};

export default GooglePay;
